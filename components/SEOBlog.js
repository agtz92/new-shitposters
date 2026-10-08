import Head from "next/head"
import { sitename, sitedomain } from "./siteData"
import { excerpt } from "@/lib/text"

const SEOBlog = ({ post }) => {
  const title = `${post.title} | ${sitename}`
  const description = excerpt(post.shortDescription, 160)
  const imageUrl = post.featuredimage?.startsWith("http")
    ? post.featuredimage
    : `${sitedomain}${post.featuredimage}`
  const canonicalUrl = `${sitedomain}/${post.slug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    headline: post.title,
    description,
    image: imageUrl,
    author: { "@type": "Organization", name: sitename },
    publisher: {
      "@type": "Organization",
      name: sitename,
      logo: { "@type": "ImageObject", url: `${sitedomain}/assets/logo.png` },
    },
    datePublished: post.date,
    dateModified: post.date,
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={sitename} />
      {post.date ? <meta property="article:published_time" content={post.date} /> : null}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <script
        type="application/ld+json"
        key="blogposting-jsonld"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </Head>
  )
}

export default SEOBlog
