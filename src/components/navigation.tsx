'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun, Home, BookOpen, FolderOpen, Search } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function Navigation() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  const navItems = {
    en: [
      { href: '/', label: 'Home', icon: Home },
      { href: '/courses', label: 'Courses', icon: BookOpen },
      { href: '/projects', label: 'Projects', icon: FolderOpen },
      { href: '/search', label: 'Search', icon: Search },
    ],
    lo: [
      { href: '/', label: 'ໜ້າຫຼັກ', icon: Home },
      { href: '/courses', label: 'ວິຊາຮຽນ', icon: BookOpen },
      { href: '/projects', label: 'ໂປຣເຈັກ', icon: FolderOpen },
      { href: '/search', label: 'ຄົ້ນຫາ', icon: Search },
    ]
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            {!mounted ? 'IT Learning' : (language === 'en' ? 'IT Learning' : 'ຮຽນ IT')}
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems[language].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            {navItems[language].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-2 rounded-md hover:bg-accent"
              >
                <item.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'lo' : 'en')}
              className="px-3 py-2 rounded-md hover:bg-accent text-xs font-medium"
              title={!mounted ? 'Switch Language' : (language === 'en' ? 'Switch to Lao' : 'Switch to English')}
            >
              {!mounted ? 'EN' : (language === 'en' ? 'EN' : 'ລາວ')}
            </button>
            
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-accent"
            >
              {!mounted ? (
                <div className="h-4 w-4" />
              ) : theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}