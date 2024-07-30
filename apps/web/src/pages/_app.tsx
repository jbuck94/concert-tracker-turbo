// scroll bar
import { Analytics } from '@vercel/analytics/react';

import 'simplebar-react/dist/simplebar.min.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import createEmotionCache from 'src/utils/createEmotionCache';
import { NextPage } from 'next';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import Head from 'next/head';
import ThemeProvider from 'src/theme/index';
import { AuthProvider } from 'src/auth/Auth0Context';
import ThemeSettings from 'src/components/settings/ThemeSettings';
import SnackbarProvider from 'src/components/snackbar/SnackbarProvider';

import { Auth0Provider } from '@auth0/auth0-react';

import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import ApolloProvider from 'apollo/ApolloClient';
import { InternalEnv } from 'runtime';

// if (__DEV__) {
// Adds messages only in a dev environment
loadDevMessages();
loadErrorMessages();
// }

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type Auth0Config = {
  domain: string;
  clientId: string;
};

type AppConfig = {
  apiUrl: string;
  internalEnv: InternalEnv;
};

interface MyAppInitialProps extends AppInitialProps {
  auth0?: Auth0Config;
  appConfig?: AppConfig;
}

interface MyAppProps extends AppProps, MyAppInitialProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

const CustomApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
  auth0,
  appConfig,
}: MyAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  console.log('appConfig: ', appConfig);
  console.log('auth0: ', auth0);

  if (!auth0 || !appConfig) {
    throw new Error('Could not initialize runtime ');
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Auth0Provider
        domain={auth0.domain}
        clientId={auth0.clientId}
        authorizationParams={{
          audience: 'concert-tracker-api',
          redirect_uri:
            typeof window == 'undefined'
              ? ''
              : `${window.location.origin}/dashboard`,
        }}
      >
        <ThemeProvider>
          <SnackbarProvider>
            <ApolloProvider apiURL={appConfig?.apiUrl}>
              <AuthProvider>
                <ThemeSettings>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    {getLayout(<Component {...pageProps} />)}
                  </LocalizationProvider>
                </ThemeSettings>
              </AuthProvider>
            </ApolloProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </Auth0Provider>
      <Analytics />
    </CacheProvider>
  );
};

CustomApp.getInitialProps = async (
  context: AppContext
): Promise<MyAppInitialProps> => {
  const appProps = await App.getInitialProps(context);

  let serversideProps:
    | {
        auth0: Auth0Config;
        appConfig: AppConfig;
      }
    | undefined;

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { getOrThrow, initializeRuntime, isRuntimeInitialized } =
      await import('runtime');

    if (!isRuntimeInitialized()) {
      await initializeRuntime(require('manifest.json'));
    }

    serversideProps = {
      auth0: {
        clientId: getOrThrow('AUTH0_CLIENT_ID'),
        domain: getOrThrow('AUTH0_DOMAIN'),
      },
      appConfig: {
        apiUrl: getOrThrow('API_URL'),
        internalEnv: getOrThrow('INTERNAL_ENV') as InternalEnv,
      },
    };
  }

  return {
    ...appProps,
    ...serversideProps,
  };
};

export default CustomApp;
