import 'simplebar-react/dist/simplebar.min.css';

import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import Head from 'next/head';

import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { NextPage } from 'next';
import { InternalEnv } from 'runtime';

import ApolloProvider from 'apollo/ApolloClient';
import { AuthProvider } from 'src/auth/Auth0Context';
import { ConfigProvider } from 'src/components/provider/AppConfigProvider';
import { Auth0ConfiguredProvider } from 'src/components/provider/Auth0ConfiguredProvider';
import ThemeSettings from 'src/components/settings/ThemeSettings';
import SnackbarProvider from 'src/components/snackbar/SnackbarProvider';
import ThemeProvider from 'src/theme/index';
import createEmotionCache from 'src/utils/createEmotionCache';

// if (__DEV__) {
// // Adds messages only in a dev environment
// loadDevMessages();
// loadErrorMessages();
// }

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export type Auth0Config = {
  domain: string;
  clientId: string;
};

export type AppConfig = {
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

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ConfigProvider
        appConfig={auth0 && appConfig ? { auth0, appConfig } : undefined}
      >
        <Auth0ConfiguredProvider>
          <ThemeProvider>
            <SnackbarProvider>
              <ApolloProvider>
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
        </Auth0ConfiguredProvider>
      </ConfigProvider>
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
