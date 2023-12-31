import React, { useState, useEffect } from "react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Box, Grid, Pagination, Stack } from "@mui/material"
import Link from "next/link"
import Head from "next/head"
import LargeCard from "@/components/LargeCard"
import { sitename } from "@/components/siteData"

export default function CategoryPage({ matchingFiles, category, isMobile }) {
  // Sort the blogs by date in descending order
  const sortedBlogs = matchingFiles?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
  //pagination
  const itemsPerPage = 6
  const [currentPage, setCurrentPage] = useState(1)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const blogsToDisplay = sortedBlogs?.slice(startIndex, endIndex)
  //reset current page if category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [category])

  const title = sitename + " | " + category

  return (
    <Box
      className='margins5'
    >
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          borderBottom: "1px solid #d80032",
          marginBottom: 5,
        }}
        className='margins'
      >
        <h3
          style={{
            fontSize: "1.5em",
            fontWeight: 600,
            textAlign: "center",
            letterSpacing: "2px",
          }}
        >
          {category.toUpperCase()}
        </h3>
      </Box>

      <Grid container spacing={2}>
        {blogsToDisplay?.map((file, index) => (
          <Grid key={index} item xs={12} md={4}>
            <Link href={`/${file.slug}`}>
              <LargeCard post={file} />
            </Link>
          </Grid>
        ))}
      </Grid>
      {/*Pagination*/}
      <Stack
        spacing={2}
        display={"flex"}
        flexDirection={"row"}
        alignContent={"space-evenly"}
        justifyContent={"space-evenly"}
        sx={{ marginTop: 5 }}
      >
        <Pagination
          count={Math.ceil(sortedBlogs.length / itemsPerPage)}
          size="large"
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
        />
      </Stack>
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
    // Check if the file is not hidden (doesn't start with a dot)
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
    fallback: "blocking", // Allow for custom handling of 404-like cases
  }
}
