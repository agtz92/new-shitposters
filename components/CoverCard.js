import Image from "next/image"
import Link from "next/link"

const CoverCard = ({ post, secondary, priority }) => {
  return (
    <Link
      href={`/${post.slug}`}
      className={`cover-card ${secondary ? "cover-secondary" : "cover"}`}
    >
      {post.featuredimage ? (
        <Image
          alt=""
          src={post.featuredimage}
          fill
          priority={priority}
          sizes={
            secondary
              ? "(max-width: 899px) 100vw, 300px"
              : "(max-width: 899px) 100vw, 600px"
          }
          className="cover-img"
        />
      ) : null}
      <div className="cover-overlay" />
      <div className="cover-body">
        <span className="chip">{post.categoria}</span>
        <h3 className="cover-title">{post.title}</h3>
      </div>
    </Link>
  )
}

export default CoverCard
