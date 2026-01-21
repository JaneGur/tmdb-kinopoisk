import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MovieCardSkeleton } from '@common/components/movie'
import styles from './MoviesSection.module.css'

/**
 * Скелетон для секции с фильмами
 */
export function MoviesSectionSkeleton() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <Skeleton width={200} height={32} />
      </div>
      <div className={styles.moviesGrid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
      <div className={styles.footer}>
        <Skeleton width={120} height={40} />
      </div>
    </section>
  )
}
