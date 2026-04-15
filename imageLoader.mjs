/**
 * Custom image loader for Next.js static export with basePath.
 *
 * Problem: next/image with `unoptimized: true` returns the raw `src` without
 * prepending basePath — breaking all images on GitHub Pages subdirectory deploys.
 *
 * Fix: this loader prepends NEXT_PUBLIC_BASE_PATH (exposed by next.config.mjs
 * from the GITHUB_PAGES_BASE_PATH env var) so the correct absolute path is
 * used both locally (empty string) and in production (/rd-dreams-baskets).
 */
export default function staticImageLoader({ src }) {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').trim()
  return `${base}${src}`
}
