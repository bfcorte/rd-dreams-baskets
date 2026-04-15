import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const isProd = process.env.NODE_ENV === 'production'

// Set to '' when using a custom domain (e.g. rddreamsbaskets.com)
// Set to '/rd-dreams-baskets' for github.io/rd-dreams-baskets
const basePath = (process.env.GITHUB_PAGES_BASE_PATH ?? '').trim()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export only in production (GitHub Pages)
  // Dev mode keeps the Next.js server so middleware + i18n routing work
  ...(isProd ? { output: 'export' } : {}),

  basePath,
  trailingSlash: true,

  // Expose basePath to the client-side image loader.
  // next/image with unoptimized:true does NOT prepend basePath automatically —
  // so imageLoader.mjs reads this value and prepends it instead.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  images: {
    // Custom loader handles basePath + skips server-side optimization
    // (required for output:'export' — no image optimization server available)
    loaderFile: './imageLoader.mjs',
    formats: ['image/avif', 'image/webp'],
  },
}

export default withNextIntl(nextConfig)
