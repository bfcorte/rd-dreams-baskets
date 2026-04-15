import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

// GITHUB_PAGES_BASE_PATH is set in CI (e.g. '/rd-dreams-baskets')
// Leave empty when using a custom domain
const basePath = process.env.GITHUB_PAGES_BASE_PATH ?? ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',       // Static export for GitHub Pages
  basePath,
  trailingSlash: true,    // Required for GitHub Pages (serves index.html)
  images: {
    unoptimized: true,    // Required for static export (no image optimization server)
    formats: ['image/avif', 'image/webp'],
  },
}

export default withNextIntl(nextConfig)
