'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { BookOpen, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
export default function CoursesPage() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const content = {
    en: {
      title: 'All Courses',
      subtitle: 'Courses from 5 years of study',
      diploma: 'Diploma Level',
      bachelor: 'Bachelor Level',
      year: 'Year',
      courses: 'Courses',
      lessons: 'Lessons'
    },
    lo: {
      title: 'ວິຊາຮຽນທັງໝົດ',
      subtitle: 'ວິຊາຮຽນຈາກການຮຽນ 5 ປີ',
      diploma: 'ລະດັບຊັ້ນສູງ',
      bachelor: 'ລະດັບປະລິນຍາຕີ',
      year: 'ປີ',
      courses: 'ວິຊາ',
      lessons: 'ບົດຮຽນ'
    }
  }

  const currentContent = content[!mounted ? 'en' : language]

  const levels = [
    {
      id: 'diploma',
      title: currentContent.diploma,
      description: (!mounted ? 'en' : language) === 'en' ? 'Years 1-3 (2019-2022)' : 'ປີທີ 1-3 (2019-2022)',
      years: [
        { year: 1, courses: 8, lessons: 45 },
        { year: 2, courses: 6, lessons: 38 },
        { year: 3, courses: 4, lessons: 28 }
      ],
      color: 'bg-blue-500'
    },
    {
      id: 'bachelor',
      title: currentContent.bachelor,
      description: (!mounted ? 'en' : language) === 'en' ? 'Years 1-2 (2022-2024)' : 'ປີທີ 1-2 (2022-2024)',
      years: [
        { year: 1, courses: 4, lessons: 32 },
        { year: 2, courses: 2, lessons: 13 }
      ],
      color: 'bg-green-500'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{currentContent.title}</h1>
        <p className="text-xl text-muted-foreground">{currentContent.subtitle}</p>
      </div>

      <div className="space-y-8">
        {levels.map((level) => (
          <div key={level.id} className="bg-card rounded-lg border p-6">
            <div className="flex items-center mb-6">
              <div className={`w-4 h-4 rounded-full ${level.color} mr-3`}></div>
              <div>
                <h2 className="text-2xl font-bold">{level.title}</h2>
                <p className="text-muted-foreground">{level.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {level.years.map((yearData) => (
                <Link 
                  key={yearData.year} 
                  href={`/courses/${level.id}/year-${yearData.year}`}
                  className="group block"
                >
                  <div className="bg-background p-4 rounded-lg border hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">
                        {currentContent.year} {yearData.year}
                      </h3>
                      <BookOpen className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {yearData.courses} {currentContent.courses}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {yearData.lessons} {currentContent.lessons}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}