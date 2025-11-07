export const coursesData = {
  diploma: {
    'year-1': {
      title: 'Diploma Year 1',
      titleLao: 'ຊັ້ນສູງ ປີທີ 1',
      year: '2019-2020',
      courses: [
        {
          id: 'basic-programming',
          title: 'Basic Programming',
          titleLao: 'ການຂຽນໂປຣແກຣມເບື້ອງຕົ້ນ',
          description: 'Learn programming fundamentals',
          descriptionLao: 'ຮຽນຮູ້ພື້ນຖານການຂຽນໂປຣແກຣມ',
          technologies: ['C', 'Algorithm'],
          lessons: 12,
          credits: 3
        },
        {
          id: 'computer-fundamentals',
          title: 'Computer Fundamentals',
          titleLao: 'ພື້ນຖານຄອມພິວເຕີ',
          description: 'Basic knowledge about computers',
          descriptionLao: 'ຄວາມຮູ້ພື້ນຖານກ່ຽວກັບຄອມພິວເຕີ',
          technologies: ['Hardware', 'Software'],
          lessons: 8,
          credits: 2
        },
        {
          id: 'html-css',
          title: 'HTML and CSS',
          titleLao: 'HTML ແລະ CSS',
          description: 'Create websites with HTML and CSS',
          descriptionLao: 'ການສ້າງເວັບໄຊທ໌ດ້ວຍ HTML ແລະ CSS',
          technologies: ['HTML', 'CSS'],
          lessons: 15,
          credits: 3
        }
      ]
    },
    'year-2': {
      title: 'Diploma Year 2',
      titleLao: 'ຊັ້ນສູງ ປີທີ 2',
      year: '2020-2021',
      courses: [
        {
          id: 'javascript-basics',
          title: 'JavaScript Basics',
          titleLao: 'JavaScript ເບື້ອງຕົ້ນ',
          description: 'Learn JavaScript for web development',
          descriptionLao: 'ຮຽນຮູ້ JavaScript ສຳລັບເວັບໄຊທ໌',
          technologies: ['JavaScript', 'DOM'],
          lessons: 18,
          credits: 4
        },
        {
          id: 'php-mysql',
          title: 'PHP and MySQL',
          titleLao: 'PHP ແລະ MySQL',
          description: 'Web development with PHP and database',
          descriptionLao: 'ການພັດທະນາເວັບໄຊທ໌ດ້ວຍ PHP ແລະຖານຂໍ້ມູນ',
          technologies: ['PHP', 'MySQL'],
          lessons: 20,
          credits: 4
        }
      ]
    },
    'year-3': {
      title: 'Diploma Year 3',
      titleLao: 'ຊັ້ນສູງ ປີທີ 3',
      year: '2021-2022',
      courses: [
        {
          id: 'project-development',
          title: 'Project Development',
          titleLao: 'ການພັດທະນາໂປຣເຈັກ',
          description: 'Final project development',
          descriptionLao: 'ໂປຣເຈັກຈົບການສຶກສາ',
          technologies: ['PHP', 'MySQL', 'Bootstrap'],
          lessons: 25,
          credits: 6
        }
      ]
    }
  },
  bachelor: {
    'year-1': {
      title: 'Bachelor Year 1',
      titleLao: 'ປະລິນຍາຕີ ປີທີ 1',
      year: '2022-2023',
      courses: [
        {
          id: 'react-fundamentals',
          title: 'React Fundamentals',
          titleLao: 'React ເບື້ອງຕົ້ນ',
          description: 'Learn React for Frontend development',
          descriptionLao: 'ຮຽນຮູ້ React ສຳລັບການພັດທະນາ Frontend',
          technologies: ['React', 'JavaScript', 'JSX'],
          lessons: 22,
          credits: 4
        },
        {
          id: 'nodejs-express',
          title: 'Node.js and Express',
          titleLao: 'Node.js ແລະ Express',
          description: 'Backend development with Node.js',
          descriptionLao: 'ການພັດທະນາ Backend ດ້ວຍ Node.js',
          technologies: ['Node.js', 'Express', 'MongoDB'],
          lessons: 20,
          credits: 4
        }
      ]
    },
    'year-2': {
      title: 'Bachelor Year 2',
      titleLao: 'ປະລິນຍາຕີ ປີທີ 2',
      year: '2023-2024',
      courses: [
        {
          id: 'nextjs-advanced',
          title: 'Next.js Advanced',
          titleLao: 'Next.js ຂັ້ນສູງ',
          description: 'Web application development with Next.js',
          descriptionLao: 'ການພັດທະນາເວັບແອັບພລິເຄຊັນດ້ວຍ Next.js',
          technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
          lessons: 18,
          credits: 4
        }
      ]
    }
  }
}