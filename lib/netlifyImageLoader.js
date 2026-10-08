// next/image loader backed by Netlify Image CDN (resizes and serves AVIF/WebP).
// Remote hosts must be allowed in netlify.toml [images].remote_images.
export default function netlifyImageLoader({ src, width, quality }) {
  const params = new URLSearchParams({ url: src, w: String(width), q: String(quality || 70) })
  return `/.netlify/images?${params}`
}
