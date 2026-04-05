import { Box, Chip } from "@mui/material"
import Image from "next/image"
import React from "react"

const LargeCard = ({ post, height }) => {
  function generateExcerpt(text, maxLength) {
    if (text) {
      if (text.length <= maxLength) {
        return text
      } else {
        const trimmedText = text.substring(0, maxLength)
        const lastSpaceIndex = trimmedText.lastIndexOf(" ")
        if (lastSpaceIndex !== -1) {
          return trimmedText.substring(0, lastSpaceIndex) + "..."
        } else {
          return trimmedText + "..."
        }
      }
    } else {
      return ""
    }
  }

  return (
    <Box
      sx={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all var(--transition)",
        "&:hover": {
          borderColor: "var(--border-accent)",
          transform: "translateY(-4px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 30px var(--accent-glow)",
        },
        "&:hover img": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <div className="featuredimage-wrapper">
          <Image
            className="featuredimg"
            src={post.featuredimage}
            alt={post.title}
            fill
            placeholder="blur"
            blurDataURL="../public/assets/blur.jpg"
          />
        </div>
      </Box>
      <Box sx={{ padding: "20px" }}>
        <Chip label={post.categoria} size="small" sx={{ marginBottom: "12px" }} />
        <h2
          style={{
            fontSize: "1.05rem",
            fontWeight: 600,
            lineHeight: 1.35,
            margin: "0 0 10px",
            color: "var(--text-primary)",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "4.2em",
          }}
        >
          {post.title}
        </h2>
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {generateExcerpt(post.shortDescription, 120)}
        </p>
      </Box>
    </Box>
  )
}

export default LargeCard
