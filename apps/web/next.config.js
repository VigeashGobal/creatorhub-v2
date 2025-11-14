/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ['@creatorhub/ui', '@creatorhub/design-tokens', '@creatorhub/api-client'],
}

module.exports = nextConfig

