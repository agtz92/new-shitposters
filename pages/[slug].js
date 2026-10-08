import Image from "next/image"
import Link from "next/link"
import SEOBlog from "@/components/SEOBlog"
import { getPostSlugs, readPost, resolveImage, formatDate, slugifyTag } from "@/lib/posts"

export default function Blog({ post }) {
  return (
    <main className="post">
      <SEOBlog post={post} />
      <h1 className="post-title">{post.title}</h1>
      <div className="post-meta">
        {post.categoria ? (
          <Link className="chip" href={`/categories/${post.categoria.toLowerCase()}`}>
            {post.categoria}
          </Link>
        ) : null}
        {post.date ? (
          <time className="post-date" dateTime={post.date}>
            Actualizado: {post.displayDate}
          </time>
        ) : null}
      </div>

      {post.featuredimage ? (
        <div className="postimage-wrapper">
          <Image
            className="postimg"
            src={post.featuredimage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>
      ) : null}

      {post.tags.length ? (
        <ul className="post-tags">
          {post.tags.map((tag) => (
            <li key={tag.slug}>
              <Link className="chip" href={`/tags/${tag.slug}`}>
                {tag.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="content">
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </main>
  )
}

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

// Markdown is rendered to HTML at build time so react-markdown never ships to the browser.
async function renderMarkdown(sections) {
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
  return normalizeHeadings(html)
}

export async function getStaticProps({ params: { slug } }) {
  let data
  try {
    data = readPost(slug)
  } catch (error) {
    return { notFound: true }
  }

  const date = data.date ? new Date(data.date).toISOString() : ""
  const html = await renderMarkdown([data["short-description"], data.mk1, data.mk2, data.mk3, data.mk4, data.mk5])

  return {
    props: {
      post: {
        slug,
        title: String(data.title || "").trim(),
        date,
        displayDate: formatDate(date),
        categoria: data.categoria || "",
        featuredimage: resolveImage(data.featuredimage),
        shortDescription: data["short-description"] || "",
        tags: (data.tags || [])
          .filter(Boolean)
          .map((tag) => ({ label: String(tag), slug: slugifyTag(tag) })),
        html,
      },
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: getPostSlugs().map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  }
}
