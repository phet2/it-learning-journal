'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react'
import Link from 'next/link'
export default function ProjectsPage() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const content = {
    en: {
      title: 'All Projects',
      subtitle: 'Portfolio and projects from 5 years of study',
      viewCode: 'View Code',
      viewLive: 'View Live',
      technologies: 'Technologies',
      level: 'Level',
      diploma: 'Diploma',
      bachelor: 'Bachelor'
    },
    lo: {
      title: 'ໂປຣເຈັກທັງໝົດ',
      subtitle: 'ຜົນງານແລະໂປຣເຈັກຈາກການຮຽນ 5 ປີ',
      viewCode: 'ເບິ່ງໂຄ້ດ',
      viewLive: 'ເບິ່ງເວັບໄຊທ໌',
      technologies: 'ເທັກໂນໂລຊີ',
      level: 'ລະດັບ',
      diploma: 'ຊັ້ນສູງ',
      bachelor: 'ປະລິນຍາຕີ'
    }
  }

  const currentContent = content[!mounted ? 'en' : language]

  // Sample projects data
  const projects = [
    {
      id: '1',
      title: 'E-Commerce Website',
      titleLao: 'ເວັບໄຊທ໌ອີຄອມເມີດ',
      description: 'E-commerce website built with React and Node.js',
      descriptionLao: 'ເວັບໄຊທ໌ຂາຍຂອງອອນລາຍດ້ວຍ React ແລະ Node.js',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      level: 'bachelor-2',
      githubUrl: 'https://github.com/example/ecommerce',
      liveUrl: 'https://example-ecommerce.vercel.app',
      imageUrl: '/projects/ecommerce.jpg',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Task Management App',
      titleLao: 'ແອັບຈັດການງານ',
      description: 'Task management application built with Vue.js',
      descriptionLao: 'ແອັບພລິເຄຊັນຈັດການງານດ້ວຍ Vue.js',
      technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      level: 'bachelor-1',
      githubUrl: 'https://github.com/example/task-app',
      imageUrl: '/projects/task-app.jpg',
      createdAt: '2023-08-20'
    },
    {
      id: '3',
      title: 'School Management System',
      titleLao: 'ລະບົບຈັດການໂຮງຮຽນ',
      description: 'School management system built with PHP and MySQL',
      descriptionLao: 'ລະບົບຈັດການໂຮງຮຽນດ້ວຍ PHP ແລະ MySQL',
      technologies: ['PHP', 'MySQL', 'Bootstrap', 'jQuery'],
      level: 'diploma-3',
      githubUrl: 'https://github.com/example/school-system',
      imageUrl: '/projects/school-system.jpg',
      createdAt: '2022-05-10'
    }
  ]

  const getLevelLabel = (level: string) => {
    if (level.startsWith('diploma')) {
      return `${currentContent.diploma} ${level.split('-')[1]}`
    }
    return `${currentContent.bachelor} ${level.split('-')[1]}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{currentContent.title}</h1>
        <p className="text-xl text-muted-foreground">{currentContent.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`} className="block">
            <div className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
            {project.imageUrl && (
              <div className="h-48 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Project Image</span>
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold">
                  {(!mounted ? 'en' : language) === 'en' ? project.title : project.titleLao}
                </h3>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {getLevelLabel(project.level)}
                </span>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4">
                {(!mounted ? 'en' : language) === 'en' ? project.description : project.descriptionLao}
              </p>
              
              <div className="mb-4">
                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <Tag className="h-3 w-3 mr-1" />
                  {currentContent.technologies}
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs bg-secondary px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center text-xs text-muted-foreground mb-4">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(project.createdAt).toLocaleDateString((!mounted ? 'en' : language) === 'en' ? 'en-US' : 'lo-LA')}
              </div>
              
              <div className="flex space-x-2">
                {project.githubUrl && (
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      window.open(project.githubUrl, '_blank')
                    }}
                    className="flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded hover:bg-primary/90 transition-colors"
                  >
                    <Github className="h-3 w-3 mr-1" />
                    {currentContent.viewCode}
                  </button>
                )}
                {project.liveUrl && (
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      window.open(project.liveUrl, '_blank')
                    }}
                    className="flex items-center text-xs bg-secondary text-secondary-foreground px-3 py-2 rounded hover:bg-secondary/80 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    {currentContent.viewLive}
                  </button>
                )}
              </div>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  )
}