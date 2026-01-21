import { useNavigate } from 'react-router-dom'
import type { MoviesResponse } from '@common/components/movie'
import { MovieCard, MovieCardSkeleton } from '@common/components/movie'
import { Button } from '@common/components/ui/button'
import styles from './MoviesSection.module.css'

type MoviesSectionProps = {
  title: string
  data?: MoviesResponse
  isLoading: boolean
  isError: boolean
  category: string
  limit?: number
}

export function MoviesSection({ 
  title, 
  data, 
  isLoading, 
  isError, 
  category,
  limit = 6 
}: MoviesSectionProps) {
  const navigate = useNavigate()

  const handleViewMore = () => {
    navigate(`/categories?category=${category}`)
  }

  if (isError || (!isLoading && !data?.results.length)) {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.error}>Не удалось загрузить фильмы</p>
      </section>
    )
  }

  const movies = data?.results.slice(0, limit) || []

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {!isLoading && (
          <Button onClick={handleViewMore} variant="outlined">
            Показать больше
          </Button>
        )}
      </div>
      
      <div className={styles.moviesGrid}>
        {isLoading
          ? Array.from({ length: limit }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))
          : movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
        }
      </div>
    </section>
  )
}
