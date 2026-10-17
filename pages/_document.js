import { Html, Head, Main, NextScript } from "next/document"
import Script from "next/script"

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=AR+One+Sans:wght@400;600&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=AR+One+Sans:wght@400;600&display=swap"
          media="print"
          onLoad="this.media='all'"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7182528185795867"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </body>
    </Html>
  )
}
