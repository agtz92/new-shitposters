// components/Nav.js
import { Box } from "@mui/material"
import Link from "next/link"
import { useState } from "react"
import { sitename, motto } from "./siteData"

const Nav = ({ isMobile, siteData }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          borderBottom: "1px solid #d80032",
          marginLeft: 20,
          marginRight: 20,
        }}
        className="pc-only"
      >
        <h1 style={{ fontSize: "4em", fontWeight: 600, margin: 0 }}>
          {sitename}
        </h1>
        <h3
          style={{
            fontSize: "1.5em",
            fontWeight: 300,
            textAlign: "center",
            margin: 0,
            letterSpacing: "2px",
          }}
        >
          {motto}
        </h3>
      </Box>

      <nav className={`nav ${isOpen ? "open" : ""}`}>
        <div className="logo">
          <Link href="/">{sitename}</Link>
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className={`menu ${isOpen ? "open" : ""}`}>
          <li>
            <Link href="/" onClick={toggleMenu}>
              NUEVO
            </Link>
          </li>
          <li>
            <Link href="/categories/gaming" onClick={toggleMenu}>
              GAMING
            </Link>
          </li>
          <li>
            <Link href="/categories/cine" onClick={toggleMenu}>
              CINE
            </Link>
          </li>
          <li>
            <Link href="/categories/musica" onClick={toggleMenu}>
              MUSICA
            </Link>
          </li>
          <li>
            <Link href="/categories/deportes" onClick={toggleMenu}>
              DEPORTES
            </Link>
          </li>
          <li>
            <Link href="/categories/naturaleza" onClick={toggleMenu}>
              NATURALEZA
            </Link>
          </li>
          <li>
            <Link href="/categories/recomendaciones" onClick={toggleMenu}>
              RECOMENDACIONES
            </Link>
          </li>
          <li>
            <Link href="/categories/celebridades" onClick={toggleMenu}>
              CELEBRIDADES
            </Link>
          </li>
          <li>
            <Link href="/categories/historia" onClick={toggleMenu}>
              HISTORIA
            </Link>
          </li>
          <li>
            <Link href="/categories/random" onClick={toggleMenu}>
              RANDOM
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Nav
