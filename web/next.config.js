/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ucarecdn.com']
  },
  async rewrites() {
    return [
      { source: '/categories', destination: '/' },
      { source: '/news', destination: '/' }
    ]
  }
}

module.exports = nextConfig
