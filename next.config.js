/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
      ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/proxy/:path*',
        destination: process.env.GOVERNATOR_API + '/:path*',
      },
    ]
  }
}

module.exports = nextConfig
