import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const isProd = process.env.NODE_ENV === 'production'

// GITHUB_PAGES_BASE_PATH is set in CI (e.g. '/rd-dreams-baskets')
// Leave empty when using a custom domain
const basePath = process.env.GITHUB_PAGES_BASE_PATH ?? ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export only in production builds (GitHub Pages)
  // Dev mode uses the normal Next.js server + middleware (i18n routing works)
  ...(isProd ? { output: 'export' } : {}),
  basePath,
  trailingSlash: true,
  images: {
    loader: 'custom',
    loaderFile: './imageLoader.mjs',
    formats: ['image/avif', 'image/webp'],
  },
}

export default withNextIntl(nextConfig)
