import React, { useState, useEffect } from "react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import LargeCard from "@/components/LargeCard"
import { Box, Grid, Pagination, Stack } from "@mui/material"
import Head from "next/head"
import { sitename } from "@/components/siteData"

function removeSpecialCharactersAndLowerCase(str) {
  // Remove special characters and spaces and convert to lowercase
  return str.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()
}

function TagPage({ matchingFiles, tag, isMobile }) {
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
  //reset current page if tag changes
  useEffect(() => {
    setCurrentPage(1)
  }, [tag])

  // Get the slug without removing special characters
  const tagSlug = removeSpecialCharactersAndLowerCase(tag)
  console.log(sortedBlogs)

  return (
    <Box
      sx={{ marginLeft: !isMobile ? 20 : 5, marginRight: !isMobile ? 20 : 5 }}
    >
      <Head>
        <title>
          {sitename} | #{tag}
        </title>
      </Head>
      <h1 style={{ textAlign: "center", fontWeight: 600 }}>
        #{tag.toUpperCase()}
      </h1>

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
        // Check if the tag is not empty or null before adding it to the set
        if (tag) {
          const tagSlug = removeSpecialCharactersAndLowerCase(tag)
          tags.add(tagSlug)
        }
      })
    }
  }

  const paths = Array.from(tags).map((tagSlug) => ({
    params: { tag: tagSlug }, // Use the tagSlug as a string
  }))

  return {
    paths,
    fallback: "blocking",
  }
}

export async function getStaticProps({ params: { tag } }) {
  // Use the modified function to get the tag slug
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
      // Perform a case-insensitive search for the tag
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
          // ...
        })
      }
    }
  }

  return {
    props: {
      matchingFiles,
      tag: tagSlug, // Use the lowercase tag for display
    },
  }
}

export default TagPage
