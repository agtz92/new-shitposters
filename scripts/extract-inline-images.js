// Prebuild step: writes base64 `featuredimage` values from blog frontmatter to
// /public/assets/inline so pages reference a cacheable file instead of
// embedding the image in every HTML/JSON payload. File names must match
// inlineImagePath() in lib/posts.js.
const fs = require("fs")
const path = require("path")
const crypto = require("crypto")
const matter = require("gray-matter")

const BLOG_DIR = path.join(__dirname, "..", "blog")
const OUT_DIR = path.join(__dirname, "..", "public", "assets", "inline")

fs.mkdirSync(OUT_DIR, { recursive: true })

let written = 0
for (const file of fs.readdirSync(BLOG_DIR)) {
  if (!file.endsWith(".md")) continue
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8")
  if (!raw.includes("featuredimage: data:")) continue
  const src = matter(raw).data.featuredimage
  const match = /^data:image\/([a-z+]+);base64,(.*)$/is.exec(src || "")
  if (!match) continue
  const ext = match[1].replace("jpeg", "jpg").replace("svg+xml", "svg")
  const hash = crypto.createHash("sha1").update(src).digest("hex").slice(0, 16)
  const target = path.join(OUT_DIR, `${hash}.${ext}`)
  if (!fs.existsSync(target)) {
    fs.writeFileSync(target, Buffer.from(match[2], "base64"))
    written++
  }
}
console.log(`extract-inline-images: ${written} new file(s) in public/assets/inline`)
