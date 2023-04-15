/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/governator/:path*',
        destination: 'https://governator-api-test.herokuapp.com/api/:path*' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
