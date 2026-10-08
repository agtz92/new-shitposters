// Server-only helpers to read blog posts. Results are cached per build worker
// so listing pages don't re-parse ~2.4k markdown files for every route.
import fs from "fs"
import path from "path"
import crypto from "crypto"
import matter from "gray-matter"
import { excerpt } from "./text"

const BLOG_DIR = path.join(process.cwd(), "blog")
const CATEGORIES_DIR = path.join(process.cwd(), "categories")

export const PAGE_SIZE = 12

let cache = null

export function slugifyTag(tag) {
  return String(tag).replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()
}

export function formatDate(date) {
  if (!date) return ""
  return new Date(date).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
}

// Inline base64 images are extracted to /public/assets/inline by
// scripts/extract-inline-images.js; both sides derive the same file name.
export function inlineImagePath(dataUri) {
  const match = /^data:image\/([a-z+]+);base64,/i.exec(dataUri)
  const ext = match ? match[1].replace("jpeg", "jpg").replace("svg+xml", "svg") : "jpg"
  const hash = crypto.createHash("sha1").update(dataUri).digest("hex").slice(0, 16)
  return `/assets/inline/${hash}.${ext}`
}

export function resolveImage(src) {
  if (!src || typeof src !== "string") return ""
  if (src.startsWith("data:")) return inlineImagePath(src)
  if (src.startsWith("http") || src.startsWith("/")) return src
  return `/assets/${src}`
}

// Minutes to read the post body (~200 words per minute), at least 1.
export function readingTime(data) {
  const text = [data["short-description"], data.mk1, data.mk2, data.mk3, data.mk4, data.mk5]
    .filter(Boolean)
    .join(" ")
    .replace(/<[^>]+>|!\[[^\]]*\]\([^)]*\)/g, " ")
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function getPostSlugs() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("."))
    .map((file) => file.slice(0, file.indexOf(".")))
}

export function readPost(slug) {
  return matter(fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8")).data
}

// Lightweight card data for every post, newest first. Never includes the
// mk1..mk5 bodies so listing pages stay small.
export function getAllPosts() {
  if (cache) return cache
  cache = getPostSlugs()
    .map((slug) => {
      const data = readPost(slug)
      const date = data.date ? new Date(data.date).toISOString() : ""
      return {
        slug,
        title: String(data.title || "").trim(),
        date,
        displayDate: formatDate(date),
        categoria: data.categoria || "",
        tags: (data.tags || []).filter(Boolean).map(slugifyTag),
        featuredimage: resolveImage(data.featuredimage),
        excerpt: excerpt(data["short-description"]),
        readingTime: readingTime(data),
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  return cache
}

export function toCard({ tags, ...card }) {
  return card
}

export function getCategories() {
  const categories = new Set()
  for (const file of fs.readdirSync(CATEGORIES_DIR)) {
    if (file.startsWith(".")) continue
    const { data } = matter(fs.readFileSync(path.join(CATEGORIES_DIR, file), "utf8"))
    if (data.categoria) categories.add(data.categoria.toLowerCase())
  }
  return Array.from(categories)
}

// Category tiles for navigation: label, cover image and post count.
export function getCategoryTiles() {
  const tiles = []
  for (const file of fs.readdirSync(CATEGORIES_DIR)) {
    if (file.startsWith(".")) continue
    const { data } = matter(fs.readFileSync(path.join(CATEGORIES_DIR, file), "utf8"))
    if (!data.categoria) continue
    const slug = data.categoria.toLowerCase()
    tiles.push({
      slug,
      label: data.categoria,
      image: resolveImage(data.categoryimage),
      count: postsByCategory(slug).length,
    })
  }
  return tiles.filter((tile) => tile.count > 0).sort((a, b) => b.count - a.count)
}

// Newest posts from the same category, falling back to the latest overall.
export function relatedPosts(slug, categoria, count = 3) {
  const others = getAllPosts().filter((post) => post.slug !== slug)
  const sameCategory = categoria
    ? others.filter((post) => post.categoria.toLowerCase() === categoria.toLowerCase())
    : []
  const picked = sameCategory.slice(0, count)
  for (const post of others) {
    if (picked.length >= count) break
    if (!picked.includes(post)) picked.push(post)
  }
  return picked.map(toCard)
}

export function getTags() {
  const tags = new Set()
  getAllPosts().forEach((post) => post.tags.forEach((tag) => tags.add(tag)))
  return Array.from(tags)
}

export function postsByCategory(category) {
  const slug = category.toLowerCase()
  return getAllPosts().filter((post) => post.categoria.toLowerCase() === slug)
}

export function postsByTag(tag) {
  const slug = slugifyTag(tag)
  return getAllPosts().filter((post) => post.tags.includes(slug))
}

// Returns props for page `page` (1-based) of a listing, or null if out of range.
export function paginate(posts, page) {
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE))
  if (!Number.isInteger(page) || page < 1 || page > totalPages) return null
  const start = (page - 1) * PAGE_SIZE
  return {
    posts: posts.slice(start, start + PAGE_SIZE).map(toCard),
    page,
    totalPages,
    total: posts.length,
  }
}

export function getCategoryProps(category, page) {
  const slug = String(category).toLowerCase()
  const posts = postsByCategory(slug)
  const listing = posts.length ? paginate(posts, page) : null
  if (!listing) return { notFound: true }
  return { props: { kind: "category", name: slug, label: posts[0].categoria, ...listing } }
}

export function getTagProps(tag, page) {
  const slug = slugifyTag(tag)
  const posts = postsByTag(slug)
  const listing = posts.length ? paginate(posts, page) : null
  if (!listing) return { notFound: true }
  return { props: { kind: "tag", name: slug, ...listing } }
}
