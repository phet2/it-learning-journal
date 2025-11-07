export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="bg-card rounded-lg border p-6 animate-pulse">
      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded"></div>
        <div className="h-3 bg-muted rounded w-5/6"></div>
      </div>
    </div>
  )
}