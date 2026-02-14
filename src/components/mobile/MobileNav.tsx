'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { path: '/dashboard', label: 'Mijn Sites', icon: '🏠' },
    { path: '/templates', label: 'Templates', icon: '🎨' },
    { path: '/settings', label: 'Instellingen', icon: '⚙️' },
  ]

  return (
    <nav className="mobile-nav fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-2 pt-2 pb-[max(8px,env(safe-area-inset-bottom))] z-50">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`
                flex flex-col items-center justify-center
                min-w-[64px] min-h-[48px]
                rounded-xl
                transition-all duration-200
                ${isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-400 hover:text-gray-600'
                }
              `}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}