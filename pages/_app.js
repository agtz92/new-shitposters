import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import "@/styles/globals.css"
import { useMediaQuery } from "@mui/material"
import Script from "next/script"

export default function App({ Component, pageProps }) {
  const isMobile = useMediaQuery("(max-width:768px)")

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload" id="GA_script">
        {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
         
           gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS});
         `}
      </Script>
      <Nav isMobile={isMobile} />
      <Component {...pageProps} isMobile={isMobile} />
      <Footer />
    </>
  )
}
