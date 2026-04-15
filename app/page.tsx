'use client'

import { useEffect } from 'react'

// Root path (/) → redirects to English by default
export default function RootPage() {
  useEffect(() => {
    window.location.replace('/USA')
  }, [])

  // Minimal fallback while redirect fires
  return null
}
