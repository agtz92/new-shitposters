import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import "@/styles/globals.css"
import { useMediaQuery } from "@mui/material"

export default function App({ Component, pageProps }) {
  const isMobile = useMediaQuery("(max-width:768px)")

  return (
    <>
      <Nav isMobile={isMobile} />
      <Component {...pageProps} isMobile={isMobile} />
      <Footer />
    </>
  )
}
