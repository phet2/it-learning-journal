'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-muted-foreground mb-4">404</div>
        <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">
          Sorry, the page you are looking for does not exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}