import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['USA', 'BR', 'ES'],
  defaultLocale: 'USA',
  localePrefix: 'always',
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
