import PostListPage from "@/components/PostListPage"
import { getTagProps } from "@/lib/posts"

export default PostListPage

export async function getStaticProps({ params }) {
  const page = Number(params.page)
  // Page 1 lives at /tags/[tag]; don't publish a duplicate.
  if (page === 1) {
    return { redirect: { destination: `/tags/${params.tag}`, permanent: true } }
  }
  return getTagProps(params.tag, page)
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" }
}
