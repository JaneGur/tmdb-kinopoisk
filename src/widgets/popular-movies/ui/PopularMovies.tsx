import { useNavigate } from 'react-router-dom'
import { useGetPopularMoviesQuery } from '@features/movies'
import { MovieCard } from '@entities/movie'
import { Button } from '@shared/ui/button'
import { Loader } from '@shared/ui/loader'
import styles from './PopularMovies.module.css'

export function PopularMovies() {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetPopularMoviesQuery(1)

  const handleViewMore = () => {
    navigate('/categories?category=popular')
  }

  if (isLoading) {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>Popular Movies</h2>
        <Loader size="large" />
      </section>
    )
  }

  if (isError || !data?.results.length) {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>Popular Movies</h2>
        <p className={styles.error}>Не удалось загрузить фильмы</p>
      </section>
    )
  }

  // Показываем только первые 6 фильмов
  const movies = data.results.slice(0, 6)

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Popular Movies</h2>
        <Button onClick={handleViewMore} variant="outlined">
          View More
        </Button>
      </div>
      
      <div className={styles.moviesGrid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}
