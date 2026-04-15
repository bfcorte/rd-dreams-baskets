import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'R&D Dreams & Baskets — Cozy Gifts, Handcrafted Joy',
  description:
    'Beautiful handcrafted gift baskets & balloon arrangements for every occasion, delivered with love in Central Florida.',
  metadataBase: new URL('https://rddreamsbaskets.com'),
  openGraph: {
    title: 'R&D Dreams & Baskets',
    description: 'Handcrafted gift baskets & balloon arrangements. Cozy Gifts • Handcrafted Joy.',
    images: ['/og-image.jpg'],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
