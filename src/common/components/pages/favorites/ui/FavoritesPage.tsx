import { useAppSelector, useAppDispatch } from '@common/hooks'
import { selectFavorites, toggleFavorite } from '@features/favorites'
import {MovieCard, type Movie} from '@common/components/movie'
import {Button} from '@common/components/ui/button'
import styles from './FavoritesPage.module.css'

export function FavoritesPage() {
  const favorites = useAppSelector(selectFavorites)
  const dispatch = useAppDispatch()

  const clearAllFavorites = () => {
    if (window.confirm('Вы уверены, что хотите удалить все избранные фильмы?')) {
      favorites.forEach((movie) => {
        // Создаем полный объект Movie для удаления
        const fullMovie: Movie = {
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
              <h1>Ваше избранное</h1>
              <p className={styles.emptyMessage}>
                Пока нет избранных фильмов
              </p>
              <p className={styles.emptyHint}>
                Добавьте фильмы в избранное, чтобы увидеть их на этой странице.
              </p>
            </div>
        ) : (
            <>
              <div className={styles.header}>
                <div className={styles.titleSection}>
                  <h1>Ваше избранное</h1>
                  <p className={styles.subtitle}>
                    Ваши любимые фильмы в одном месте
                  </p>
                </div>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={clearAllFavorites}
                >
                  Очистить всё
                </Button>
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
