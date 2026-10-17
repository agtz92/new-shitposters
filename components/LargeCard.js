import Image from "next/image"
import React from "react"

const LargeCard = ({ post }) => {
  function generateExcerpt(text, maxLength) {
    if (!text) return ""
    if (text.length <= maxLength) return text
    const trimmed = text.substring(0, maxLength)
    const lastSpace = trimmed.lastIndexOf(" ")
    return (lastSpace !== -1 ? trimmed.substring(0, lastSpace) : trimmed) + "..."
  }

  return (
    <div className="large-card">
      <div className="card-content">
        <h2>{post.title}</h2>
        <div className="featuredimage-wrapper">
          <Image
            className="featuredimg"
            src={post.featuredimage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            loading="lazy"
          />
        </div>
        <span className="chip" style={{ marginTop: 8 }}>{post.categoria}</span>
        <p className="card-excerpt">
          {generateExcerpt(post.shortDescription, 150)}
        </p>
      </div>
    </div>
  )
}

export default LargeCard
