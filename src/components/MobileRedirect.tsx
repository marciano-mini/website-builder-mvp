'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function MobileRedirect() {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Simple mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    // Only redirect if on desktop routes and on mobile device
    if (isMobile) {
      // Desktop routes that should redirect to mobile equivalent
      const desktopRoutes = ['/dashboard', '/projects/']
      const shouldRedirect = desktopRoutes.some(route => pathname.startsWith(route))

      if (shouldRedirect && !pathname.startsWith('/mobile')) {
        // Redirect to mobile version
        if (pathname === '/dashboard') {
          router.replace('/mobile')
        } else if (pathname.startsWith('/projects/')) {
          router.replace(`/mobile${pathname}`)
        }
      }
    }
  }, [mounted, pathname, router])

  return null
}