import React, { ReactElement, ReactNode, useMemo } from 'react';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider as ApolloOfficialProvider,
  HttpLink,
  InMemoryCache,
  from,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { onError } from '@apollo/client/link/error';

import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react';
import { useConfig } from 'src/hooks/useConfig';
import { InternalEnv } from 'runtime';
// import { useAuthContext } from 'src/auth/useAuthContext';

const buildHttpLink = (env: 'local' | 'prod', apiUrl: string): ApolloLink => {
  const uri = env === 'local' ? 'http://localhost:8080/graphql' : apiUrl;

  return new HttpLink({
    uri,
  });
};

export default function ApolloProvider({
  children,
}: {
  children: ReactNode;
  initialApolloState?: NormalizedCacheObject;
}): ReactElement {
  const { getAccessTokenSilently } = useAuth0();
  const config = useConfig();

  const { internalEnv, apiUrl } = config.appConfig;

  const client = new ApolloClient({
    link: from([
      errorLink,
      buildAuthLink(getAccessTokenSilently),
      buildHttpLink(internalEnv, apiUrl),
    ]),
    cache: new InMemoryCache({}),
    connectToDevTools: internalEnv === 'local',
  });

  return (
    <ApolloOfficialProvider client={client}>{children}</ApolloOfficialProvider>
  );
}

const buildAuthLink = (
  getAccessTokenSilently: Auth0ContextInterface['getAccessTokenSilently']
): ApolloLink => {
  return setContext(async (_, { headers }) => {
    const token = await getAccessTokenSilently();

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations
          ?.map((l) => JSON.stringify(l))
          .join(' ')}, Path: ${path}`
      );
    });
  if (networkError) {
  }
});
