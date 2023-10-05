import React from "react"
import {  Card, CardContent, Chip } from "@mui/material"

const TextCard = ({ post, height }) => {
  return (
    <Card>
      <CardContent>
        <h1 style={{fontSize:'1em', fontWeight:'600'}}>{post.title}</h1>
        <Chip
          label={post.categoria}
        />
      </CardContent>
    </Card>
  )
}

export default TextCard
