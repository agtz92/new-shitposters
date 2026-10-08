import Link from "next/link"

// Numbered list (01, 02…) — the "10 datos" signature.
const RankList = ({ title, posts }) => (
  <section className="rank-box" aria-labelledby="rank-title">
    <h2 id="rank-title" className="box-title">
      {title}
    </h2>
    <ol className="rank-list">
      {posts.map((post, index) => (
        <li key={post.slug}>
          <Link href={`/${post.slug}`} className="rank-item">
            <span className="rank-num" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="rank-text">
              <span className="rank-title">{post.title}</span>
              <span className="rank-cat">{post.categoria}</span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  </section>
)

export default RankList
