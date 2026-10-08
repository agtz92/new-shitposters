import Head from "next/head"
import { sitename, motto, sitedomain } from "../components/siteData"
import HeroCard from "@/components/HeroCard"
import RankList from "@/components/RankList"
import PostCard from "@/components/PostCard"
import WideCard from "@/components/WideCard"
import CategoryTiles from "@/components/CategoryTiles"
import SectionHeader from "@/components/SectionHeader"
import { getAllPosts, getCategoryTiles, toCard } from "@/lib/posts"

export default function Home({ hero, latest, gaming, gamingCount, screen, tiles }) {
  const description = `${sitename} - ${motto}. Encuentra los mejores artículos y noticias.`

  return (
    <main className="container home">
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

      <section className="home-top" aria-label="Destacado">
        {hero ? <HeroCard post={hero} /> : null}
        <RankList title="Lo más reciente" posts={latest} />
      </section>

      {gaming.length ? (
        <section>
          <SectionHeader
            title="Gaming"
            href="/categories/gaming"
            linkLabel={`Ver los ${gamingCount.toLocaleString("es-MX")} artículos`}
          />
          <div className="card-grid card-grid-4">
            {gaming.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ) : null}

      {screen.length ? (
        <section>
          <SectionHeader title="Cine y TV" href="/categories/cine" linkLabel="Ver cine" />
          <div className="wide-grid">
            {screen.map((post) => (
              <WideCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <SectionHeader title="Explora por categoría" />
        <CategoryTiles tiles={tiles} />
      </section>
    </main>
  )
}

export async function getStaticProps() {
  const all = getAllPosts()
  const shown = new Set()
  const take = (posts, count) => {
    const picked = posts.filter((post) => !shown.has(post.slug)).slice(0, count)
    picked.forEach((post) => shown.add(post.slug))
    return picked.map(toCard)
  }
  const inCategory = (...names) => all.filter((post) => names.includes(post.categoria.toLowerCase()))

  const [hero = null] = take(all, 1)
  const latest = take(all, 5)
  const gamingPosts = inCategory("gaming")

  return {
    props: {
      hero,
      latest,
      gaming: take(gamingPosts, 4),
      gamingCount: gamingPosts.length,
      screen: take(inCategory("cine", "television"), 2),
      tiles: getCategoryTiles(),
    },
  }
}
