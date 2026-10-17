import React from "react"

const TextCard = ({ post }) => {
  return (
    <div className="text-card">
      <div className="card-content">
        <h3>{post.title}</h3>
        <span className="chip">{post.categoria}</span>
      </div>
    </div>
  )
}

export default TextCard
