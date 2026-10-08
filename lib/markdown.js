// Server-only: renders post markdown to HTML at build time and decorates the
// numbered "facts" (### 1. / #### **2. Título** / ### 3.) so the article page
// can style them and list them in its table of contents.

import { excerpt } from "./text"

const stripTags = (html) => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()

const escapeHtml = (text) =>
  text.replace(/&(?![#a-z0-9]+;)/gi, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

// Shifts content headings so the highest one is an <h2> (the post title is the only <h1>).
function normalizeHeadings(html) {
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]))
  if (!levels.length) return html
  const shift = 2 - Math.min(...levels)
  if (!shift) return html
  return html.replace(/<(\/?)h([1-6])(?=[\s>])/g, (_, close, level) => {
    return `<${close}h${Math.min(6, Math.max(2, Number(level) + shift))}`
  })
}

const FACT = /^(\d{1,2})\s*[.):-]?\s*(.*)$/s

function decorateFacts(html) {
  const toc = []
  const used = new Set()
  let pending = null // fact whose heading had only a number, waiting for a label

  const out = html.replace(/<h([2-6])([^>]*)>([\s\S]*?)<\/h\1>/g, (match, level, attrs, inner) => {
    const text = stripTags(inner)
    const fact = FACT.exec(text)
    if (!fact || Number(fact[1]) > 30) {
      if (pending && text) {
        pending.label = text
        pending = null
      }
      return match
    }

    const num = Number(fact[1])
    let id = `dato-${num}`
    for (let i = 2; used.has(id); i++) id = `dato-${num}-${i}`
    used.add(id)

    const title = fact[2].trim()
    const entry = { id, num: String(num).padStart(2, "0"), label: title }
    toc.push(entry)
    pending = title ? null : entry

    return (
      `<h${level} id="${id}" class="fact"><span class="fact-num">${entry.num}</span>` +
      (title ? `<span class="fact-title">${escapeHtml(title)}</span>` : "") +
      `</h${level}>`
    )
  })

  // Number-only headings with no subtitle: label them with the start of their first paragraph.
  toc.forEach((entry, index) => {
    if (entry.label) return
    const start = out.indexOf(`id="${entry.id}"`)
    const next = toc[index + 1] ? out.indexOf(`id="${toc[index + 1].id}"`) : out.length
    const section = out.slice(start, next)
    const paragraph = [...section.matchAll(/<p>([\s\S]*?)<\/p>/g)]
      .map((m) => stripTags(m[1]))
      .find(Boolean)
    entry.label = paragraph ? excerpt(paragraph, 48) : `Dato ${Number(entry.num)}`
  })
  return { html: out, toc: toc.length >= 3 ? toc : [] }
}

// Same widths as images.deviceSizes in next.config.js (the optimizer rejects others).
const CONTENT_WIDTHS = [640, 828, 1080]

function optimizedUrl(src, width) {
  if (process.env.NETLIFY) {
    return `/.netlify/images?${new URLSearchParams({ url: src, w: String(width), q: "70" })}`
  }
  return `/_next/image?${new URLSearchParams({ url: src, w: String(width), q: "70" })}`
}

// Routes body images through the image CDN (resized, AVIF/WebP) like next/image does.
function optimizeImages(html) {
  return html.replace(/<img\b([^>]*?)\ssrc="([^"]+)"([^>]*)>/g, (match, before, src, after) => {
    const decoded = src.replace(/&amp;/g, "&")
    if (!/^(https?:\/\/|\/(?!\/))/.test(decoded) || /\.svg(\?|$)/i.test(decoded)) return match
    const srcset = CONTENT_WIDTHS.map((w) => `${optimizedUrl(decoded, w)} ${w}w`).join(", ").replace(/&/g, "&amp;")
    const fallback = optimizedUrl(decoded, 828).replace(/&/g, "&amp;")
    return `<img${before} src="${fallback}" srcset="${srcset}" sizes="(max-width: 899px) 100vw, 740px"${after}>`
  })
}

// Drops the first paragraph when it repeats the lead shown under the title.
function dropRepeatedLead(html, lead) {
  if (!lead) return html
  const key = lead.slice(0, 80).toLowerCase()
  const first = /<p>([\s\S]*?)<\/p>/.exec(html)
  if (!first || !stripTags(first[1]).toLowerCase().startsWith(key)) return html
  return html.slice(0, first.index) + html.slice(first.index + first[0].length)
}

export async function renderPostBody(sections, { lead } = {}) {
  const { createElement } = await import("react")
  const { renderToStaticMarkup } = await import("react-dom/server")
  const ReactMarkdown = (await import("react-markdown")).default
  const rehypeRaw = (await import("rehype-raw")).default

  const html = sections
    .filter(Boolean)
    .map((md) =>
      renderToStaticMarkup(createElement(ReactMarkdown, { rehypePlugins: [rehypeRaw] }, md))
    )
    .join("\n")
    .replace(/<img(?![^>]*\sloading=)/g, '<img loading="lazy" decoding="async"')
    .replace(/<iframe(?![^>]*\sloading=)/g, '<iframe loading="lazy"')

  return decorateFacts(normalizeHeadings(optimizeImages(dropRepeatedLead(html, lead))))
}
