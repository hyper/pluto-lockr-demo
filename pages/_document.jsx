import {
  Html, NextScript, Main, Head,
} from 'next/document';
import React from 'react';

function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#1b1b1b" />
        <title>Pluto Crypto Checkout Quickstart</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
