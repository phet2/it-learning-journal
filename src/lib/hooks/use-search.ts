'use client'

import { useState, useEffect, useMemo } from 'react'
import { debounce } from '@/lib/utils'

interface SearchResult {
  id: string
  type: 'lesson' | 'project'
  title: string
  titleLao: string
  description: string
  descriptionLao: string
  tags: string[]
  level?: string
  url: string
}

const mockData: SearchResult[] = [
  // Diploma Year 1 Lessons
  {
    id: '1',
    type: 'lesson',
    title: 'HTML & CSS Basics',
    titleLao: 'HTML & CSS ພື້ນຖານ',
    description: 'Learn to build websites using HTML and CSS',
    descriptionLao: 'ຮຽນຮູ້ການສ້າງເວັບໄຊທ໌ດ້ວຍ HTML ແລະ CSS',
    tags: ['HTML', 'CSS', 'Web Development'],
    level: 'diploma-1',
    url: '/lessons/html-css-basics'
  },
  {
    id: '2',
    type: 'lesson',
    title: 'JavaScript Basics',
    titleLao: 'JavaScript ເບື້ອງຕົ້ນ',
    description: 'Learn programming fundamentals with JavaScript',
    descriptionLao: 'ພື້ນຖານການຂຽນໂປຣແກຣມດ້ວຍ JavaScript',
    tags: ['JavaScript', 'Programming', 'Frontend'],
    level: 'diploma-1',
    url: '/lessons/javascript-basics'
  },
  {
    id: '3',
    type: 'lesson',
    title: 'Database Design',
    titleLao: 'ການອອກແບບຖານຂໍ້ມູນ',
    description: 'Principles of relational database design',
    descriptionLao: 'ຫຼັກການອອກແບບຖານຂໍ້ມູນເຊີງສຳພັນ',
    tags: ['Database', 'SQL', 'Design'],
    level: 'diploma-1',
    url: '/lessons/database-design'
  },
  // Diploma Year 2 Lessons
  {
    id: '4',
    type: 'lesson',
    title: 'PHP Programming',
    titleLao: 'ການຂຽນໂປຣແກຣມ PHP',
    description: 'Web programming with PHP',
    descriptionLao: 'ການຂຽນໂປຣແກຣມເວັບດ້ວຍ PHP',
    tags: ['PHP', 'Backend', 'Web Development'],
    level: 'diploma-2',
    url: '/lessons/php-programming'
  },
  {
    id: '5',
    type: 'lesson',
    title: 'MySQL Database',
    titleLao: 'ຖານຂໍ້ມູນ MySQL',
    description: 'Database management with MySQL',
    descriptionLao: 'ການຈັດການຖານຂໍ້ມູນດ້ວຍ MySQL',
    tags: ['MySQL', 'Database', 'SQL'],
    level: 'diploma-2',
    url: '/lessons/mysql-database'
  },
  {
    id: '6',
    type: 'lesson',
    title: 'Object-Oriented Programming',
    titleLao: 'ການຂຽນໂປຣແກຣມແບບ OOP',
    description: 'Principles of object-oriented programming',
    descriptionLao: 'ຫຼັກການຂຽນໂປຣແກຣມເຊີງວັດຖຸ',
    tags: ['OOP', 'Programming', 'Concepts'],
    level: 'diploma-2',
    url: '/lessons/oop-concepts'
  },
  // Diploma Year 3 Lessons
  {
    id: '7',
    type: 'lesson',
    title: 'Laravel Framework',
    titleLao: 'Laravel Framework',
    description: 'Develop web applications using Laravel',
    descriptionLao: 'ການພັດທະນາເວັບແອັບພລິເຄຊັນດ້ວຍ Laravel',
    tags: ['Laravel', 'PHP', 'Framework'],
    level: 'diploma-3',
    url: '/lessons/laravel-framework'
  },
  {
    id: '8',
    type: 'lesson',
    title: 'API Development',
    titleLao: 'ການພັດທະນາ API',
    description: 'Create and use REST APIs',
    descriptionLao: 'ການສ້າງແລະໃຊ້ງານ REST API',
    tags: ['API', 'REST', 'Backend'],
    level: 'diploma-3',
    url: '/lessons/api-development'
  },
  {
    id: '9',
    type: 'lesson',
    title: 'Project Management',
    titleLao: 'ການຈັດການໂປຣເຈັກ',
    description: 'Principles of software project management',
    descriptionLao: 'ຫຼັກການຈັດການໂປຣເຈັກຊອບແວ',
    tags: ['Project Management', 'Agile', 'Scrum'],
    level: 'diploma-3',
    url: '/lessons/project-management'
  },
  // Bachelor Year 1 Lessons
  {
    id: '10',
    type: 'lesson',
    title: 'React.js Fundamentals',
    titleLao: 'React.js ພື້ນຖານ',
    description: 'Learn React.js for Frontend development',
    descriptionLao: 'ການຮຽນຮູ້ React.js ສຳລັບການພັດທະນາ Frontend',
    tags: ['React', 'JavaScript', 'Frontend'],
    level: 'bachelor-1',
    url: '/lessons/react-fundamentals'
  },
  {
    id: '11',
    type: 'lesson',
    title: 'Node.js & Express',
    titleLao: 'Node.js & Express',
    description: 'Backend development with Node.js and Express',
    descriptionLao: 'ການພັດທະນາ Backend ດ້ວຍ Node.js ແລະ Express',
    tags: ['Node.js', 'Express', 'Backend'],
    level: 'bachelor-1',
    url: '/lessons/nodejs-express'
  },
  {
    id: '12',
    type: 'lesson',
    title: 'MongoDB Database',
    titleLao: 'ຖານຂໍ້ມູນ MongoDB',
    description: 'Work with NoSQL databases using MongoDB',
    descriptionLao: 'ການໃຊ້ງານຖານຂໍ້ມູນ NoSQL ດ້ວຍ MongoDB',
    tags: ['MongoDB', 'NoSQL', 'Database'],
    level: 'bachelor-1',
    url: '/lessons/mongodb-database'
  },
  // Bachelor Year 2 Lessons
  {
    id: '13',
    type: 'lesson',
    title: 'Next.js Full-Stack',
    titleLao: 'Next.js Full-Stack',
    description: 'Build full-stack applications with Next.js',
    descriptionLao: 'ການພັດທະນາແອັບພລິເຄຊັນ Full-Stack ດ້ວຍ Next.js',
    tags: ['Next.js', 'React', 'Full-Stack'],
    level: 'bachelor-2',
    url: '/lessons/nextjs-fullstack'
  },
  {
    id: '14',
    type: 'lesson',
    title: 'TypeScript Advanced',
    titleLao: 'TypeScript ຂັ້ນສູງ',
    description: 'Advanced usage of TypeScript',
    descriptionLao: 'ການໃຊ້ງານ TypeScript ໃນລະດັບຂັ້ນສູງ',
    tags: ['TypeScript', 'JavaScript', 'Types'],
    level: 'bachelor-2',
    url: '/lessons/typescript-advanced'
  },
  {
    id: '15',
    type: 'lesson',
    title: 'Cloud Computing',
    titleLao: 'Cloud Computing',
    description: 'Using Cloud Computing services',
    descriptionLao: 'ການໃຊ້ງານບໍລິການ Cloud Computing',
    tags: ['Cloud', 'AWS', 'DevOps'],
    level: 'bachelor-2',
    url: '/lessons/cloud-computing'
  },
  // Projects
  {
    id: '16',
    type: 'project',
    title: 'E-Commerce Website',
    titleLao: 'ເວັບໄຊທ໌ອີຄອມເມີສ',
    description: 'Online shopping website built with Laravel',
    descriptionLao: 'ເວັບໄຊທ໌ຂາຍຂອງອອນລາຍດ້ວຍ Laravel',
    tags: ['Laravel', 'PHP', 'MySQL', 'E-Commerce'],
    level: 'diploma-3',
    url: '/projects/ecommerce-website'
  },
  {
    id: '17',
    type: 'project',
    title: 'Task Management App',
    titleLao: 'ແອັບຈັດການງານ',
    description: 'Task management app using React and Node.js',
    descriptionLao: 'ແອັບພລິເຄຊັນຈັດການງານດ້ວຍ React ແລະ Node.js',
    tags: ['React', 'Node.js', 'MongoDB', 'Full-Stack'],
    level: 'bachelor-1',
    url: '/projects/task-management'
  },
  {
    id: '18',
    type: 'project',
    title: 'IT Learning Journal',
    titleLao: 'ບັນທຶກການຮຽນ IT',
    description: 'IT learning journal website using Next.js',
    descriptionLao: 'ເວັບໄຊທ໌ບັນທຶກການຮຽນ IT ດ້ວຍ Next.js',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX'],
    level: 'bachelor-2',
    url: '/projects/learning-journal'
  }
]

