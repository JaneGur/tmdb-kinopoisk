import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useSearchMoviesQuery } from '@features/movies'
import { MovieCard, MovieCardSkeleton } from '@entities/movie'
import { Button } from '@shared/ui/button'
import styles from './SearchPage.module.css'

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const queryFromUrl = searchParams.get('query') || ''
  
  const [localQuery, setLocalQuery] = useState(queryFromUrl)
  const [page, setPage] = useState(1)

  // Синхронизируем локальный query с URL
  useEffect(() => {
    setLocalQuery(queryFromUrl)
    setPage(1)
  }, [queryFromUrl])

  const { data, isLoading, isError } = useSearchMoviesQuery(
    { query: queryFromUrl, page },
    { skip: !queryFromUrl }
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (localQuery.trim()) {
      setSearchParams({ query: localQuery.trim() })
      setPage(1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalQuery(value)
    
    // Если поле очищено (крестик), сбрасываем поиск
    if (!value) {
      setSearchParams({})
      setPage(1)
    }
  }

  const handleClear = () => {
    setLocalQuery('')
    setSearchParams({})
    setPage(1)
  }

  const handlePrevPage = () => {
    setPage(prev => Math.max(1, prev - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNextPage = () => {
    setPage(prev => prev + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles.container}>
      {/* Search Form */}
      <div className={styles.searchSection}>
        <h1>Search Movies</h1>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="search"
            value={localQuery}
            onChange={handleInputChange}
            placeholder="Enter movie title..."
            className={styles.searchInput}
          />
          <Button
            type="submit"
            disabled={!localQuery.trim()}
            size="large"
          >
            Search
          </Button>
        </form>
      </div>

      {/* Results */}
      <div className={styles.resultsSection}>
        {!queryFromUrl ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyMessage}>
              Enter a movie title to start searching
            </p>
          </div>
        ) : isError ? (
          <div className={styles.errorState}>
            <p className={styles.errorMessage}>
              Failed to load search results
            </p>
          </div>
        ) : isLoading && page === 1 ? (
          <div className={styles.moviesGrid}>
            {Array.from({ length: 20 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
          </div>
        ) : data?.results.length === 0 ? (
          <div className={styles.noResults}>
            <p className={styles.noResultsMessage}>
              No matches found for "{queryFromUrl}"
            </p>
            <p className={styles.noResultsHint}>
              Try different keywords or check your spelling
            </p>
          </div>
        ) : (
          <>
            <div className={styles.resultsHeader}>
              <h2>Results for "{queryFromUrl}"</h2>
              <p className={styles.resultsCount}>
                Found: {data?.total_results?.toLocaleString('en-US')} movies
              </p>
            </div>

            <div className={styles.moviesGrid}>
              {data?.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Pagination */}
            {data && data.total_pages > 1 && (
              <div className={styles.pagination}>
                <Button
                  onClick={handlePrevPage}
                  disabled={page === 1 || isLoading}
                  variant="outlined"
                >
                  ← Previous
                </Button>

                <span className={styles.pageInfo}>
                  Page {page} of {data.total_pages}
                </span>

                <Button
                  onClick={handleNextPage}
                  disabled={page >= data.total_pages || isLoading}
                  variant="outlined"
                >
                  Next →
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
