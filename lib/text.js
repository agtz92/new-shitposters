// Pure text helpers, safe to import from client components.
export function excerpt(text, maxLength = 160) {
  if (!text) return ""
  const clean = String(text)
    .replace(/<[^>]+>/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#*_`>]+/g, "")
    .replace(/\s+/g, " ")
    .trim()
  if (clean.length <= maxLength) return clean
  const trimmed = clean.slice(0, maxLength)
  const lastSpace = trimmed.lastIndexOf(" ")
  return (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed) + "…"
}
