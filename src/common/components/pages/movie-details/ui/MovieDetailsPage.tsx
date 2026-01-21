import { useParams, useNavigate } from 'react-router-dom'
import { useGetMovieDetailsQuery, useGetMovieCreditsQuery, useGetSimilarMoviesQuery } from '@features/movies'
import { useAppDispatch, useAppSelector } from '@common/hooks'
import { toggleFavorite, selectIsFavorite } from '@features/favorites'
import { getImageUrl, formatDate } from '@common/utils'
import { Button } from '@common/components/ui/button'
import { Rating } from '@common/components/ui/rating'
import { MovieCard } from '@common/components/movie'
import type { Movie } from '@common/components/movie'
import { MovieDetailsSkeleton } from './MovieDetailsSkeleton'
import styles from './MovieDetailsPage.module.css'

export function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  const movieId = Number(id)
  const { data: movie, isLoading, isError } = useGetMovieDetailsQuery(movieId)
  const { data: credits } = useGetMovieCreditsQuery(movieId)
  const { data: similarMovies } = useGetSimilarMoviesQuery({ movieId })
  const isFavorite = useAppSelector((state) => selectIsFavorite(state, movieId))

  const handleFavoriteClick = () => {
    if (!movie) return
    
    // Преобразуем MovieDetails в Movie для Redux
    const movieForToggle: Movie = {
      id: movie.id,
      title: movie.title,
      original_title: movie.original_title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      adult: movie.adult,
      genre_ids: movie.genres.map(g => g.id),
      original_language: movie.original_language,
      popularity: movie.popularity,
      video: false,
    }
    
    dispatch(toggleFavorite(movieForToggle))
  }

  const handleBack = () => {
    navigate(-1)
  }

  if (isLoading) {
    return <MovieDetailsSkeleton />
  }

  if (isError || !movie) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h1>Фильм не найден</h1>
          <p>Фильм, который вы ищете, не существует или был удален.</p>
          <Button onClick={handleBack}>Назад</Button>
        </div>
      </div>
    )
  }

  const posterUrl = movie.poster_path
    ? getImageUrl(movie.poster_path, 'w500')
    : 'https://placehold.co/500x750/e0e0e0/666666?text=No+Poster'

  const backdropUrl = movie.backdrop_path
    ? getImageUrl(movie.backdrop_path, 'original')
    : null

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'
  
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className={styles.container}>
      {/* Backdrop */}
      {backdropUrl && (
        <div 
          className={styles.backdrop}
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className={styles.backdropOverlay} />
        </div>
      )}

      {/* Content */}
      <div className={styles.content}>
        <Button 
          variant="outlined" 
          onClick={handleBack}
          className={styles.backButton}
        >
          ← Назад
        </Button>

        <div className={styles.movieInfo}>
          {/* Poster */}
          <div className={styles.posterSection}>
            <img
              src={posterUrl}
              alt={movie.title}
              className={styles.poster}
            />
            <Button
              variant={isFavorite ? 'primary' : 'outlined'}
              onClick={handleFavoriteClick}
              className={styles.favoriteButton}
            >
              {isFavorite ? '❤️ В избранном' : '🤍 Добавить в избранное'}
            </Button>
          </div>

          {/* Details */}
          <div className={styles.detailsSection}>
            <h1 className={styles.title}>{movie.title}</h1>
            
            {movie.tagline && (
              <p className={styles.tagline}>"{movie.tagline}"</p>
            )}

            <div className={styles.meta}>
              <span className={styles.year}>{year}</span>
              {movie.runtime > 0 && (
                <>
                  <span className={styles.separator}>•</span>
                  <span className={styles.runtime}>{formatRuntime(movie.runtime)}</span>
                </>
              )}
            </div>

            {/* Rating */}
            {movie.vote_average > 0 && (
              <div className={styles.ratingSection}>
                <Rating value={movie.vote_average} size="large" />
                <div className={styles.ratingInfo}>
                  <span className={styles.ratingValue}>
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className={styles.ratingCount}>
                    ({movie.vote_count.toLocaleString()} votes)
                  </span>
                </div>
              </div>
            )}

            {/* Genres */}
            {movie.genres.length > 0 && (
              <div className={styles.genresSection}>
                <h3>Жанры</h3>
                <div className={styles.genres}>
                  {movie.genres.map(genre => (
                    <span key={genre.id} className={styles.genre}>
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            {movie.overview && (
              <div className={styles.overviewSection}>
                <h3>Описание</h3>
                <p className={styles.overview}>{movie.overview}</p>
              </div>
            )}

            {/* Additional Info */}
            <div className={styles.additionalInfo}>
              {movie.status && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Статус:</span>
                  <span className={styles.infoValue}>{movie.status}</span>
                </div>
              )}
              {movie.original_language && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Оригинальный язык:</span>
                  <span className={styles.infoValue}>
                    {movie.original_language.toUpperCase()}
                  </span>
                </div>
              )}
              {movie.release_date && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Дата выхода:</span>
                  <span className={styles.infoValue}>
                    {formatDate(movie.release_date)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cast Section */}
        {credits && credits.cast.length > 0 && (
          <div className={styles.castSection}>
            <h2 className={styles.sectionTitle}>Актёрский состав</h2>
            <div className={styles.castGrid}>
              {credits.cast.slice(0, 6).map((actor) => {
                const profileUrl = actor.profile_path
                  ? getImageUrl(actor.profile_path, 'w185')
                  : 'https://placehold.co/185x278/e0e0e0/666666?text=No+Photo'

                return (
                  <div key={actor.cast_id} className={styles.actorCard}>
                    <img
                      src={profileUrl}
                      alt={actor.name}
                      className={styles.actorPhoto}
                    />
                    <div className={styles.actorInfo}>
                      <h4 className={styles.actorName}>{actor.name}</h4>
                      <p className={styles.characterName}>{actor.character}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Similar Movies Section */}
        {similarMovies && similarMovies.results.length > 0 && (
          <div className={styles.similarSection}>
            <h2 className={styles.sectionTitle}>Похожие фильмы</h2>
            <div className={styles.similarGrid}>
              {similarMovies.results.slice(0, 6).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
