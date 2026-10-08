import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import Logo from "./Logo"
import { navCategories } from "./categories"

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { asPath } = useRouter()
  const isActive = (href) => (href === "/" ? asPath === "/" : asPath.startsWith(href))

  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className="main-nav" aria-label="Categorías">
          <ul id="main-menu" className={`menu ${isOpen ? "open" : ""}`}>
            {navCategories.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="menu-toggle"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="main-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      <nav className="chip-nav" aria-label="Categorías rápidas">
        {navCategories.map(({ href, label }) => (
          <Link key={href} href={href} className={isActive(href) ? "active" : undefined}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default Nav
