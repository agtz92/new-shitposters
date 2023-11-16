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
        // Ensure the last word isn't cut off
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
    // Use a regular expression to replace all double quotes with an empty string
    return inputString.replace(/"/g, '');
  }
  function addProductJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id":\"${sitename}\"
        },
        "headline": \"${removeDoubleQuotes(post.title)}\",
        "description": \"${generateExcerpt(post.shortDescription, 250)}\",
        "image": "${sitedomain}/assets/${post.featuredimage}",  
        "author": {
          "@type": "Organization",
          "name": "${sitedomain}"
        },  
        "publisher": {
          "@type": "Organization",
          "name": "${sitename}",
          "logo": {
            "@type": "ImageObject",
            "url": \"${sitedomain}/assets/logo.png\"
          }
        },
        "datePublished": \"${post.date}\",
        "dateModified": \"${post.date}\"
      }
  `,
    }
  }
  const title = post.title + " | " + sitename
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>
        {removeDoubleQuotes(title)}
      </title>
      <meta
        name="description"
        content={generateExcerpt(removeDoubleQuotes(post.shortDescription), 250)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={addProductJsonLd()}
        key="product-jsonld"
      />
    </Head>
  )
}

export default SEOBlog
