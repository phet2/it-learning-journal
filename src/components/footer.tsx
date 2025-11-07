'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { Github, Mail, Heart } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const content = {
    en: {
      description: '5-Year IT Learning Journey',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      madeWith: 'Made with',
      by: 'by',
      rights: 'All rights reserved',
      links: {
        home: 'Home',
        courses: 'Courses',
        projects: 'Projects',
        search: 'Search'
      }
    },
    lo: {
      description: 'ບັນທຶກການຮຽນ IT ຕະຫຼອດ 5 ປີ',
      quickLinks: 'ລິ້ງດ່ວນ',
      contact: 'ຕິດຕໍ່',
      madeWith: 'ສ້າງດ້ວຍ',
      by: 'ໂດຍ',
      rights: 'ສະຫງວນລິຂະສິດ',
      links: {
        home: 'ໜ້າຫຼັກ',
        courses: 'ວິຊາຮຽນ',
        projects: 'ໂປຣເຈັກ',
        search: 'ຄົ້ນຫາ'
      }
    }
  }

  const currentContent = content[!mounted ? 'en' : language]

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-4">IT Learning</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              {currentContent.description}
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="mailto:contact@example.com" className="text-muted-foreground hover:text-foreground">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{currentContent.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  {currentContent.links.home}
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-foreground">
                  {currentContent.links.courses}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-foreground">
                  {currentContent.links.projects}
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-foreground">
                  {currentContent.links.search}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{currentContent.contact}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: contact@example.com</li>
              <li>GitHub: @username</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} IT Learning. {currentContent.rights}.
          </p>
          <p className="text-muted-foreground text-sm flex items-center mt-4 md:mt-0">
            {currentContent.madeWith} <Heart className="h-4 w-4 mx-1 text-red-500" /> {currentContent.by} IT Student
          </p>
        </div>
      </div>
    </footer>
  )
}