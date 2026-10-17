import React, { useState, useEffect } from "react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import LargeCard from "@/components/LargeCard"
import Head from "next/head"
import { sitename, sitedomain } from "@/components/siteData"

function removeSpecialCharactersAndLowerCase(str) {
  return str.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()
}

function TagPage({ matchingFiles, tag }) {
  const sortedBlogs = matchingFiles?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  const itemsPerPage = 6
  const [currentPage, setCurrentPage] = useState(1)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const blogsToDisplay = sortedBlogs?.slice(startIndex, endIndex)
  const totalPages = Math.ceil(sortedBlogs.length / itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [tag])

  const title = sitename + " | #" + tag

  return (
    <div className="margins5">
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

      <h1 style={{ textAlign: "center", fontWeight: 600 }}>
        #{tag.toUpperCase()}
      </h1>

      <div className="grid grid-3">
        {blogsToDisplay?.map((file, index) => (
          <Link key={index} href={`/${file.slug}`}>
            <LargeCard post={file} />
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </div>
      )}
    </div>
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
          tags.add(removeSpecialCharactersAndLowerCase(tag))
        }
      })
    }
  }

  const paths = Array.from(tags).map((tagSlug) => ({
    params: { tag: tagSlug },
  }))

  return { paths, fallback: "blocking" }
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
          shortDescription,
          featuredimage: frontmatter.featuredimage,
          date: isoDate,
        })
      }
    }
  }

  return { props: { matchingFiles, tag: tagSlug } }
}

export default TagPage
