import PostListPage from "@/components/PostListPage"
import { getTags, getTagProps } from "@/lib/posts"

export default PostListPage

export async function getStaticProps({ params }) {
  return getTagProps(params.tag, 1)
}

export async function getStaticPaths() {
  return {
    paths: getTags().map((tag) => ({ params: { tag } })),
    fallback: "blocking",
  }
}
