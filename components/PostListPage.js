import Head from "next/head"
import LargeCard from "./LargeCard"
import Pagination from "./Pagination"
import { sitename, sitedomain } from "./siteData"

// Shared layout for category and tag listings (props from getCategoryProps/getTagProps).
const PostListPage = ({ kind, name, posts, page, totalPages, total }) => {
  const isTag = kind === "tag"
  const label = isTag ? `#${name}` : name
  const heading = label.toUpperCase()
  const basePath = isTag ? `/tags/${name}` : `/categories/${name}`
  const description = isTag
    ? `Posts etiquetados con #${name} en ${sitename}. Explora contenido relacionado.`
    : `Artículos sobre ${name} en ${sitename}. Encuentra los mejores posts y noticias.`
  const canonical = `${sitedomain}${basePath}${page > 1 ? `/pagina/${page}` : ""}`
  const title = `${sitename} | ${label}${page > 1 ? ` - Página ${page}` : ""}`

  return (
    <main className="container">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content={sitename} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>

      <div className="page-hero">
        <h1>{heading}</h1>
        <p className="subtitle">{total} artículos</p>
      </div>

      <div className="card-grid card-grid-3">
        {posts.map((post, index) => (
          <LargeCard key={post.slug} post={post} priority={index === 0} headingLevel={2} />
        ))}
      </div>

      <Pagination basePath={basePath} page={page} totalPages={totalPages} />
    </main>
  )
}

export default PostListPage
