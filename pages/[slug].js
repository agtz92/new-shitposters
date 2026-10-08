import Image from "next/image"
import Link from "next/link"
import SEOBlog from "@/components/SEOBlog"
import PostCard from "@/components/PostCard"
import SectionHeader from "@/components/SectionHeader"
import ShareButton from "@/components/ShareButton"
import { sitedomain } from "@/components/siteData"
import { excerpt } from "@/lib/text"
import {
  getPostSlugs,
  readPost,
  resolveImage,
  formatDate,
  slugifyTag,
  readingTime,
  relatedPosts,
} from "@/lib/posts"
import { renderPostBody } from "@/lib/markdown"

export default function Blog({ post, related }) {
  const categorySlug = post.categoria.toLowerCase()

  return (
    <main className="article">
      <SEOBlog post={post} />
      <div className="read-progress" aria-hidden="true" />

      <div className="container">
        <nav className="breadcrumb" aria-label="Ruta">
          <Link href="/">Inicio</Link>
          {post.categoria ? (
            <>
              <span aria-hidden="true">/</span>
              <Link href={`/categories/${categorySlug}`}>{post.categoria}</Link>
            </>
          ) : null}
        </nav>

        <header className="article-head">
          <h1 className="article-title">{post.title}</h1>
          {post.lead ? <p className="article-lead">{post.lead}</p> : null}
          <div className="article-meta">
            {post.categoria ? (
              <Link className="chip" href={`/categories/${categorySlug}`}>
                {post.categoria}
              </Link>
            ) : null}
            {post.date ? <time dateTime={post.date}>{post.displayDate}</time> : null}
            <span>{post.readingTime} min de lectura</span>
            <ShareButton title={post.title} url={`${sitedomain}/${post.slug}`} />
          </div>
        </header>

        {post.featuredimage ? (
          <div className="article-image">
            <Image src={post.featuredimage} alt={post.title} fill priority sizes="(max-width: 1240px) 100vw, 1180px" />
          </div>
        ) : null}

        <div className={`article-layout${post.toc.length ? "" : " no-aside"}`}>
          <div className="article-main">
            <div className="content" dangerouslySetInnerHTML={{ __html: post.html }} />

            {post.tags.length ? (
              <ul className="article-tags" aria-label="Etiquetas">
                {post.tags.map((tag) => (
                  <li key={tag.slug}>
                    <Link className="chip" href={`/tags/${tag.slug}`}>
                      {tag.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {post.toc.length ? (
            <aside className="article-aside">
              <nav className="toc" aria-labelledby="toc-title">
                <h2 id="toc-title" className="box-title">
                  {post.toc.length === 10 ? "Los 10 datos" : "En este artículo"}
                </h2>
                <ol>
                  {post.toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`}>
                        <span className="toc-num">{item.num}</span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          ) : null}
        </div>

        {related.length ? (
          <section className="related">
            <SectionHeader title="Sigue leyendo" />
            <div className="card-grid card-grid-3">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  )
}

export async function getStaticProps({ params: { slug } }) {
  let data
  try {
    data = readPost(slug)
  } catch (error) {
    return { notFound: true }
  }

  const date = data.date ? new Date(data.date).toISOString() : ""
  const shortDescription = data["short-description"] || ""
  const lead = excerpt(shortDescription, 1600)
  const { html, toc } = await renderPostBody([data.mk1, data.mk2, data.mk3, data.mk4, data.mk5], { lead })
  const categoria = data.categoria || ""

  return {
    props: {
      post: {
        slug,
        title: String(data.title || "").trim(),
        date,
        displayDate: formatDate(date),
        categoria,
        featuredimage: resolveImage(data.featuredimage),
        shortDescription,
        lead,
        readingTime: readingTime(data),
        tags: (data.tags || [])
          .filter(Boolean)
          .map((tag) => ({ label: String(tag), slug: slugifyTag(tag) })),
        html,
        toc,
      },
      related: relatedPosts(slug, categoria),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: getPostSlugs().map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  }
}
