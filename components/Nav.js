import Link from "next/link"
import { useState } from "react"
import { sitename, motto } from "./siteData"
import { navCategories } from "./categories"

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header>
      <div className="pc-only">
        <Link href="/" className="site-title">
          {sitename}
        </Link>
        <p className="site-motto">{motto}</p>
      </div>

      <div className="nav-wrapper">
        <nav className="nav" aria-label="Categorías">
          <div className="logo">
            <Link href="/">{sitename}</Link>
          </div>
          <button
            type="button"
            className="menu-toggle"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            aria-controls="main-menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
          <ul id="main-menu" className={`menu ${isOpen ? "open" : ""}`}>
            {navCategories.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} onClick={() => setIsOpen(false)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Nav
