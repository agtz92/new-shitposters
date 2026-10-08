import PostListPage from "@/components/PostListPage"
import { getCategories, getCategoryProps } from "@/lib/posts"

export default PostListPage

export async function getStaticProps({ params }) {
  return getCategoryProps(params.category, 1)
}

export async function getStaticPaths() {
  return {
    paths: getCategories().map((category) => ({ params: { category } })),
    fallback: "blocking",
  }
}
