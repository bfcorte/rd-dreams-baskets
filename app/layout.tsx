import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'R&D Dreams & Baskets — Cozy Gifts, Handcrafted Joy',
  description:
    'Beautiful handcrafted gift baskets & balloon arrangements for every occasion, delivered with love in Central Florida.',
  metadataBase: new URL('https://bfcorte.github.io/rd-dreams-baskets'),
  openGraph: {
    title: 'R&D Dreams & Baskets',
    description: 'Handcrafted gift baskets & balloon arrangements. Cozy Gifts • Handcrafted Joy.',
    locale: 'en_US',
    type: 'website',
  },
}

// Root layout MUST provide <html> and <body> in Next.js 14 App Router.
// suppressHydrationWarning allows locale-specific lang to be set client-side
// without triggering a hydration mismatch warning.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
