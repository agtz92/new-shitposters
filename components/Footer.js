import { Box, Grid } from "@mui/material"
import Link from "next/link"
import { useState } from "react"
import { sitename, motto } from "./siteData"
import Image from "next/image"

const Footer = () => {
  return (
    <Box
      sx={{
        margin: 5,
        borderTop: "1px solid #d80032",
        paddingTop: 2,
      }}
      className="footer"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <p>{sitename}</p>
          <p>{motto}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <h4>Categories</h4>
          <ul>
            <li>
              <Link href="/">NUEVO</Link>
            </li>
            <li>
              <Link href="/categories/gaming">GAMING</Link>
            </li>
            <li>
              <Link href="/categories/cine">CINE</Link>
            </li>
            <li>
              <Link href="/categories/musica">MUSICA</Link>
            </li>
            <li>
              <Link href="/categories/deportes">DEPORTES</Link>
            </li>
            <li>
              <Link href="/categories/naturaleza">NATURALEZA</Link>
            </li>
            <li>
              <Link href="/categories/recomendaciones">RECOMENDACIONES</Link>
            </li>
            <li>
              <Link href="/categories/celebridades">CELEBRIDADES</Link>
            </li>
            <li>
              <Link href="/categories/historia">HISTORIA</Link>
            </li>
            <li>
              <Link href="/categories/random">RANDOM</Link>
            </li>
            <li>
              <Link href="/privacidad">Politica de Privacidad</Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} md={4} >
          <Box display="flex" flexDirection="column">
            <h4>Partners</h4>
            <Link href="https://www.antesdelexamen.com/" target="_blank">
              Bancos de preguntas UNAM
            </Link>
            <Link
              href="https://www.corthw.com/topes-para-anden"
              target="_blank"
            >
              Cortinas Hawaianas y Topes para Anden
            </Link>
            <Link href="https://www.rollospvc.com" target="_blank">
              Cortinas Hawaianas y Cortinas Hawaianas Armadas
            </Link>
            <Link
              href="https://grupohule.com/categories/tapetes-y-pisos-para-gimnasio"
              target="_blank"
            >
              Losetas de Caucho para Gimnasio
            </Link>
            <Link
              href="https://www.foodplusfeed.com/subcategoria/acido-citrico"
              target="_blank"
            >
              Venta de Ácido Cítrico al Mayoreo
            </Link>
            <Link
              href="https://www.antesdelexamen.com/categorias/preguntas-de-examen/"
              target="_blank"
            >
              Preguntas de examen UNAM
            </Link>
            <Link
              href="https://www.matmarkt.com/productos/gimnasios"
              target="_blank"
            >
              Piso para gimnasios
            </Link>
            <Link href="https://www.sombrealo.com/" target="_blank">
              Velarias Arquitectonicas Queretaro
            </Link>
            <Link href="https://www.soy-nuevo.com/" target="_blank">
              Cazador de Ofertas para Productos de Bebés como Safety 1st, Doona,
              Uppababy y más!
            </Link>
            <Link href="https://www.3minread.com/" target="_blank">
              Latest trends and news under 3 min!
            </Link>
            <Link
              href="https://www.mexgamer.com/categories/gaming"
              target="_blank"
            >
              Noticias de Anime y Videojuegos en español
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <p style={{ width: "100%", textAlign: "center" }}>{sitename} 2023</p>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Footer
