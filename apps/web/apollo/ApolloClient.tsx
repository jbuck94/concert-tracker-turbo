import React, { ReactElement, ReactNode } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';

export default function Provider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const { getAccessTokenSilently } = useAuth0();

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_SERVER_URI || 'http://localhost:8080/graphql',
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations
            ?.map((l) => JSON.stringify(l))
            .join(' ')}, Path: ${path}`
        );
      });
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const authLink = setContext(async (_, { headers }) => {
    try {
      const token = await getAccessTokenSilently();

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    } catch (e) {
      const queryString = window && window.location.search.substring(1);
      const queryCleaned = queryString
        .replace(/&/g, '","')
        .replace(/=/g, '":"');
      const parsedURLParams = JSON.parse(`{"${decodeURI(queryCleaned)}"}`);

      return {
        headers: {
          ...headers,
          'x-invite-code': parsedURLParams?.inviteCode,
        },
      };
    }
  });

  const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache({
      possibleTypes: {
        BaseError: [
          'ErrorForbidden',
          'ErrorNotFound',
          'ErrorInvalidRequest',
          'ErrorUniqueConstraint',
          'ErrorEventExists',
        ],
      },
    }),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
