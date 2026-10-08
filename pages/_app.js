import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import "@/styles/globals.css"
import { Barlow_Condensed, Inter } from "next/font/google"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

// Display face for headlines and the numbered "datos".
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  variable: "--font-display",
})

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
const ADSENSE_CLIENT = "ca-pub-7182528185795867"

export default function App({ Component, pageProps }) {
  return (
    <div className={`${inter.className} ${barlow.variable} app`}>
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
      {/* Ads load after the page is interactive so they don't compete with LCP/TBT. */}
      <Script
        strategy="lazyOnload"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        crossOrigin="anonymous"
      />

      <Nav />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}
