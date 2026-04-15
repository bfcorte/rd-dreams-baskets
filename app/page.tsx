'use client'

import { useEffect } from 'react'

// Root path → redirect to English (USA)
// Client-side redirect needed for static export compatibility
export default function RootPage() {
  useEffect(() => {
    window.location.replace('/USA')
  }, [])

  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0; url=/USA" />
        <title>R&D Dreams &amp; Baskets</title>
      </head>
      <body />
    </html>
  )
}
