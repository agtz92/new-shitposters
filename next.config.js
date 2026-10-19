/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    // Vercel's optimizer (/_next/image) ran out of quota and was returning 402:
    // images are served as they are from /public.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [384, 640, 828, 1080, 1200],
    imageSizes: [256, 320],
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
}
