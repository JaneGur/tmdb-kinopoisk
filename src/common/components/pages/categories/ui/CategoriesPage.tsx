import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { 
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery
} from '@features/movies'
import { MovieCard, MovieCardSkeleton } from '@common/components/movie'
import { Button } from '@common/components/ui/button'
import styles from './CategoriesPage.module.css'

const CATEGORIES = [
  { id: 'popular', label: 'Популярные' },
  { id: 'top_rated', label: 'Лучшие' },
  { id: 'upcoming', label: 'Скоро' },
  { id: 'now_playing', label: 'В прокате' },
] as const

const CATEGORY_TITLES: Record<string, string> = {
  popular: 'Популярные фильмы',
  top_rated: 'Лучшие фильмы',
  upcoming: 'Скоро выйдут',
  now_playing: 'Сейчас в прокате',
}

export function CategoriesPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const category = searchParams.get('category') || 'popular'
  const [page, setPage] = useState(1)

  // Сбрасываем страницу при смене категории
  useEffect(() => {
    setPage(1)
  }, [category])

  // Выбираем нужный хук в зависимости от категории
  const popularQuery = useGetPopularMoviesQuery(page, { skip: category !== 'popular' })
  const topRatedQuery = useGetTopRatedMoviesQuery(page, { skip: category !== 'top_rated' })
  const upcomingQuery = useGetUpcomingMoviesQuery(page, { skip: category !== 'upcoming' })
  const nowPlayingQuery = useGetNowPlayingMoviesQuery(page, { skip: category !== 'now_playing' })

  const queryMap = {
    popular: popularQuery,
    top_rated: topRatedQuery,
    upcoming: upcomingQuery,
    now_playing: nowPlayingQuery,
  }

  const currentQuery = queryMap[category as keyof typeof queryMap] || popularQuery
  const { data, isLoading, isError } = currentQuery

  const title = CATEGORY_TITLES[category] || 'Movies'

  const handleCategoryChange = (newCategory: string) => {
    navigate(`/categories?category=${newCategory}`)
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
      {/* Category Tabs */}
      <div className={styles.categoryTabs}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.categoryTab} ${category === cat.id ? styles.active : ''}`}
            onClick={() => handleCategoryChange(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Category Title */}
      <div className={styles.header}>
        <h1>{title}</h1>
        <p className={styles.info}>
          {isLoading && page === 1 ? 'Загрузка...' : `Страница ${page}`}
        </p>
      </div>

      {/* Content */}
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
                  <p className={styles.empty}>Фильмы не найдены</p>
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
  )
}
