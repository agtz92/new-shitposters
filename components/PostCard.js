import Image from "next/image"
import Link from "next/link"
import Kicker from "./Kicker"

// Vertical card on desktop; becomes a thumbnail row on phones (see .post-card in CSS).
const PostCard = ({ post, priority, headingLevel = 3 }) => {
  const Heading = `h${headingLevel}`
  return (
    <Link href={`/${post.slug}`} className="post-card">
      <div className="post-card-media">
        {post.featuredimage ? (
          <Image
            src={post.featuredimage}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 599px) 120px, (max-width: 899px) 50vw, 300px"
          />
        ) : null}
      </div>
      <div className="post-card-body">
        <Kicker post={post} />
        <Heading className="post-card-title">{post.title}</Heading>
      </div>
    </Link>
  )
}

export default PostCard
