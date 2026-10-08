import Link from "next/link"

const Logo = ({ small }) => (
  <Link href="/" className={`logo${small ? " logo-small" : ""}`} aria-label="10 DATOS, inicio">
    <span className="logo-badge">10</span>
    <span className="logo-word">DATOS</span>
  </Link>
)

export default Logo
