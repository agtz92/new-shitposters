import React, { useState, useEffect } from "react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Box, Grid, Pagination, Stack } from "@mui/material"
import Link from "next/link"
import Head from "next/head"
import LargeCard from "@/components/LargeCard"
import { sitename, sitedomain } from "@/components/siteData"

export default function CategoryPage({ matchingFiles, category, isMobile }) {
  const sortedBlogs = matchingFiles?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
  const itemsPerPage = 9
  const [currentPage, setCurrentPage] = useState(1)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const blogsToDisplay = sortedBlogs?.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [category])

  const title = sitename + " | " + category

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`Artículos sobre ${category} en ${sitename}. Encuentra los mejores posts y noticias.`} />
        <link rel="canonical" href={`${sitedomain}/categories/${category.toLowerCase()}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={`Artículos sobre ${category} en ${sitename}.`} />
        <meta property="og:url" content={`${sitedomain}/categories/${category.toLowerCase()}`} />
        <meta property="og:site_name" content={sitename} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={`Artículos sobre ${category} en ${sitename}.`} />
      </Head>

      <div className="page-hero">
        <h1>{category.toUpperCase()}</h1>
        <p className="subtitle">
          {sortedBlogs?.length} artículos
        </p>
      </div>

      <Grid container spacing={2.5}>
        {blogsToDisplay?.map((file, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Link href={`/${file.slug}`}>
              <LargeCard post={file} />
            </Link>
          </Grid>
        ))}
      </Grid>

      {sortedBlogs?.length > itemsPerPage && (
        <Stack
          spacing={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ marginTop: 6, marginBottom: 4 }}
        >
          <Pagination
            count={Math.ceil(sortedBlogs.length / itemsPerPage)}
            size="large"
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: "var(--radius-sm)",
              },
            }}
          />
        </Stack>
      )}
    </Box>
  )
}

export async function getStaticProps({ params }) {
  const { category } = params
  try {
    const categorySlug = category.toLowerCase()
    const files = fs.readdirSync("./blog")
    const matchingFiles = []

    for (const file of files) {
      const fileContent = matter(
        fs.readFileSync(path.join("./blog", file), "utf8")
      )
      const frontmatter = fileContent.data
      const shortDescription = frontmatter["short-description"] || ""

      if (
        frontmatter.categoria &&
        frontmatter.categoria.toLowerCase() === categorySlug
      ) {
        const slug = file.slice(0, file.indexOf("."))
        matchingFiles.push({
          slug,
          category: frontmatter.categoria,
          categoria: frontmatter.categoria,
          title: frontmatter.title,
          date: frontmatter.date.toISOString(),
          featuredimage: frontmatter.featuredimage,
          markdown: fileContent.content,
          shortDescription,
        })
      }
    }

    return {
      props: { matchingFiles, category: category },
    }
  } catch (error) {
    console.error("Error reading files or parsing frontmatter:", error)
    return {
      notFound: true,
    }
  }
}
export async function getStaticPaths() {
  const files = fs.readdirSync("./categories")
  const categories = new Set()

  for (const file of files) {
    if (!file.startsWith(".")) {
      const fileContent = matter(
        fs.readFileSync(path.join("./categories", file), "utf8")
      )
      const frontmatter = fileContent.data

      if (frontmatter.categoria) {
        categories.add(frontmatter.categoria.toLowerCase())
      }
    }
  }

  const paths = Array.from(categories).map((category) => ({
    params: { category },
  }))

  return {
    paths,
    fallback: "blocking",
  }
}
