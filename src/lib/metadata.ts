import { Metadata } from 'next'

export const defaultMetadata: Metadata = {
  title: {
    default: 'IT Learning',
    template: '%s | IT Learning'
  },
  description: '5-Year IT Learning Journey - Collection of lessons, code, and projects from 3 years of Diploma and 2 years of Bachelor studies',
  keywords: ['IT', 'Programming', 'Learning', 'Education', 'React', 'JavaScript', 'Next.js'],
  authors: [{ name: 'IT Student' }],
  creator: 'IT Student',
  publisher: 'IT Learning',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://it-learning-journal.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://it-learning-journal.vercel.app',
    title: 'IT Learning',
    description: '5-Year IT Learning Journey',
    siteName: 'IT Learning',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Learning',
    description: '5-Year IT Learning Journey',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}