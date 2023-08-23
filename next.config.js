/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  nextConfig,
  env: {
    customKey: 'my-value',
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
}
