'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { BookOpen, FolderOpen, Calendar, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const content = {
    en: {
      title: 'IT Learning',
      subtitle: '5-Year IT Learning Journey',
      description: 'Collection of lessons, code, and projects from 3 years of Diploma and 2 years of Bachelor studies',
      stats: {
        courses: 'Courses',
        lessons: 'Lessons',
        projects: 'Projects',
        years: 'Academic Years'
      },
      quickAccess: 'Quick Access',
      recentLessons: 'Recent Lessons',
      timeline: 'Learning Timeline'
    },
    lo: {
      title: 'ການຮຽນ IT',
      subtitle: 'ບັນທຶກການຮຽນ IT ຕະຫຼອດ 5 ປີ',
      description: 'ລວບລວມບົດຮຽນ, ໂຄ້ດ ແລະ ໂປຣເຈັກຈາກການຮຽນ ຊັ້ນສູງ 3 ປີ ແລະ ປະລິນຍາຕີ 2 ປີ',
      stats: {
        courses: 'ວິຊາຮຽນ',
        lessons: 'ບົດຮຽນ',
        projects: 'ໂປຣເຈັກ',
        years: 'ປີການສຶກສາ'
      },
      quickAccess: 'ເຂົ້າເຖິງດ່ວນ',
      recentLessons: 'ບົດຮຽນຫຼ້າສຸດ',
      timeline: 'ໄທມ໌ໄລນ໌ການຮຽນ'
    }
  }

  const currentContent = content[!mounted ? 'en' : language]

  const stats = [
    { label: currentContent.stats.courses, value: '8', icon: BookOpen },
    { label: currentContent.stats.lessons, value: '113', icon: Calendar },
    { label: currentContent.stats.projects, value: '3', icon: FolderOpen },
    { label: currentContent.stats.years, value: '5', icon: TrendingUp },
  ]

  const quickLinks = [
    { 
      href: '/courses', 
      title: (!mounted ? 'en' : language) === 'en' ? 'Diploma Years 1-3' : 'ຊັ້ນສູງ ປີ 1-3',
      description: (!mounted ? 'en' : language) === 'en' ? 'Diploma level courses' : 'ວິຊາຮຽນລະດັບຊັ້ນສູງ',
      icon: BookOpen 
    },
    { 
      href: '/courses', 
      title: (!mounted ? 'en' : language) === 'en' ? 'Bachelor Years 1-2' : 'ປະລິນຍາຕີ ປີ 1-2',
      description: (!mounted ? 'en' : language) === 'en' ? 'Bachelor level courses' : 'ວິຊາຮຽນລະດັບປະລິນຍາຕີ',
      icon: BookOpen 
    },
    { 
      href: '/projects', 
      title: (!mounted ? 'en' : language) === 'en' ? 'All Projects' : 'ໂປຣເຈັກທັງໝົດ',
      description: (!mounted ? 'en' : language) === 'en' ? 'Portfolio and projects' : 'ຜົນງານແລະໂປຣເຈັກ',
      icon: FolderOpen 
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{currentContent.title}</h1>
        <p className="text-xl text-muted-foreground mb-2">{currentContent.subtitle}</p>
        <p className="text-muted-foreground max-w-2xl mx-auto">{currentContent.description}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card p-6 rounded-lg border text-center">
            <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{currentContent.quickAccess}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <Link key={index} href={link.href} className="group">
              <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <link.icon className="h-8 w-8 mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2">{link.title}</h3>
                <p className="text-muted-foreground">{link.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Timeline Preview */}
      <div>
        <h2 className="text-2xl font-bold mb-6">{currentContent.timeline}</h2>
        <div className="space-y-4">
          {[
            { year: '2019-2022', level: (!mounted ? 'en' : language) === 'en' ? 'Diploma Years 1-3' : 'ຊັ້ນສູງ ປີ 1-3', courses: 5 },
            { year: '2022-2024', level: (!mounted ? 'en' : language) === 'en' ? 'Bachelor Years 1-2' : 'ປະລິນຍາຕີ ປີ 1-2', courses: 3 },
          ].map((period, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{period.level}</h3>
                <p className="text-sm text-muted-foreground">{period.year}</p>
              </div>
              <div className="text-right">
                <div className="font-semibold">{period.courses}</div>
                <div className="text-sm text-muted-foreground">{currentContent.stats.courses}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}