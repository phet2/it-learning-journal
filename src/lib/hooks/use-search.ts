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
    title: 'HTML & CSS พื้นฐาน',
    titleLao: 'HTML & CSS ພື້ນຖານ',
    description: 'เรียนรู้การสร้างเว็บไซต์ด้วย HTML และ CSS',
    descriptionLao: 'ຮຽນຮູ້ການສ້າງເວັບໄຊທ໌ດ້ວຍ HTML ແລະ CSS',
    tags: ['HTML', 'CSS', 'Web Development'],
    level: 'diploma-1',
    url: '/lessons/html-css-basics'
  },
  {
    id: '2',
    type: 'lesson',
    title: 'JavaScript เบื้องต้น',
    titleLao: 'JavaScript ເບື້ອງຕົ້ນ',
    description: 'พื้นฐานการเขียนโปรแกรมด้วย JavaScript',
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
    description: 'หลักการออกแบบฐานข้อมูลเชิงสัมพันธ์',
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
    description: 'การเขียนโปรแกรมเว็บด้วย PHP',
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
    description: 'การจัดการฐานข้อมูลด้วย MySQL',
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
    description: 'หลักการเขียนโปรแกรมเชิงวัตถุ',
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
    description: 'การพัฒนาเว็บแอปพลิเคชันด้วย Laravel',
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
    description: 'การสร้างและใช้งาน REST API',
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
    description: 'หลักการจัดการโปรเจคซอฟต์แวร์',
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
    description: 'การเรียนรู้ React.js สำหรับการพัฒนา Frontend',
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
    description: 'การพัฒนา Backend ด้วย Node.js และ Express',
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
    description: 'การใช้งานฐานข้อมูล NoSQL ด้วย MongoDB',
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
    description: 'การพัฒนาแอปพลิเคชัน Full-Stack ด้วย Next.js',
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
    description: 'การใช้งาน TypeScript ในระดับขั้นสูง',
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
    description: 'การใช้งานบริการ Cloud Computing',
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
    description: 'เว็บไซต์ขายของออนไลน์ด้วย Laravel',
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
    description: 'แอปพลิเคชันจัดการงานด้วย React และ Node.js',
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
    description: 'เว็บไซต์บันทึกการเรียน IT ด้วย Next.js',
    descriptionLao: 'ເວັບໄຊທ໌ບັນທຶກການຮຽນ IT ດ້ວຍ Next.js',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX'],
    level: 'bachelor-2',
    url: '/projects/learning-journal'
  }
]

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
    () => debounce((value: string) => {
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
      .filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.titleLao.includes(debouncedQuery) ||
        item.description.toLowerCase().includes(query) ||
        item.descriptionLao.includes(debouncedQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      )
      .sort((a, b) => {
        // Prioritize exact title matches
        const aExactTitle = a.title.toLowerCase() === query || a.titleLao === debouncedQuery
        const bExactTitle = b.title.toLowerCase() === query || b.titleLao === debouncedQuery
        if (aExactTitle && !bExactTitle) return -1
        if (!aExactTitle && bExactTitle) return 1
        
        // Prioritize title matches over description matches
        const aTitleMatch = a.title.toLowerCase().includes(query) || a.titleLao.includes(debouncedQuery)
        const bTitleMatch = b.title.toLowerCase().includes(query) || b.titleLao.includes(debouncedQuery)
        if (aTitleMatch && !bTitleMatch) return -1
        if (!aTitleMatch && bTitleMatch) return 1
        
        // Prioritize tag matches
        const aTagMatch = a.tags.some(tag => tag.toLowerCase().includes(query))
        const bTagMatch = b.tags.some(tag => tag.toLowerCase().includes(query))
        if (aTagMatch && !bTagMatch) return -1
        if (!aTagMatch && bTagMatch) return 1
        
        // Sort by type (lessons first, then projects)
        if (a.type !== b.type) {
          return a.type === 'lesson' ? -1 : 1
        }
        
        return 0
      })
  }, [debouncedQuery])

  // Save search to history
  const saveToHistory = (searchQuery: string) => {
    if (searchQuery.trim() && !searchHistory.includes(searchQuery)) {
      const newHistory = [searchQuery, ...searchHistory.slice(0, 9)] // Keep last 10 searches
      setSearchHistory(newHistory)
      if (typeof window !== 'undefined') {
        localStorage.setItem('search-history', JSON.stringify(newHistory))
      }
    }
  }

  // Enhanced setQuery that saves to history
  const setQueryWithHistory = (newQuery: string) => {
    setQuery(newQuery)
    if (newQuery.trim()) {
      saveToHistory(newQuery)
    }
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