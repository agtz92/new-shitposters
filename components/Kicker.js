// Small uppercase line above a card title: "Gaming · 4 min".
const Kicker = ({ post }) => (
  <span className="kicker">
    {post.categoria}
    {post.readingTime ? ` · ${post.readingTime} min` : null}
  </span>
)

export default Kicker
