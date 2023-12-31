import React from "react"
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material"
import Image from "next/image"

const CoverCard = ({ post, h1, secondary }) => {
  return (
    <Card
      sx={{
        position: "relative",
        "&:hover": {
          "& img": {
            transform: "scale(1.2)",
            transition: "transform 0.2s ease",
          },
        },
      }}
      className={!secondary ? "cover" : "cover-secondary"}
    >
      {/* Black overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      ></Box>

      {/* Image */}
      <Image
        component="img"
        alt="Image"
        src={post.featuredimage}
        placeholder="blur"
        style={{objectFit:"cover", objectPosition:"right bottom"}}
        width= "800"
        height= "500"
        blurDataURL="../public/assets/blur.jpg"
        sx={{
          transition: "transform 0.2s ease",
          zIndex: -1,
        }}
      />

      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          padding: 2,
          color: "#fff",
          zIndex: 2,
        }}
      >
        {/* Card Content */}
        <h1 style={{fontSize: h1 ? h1 : "1.5em"}}>{post.title}</h1>
        <Chip
          label={post.categoria}
        />
      </CardContent>
    </Card>
  )
}

export default CoverCard
