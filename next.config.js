/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    spotify_client_id: process.env.SPOTIFY_CLIENT_ID,
    spotify_client_secret: process.env.SPOTIFY_CLIENT_SECRET
  },
  images: {
    domains: ["i.scdn.co", "mosaic.scdn.co"]
  }
}

module.exports = nextConfig