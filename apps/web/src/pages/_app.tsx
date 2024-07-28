// scroll bar
import 'simplebar-react/dist/simplebar.min.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

import { AppProps } from 'next/app';

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

// if (__DEV__) {
// Adds messages only in a dev environment
loadDevMessages();
loadErrorMessages();
// }

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

function CustomApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Auth0Provider
        domain={'jamiewbuck.auth0.com'}
        clientId={'IRsGoxxrZOMdeAXczZyli2wiYrQrl8kb'}
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
      </Auth0Provider>
    </CacheProvider>
  );
}

export default CustomApp;
