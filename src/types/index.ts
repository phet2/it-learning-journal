export interface Course {
  id: string;
  title: string;
  titleLao: string;
  description: string;
  descriptionLao: string;
  level: 'diploma-1' | 'diploma-2' | 'diploma-3' | 'bachelor-1' | 'bachelor-2';
  semester: number;
  year: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  titleLao: string;
  slug: string;
  description: string;
  descriptionLao: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  titleLao: string;
  description: string;
  descriptionLao: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  level: 'diploma-1' | 'diploma-2' | 'diploma-3' | 'bachelor-1' | 'bachelor-2';
  createdAt: string;
}