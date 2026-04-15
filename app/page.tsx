'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// Root path (/) → redirects to English by default
// useRouter respects Next.js basePath (required for GitHub Pages subdirectory deployment)
export default function RootPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/USA')
  }, [router])

  return null
}
