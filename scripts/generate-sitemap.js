// Prebuild step: writes /public/sitemap.xml from blog frontmatter.
// The sitemap used to be rendered per request (getServerSideProps), which
// parsed ~2.4k markdown files on every hit and returned 500 in production.
// Every new post arrives as a commit, which triggers a rebuild, so a static
// file stays up to date.
const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")

// Keep in sync with `sitedomain` in components/siteData.js.
const SITE = "https://www.10datos.com"
const BLOG_DIR = path.join(__dirname, "..", "blog")
const OUT_FILE = path.join(__dirname, "..", "public", "sitemap.xml")

// Same slug rule as slugifyTag() in lib/posts.js.
const slugifyTag = (tag) => String(tag).replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()

const escapeXml = (str) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")

const loc = (pathname) => escapeXml(SITE + encodeURI(pathname))

const url = (pathname, { lastmod, changefreq, priority }) =>
  [
    "  <url>",
    `    <loc>${loc(pathname)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n")

const categories = new Set()
const tags = new Set()
const posts = []

for (const file of fs.readdirSync(BLOG_DIR)) {
  if (!file.endsWith(".md") || file.startsWith(".")) continue
  const data = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8")).data
  const slug = file.slice(0, file.indexOf("."))
  const time = data.date ? new Date(data.date) : null
  const lastmod = time && !isNaN(time) ? time.toISOString().split("T")[0] : ""

  if (data.categoria) categories.add(String(data.categoria).toLowerCase())
  if (Array.isArray(data.tags)) {
    data.tags.forEach((tag) => {
      const slugged = tag ? slugifyTag(tag) : ""
      if (slugged) tags.add(slugged)
    })
  }
  posts.push({ slug, lastmod })
}

const entries = [
  url("/", { changefreq: "daily", priority: "1.0" }),
  url("/privacidad", { changefreq: "yearly", priority: "0.3" }),
  ...posts.map((p) =>
    url(`/${p.slug}`, { lastmod: p.lastmod, changefreq: "monthly", priority: "0.8" })
  ),
  ...[...categories].map((c) =>
    url(`/categories/${c}`, { changefreq: "weekly", priority: "0.6" })
  ),
  ...[...tags].map((t) => url(`/tags/${t}`, { changefreq: "weekly", priority: "0.5" })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`

fs.writeFileSync(OUT_FILE, xml)
console.log(`sitemap.xml: ${entries.length} URLs`)
