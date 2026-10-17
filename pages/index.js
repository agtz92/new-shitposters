import fs from "fs"
import dynamic from "next/dynamic"
import matter from "gray-matter"
import Link from "next/link"
import Head from "next/head"
import { sitename, motto, sitedomain } from "../components/siteData"
import CoverCard from "@/components/CoverCard"

const TextCard = dynamic(() => import("@/components/TextCard"))
const LargeCard = dynamic(() => import("@/components/LargeCard"))

export default function Home({ blogs }) {
  const sortedBlogs = blogs.sort((a, b) => new Date(b.date) - new Date(a.date))
  const first = sortedBlogs.slice(0, 1)
  const nextTwo = sortedBlogs.slice(1, 3)
  const nextFour = sortedBlogs.slice(3, 7)
  const daRest = sortedBlogs.slice(7, 15)

  return (
    <div className="margins">
      <Head>
        <title>{sitename} - {motto}</title>
        <meta name="description" content={`${sitename} - ${motto}. Encuentra los mejores articulos y noticias.`} />
        <link rel="canonical" href={sitedomain} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${sitename} - ${motto}`} />
        <meta property="og:description" content={`${sitename} - ${motto}. Encuentra los mejores articulos y noticias.`} />
        <meta property="og:url" content={sitedomain} />
        <meta property="og:site_name" content={sitename} />
        <meta property="og:image" content={`${sitedomain}/assets/logo.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${sitename} - ${motto}`} />
        <meta name="twitter:description" content={`${sitename} - ${motto}. Encuentra los mejores articulos y noticias.`} />
        <meta name="twitter:image" content={`${sitedomain}/assets/logo.png`} />
      </Head>

      <div className="section-header margins">
        <h2>POSTS RECIENTES</h2>
      </div>

      <div className="grid grid-home">
        <div style={{ gridColumn: "span 2" }}>
          {first.map((blog) => (
            <Link key={blog.slug} href={`/${blog.slug}`}>
              <CoverCard post={blog} priority />
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {nextTwo.map((blog) => (
            <Link key={blog.slug} href={`/${blog.slug}`}>
              <CoverCard post={blog} secondary />
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {nextFour.map((blog) => (
            <Link key={blog.slug} href={`/${blog.slug}`}>
              <TextCard post={blog} />
            </Link>
          ))}
        </div>
      </div>

      <div className="section-header margins" style={{ marginTop: 40 }}>
        <h2>OTROS POSTS</h2>
      </div>

      <div className="grid grid-4" style={{ marginTop: 16 }}>
        {daRest.map((blog) => (
          <Link key={blog.slug} href={`/${blog.slug}`}>
            <LargeCard post={blog} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  try {
    const filesInBlogs = fs
      .readdirSync("./blog")
      .filter((filename) => !filename.startsWith(".DS_Store"))

    const blogs = filesInBlogs
      .map((filename) => {
        const file = fs.readFileSync(`./blog/${filename}`, "utf8")
        const matterData = matter(file)
        const isoDate = matterData.data.date
          ? new Date(matterData.data.date).toISOString()
          : ""
        const formattedDate = matterData.data.date
          ? new Date(matterData.data.date).toLocaleDateString("en-US")
          : ""
        const shortDescription = matterData.data["short-description"] || ""

        return {
          ...matterData.data,
          slug: filename.slice(0, filename.indexOf(".")),
          date: isoDate,
          formattedDate,
          shortDescription,
        }
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 20)

    return { props: { blogs } }
  } catch (error) {
    console.error("Error reading files or parsing frontmatter:", error)
    return { notFound: true }
  }
}
