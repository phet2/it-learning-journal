export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: url,
    })
  }
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export function trackSearch(query: string, results: number) {
  trackEvent('search', 'engagement', query, results)
}

export function trackLessonView(lessonId: string, lessonTitle: string) {
  trackEvent('lesson_view', 'content', lessonTitle)
}

export function trackProjectView(projectId: string, projectTitle: string) {
  trackEvent('project_view', 'content', projectTitle)
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}