/** @type {import('next').NextConfig} */
const onNetlify = Boolean(process.env.NETLIFY)

module.exports = {
  reactStrictMode: true,
  images: onNetlify
    ? {
        loader: "custom",
        loaderFile: "./lib/netlifyImageLoader.js",
        deviceSizes: [384, 640, 828, 1080, 1200],
        imageSizes: [256, 320],
      }
    : {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [384, 640, 828, 1080, 1200],
        imageSizes: [256, 320],
        remotePatterns: [
          { protocol: "https", hostname: "**" },
        ],
      },
}
