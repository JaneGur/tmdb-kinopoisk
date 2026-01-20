import { useState, useCallback } from 'react'
import { useDiscoverMoviesQuery } from '@features/movies'
import { MovieCard, MovieCardSkeleton } from '@entities/movie'
import { MovieFilters, type FilterValues } from '@widgets/movie-filters'
import { Button } from '@shared/ui/button'
import styles from './FilteredPage.module.css'

export function FilteredPage() {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<FilterValues>({
    sort_by: 'popularity.desc',
    with_genres: '',
    'vote_average.gte': '',
    'vote_average.lte': '',
  })

  const handleFilterChange = useCallback((newFilters: FilterValues) => {
    setFilters(newFilters)
    setPage(1) // Сбрасываем страницу при смене фильтров
  }, [])

  // Преобразуем фильтры в параметры API
  const apiParams = {
    page,
    sort_by: filters.sort_by,
    ...(filters.with_genres && { with_genres: filters.with_genres }),
    ...(filters['vote_average.gte'] && { 
      'vote_average.gte': Number(filters['vote_average.gte']) 
    }),
    ...(filters['vote_average.lte'] && { 
      'vote_average.lte': Number(filters['vote_average.lte']) 
    }),
  }

  // Отладка: показываем параметры API в консоли
  console.log('🎬 API Параметры:', apiParams)

  const { data, isLoading, isError } = useDiscoverMoviesQuery(apiParams)

  // Подсчет активных фильтров (кроме сортировки)
  const activeFiltersCount = [
    filters.with_genres,
    filters['vote_average.gte'] || filters['vote_average.lte'],
  ].filter(Boolean).length

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
      <div className={styles.layout}>
        {/* Sidebar с фильтрами */}
        <MovieFilters onFilterChange={handleFilterChange} />

        {/* Контент */}
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.titleRow}>
              <h1>Фильтрация фильмов</h1>
              {activeFiltersCount > 0 && (
                <span className={styles.filtersBadge}>
                  {activeFiltersCount} {activeFiltersCount === 1 ? 'фильтр' : 'фильтра'}
                </span>
              )}
            </div>
            <p className={styles.info}>
              {isLoading && page === 1 
                ? 'Загрузка...' 
                : `Найдено: ${data?.total_results?.toLocaleString('ru-RU') || 0} фильмов · Страница ${page} из ${data?.total_pages || 0}`
              }
            </p>
          </div>

          {/* Результаты */}
          {isError ? (
            <p className={styles.error}>Не удалось загрузить фильмы</p>
          ) : (
            <>
              <div className={styles.moviesGrid}>
                {isLoading && page === 1
                  ? Array.from({ length: 20 }).map((_, index) => (
                      <MovieCardSkeleton key={index} />
                    ))
                  : data?.results && data.results.length > 0 ? (
                      data.results.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))
                    ) : !isLoading ? (
                      <p className={styles.empty}>
                        По выбранным фильтрам ничего не найдено. Попробуйте изменить параметры поиска.
                      </p>
                    ) : null
                }
              </div>

              {data?.results && data.results.length > 0 && (
                <div className={styles.pagination}>
                  <Button 
                    onClick={handlePrevPage} 
                    disabled={page === 1 || isLoading}
                    variant="outlined"
                  >
                    ← Предыдущая
                  </Button>
                  
                  <span className={styles.pageInfo}>
                    Страница {page}
                  </span>
                  
                  <Button 
                    onClick={handleNextPage} 
                    disabled={page >= (data?.total_pages || 0) || isLoading}
                    variant="outlined"
                  >
                    Следующая →
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
