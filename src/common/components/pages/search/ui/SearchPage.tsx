import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearchMoviesQuery } from '@features/movies'
import { MovieCard, MovieCardSkeleton } from '@common/components/movie'
import { Button } from '@common/components/ui/button'
import styles from './SearchPage.module.css'

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
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
        <h1>Поиск фильмов</h1>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="search"
            value={localQuery}
            onChange={handleInputChange}
            placeholder="Введите название фильма..."
            className={styles.searchInput}
          />
          <Button
            type="submit"
            disabled={!localQuery.trim()}
            size="large"
          >
            Искать
          </Button>
        </form>
      </div>

      {/* Results */}
      <div className={styles.resultsSection}>
        {!queryFromUrl ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyMessage}>
              Введите название фильма для начала поиска
            </p>
          </div>
        ) : isError ? (
          <div className={styles.errorState}>
            <p className={styles.errorMessage}>
              Не удалось загрузить результаты поиска
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
              Не найдено совпадений для "{queryFromUrl}"
            </p>
            <p className={styles.noResultsHint}>
              Попробуйте другие ключевые слова или проверьте правописание
            </p>
          </div>
        ) : (
          <>
            <div className={styles.resultsHeader}>
              <h2>Результаты для "{queryFromUrl}"</h2>
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
                  ← Назад
                </Button>

                <span className={styles.pageInfo}>
                  Страница {page}
                </span>

                <Button
                  onClick={handleNextPage}
                  disabled={page >= data.total_pages || isLoading}
                  variant="outlined"
                >
                  Вперёд →
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
