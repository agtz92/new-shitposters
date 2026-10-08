import Link from "next/link"

const SectionHeader = ({ title, href, linkLabel, as: Tag = "h2" }) => (
  <div className="section-head">
    <Tag className="section-title">{title}</Tag>
    {href ? (
      <Link href={href} className="section-link">
        {linkLabel} <span aria-hidden="true">→</span>
      </Link>
    ) : null}
  </div>
)

export default SectionHeader
