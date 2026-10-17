import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import "@/styles/globals.css"
import Script from "next/script"

export default function App({ Component, pageProps }) {
  const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

  return (
    <>
      {GA_ID ? (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || []
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date())
              gtag('config', '${GA_ID}')
            `}
          </Script>
        </>
      ) : null}

      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
