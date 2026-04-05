import { Box, Grid } from "@mui/material"
import Link from "next/link"
import { sitename, motto } from "./siteData"

const Footer = () => {
  return (
    <Box className="footer">
      <Box sx={{ maxWidth: 1200, margin: "0 auto" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <h4 style={{ fontSize: "1.1rem", letterSpacing: "3px", color: "var(--text-primary)", marginBottom: "8px" }}>
              {sitename}
            </h4>
            <p style={{ margin: 0 }}>{motto}</p>
          </Grid>
          <Grid item xs={12} md={4}>
            <h4>Categorías</h4>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px" }}>
              <Link href="/">NUEVO</Link>
              <Link href="/categories/gaming">GAMING</Link>
              <Link href="/categories/cine">CINE</Link>
              <Link href="/categories/musica">MUSICA</Link>
              <Link href="/categories/deportes">DEPORTES</Link>
              <Link href="/categories/naturaleza">NATURALEZA</Link>
              <Link href="/categories/recomendaciones">RECOMENDACIONES</Link>
              <Link href="/categories/celebridades">CELEBRIDADES</Link>
              <Link href="/categories/historia">HISTORIA</Link>
              <Link href="/categories/random">RANDOM</Link>
            </Box>
            <Box sx={{ marginTop: "12px" }}>
              <Link href="/privacidad">Política de Privacidad</Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <h4>Partners</h4>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Link href="https://www.antesdelexamen.com/" target="_blank">
                Bancos de preguntas UNAM
              </Link>
              <Link href="https://www.corthw.com/topes-para-anden" target="_blank">
                Cortinas Hawaianas y Topes para Anden
              </Link>
              <Link href="https://www.rollospvc.com" target="_blank">
                Cortinas Hawaianas y Cortinas Hawaianas Armadas
              </Link>
              <Link href="https://grupohule.com/categories/tapetes-y-pisos-para-gimnasio" target="_blank">
                Losetas de Caucho para Gimnasio
              </Link>
              <Link href="https://www.foodplusfeed.com/subcategoria/acido-citrico" target="_blank">
                Venta de Ácido Cítrico al Mayoreo
              </Link>
              <Link href="https://www.antesdelexamen.com/categorias/preguntas-de-examen/" target="_blank">
                Preguntas de examen UNAM
              </Link>
              <Link href="https://www.matmarkt.com/productos/gimnasios" target="_blank">
                Piso para gimnasios
              </Link>
              <Link href="https://www.sombrealo.com/" target="_blank">
                Velarias Arquitectonicas Queretaro
              </Link>
              <Link href="https://www.soy-nuevo.com/" target="_blank">
                Cazador de Ofertas para Productos de Bebés
              </Link>
              <Link href="https://www.3minread.com/" target="_blank">
                Latest trends and news under 3 min!
              </Link>
              <Link href="https://www.mexgamer.com/categories/gaming" target="_blank">
                Noticias de Anime y Videojuegos en español
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                borderTop: "1px solid var(--border-subtle)",
                paddingTop: "20px",
                marginTop: "8px",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, fontSize: "0.8rem" }}>
                {sitename} {new Date().getFullYear()}
              </p>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Footer
