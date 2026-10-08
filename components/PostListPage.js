import Head from "next/head"
import PostCard from "./PostCard"
import Pagination from "./Pagination"
import { sitename, sitedomain } from "./siteData"
import { navCategories } from "./categories"

// Shared layout for category and tag listings (props from getCategoryProps/getTagProps).
const PostListPage = ({ kind, name, label: categoryLabel, posts, page, totalPages, total }) => {
  const isTag = kind === "tag"
  const navLabel = navCategories.find(({ href }) => href === `/categories/${name}`)?.label
  const label = isTag ? `#${name}` : navLabel || categoryLabel || name
  const basePath = isTag ? `/tags/${name}` : `/categories/${name}`
  const description = isTag
    ? `Posts etiquetados con #${name} en ${sitename}. Explora contenido relacionado.`
    : `Artículos sobre ${label} en ${sitename}. Encuentra los mejores posts y noticias.`
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

      <div className="list-hero">
        <p className="list-eyebrow">{isTag ? "Etiqueta" : "Categoría"}</p>
        <h1 className="list-title">{label}</h1>
        <p className="list-count">
          {total.toLocaleString("es-MX")} artículos
          {page > 1 ? ` · página ${page} de ${totalPages}` : ""}
        </p>
      </div>

      <div className="card-grid card-grid-3">
        {posts.map((post, index) => (
          <PostCard key={post.slug} post={post} priority={index === 0} headingLevel={2} />
        ))}
      </div>

      <Pagination basePath={basePath} page={page} totalPages={totalPages} />
    </main>
  )
}

export default PostListPage
