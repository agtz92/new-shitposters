import Image from "next/image"
import Link from "next/link"

const LargeCard = ({ post, priority, headingLevel = 3 }) => {
  const Heading = `h${headingLevel}`

  return (
    <Link href={`/${post.slug}`} className="large-card">
      <div className="featuredimage-wrapper">
        {post.featuredimage ? (
          <Image
            className="featuredimg"
            src={post.featuredimage}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 599px) 100vw, (max-width: 899px) 50vw, 300px"
          />
        ) : null}
      </div>
      <div className="large-card-body">
        <span className="chip">{post.categoria}</span>
        <Heading className="large-card-title">{post.title}</Heading>
        <p className="large-card-excerpt">{post.excerpt}</p>
      </div>
    </Link>
  )
}

export default LargeCard
