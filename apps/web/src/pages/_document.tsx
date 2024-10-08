// import newrelic from 'newrelic';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';

import createEmotionServer from '@emotion/server/create-instance';

import { primaryFont } from 'src/theme/typography';
import createEmotionCache from 'src/utils/createEmotionCache';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className={primaryFont.className}>
        <Head>
          <meta charSet="utf-8" />
          {/* <script
            type='text/javascript'
            dangerouslySetInnerHTML={{
              __html: (this.props as any).browserTimingHeader,
            }}
          /> */}
          {/* <link rel='manifest' href='/manifest.json' /> */}

          {/* PWA primary color */}
          <meta name="theme-color" content="#0682ff" />

          {/* Favicon */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />

          {/* Emotion */}
          <meta name="emotion-insertion-point" content="" />
          {(this.props as any).emotionStyleTags}

          {/* Meta */}
          <meta name="description" content="wento" />
          <meta name="author" content="wento" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();

  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);

  // const browserTimingHeader = newrelic.getBrowserTimingHeader({
  //   hasToRemoveScriptWrapper: true,
  // });

  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
    // browserTimingHeader,
  };
};
