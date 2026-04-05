import Head from "next/head"
import React from "react"
import { sitename, sitedomain } from "./siteData"

const SEOBlog = ({ post }) => {
  function generateExcerpt(text, maxLength) {
    if (text) {
      if (text.length <= maxLength) {
        return text
      } else {
        const trimmedText = text.substring(0, maxLength)
        const lastSpaceIndex = trimmedText.lastIndexOf(" ")
        if (lastSpaceIndex !== -1) {
          return (
            trimmedText.substring(0, lastSpaceIndex).replace(/[^\w\s.]/g, "") +
            "..."
          )
        } else {
          return trimmedText.replace(/[^\w\s.]/g, "") + "..."
        }
      }
    } else {
      return ""
    }
  }
  function removeDoubleQuotes(inputString) {
    return inputString.replace(/"/g, '')
  }

  const title = removeDoubleQuotes(post.title + " | " + sitename)
  const description = generateExcerpt(removeDoubleQuotes(post.shortDescription), 250)
  const imageUrl = post.featuredimage?.startsWith("http")
    ? post.featuredimage
    : `${sitedomain}/assets/${post.featuredimage}`
  const canonicalUrl = `${sitedomain}/${post.slug}`

  function addProductJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "${canonicalUrl}"
        },
        "headline": "${removeDoubleQuotes(post.title)}",
        "description": "${description}",
        "image": "${imageUrl}",
        "author": {
          "@type": "Organization",
          "name": "${sitename}"
        },
        "publisher": {
          "@type": "Organization",
          "name": "${sitename}",
          "logo": {
            "@type": "ImageObject",
            "url": "${sitedomain}/assets/logo.png"
          }
        },
        "datePublished": "${post.date}",
        "dateModified": "${post.date}"
      }
  `,
    }
  }

  return (
    <Head>
      <meta charSet="utf-8" />
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

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={addProductJsonLd()}
        key="product-jsonld"
      />
    </Head>
  )
}

export default SEOBlog
