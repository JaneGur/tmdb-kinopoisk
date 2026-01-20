import { useAppSelector, useAppDispatch } from '@shared/lib/hooks'
import { selectFavorites, toggleFavorite } from '@features/favorites'
import { MovieCard } from '@entities/movie'
import { Button } from '@shared/ui/button'
import styles from './FavoritesPage.module.css'

export function FavoritesPage() {
  const favorites = useAppSelector(selectFavorites)
  const dispatch = useAppDispatch()

  const totalRating = favorites.length > 0
    ? (favorites.reduce((sum, movie) => sum + movie.vote_average, 0) / favorites.length).toFixed(1)
    : '0'

  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      favorites.forEach(movie => {
        // Создаем полный объект Movie для удаления
        const fullMovie = {
          ...movie,
          adult: false,
          backdrop_path: null,
          genre_ids: [],
          original_language: '',
          original_title: movie.title,
          overview: '',
          popularity: 0,
          video: false,
          vote_count: 0,
        }
        dispatch(toggleFavorite(fullMovie))
      })
    }
  }

  return (
    <div className={styles.container}>
      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>❤️</div>
          <h1>Your Favorites</h1>
          <p className={styles.emptyMessage}>
            No favorite movies yet
          </p>
          <p className={styles.emptyHint}>
            Start adding movies to your favorites by clicking the ❤️ button on any movie card
          </p>
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <div className={styles.titleSection}>
              <h1>Your Favorites</h1>
              <p className={styles.subtitle}>
                Movies you love in one place
              </p>
            </div>
            <Button
              variant="outlined"
              size="small"
              onClick={clearAllFavorites}
            >
              Clear All
            </Button>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{favorites.length}</span>
              <span className={styles.statLabel}>Movies</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>⭐ {totalRating}</span>
              <span className={styles.statLabel}>Avg Rating</span>
            </div>
          </div>

          <div className={styles.moviesGrid}>
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
