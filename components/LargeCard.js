import { Card, CardContent, Chip } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const LargeCard = ({ post, height }) => {
  function generateExcerpt(text, maxLength) {
    if (text) {
      if (text.length <= maxLength) {
        return text
      } else {
        const trimmedText = text.substring(0, maxLength)
        // Ensure the last word isn't cut off
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
    <Card
      sx={{
        background: "#fff",
        color: "#000",
        minHeight: { height },
        maxHeight: { height },
        overflow: "hidden",
      }}
    >
      <CardContent>
        <h1 style={{ height: "6em", fontSize: "1.2em", fontWeight: "600" }}>
          {post.title}
        </h1>
        <div className="featuredimage-wrapper ">
          <Image
            className="featuredimg"
            src={post.featuredimage}
            alt={post.title}
            fill
          />
        </div>
        <Chip sx={{ marginTop: 1 }} label={post.categoria} />

        <p style={{ fontWeight: 300, color: "#ddd" }}>
          {generateExcerpt(post.shortDescription, 150)}
        </p>
      </CardContent>
    </Card>
  )
}

export default LargeCard
