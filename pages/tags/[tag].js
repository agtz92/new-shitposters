import React, { useState, useEffect } from "react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import LargeCard from "@/components/LargeCard"
import { Box, Grid, Pagination, Stack } from "@mui/material"
import Head from "next/head"
import { sitename, sitedomain } from "@/components/siteData"

function removeSpecialCharactersAndLowerCase(str) {
  return str.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()
}

function TagPage({ matchingFiles, tag, isMobile }) {
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
  }, [tag])

  const title = sitename + " | #" + tag

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`Posts etiquetados con #${tag} en ${sitename}. Explora contenido relacionado.`} />
        <link rel="canonical" href={`${sitedomain}/tags/${tag}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={`Posts etiquetados con #${tag} en ${sitename}.`} />
        <meta property="og:url" content={`${sitedomain}/tags/${tag}`} />
        <meta property="og:site_name" content={sitename} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={`Posts etiquetados con #${tag} en ${sitename}.`} />
      </Head>

      <div className="page-hero">
        <h1>#{tag.toUpperCase()}</h1>
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
          />
        </Stack>
      )}
    </Box>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync("./blog")
  const tags = new Set()

  for (const file of files) {
    const fileContent = matter(
      fs.readFileSync(path.join("./blog", file), "utf8")
    )
    const frontmatter = fileContent.data

    if (frontmatter.tags && frontmatter.tags.length > 0) {
      frontmatter.tags.forEach((tag) => {
        if (tag) {
          const tagSlug = removeSpecialCharactersAndLowerCase(tag)
          tags.add(tagSlug)
        }
      })
    }
  }

  const paths = Array.from(tags).map((tagSlug) => ({
    params: { tag: tagSlug },
  }))

  return {
    paths,
    fallback: "blocking",
  }
}

export async function getStaticProps({ params: { tag } }) {
  const tagSlug = removeSpecialCharactersAndLowerCase(tag)
  const files = fs.readdirSync("./blog")
  const matchingFiles = []

  for (const file of files) {
    const fileContent = matter(
      fs.readFileSync(path.join("./blog", file), "utf8")
    )
    const frontmatter = fileContent.data
    const shortDescription = frontmatter["short-description"] || ""
    const isoDate = frontmatter.date
      ? new Date(frontmatter.date).toISOString()
      : ""

    if (frontmatter.tags) {
      const matchingTag = frontmatter.tags.find(
        (t) => removeSpecialCharactersAndLowerCase(t) === tagSlug
      )

      if (matchingTag) {
        const slug = file.slice(0, file.indexOf("."))
        matchingFiles.push({
          slug,
          title: frontmatter.title,
          categoria: frontmatter.categoria,
          shortDescription: shortDescription,
          featuredimage: frontmatter.featuredimage,
          date: isoDate,
        })
      }
    }
  }

  return {
    props: {
      matchingFiles,
      tag: tagSlug,
    },
  }
}

export default TagPage
