'use client'

import { use } from 'react'
import { useLanguage } from '@/lib/language-context'
import { ArrowLeft, Calendar, Tag, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { mdxComponents } from '@/components/mdx-components'
import { MDXProvider } from '@mdx-js/react'
import { Breadcrumb } from '@/components/breadcrumb'

const lessonData = {
  title: "React Hooks Tutorial",
  titleLao: "ບົດຮຽນ React Hooks",
  description: "Learn how to use React Hooks for state management and side effects",
  descriptionLao: "ຮຽນຮູ້ການໃຊ້ React Hooks ໃນການຈັດການ state ແລະ side effects",
  tags: ["React", "JavaScript", "Frontend", "Hooks"],
  level: "bachelor-1",
  course: "Web Development",
  createdAt: "2023-09-15",
  updatedAt: "2023-09-15"
}

export default function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { language } = useLanguage()

  const content = {
    en: {
      backToCourses: 'Back to Courses',
      course: 'Course',
      level: 'Level',
      createdAt: 'Created',
      updatedAt: 'Updated',
      tags: 'Tags'
    },
    lo: {
      backToCourses: 'ກັບໄປວິຊາຮຽນ',
      course: 'ວິຊາ',
      level: 'ລະດັບ',
      createdAt: 'ສ້າງເມື່ອ',
      updatedAt: 'ອັບເດດເມື່ອ',
      tags: 'ແທັກ'
    }
  }

  const currentContent = content[language]

  const breadcrumbItems = [
    { label: 'Courses', labelLao: 'ວິຊາຮຽນ', href: '/courses' },
    { label: lessonData.course, labelLao: lessonData.course, href: '/courses' },
    { label: lessonData.title, labelLao: lessonData.titleLao }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          {language === 'en' ? lessonData.title : lessonData.titleLao}
        </h1>
        
        <p className="text-xl text-muted-foreground mb-6">
          {language === 'en' ? lessonData.description : lessonData.descriptionLao}
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            {currentContent.course}: {lessonData.course}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {currentContent.createdAt}: {new Date(lessonData.createdAt).toLocaleDateString(language === 'en' ? 'en-US' : 'lo-LA')}
          </div>
          <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
            {lessonData.level}
          </span>
        </div>

        <div className="flex items-center space-x-2 mb-8">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{currentContent.tags}:</span>
          <div className="flex flex-wrap gap-2">
            {lessonData.tags.map((tag) => (
              <span key={tag} className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-none prose prose-lg dark:prose-invert">
        <MDXProvider components={mdxComponents}>
          <div className="bg-card p-8 rounded-lg border">
            <h1>React Hooks Tutorial</h1>
            <h2>ບົດຮຽນ React Hooks</h2>
            
            <p>React Hooks is a feature added in React 16.8 that allows us to use state and other React features in functional components.</p>
            
            <p>React Hooks ແມ່ນຟີເຈີທີ່ເພີ່ມເຂົ້າມາໃນ React 16.8 ທີ່ຊ່ວຍໃຫ້ເຮົາສາມາດໃຊ້ state ແລະຟີເຈີອື່ນໆ ຂອງ React ໃນ functional components ໄດ້</p>

            <h2>useState Hook</h2>
            <p>useState is a Hook used for managing state in functional components.</p>

            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`}</code>
            </pre>
          </div>
        </MDXProvider>
      </div>
    </div>
  )
}