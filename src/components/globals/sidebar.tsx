'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, TrendingUp, Gamepad, Music, Clock, ThumbsUp, Folder, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"

const sidebarItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: TrendingUp, label: 'Trending', href: '/trending' },
  { icon: Gamepad, label: 'Gaming', href: '/gaming' },
  { icon: Music, label: 'Music', href: '/music' },
  { icon: Clock, label: 'History', href: '/history' },
  { icon: ThumbsUp, label: 'Liked Videos', href: '/liked' },
  { icon: Folder, label: 'Collections', href: '/collections' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden text-retro-text hover:bg-retro-primary hover:bg-opacity-20"
        onClick={toggleSidebar}
      >
        <Menu />
      </Button>
      <aside className={`sidebar bg-retro-bg border-r border-retro-primary md:mt-14 ${isOpen ? 'open' : ''} fixed left-0 h-full`}>
        <nav>
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`flex items-center px-6 py-3 text-retro-text hover:bg-retro-primary hover:bg-opacity-20 transition-colors ${
                  isActive ? 'bg-retro-primary bg-opacity-20 border-l-4 border-retro-secondary' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className={`mr-4 ${isActive ? 'text-retro-secondary' : ''}`} size={20} />
                <span className={isActive ? 'text-retro-secondary' : ''}>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}></div>
    </>
  )
}

