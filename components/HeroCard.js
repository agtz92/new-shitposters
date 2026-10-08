import Image from "next/image"
import Link from "next/link"

const HeroCard = ({ post }) => (
  <Link href={`/${post.slug}`} className="hero-card">
    {post.featuredimage ? (
      <Image
        src={post.featuredimage}
        alt=""
        fill
        priority
        sizes="(max-width: 899px) 100vw, 760px"
        className="hero-img"
      />
    ) : null}
    <div className="hero-shade" />
    <div className="hero-body">
      <div className="hero-meta">
        <span className="badge">{post.categoria}</span>
        <span>
          {post.displayDate}
          {post.readingTime ? ` · ${post.readingTime} min` : null}
        </span>
      </div>
      <h2 className="hero-title">{post.title}</h2>
      {post.excerpt ? <p className="hero-excerpt">{post.excerpt}</p> : null}
    </div>
  </Link>
)

export default HeroCard
