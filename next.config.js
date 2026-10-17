/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [384, 640, 828, 1080, 1200],
    imageSizes: [256, 320],
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
}
