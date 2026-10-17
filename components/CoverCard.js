import React from "react"
import Image from "next/image"

const CoverCard = ({ post, h1, secondary, priority }) => {
  return (
    <div className={`cover-card ${!secondary ? "cover" : "cover-secondary"}`}>
      <div className="cover-card-overlay" />

      <Image
        alt={post.title}
        src={post.featuredimage}
        style={{ objectFit: "cover", objectPosition: "center" }}
        fill
        sizes={secondary ? "(max-width: 768px) 100vw, 25vw" : "(max-width: 768px) 100vw, 50vw"}
        priority={priority}
      />

      <div className="cover-card-body">
        <h2 style={{ fontSize: h1 ? h1 : "1.5em" }}>{post.title}</h2>
        <span className="chip">{post.categoria}</span>
      </div>
    </div>
  )
}

export default CoverCard
