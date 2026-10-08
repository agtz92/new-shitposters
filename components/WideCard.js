import Image from "next/image"
import Link from "next/link"
import Kicker from "./Kicker"

const WideCard = ({ post }) => (
  <Link href={`/${post.slug}`} className="wide-card">
    <div className="wide-card-media">
      {post.featuredimage ? (
        <Image src={post.featuredimage} alt="" fill sizes="(max-width: 899px) 100vw, 300px" />
      ) : null}
    </div>
    <div className="wide-card-body">
      <Kicker post={post} />
      <h3 className="wide-card-title">{post.title}</h3>
    </div>
  </Link>
)

export default WideCard
