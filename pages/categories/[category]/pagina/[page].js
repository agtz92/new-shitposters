import PostListPage from "@/components/PostListPage"
import { getCategoryProps } from "@/lib/posts"

export default PostListPage

export async function getStaticProps({ params }) {
  const page = Number(params.page)
  // Page 1 lives at /categories/[category]; don't publish a duplicate.
  if (page === 1) {
    return { redirect: { destination: `/categories/${params.category}`, permanent: true } }
  }
  return getCategoryProps(params.category, page)
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" }
}
