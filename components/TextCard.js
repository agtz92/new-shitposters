import React from "react"
import { Box, Chip } from "@mui/material"

const TextCard = ({ post, height }) => {
  return (
    <Box
      sx={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-md)",
        padding: "16px 18px",
        cursor: "pointer",
        transition: "all var(--transition)",
        "&:hover": {
          borderColor: "var(--border-accent)",
          background: "var(--bg-card-hover)",
          transform: "translateX(4px)",
        },
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3
        style={{
          fontSize: "0.9rem",
          fontWeight: 600,
          lineHeight: 1.35,
          margin: 0,
          color: "var(--text-primary)",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {post.title}
      </h3>
      <Chip
        label={post.categoria}
        size="small"
        sx={{ alignSelf: "flex-start" }}
      />
    </Box>
  )
}

export default TextCard
