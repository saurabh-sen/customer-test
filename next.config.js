/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'dummyimage.com'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
