import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { sitedomain } from "../components/siteData"

function generateSiteMap(posts, categories, tags) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${sitedomain}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${sitedomain}/privacidad</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  ${posts
    .map(
      (post) => `  <url>
    <loc>${sitedomain}/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("\n")}
  ${categories
    .map(
      (cat) => `  <url>
    <loc>${sitedomain}/categories/${cat}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("\n")}
  ${tags
    .map(
      (tag) => `  <url>
    <loc>${sitedomain}/tags/${tag}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`
    )
    .join("\n")}
</urlset>`
}

function removeSpecialCharactersAndLowerCase(str) {
  return str.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()
}

export async function getServerSideProps({ res }) {
  const files = fs.readdirSync("./blog").filter((f) => !f.startsWith("."))
  const categoriesSet = new Set()
  const tagsSet = new Set()

  const posts = files.map((file) => {
    const fileContent = matter(fs.readFileSync(path.join("./blog", file), "utf8"))
    const frontmatter = fileContent.data
    const slug = file.slice(0, file.indexOf("."))
    const date = frontmatter.date
      ? new Date(frontmatter.date).toISOString().split("T")[0]
      : ""

    if (frontmatter.categoria) {
      categoriesSet.add(frontmatter.categoria.toLowerCase())
    }
    if (frontmatter.tags) {
      frontmatter.tags.forEach((tag) => {
        if (tag) tagsSet.add(removeSpecialCharactersAndLowerCase(tag))
      })
    }

    return { slug, date }
  })

  const sitemap = generateSiteMap(
    posts,
    Array.from(categoriesSet),
    Array.from(tagsSet)
  )

  res.setHeader("Content-Type", "text/xml")
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function SiteMap() {
  return null
}
