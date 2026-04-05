import fs from "fs"
import dynamic from 'next/dynamic'
import matter from "gray-matter"
import Link from "next/link"
import Head from "next/head"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import { sitename, motto, sitedomain } from "../components/siteData"
import CoverCard from "@/components/CoverCard"

export default function Home({ blogs, isMobile }) {
  const sortedBlogs = blogs.sort((a, b) => new Date(b.date) - new Date(a.date))
  const first = sortedBlogs.slice(0, 1)
  const nextTwo = sortedBlogs.slice(1, 3)
  const nextFour = sortedBlogs.slice(3, 7)
  const daRest = sortedBlogs.slice(7, 15)
  const TextCard = dynamic(() => import('@/components/TextCard'))
  const LargeCard = dynamic(() => import('@/components/LargeCard'))

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
      <Head>
        <title>{sitename} - {motto}</title>
        <meta name="description" content={`${sitename} - ${motto}. Encuentra los mejores artículos y noticias.`} />
        <link rel="canonical" href={sitedomain} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${sitename} - ${motto}`} />
        <meta property="og:description" content={`${sitename} - ${motto}. Encuentra los mejores artículos y noticias.`} />
        <meta property="og:url" content={sitedomain} />
        <meta property="og:site_name" content={sitename} />
        <meta property="og:image" content={`${sitedomain}/assets/logo.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${sitename} - ${motto}`} />
        <meta name="twitter:description" content={`${sitename} - ${motto}. Encuentra los mejores artículos y noticias.`} />
        <meta name="twitter:image" content={`${sitedomain}/assets/logo.png`} />
      </Head>

      {/* Hero Section */}
      <Box sx={{ paddingTop: "40px", paddingBottom: "8px" }}>
        <div className="section-header">
          <h2>POSTS RECIENTES</h2>
        </div>
      </Box>

      {/* Main Grid: Hero + Sidebar */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          {first.map((blog) => (
            <Link key={blog.slug} href={`/${blog.slug}`}>
              <CoverCard post={blog} />
            </Link>
          ))}
        </Grid>
        <Grid item xs={12} md={3}>
          <Grid container spacing={2.5}>
            {nextTwo.map((blog) => (
              <Grid key={blog.slug} item xs={12}>
                <Link href={`/${blog.slug}`}>
                  <CoverCard post={blog} secondary />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Grid container spacing={1.5}>
            {nextFour.map((blog) => (
              <Grid key={blog.slug} item xs={12}>
                <Link href={`/${blog.slug}`}>
                  <TextCard post={blog} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* More Posts */}
      <Box sx={{ paddingTop: "56px", paddingBottom: "8px" }}>
        <div className="section-header">
          <h2>OTROS POSTS</h2>
        </div>
      </Box>

      <Grid container spacing={2.5} sx={{ paddingBottom: "40px" }}>
        {daRest.map((blog) => (
          <Grid key={blog.slug} item xs={12} sm={6} md={3}>
            <Link href={`/${blog.slug}`}>
              <LargeCard post={blog} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export async function getStaticProps() {
  try {
    const filesInBlogs = fs
      .readdirSync("./blog")
      .filter((filename) => !filename.startsWith(".DS_Store"))

    const blogs = filesInBlogs.map((filename) => {
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
        formattedDate: formattedDate,
        shortDescription: shortDescription,
      }
    }).sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 20)

    return {
      props: {
        blogs,
      },
    }
  } catch (error) {
    console.error("Error reading files or parsing frontmatter:", error)
    return {
      notFound: true,
    }
  }
}
