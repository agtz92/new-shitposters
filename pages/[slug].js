import fs from "fs"
import ReactMarkdown from "react-markdown"
import matter from "gray-matter"
import Image from "next/image"
import rehypeRaw from "rehype-raw"
import Link from "next/link"
import { sitename } from "../components/siteData"
import SEOBlog from "@/components/SEOBlog"

export default function Blog({ frontmatter, markdown }) {
  const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US")

  function cleanAndLowercaseString(inputString) {
    return inputString.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()
  }

  return (
    <div>
      <SEOBlog post={frontmatter} />
      <div className="blog-header margins5">
        <h1 style={{ fontSize: "3em", margin: 0 }}>{frontmatter.title}</h1>

        <div className="blog-chip-row">
          <Link href={`/categories/${frontmatter.categoria.toLowerCase()}`}>
            <span className="chip">{frontmatter.categoria}</span>
          </Link>
        </div>

        <span style={{ color: "#ddd", fontSize: "12px" }}>
          Updated: {formattedDate}
        </span>

        <div className="blog-spacer" />

        <div className="blog-image-center">
          <div className="postimage-wrapper">
            <Image
              className="postimg"
              src={frontmatter.featuredimage}
              alt={frontmatter.title}
              fill
            />
          </div>
        </div>

        <div className="blog-tags">
          {frontmatter.tags?.map((tag) => (
            <Link key={tag} href={`/tags/${cleanAndLowercaseString(tag)}`}>
              <span className="chip">{tag}</span>
            </Link>
          ))}
        </div>

        <div className="content" style={{ marginTop: 20 }}>
          {frontmatter.shortDescription}
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {frontmatter.mk1}
          </ReactMarkdown>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {frontmatter.mk2}
          </ReactMarkdown>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {frontmatter.mk3}
          </ReactMarkdown>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {frontmatter.mk4}
          </ReactMarkdown>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {frontmatter.mk5}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params: { slug } }) {
  try {
    const fileContent = matter(fs.readFileSync(`./blog/${slug}.md`, "utf8"))
    const frontmatter = fileContent.data
    const markdown = fileContent.content
    const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US")
    const shortDescription = frontmatter["short-description"]

    return {
      props: {
        frontmatter: {
          ...frontmatter,
          date: formattedDate,
          shortDescription: shortDescription,
          slug: slug,
        },
        markdown,
      },
    }
  } catch (error) {
    console.error("Error reading file or parsing frontmatter:", error)
    return { notFound: true }
  }
}

export async function getStaticPaths() {
  const filesInProjects = fs.readdirSync("./blog")
  const paths = filesInProjects
    .filter((file) => !file.startsWith("."))
    .map((file) => {
      const filename = file.slice(0, file.indexOf("."))
      return { params: { slug: filename } }
    })

  return { paths, fallback: "blocking" }
}
