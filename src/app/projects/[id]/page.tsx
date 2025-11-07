'use client'

import { use } from 'react'
import { useLanguage } from '@/lib/language-context'
import { ArrowLeft, Github, ExternalLink, Calendar, Tag, Code, User } from 'lucide-react'
import Link from 'next/link'
import { Breadcrumb } from '@/components/breadcrumb'

const projectsData = {
  '1': {
    id: '1',
    title: 'E-Commerce Website',
    titleLao: 'ເວັບໄຊທ໌ອີຄອມເມີດ',
    description: 'E-commerce website built with React and Node.js',
    descriptionLao: 'ເວັບໄຊທ໌ຂາຍຂອງອອນລາຍດ້ວຍ React ແລະ Node.js',
    longDescription: 'A full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment integration. Built with modern technologies for optimal performance.',
    longDescriptionLao: 'ແພລດຟອມອີຄອມເມີດແບບເຕັມຮູບແບບທີ່ມີການຢືນຢັນຕົວຕົນຜູ້ໃຊ້, ບັນຊີລາຍການສິນຄ້າ, ກະຕ່າຊື້ເຄື່ອງ, ແລະການເຊື່ອມຕໍ່ການຊຳລະເງິນ',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    features: [
      { en: 'User Authentication', lo: 'ການຢືນຢັນຕົວຕົນຜູ້ໃຊ້' },
      { en: 'Product Catalog', lo: 'ບັນຊີລາຍການສິນຄ້າ' },
      { en: 'Shopping Cart', lo: 'ກະຕ່າຊື້ເຄື່ອງ' },
      { en: 'Payment Integration', lo: 'ການເຊື່ອມຕໍ່ການຊຳລະເງິນ' }
    ],
    level: 'bachelor-2',
    githubUrl: 'https://github.com/example/ecommerce',
    liveUrl: 'https://example-ecommerce.vercel.app',
    createdAt: '2024-01-15',
    duration: '3 months'
  },
  '2': {
    id: '2',
    title: 'Task Management App',
    titleLao: 'ແອັບຈັດການງານ',
    description: 'Task management application built with Vue.js',
    descriptionLao: 'ແອັບພລິເຄຊັນຈັດການງານດ້ວຍ Vue.js',
    longDescription: 'A productivity app for managing tasks and projects with real-time collaboration features, drag-and-drop interface, and progress tracking.',
    longDescriptionLao: 'ແອັບເພີ່ມປະສິດທິພາບສຳລັບການຈັດການງານແລະໂປຣເຈັກ ມີຄຸນສົມບັດການຮ່ວມມືແບບເວລາຈິງ',
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS', 'Vuex'],
    features: [
      { en: 'Real-time Collaboration', lo: 'ການຮ່ວມມືແບບເວລາຈິງ' },
      { en: 'Drag & Drop Interface', lo: 'ການລາກແລະວາງ' },
      { en: 'Progress Tracking', lo: 'ການຕິດຕາມຄວາມຄືບໜ້າ' },
      { en: 'Team Management', lo: 'ການຈັດການທີມ' }
    ],
    level: 'bachelor-1',
    githubUrl: 'https://github.com/example/task-app',
    liveUrl: 'https://example-task-app.vercel.app',
    createdAt: '2023-08-20',
    duration: '2 months'
  }
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { language } = useLanguage()
  
  const project = projectsData[id as keyof typeof projectsData]

  if (!project) {
    return <div>Project not found</div>
  }

  const content = {
    en: {
      backToProjects: 'Back to Projects',
      overview: 'Overview',
      technologies: 'Technologies',
      features: 'Features',
      projectDetails: 'Project Details',
      duration: 'Duration',
      level: 'Level',
      createdAt: 'Created',
      viewCode: 'View Code',
      viewLive: 'View Live',
      diploma: 'Diploma',
      bachelor: 'Bachelor'
    },
    lo: {
      backToProjects: 'ກັບໄປໂປຣເຈັກ',
      overview: 'ພາບລວມ',
      technologies: 'ເທັກໂນໂລຊີ',
      features: 'ຄຸນສົມບັດ',
      projectDetails: 'ລາຍລະອຽດໂປຣເຈັກ',
      duration: 'ໄລຍະເວລາ',
      level: 'ລະດັບ',
      createdAt: 'ສ້າງເມື່ອ',
      viewCode: 'ເບິ່ງໂຄ້ດ',
      viewLive: 'ເບິ່ງເວັບໄຊທ໌',
      diploma: 'ຊັ້ນສູງ',
      bachelor: 'ປະລິນຍາຕີ'
    }
  }

  const currentContent = content[language]

  const breadcrumbItems = [
    { label: 'Projects', labelLao: 'ໂປຣເຈັກ', href: '/projects' },
    { label: project.title, labelLao: project.titleLao }
  ]

  const getLevelLabel = (level: string) => {
    if (level.startsWith('diploma')) {
      return `${currentContent.diploma} ${level.split('-')[1]}`
    }
    return `${currentContent.bachelor} ${level.split('-')[1]}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          {language === 'en' ? project.title : project.titleLao}
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground mb-6">
          {language === 'en' ? project.description : project.descriptionLao}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          {project.githubUrl && (
            <Link 
              href={project.githubUrl} 
              target="_blank"
              className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              <Github className="h-4 w-4 mr-2" />
              {currentContent.viewCode}
            </Link>
          )}
          {project.liveUrl && (
            <Link 
              href={project.liveUrl} 
              target="_blank"
              className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {currentContent.viewLive}
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-lg border p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
              <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              {currentContent.overview}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {language === 'en' ? project.longDescription : project.longDescriptionLao}
            </p>
          </div>

          <div className="bg-card rounded-lg border p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
              <Tag className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              {currentContent.features}
            </h2>
            <ul className="space-y-2 sm:space-y-3">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">
                    {language === 'en' ? feature.en : feature.lo}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="bg-card rounded-lg border p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center">
              <Code className="h-4 w-4 mr-2" />
              {currentContent.technologies}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="bg-secondary text-secondary-foreground px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-lg border p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-4">
              {currentContent.projectDetails}
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-muted-foreground font-medium">{currentContent.level}:</span>
                <span className="sm:text-right">{getLevelLabel(project.level)}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-muted-foreground font-medium">{currentContent.duration}:</span>
                <span className="sm:text-right">{project.duration}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-muted-foreground font-medium">{currentContent.createdAt}:</span>
                <span className="sm:text-right break-all">{new Date(project.createdAt).toLocaleDateString(language === 'en' ? 'en-US' : 'lo-LA')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}