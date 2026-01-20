import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetPopularMoviesQuery } from '@features/movies'
import { getImageUrl } from '@shared/lib/utils'
import { Button } from '@shared/ui/button'
import styles from './WelcomeSection.module.css'

export function WelcomeSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { data, isLoading } = useGetPopularMoviesQuery()

  // Выбираем случайный backdrop из популярных фильмов
  const randomBackdrop = useMemo(() => {
    if (!data?.results?.length) return null
    const moviesWithBackdrop = data.results.filter(movie => movie.backdrop_path)
    if (!moviesWithBackdrop.length) return null
    const randomMovie = moviesWithBackdrop[Math.floor(Math.random() * moviesWithBackdrop.length)]
    return randomMovie.backdrop_path
  }, [data])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const backgroundImage = randomBackdrop 
    ? getImageUrl(randomBackdrop, 'original')
    : undefined

  return (
    <section 
      className={styles.welcomeSection}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>Добро пожаловать</h1>
        <p className={styles.subtitle}>
          Миллионы фильмов, сериалов и людей. Исследуйте сейчас.
        </p>
        
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Поиск фильма..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            type="submit"
            disabled={!searchQuery.trim() || isLoading}
            className={styles.searchButton}
          >
            Search
          </Button>
        </form>
      </div>
    </section>
  )
}