// 🔍 Search Hook
export function useSearch() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('search-history')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const debouncedSetQuery = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedQuery(value)
        setIsLoading(false)
      }, 300),
    []
  )

  useEffect(() => {
    if (query) {
      setIsLoading(true)
      debouncedSetQuery(query)
    } else {
      setDebouncedQuery('')
      setIsLoading(false)
    }
  }, [query, debouncedSetQuery])

  const results = useMemo(() => {
    if (!debouncedQuery) return mockData

    const query = debouncedQuery.toLowerCase()

    return mockData
      .filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.titleLao.includes(debouncedQuery) ||
          item.description.toLowerCase().includes(query) ||
          item.descriptionLao.includes(debouncedQuery) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
      )
      .sort((a, b) => {
        const aExact = a.title.toLowerCase() === query || a.titleLao === debouncedQuery
        const bExact = b.title.toLowerCase() === query || b.titleLao === debouncedQuery
        if (aExact && !bExact) return -1
        if (!aExact && bExact) return 1

        const aTitleMatch = a.title.toLowerCase().includes(query)
        const bTitleMatch = b.title.toLowerCase().includes(query)
        if (aTitleMatch && !bTitleMatch) return -1
        if (!aTitleMatch && bTitleMatch) return 1

        const aTag = a.tags.some((tag) => tag.toLowerCase().includes(query))
        const bTag = b.tags.some((tag) => tag.toLowerCase().includes(query))
        if (aTag && !bTag) return -1
        if (!aTag && bTag) return 1

        return a.type === 'lesson' ? -1 : 1
      })
  }, [debouncedQuery])

  const saveToHistory = (searchQuery: string) => {
    if (searchQuery.trim() && !searchHistory.includes(searchQuery)) {
      const newHistory = [searchQuery, ...searchHistory.slice(0, 9)]
      setSearchHistory(newHistory)
      if (typeof window !== 'undefined') {
        localStorage.setItem('search-history', JSON.stringify(newHistory))
      }
    }
  }

  const setQueryWithHistory = (newQuery: string) => {
    setQuery(newQuery)
    if (newQuery.trim()) saveToHistory(newQuery)
  }

  return {
    query,
    setQuery: setQueryWithHistory,
    results,
    isLoading: isLoading && query !== debouncedQuery,
    searchHistory,
    clearHistory: () => {
      setSearchHistory([])
      if (typeof window !== 'undefined') {
        localStorage.removeItem('search-history')
      }
    }
  }
}
