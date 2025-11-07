'use client'

import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'

interface BreadcrumbItem {
  label: string
  labelLao: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const { language } = useLanguage()

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Link href="/" className="hover:text-foreground">
        <Home className="h-4 w-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground">
              {language === 'en' ? item.label : item.labelLao}
            </Link>
          ) : (
            <span className="text-foreground">
              {language === 'en' ? item.label : item.labelLao}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}