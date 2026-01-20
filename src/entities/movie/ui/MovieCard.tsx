import { useNavigate } from 'react-router-dom'
import type { Movie } from '@entities/movie'
import type { FavoriteMovie } from '@features/favorites'
import { getImageUrl } from '@shared/lib/utils'
import { Card } from '@shared/ui/card'
import { Rating } from '@shared/ui/rating'
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks'
import { toggleFavorite, selectIsFavorite } from '@features/favorites'
import styles from './MovieCard.module.css'

// Базовый интерфейс с полями, необходимыми для отображения
interface MovieCardData {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
  release_date: string
}

interface MovieCardProps {
  movie: Movie | FavoriteMovie | MovieCardData
}

export function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isFavorite = useAppSelector((state) => selectIsFavorite(state, movie.id))

  const handleClick = () => {
    navigate(`/movie/${movie.id}`)
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    
    // Преобразуем в Movie с минимальными необходимыми полями
    const movieForToggle: Movie = {
      ...movie,
      // Добавляем недостающие поля с дефолтными значениями
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
    
    dispatch(toggleFavorite(movieForToggle))
  }

  const posterUrl = movie.poster_path 
    ? getImageUrl(movie.poster_path, 'w500')
    : 'https://placehold.co/500x750/e0e0e0/666666?text=No+Poster'

  return (
    <Card className={styles.movieCard} onClick={handleClick}>
      <div className={styles.posterWrapper}>
        <img
          src={posterUrl}
          alt={movie.title}
          className={styles.poster}
          loading="lazy"
        />
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
          <span className={styles.heartIcon}>
            {isFavorite ? '❤️' : '🤍'}
          </span>
        </button>
        {movie.vote_average > 0 && (
          <div className={styles.ratingBadge}>
            <Rating value={movie.vote_average} size="small" />
          </div>
        )}
      </div>
      <div className={styles.movieInfo}>
        <h3 className={styles.movieTitle}>{movie.title}</h3>
        <p className={styles.releaseDate}>
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </p>
      </div>
    </Card>
  )
}
