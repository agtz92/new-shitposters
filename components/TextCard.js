import React from "react"
import {  Card, CardContent, Chip } from "@mui/material"

const TextCard = ({ post, height }) => {
  return (
    <Card>
      <CardContent>
        <h3 style={{fontSize:'1em', fontWeight:'600'}}>{post.title}</h3>
        <Chip
          label={post.categoria}
        />
      </CardContent>
    </Card>
  )
}

export default TextCard
