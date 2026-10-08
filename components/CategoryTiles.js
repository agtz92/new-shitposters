import Image from "next/image"
import Link from "next/link"
import { navCategories } from "./categories"

// Category files store names without accents ("Musica"); prefer the nav labels.
const labelFor = (tile) =>
  navCategories.find(({ href }) => href === `/categories/${tile.slug}`)?.label || tile.label

const CategoryTiles = ({ tiles }) => (
  <div className="tile-grid">
    {tiles.map((tile) => (
      <Link key={tile.slug} href={`/categories/${tile.slug}`} className="tile">
        {tile.image ? <Image src={tile.image} alt="" fill sizes="(max-width: 599px) 50vw, 240px" /> : null}
        <span className="tile-label">
          {labelFor(tile)} <span className="tile-count">{tile.count}</span>
        </span>
      </Link>
    ))}
  </div>
)

export default CategoryTiles
