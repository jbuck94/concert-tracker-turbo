// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';

import useApollo from '@/hooks/useApollo';
import createEmotionCache from 'src/utils/createEmotionCache';
import { NextPage } from 'next';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import Head from 'next/head';
import ThemeProvider from 'src/theme/ThemeProvider';
import { AuthProvider } from 'src/auth/JwtContext';

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
  const client = useApollo(pageProps);
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider>
        <AuthProvider>
          <ApolloProvider client={client}>
            {getLayout(<Component {...pageProps} />)}
          </ApolloProvider>
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default CustomApp;
