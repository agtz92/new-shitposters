import Link from "next/link"

const TextCard = ({ post }) => {
  return (
    <Link href={`/${post.slug}`} className="text-card">
      <h3 className="text-card-title">{post.title}</h3>
      <span className="chip">{post.categoria}</span>
    </Link>
  )
}

export default TextCard
