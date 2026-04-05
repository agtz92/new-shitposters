import React from "react"
import { Box, Chip } from "@mui/material"
import Image from "next/image"

const CoverCard = ({ post, h1, secondary }) => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "var(--radius-lg)",
        cursor: "pointer",
        "&:hover img": {
          transform: "scale(1.05)",
        },
        "&:hover .cover-overlay": {
          background: "linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
        },
      }}
      className={!secondary ? "cover" : "cover-secondary"}
    >
      <Image
        alt={post.title}
        src={post.featuredimage}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Gradient overlay */}
      <Box
        className="cover-overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
          zIndex: 1,
          transition: "background 0.4s ease",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: secondary ? "16px 20px" : "24px 28px",
          zIndex: 2,
        }}
      >
        <Chip
          label={post.categoria}
          size="small"
          sx={{ marginBottom: "10px" }}
        />
        <h2
          style={{
            fontSize: h1 ? h1 : secondary ? "1.1rem" : "1.6rem",
            fontWeight: 700,
            lineHeight: 1.25,
            color: "#fff",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {post.title}
        </h2>
      </Box>
    </Box>
  )
}

export default CoverCard
