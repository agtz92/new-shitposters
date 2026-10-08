import Head from "next/head"
import { sitename, motto, sitedomain } from "../components/siteData"
import CoverCard from "@/components/CoverCard"
import TextCard from "@/components/TextCard"
import LargeCard from "@/components/LargeCard"
import { getAllPosts, toCard } from "@/lib/posts"

export default function Home({ blogs }) {
  const [first, ...rest] = blogs
  const nextTwo = rest.slice(0, 2)
  const nextFour = rest.slice(2, 6)
  const daRest = rest.slice(6, 14)
  const description = `${sitename} - ${motto}. Encuentra los mejores artículos y noticias.`

  return (
    <main className="container">
      <Head>
        <title>{`${sitename} - ${motto}`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={sitedomain} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${sitename} - ${motto}`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={sitedomain} />
        <meta property="og:site_name" content={sitename} />
        <meta property="og:image" content={`${sitedomain}/assets/logo.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${sitename} - ${motto}`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${sitedomain}/assets/logo.png`} />
      </Head>

      <h1 className="sr-only">
        {sitename} - {motto}
      </h1>

      <div className="section-header section-header-first">
        <h2>POSTS RECIENTES</h2>
      </div>

      <div className="home-grid">
        <div>{first ? <CoverCard post={first} priority /> : null}</div>
        <div className="stack">
          {nextTwo.map((blog) => (
            <CoverCard key={blog.slug} post={blog} secondary />
          ))}
        </div>
        <div className="stack stack-tight">
          {nextFour.map((blog) => (
            <TextCard key={blog.slug} post={blog} />
          ))}
        </div>
      </div>

      <div className="section-header section-header-spaced">
        <h2>OTROS POSTS</h2>
      </div>

      <div className="card-grid card-grid-4">
        {daRest.map((blog) => (
          <LargeCard key={blog.slug} post={blog} />
        ))}
      </div>
    </main>
  )
}

export async function getStaticProps() {
  return {
    props: {
      blogs: getAllPosts().slice(0, 15).map(toCard),
    },
  }
}
