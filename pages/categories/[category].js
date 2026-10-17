import React, { useState, useEffect } from "react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import Head from "next/head"
import LargeCard from "@/components/LargeCard"
import { sitename, sitedomain } from "@/components/siteData"

export default function CategoryPage({ matchingFiles, category }) {
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
  }, [category])

  const title = sitename + " | " + category

  return (
    <div className="margins5">
      <Head>
        <title>{title}</title>
        <meta name="description" content={`Articulos sobre ${category} en ${sitename}. Encuentra los mejores posts y noticias.`} />
        <link rel="canonical" href={`${sitedomain}/categories/${category.toLowerCase()}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={`Articulos sobre ${category} en ${sitename}.`} />
        <meta property="og:url" content={`${sitedomain}/categories/${category.toLowerCase()}`} />
        <meta property="og:site_name" content={sitename} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={`Articulos sobre ${category} en ${sitename}.`} />
      </Head>

      <div className="section-header margins">
        <h1 style={{ fontSize: "1.5em", fontWeight: 600, textAlign: "center", letterSpacing: "2px" }}>
          {category.toUpperCase()}
        </h1>
      </div>

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

    return { props: { matchingFiles, category } }
  } catch (error) {
    console.error("Error reading files or parsing frontmatter:", error)
    return { notFound: true }
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

  return { paths, fallback: "blocking" }
}
