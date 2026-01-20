import { WelcomeSection } from '@widgets/welcome-section'
import { MoviesSection } from '@widgets/movies-section'
import { 
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery
} from '@features/movies'
import styles from './HomePage.module.css'

export function HomePage() {
  const popularQuery = useGetPopularMoviesQuery(1)
  const topRatedQuery = useGetTopRatedMoviesQuery(1)
  const upcomingQuery = useGetUpcomingMoviesQuery(1)
  const nowPlayingQuery = useGetNowPlayingMoviesQuery(1)

  return (
    <div className={styles.container}>
      <WelcomeSection />
      
      <div className={styles.content}>
        <MoviesSection
          title="Popular Movies"
          category="popular"
          data={popularQuery.data}
          isLoading={popularQuery.isLoading}
          isError={popularQuery.isError}
        />

        <MoviesSection
          title="Top Rated Movies"
          category="top_rated"
          data={topRatedQuery.data}
          isLoading={topRatedQuery.isLoading}
          isError={topRatedQuery.isError}
        />

        <MoviesSection
          title="Upcoming Movies"
          category="upcoming"
          data={upcomingQuery.data}
          isLoading={upcomingQuery.isLoading}
          isError={upcomingQuery.isError}
        />

        <MoviesSection
          title="Now Playing"
          category="now_playing"
          data={nowPlayingQuery.data}
          isLoading={nowPlayingQuery.isLoading}
          isError={nowPlayingQuery.isError}
        />
      </div>
    </div>
  )
}
