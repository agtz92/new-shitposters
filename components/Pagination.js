import Link from "next/link"

// Crawlable pagination: every page is its own static URL.
function pageWindow(page, totalPages) {
  const pages = new Set([1, totalPages, page - 1, page, page + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)
  const items = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) items.push(`gap-${p}`)
    items.push(p)
  })
  return items
}

const Pagination = ({ basePath, page, totalPages }) => {
  if (totalPages <= 1) return null
  const href = (p) => (p === 1 ? basePath : `${basePath}/pagina/${p}`)

  return (
    <nav className="pagination" aria-label="Paginación">
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" aria-label="Página anterior">
          ‹
        </Link>
      ) : null}
      {pageWindow(page, totalPages).map((item) =>
        typeof item === "string" ? (
          <span key={item} className="pagination-gap">
            …
          </span>
        ) : (
          <Link
            key={item}
            href={href(item)}
            aria-current={item === page ? "page" : undefined}
            className={item === page ? "selected" : undefined}
          >
            {item}
          </Link>
        )
      )}
      {page < totalPages ? (
        <Link href={href(page + 1)} rel="next" aria-label="Página siguiente">
          ›
        </Link>
      ) : null}
    </nav>
  )
}

export default Pagination
