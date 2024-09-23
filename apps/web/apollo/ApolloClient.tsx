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

import { useAuth0 } from '@auth0/auth0-react';
import { useConfig } from '@/hooks/useConfig';
import { InternalEnv } from 'runtime';
// import { useAuthContext } from 'src/auth/useAuthContext';

const buildHttpLink = (env: 'local' | 'prod', apiUrl: string): ApolloLink => {
  console.log('env: ', env);
  const uri = env === 'local' ? 'http://localhost:8080/graphql' : apiUrl;
  console.log('uri: ', uri);

  return new HttpLink({
    uri,
  });
};

// function createApolloClient(
//   env: 'local' | 'prod',
//   apiUrl: string,
//   token?: string,
//   getAccessTokenSilently?: () => Promise<string>
// ) {
//   const httpLink = buildHttpLink(env, apiUrl);

//   const errorLink = onError(({ graphQLErrors, networkError }) => {
//     if (graphQLErrors)
//       graphQLErrors.forEach(({ message, locations, path }) => {
//         console.log(
//           `[GraphQL error]: Message: ${message}, Location: ${locations
//             ?.map((l) => JSON.stringify(l))
//             .join(' ')}, Path: ${path}`
//         );
//       });
//     if (networkError) {
//     }
//   });

//   const authLink = setContext(async (_, { headers }) => {
//     try {
//       // Use the token provided if available, otherwise fetch it
//       const tokenToUse = token ?? (await getAccessTokenSilently?.());

//       return {
//         headers: {
//           ...headers,
//           authorization: tokenToUse ? `Bearer ${tokenToUse}` : '',
//         },
//       };
//     } catch (e) {
//       // Handle invite code logic
//       const queryString =
//         typeof window !== 'undefined'
//           ? window.location.search.substring(1)
//           : '';
//       const queryCleaned = queryString
//         .replace(/&/g, '","')
//         .replace(/=/g, '":"');
//       const parsedURLParams = JSON.parse(`{"${decodeURI(queryCleaned)}"}`);

//       return {
//         headers: {
//           ...headers,
//           'x-invite-code': parsedURLParams?.inviteCode,
//         },
//       };
//     }
//   });

//   return new ApolloClient({
//     ssrMode: typeof window === 'undefined', // Disables force-fetching on the server
//     link: from([errorLink, authLink, httpLink]),
//     cache: new InMemoryCache({
//       possibleTypes: {
//         BaseError: [
//           'ErrorForbidden',
//           'ErrorNotFound',
//           'ErrorInvalidRequest',
//           'ErrorUniqueConstraint',
//           'ErrorEventExists',
//         ],
//       },
//     }),
//   });
// }

// export function initializeApollo(
//   initialState: NormalizedCacheObject | null = null,
//   env: 'local' | 'prod',
//   apiUrl: string,
//   token?: string,
//   getAccessTokenSilently?: () => Promise<string>
// ) {
//   const isServer = typeof window === 'undefined';
//   const httpLink = buildHttpLink(env, apiUrl);

//   const errorLink = onError(({ graphQLErrors, networkError }) => {
//     if (graphQLErrors)
//       graphQLErrors.forEach(({ message, locations, path }) => {
//         console.log(
//           `[GraphQL error]: Message: ${message}, Location: ${locations
//             ?.map((l) => JSON.stringify(l))
//             .join(' ')}, Path: ${path}`
//         );
//       });
//     if (networkError) {
//       console.log(`[Network error]: ${networkError}`);
//     }
//   });

//   const authLink = setContext(async (_, { headers }) => {
//     if (isServer) {
//       // For SSR, we don't have access to the token, so we skip authentication
//       return { headers };
//     }

//     try {
//       const tokenToUse = token ?? (await getAccessTokenSilently?.());
//       return {
//         headers: {
//           ...headers,
//           authorization: tokenToUse ? `Bearer ${tokenToUse}` : '',
//         },
//       };
//     } catch (e) {
//       // Handle invite code logic
//       const queryString =
//         typeof window !== 'undefined'
//           ? window.location.search.substring(1)
//           : '';
//       const queryCleaned = queryString
//         .replace(/&/g, '","')
//         .replace(/=/g, '":"');
//       const parsedURLParams = JSON.parse(`{"${decodeURI(queryCleaned)}"}`);

//       return {
//         headers: {
//           ...headers,
//           'x-invite-code': parsedURLParams?.inviteCode,
//         },
//       };
//     }
//   });

//   const apolloClient = new ApolloClient({
//     ssrMode: isServer,
//     link: from([errorLink, authLink, httpLink]),
//     cache: new InMemoryCache().restore(initialState || {}),
//   });

//   return apolloClient;
// }

// let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

// export function useApollo(initialState: NormalizedCacheObject | null) {
//   const { appConfig } = useConfig();
//   const { getAccessTokenSilently } = useAuth0();

//   const store = useMemo(
//     () =>
//       initializeApollo(
//         initialState,
//         appConfig.internalEnv,
//         appConfig.apiUrl,
//         undefined,
//         getAccessTokenSilently
//       ),
//     [
//       initialState,
//       appConfig.internalEnv,
//       appConfig.apiUrl,
//       getAccessTokenSilently,
//     ]
//   );

//   return store;
// }

export default function ApolloProvider({
  children,
  initialApolloState,
}: {
  children: ReactNode;
  initialApolloState?: NormalizedCacheObject;
}): ReactElement {
  // const authContext = useAuthContext();

  const { user, getAccessTokenSilently } = useAuth0();

  const config = useConfig();
  console.log('config: ', config);

  const client = buildClient(
    config.appConfig.internalEnv,
    config.appConfig.apiUrl,
    getAccessTokenSilently
  );
  console.log('client: ', client);

  return (
    <ApolloOfficialProvider client={client}>{children}</ApolloOfficialProvider>
  );
}

const buildAuthLink = (getAccessTokenSilently: any): ApolloLink => {
  return setContext(async (_, { headers }) => {
    // const user =
    // const user = firebaseAuth.currentUser;
    // if (!user) {
    //   throw new Error('User is unauthenticated.');
    // }

    const token = await getAccessTokenSilently();
    console.log('token: ', token);

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
        // user_id: `${user.uid}`,
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
    console.log(`[Network error]: ${networkError}`);
  }
});

export const buildClient = (
  internalEnv: InternalEnv,
  apiUrl: string,
  getAccessTokenSilently: any
) => {
  return new ApolloClient({
    link: from([
      errorLink,
      buildAuthLink(getAccessTokenSilently),
      buildHttpLink(internalEnv, apiUrl),
    ]),
    cache: new InMemoryCache({}),
    connectToDevTools: internalEnv === 'local',
  });
};
