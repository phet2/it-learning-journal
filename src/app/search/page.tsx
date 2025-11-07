'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/language-context'
import { useSearch } from '@/lib/hooks/use-search'
import { Search, BookOpen, FolderOpen, Calendar, Tag, Loader2, Filter, X } from 'lucide-react'
import Link from 'next/link'
export default function SearchPage() {
  const { language } = useLanguage()
  const { query, setQuery, results, isLoading, searchHistory, clearHistory } = useSearch()
  const [searchType, setSearchType] = useState<'all' | 'lessons' | 'projects'>('all')
  const [levelFilter, setLevelFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const content = {
    en: {
      title: 'Search',
      subtitle: 'Search lessons and projects',
      placeholder: 'Search lessons, projects, or technologies...',
      all: 'All',
      lessons: 'Lessons',
      projects: 'Projects',
      noResults: 'No results found',
      searchHint: 'Try searching with different keywords',
      results: 'Results',
      lesson: 'Lesson',
      project: 'Project',
      filters: 'Filters',
      level: 'Level',
      clearFilters: 'Clear Filters',
      popularTopics: 'Popular Topics',
      browseByLevel: 'Browse by Level', 
      items: 'items',
      recentSearches: 'Recent Searches',
      clearHistory: 'Clear History',
      quickStats: 'Quick Stats',
      topics: 'Topics',
      years: 'Years',
      levels: {
        'diploma-1': 'Diploma Year 1',
        'diploma-2': 'Diploma Year 2', 
        'diploma-3': 'Diploma Year 3',
        'bachelor-1': 'Bachelor Year 1',
        'bachelor-2': 'Bachelor Year 2'
      }
    },
    lo: {
      title: 'ຄົ້ນຫາ',
      subtitle: 'ຄົ້ນຫາບົດຮຽນແລະໂປຣເຈັກ',
      placeholder: 'ຄົ້ນຫາບົດຮຽນ, ໂປຣເຈັກ ຫຼື ເທັກໂນໂລຊີ...',
      all: 'ທັງໝົດ',
      lessons: 'ບົດຮຽນ',
      projects: 'ໂປຣເຈັກ',
      noResults: 'ບໍ່ພົບຜົນລັບ',
      searchHint: 'ລອງຄົ້ນຫາດ້ວຍຄຳອື່ນ',
      results: 'ຜົນລັບ',
      lesson: 'ບົດຮຽນ',
      project: 'ໂປຣເຈັກ',
      filters: 'ຕົວກອງ',
      level: 'ລະດັບ',
      clearFilters: 'ລຶບຕົວກອງ',
      popularTopics: 'ຫົວຂໍ້ຍອດນິຍອມ',
      browseByLevel: 'ເລືອກດູຕາມລະດັບ',
      items: 'ລາຍການ',
      recentSearches: 'ການຄົ້ນຫາລ່າສຸດ',
      clearHistory: 'ລຶບປະວັດ',
      quickStats: 'ສະຖິຕິດ່ວນ',
      topics: 'ຫົວຂໍ້',
      years: 'ປີ',
      levels: {
        'diploma-1': 'ຊັ້ນສູງ ປີ 1',
        'diploma-2': 'ຊັ້ນສູງ ປີ 2',
        'diploma-3': 'ຊັ້ນສູງ ປີ 3', 
        'bachelor-1': 'ປະລິນຍາຕີ ປີ 1',
        'bachelor-2': 'ປະລິນຍາຕີ ປີ 2'
      }
    }
  }

  const currentContent = content[!mounted ? 'en' : language]

  const filteredResults = results.filter(result => {
    const typeMatch = searchType === 'all' || result.type === searchType.slice(0, -1)
    const levelMatch = levelFilter === 'all' || result.level === levelFilter
    return typeMatch && levelMatch
  })

  const clearAllFilters = () => {
    setSearchType('all')
    setLevelFilter('all')
    setQuery('')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">{currentContent.title}</h1>
        <p className="text-xl text-muted-foreground">{currentContent.subtitle}</p>
      </div>

      {/* Search Form */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={currentContent.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
            autoComplete="off"
            spellCheck="false"
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
          {query && !isLoading && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search Type Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {(['all', 'lessons', 'projects'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSearchType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                searchType === type
                  ? 'bg-primary text-primary-foreground shadow-md scale-105'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105'
              }`}
            >
              {currentContent[type]}
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>{currentContent.filters}</span>
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-card rounded-lg border">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">{currentContent.level}:</label>
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="px-3 py-1 border rounded bg-background text-sm"
                >
                  <option value="all">{currentContent.all}</option>
                  {Object.entries(currentContent.levels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              
              {(levelFilter !== 'all' || searchType !== 'all' || query) && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center space-x-1 px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3 w-3" />
                  <span>{currentContent.clearFilters}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto">
        {(query || levelFilter !== 'all' || searchType !== 'all') && (
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{filteredResults.length} {currentContent.results}</span>
              {query && <span>for &ldquo;{query}&rdquo;</span>}
              {searchType !== 'all' && (
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                  {currentContent[searchType]}
                </span>
              )}
              {levelFilter !== 'all' && (
                <span className="bg-secondary px-2 py-1 rounded text-xs">
                  {currentContent.levels[levelFilter as keyof typeof currentContent.levels]}
                </span>
              )}
            </div>
          </div>
        )}

        {filteredResults.length === 0 && (query || levelFilter !== 'all' || searchType !== 'all') ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">{currentContent.noResults}</h3>
            <p className="text-muted-foreground mb-4">{currentContent.searchHint}</p>
            <button
              onClick={clearAllFilters}
              className="text-primary hover:underline text-sm"
            >
              {currentContent.clearFilters}
            </button>
          </div>
        ) : filteredResults.length > 0 ? (
          <div className="space-y-4">
            {filteredResults.map((result) => (
              <Link key={result.id} href={result.url} className="block">
                <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {result.type === 'lesson' ? (
                        <BookOpen className="h-5 w-5 text-blue-500" />
                      ) : (
                        <FolderOpen className="h-5 w-5 text-green-500" />
                      )}
                      <span className="text-sm text-muted-foreground">
                        {result.type === 'lesson' ? currentContent.lesson : currentContent.project}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {result.level && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {currentContent.levels[result.level as keyof typeof currentContent.levels]}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">
                    {(!mounted ? 'en' : language) === 'en' ? result.title : result.titleLao}
                  </h3>
                  
                  <p className="text-muted-foreground mb-3">
                    {(!mounted ? 'en' : language) === 'en' ? result.description : result.descriptionLao}
                  </p>

                  
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-wrap gap-1">
                      {result.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-secondary px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Popular searches and suggestions when no query
          <div className="space-y-8">
            {/* Recent Searches */}
            {searchHistory.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    {currentContent.recentSearches}
                  </h3>
                  <button
                    onClick={clearHistory}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {currentContent.clearHistory}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((historyItem, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(historyItem)}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-secondary/80 transition-colors"
                    >
                      {historyItem}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {currentContent.popularTopics}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {['React', 'JavaScript', 'PHP', 'Laravel', 'Next.js', 'TypeScript', 'Database', 'API'].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setQuery(topic)}
                    className="p-3 bg-card border rounded-lg hover:shadow-md hover:scale-105 transition-all duration-200 text-left group"
                  >
                    <div className="font-medium text-sm group-hover:text-primary transition-colors">{topic}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                {currentContent.browseByLevel}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(currentContent.levels).map(([key, label]) => {
                  const count = results.filter(r => r.level === key).length
                  const lessonCount = results.filter(r => r.level === key && r.type === 'lesson').length
                  const projectCount = results.filter(r => r.level === key && r.type === 'project').length
                  
                  return (
                    <button
                      key={key}
                      onClick={() => setLevelFilter(key)}
                      className="p-4 bg-card border rounded-lg hover:shadow-md transition-shadow text-left group"
                    >
                      <div className="font-medium mb-2 group-hover:text-primary transition-colors">{label}</div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">
                          {count} {currentContent.items}
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <BookOpen className="h-3 w-3" />
                            <span>{lessonCount}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FolderOpen className="h-3 w-3" />
                            <span>{projectCount}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
            
            {/* Quick Stats */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {(!mounted ? 'en' : language) === 'en' ? 'Quick Stats' : 'ສະຖິຕິດ່ວນ'}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card p-4 rounded-lg border text-center hover:shadow-md transition-shadow">
                  <BookOpen className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">{results.filter(r => r.type === 'lesson').length}</div>
                  <div className="text-sm text-muted-foreground">{currentContent.lessons}</div>
                </div>
                <div className="bg-card p-4 rounded-lg border text-center hover:shadow-md transition-shadow">
                  <FolderOpen className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">{results.filter(r => r.type === 'project').length}</div>
                  <div className="text-sm text-muted-foreground">{currentContent.projects}</div>
                </div>
                <div className="bg-card p-4 rounded-lg border text-center hover:shadow-md transition-shadow">
                  <Tag className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                  <div className="text-2xl font-bold">{new Set(results.flatMap(r => r.tags)).size}</div>
                  <div className="text-sm text-muted-foreground">{currentContent.topics}</div>
                </div>
                <div className="bg-card p-4 rounded-lg border text-center hover:shadow-md transition-shadow">
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-muted-foreground">{currentContent.years}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}