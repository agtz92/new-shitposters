import Link from "next/link"
import { sitename, motto } from "./siteData"
import { navCategories } from "./categories"
import Logo from "./Logo"

const partners = [
  ["https://www.antesdelexamen.com/", "Bancos de preguntas UNAM"],
  ["https://www.corthw.com/topes-para-anden", "Cortinas Hawaianas y Topes para Anden"],
  ["https://www.rollospvc.com", "Cortinas Hawaianas y Cortinas Hawaianas Armadas"],
  ["https://grupohule.com/categories/tapetes-y-pisos-para-gimnasio", "Losetas de Caucho para Gimnasio"],
  ["https://www.foodplusfeed.com/subcategoria/acido-citrico", "Venta de Ácido Cítrico al Mayoreo"],
  ["https://www.antesdelexamen.com/categorias/preguntas-de-examen/", "Preguntas de examen UNAM"],
  ["https://www.matmarkt.com/productos/gimnasios", "Piso para gimnasios"],
  ["https://www.sombrealo.com/", "Velarias Arquitectonicas Queretaro"],
  ["https://www.soy-nuevo.com/", "Cazador de Ofertas para Productos de Bebés"],
  ["https://www.3minread.com/", "Latest trends and news under 3 min!"],
  ["https://www.mexgamer.com/categories/gaming", "Noticias de Anime y Videojuegos en español"],
]

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo small />
          <p>{motto}</p>
        </div>
        <div>
          <h2 className="footer-heading">Categorías</h2>
          <div className="footer-categories">
            {navCategories.slice(1).map(({ href, label }) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="footer-heading">Partners</h2>
          <div className="footer-partners">
            {partners.map(([href, label]) => (
              <a key={href} href={href} target="_blank" rel="noopener">
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {sitename}
          </p>
          <Link href="/privacidad">Política de Privacidad</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
