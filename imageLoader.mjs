/**
 * Custom Next.js image loader.
 * Required because `unoptimized: true` bypasses the image pipeline and does
 * NOT prepend `basePath` — images would 404 on GitHub Pages subdirectory
 * deployments (/rd-dreams-baskets/...).
 *
 * NEXT_PUBLIC_BASE_PATH is injected at build time by Next.js from the env var
 * set in the CI workflow (or empty string in local dev).
 */
export default function imageLoader({ src }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  return `${base}${src}`
}
