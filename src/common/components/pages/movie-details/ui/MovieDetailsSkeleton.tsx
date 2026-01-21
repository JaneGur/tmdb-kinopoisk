import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MovieCardSkeleton } from '@common/components/movie'
import styles from './MovieDetailsPage.module.css'

/**
 * Скелетон для страницы детальной информации о фильме
 */
export function MovieDetailsSkeleton() {
  return (
    <div className={styles.container}>
      {/* Backdrop Skeleton */}
      <div className={styles.backdrop}>
        <Skeleton height="100%" />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <Skeleton width={120} height={40} style={{ marginBottom: 32 }} />

        <div className={styles.movieInfo}>
          {/* Poster Section */}
          <div className={styles.posterSection}>
            <Skeleton height={450} />
            <Skeleton height={48} style={{ marginTop: 16 }} />
          </div>

          {/* Details Section */}
          <div className={styles.detailsSection}>
            <Skeleton width="80%" height={40} style={{ marginBottom: 16 }} />
            <Skeleton width="60%" height={20} style={{ marginBottom: 16 }} />
            <Skeleton width="40%" height={20} style={{ marginBottom: 24 }} />
            
            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
              <Skeleton circle width={80} height={80} />
              <div>
                <Skeleton width={60} height={32} />
                <Skeleton width={120} height={16} style={{ marginTop: 8 }} />
              </div>
            </div>

            {/* Genres */}
            <Skeleton width={100} height={24} style={{ marginBottom: 12 }} />
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              <Skeleton width={80} height={32} />
              <Skeleton width={100} height={32} />
              <Skeleton width={90} height={32} />
            </div>

            {/* Overview */}
            <Skeleton width={120} height={24} style={{ marginBottom: 12 }} />
            <Skeleton count={4} style={{ marginBottom: 8 }} />

            {/* Additional Info */}
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--color-border)' }}>
              <Skeleton width={200} height={16} style={{ marginBottom: 8 }} />
              <Skeleton width={250} height={16} style={{ marginBottom: 8 }} />
              <Skeleton width={220} height={16} />
            </div>
          </div>
        </div>

        {/* Cast Section Skeleton */}
        <div className={styles.castSection}>
          <Skeleton width={200} height={32} style={{ marginBottom: 24 }} />
          <div className={styles.castGrid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className={styles.actorCard}>
                <Skeleton height={278} />
                <div style={{ padding: 16 }}>
                  <Skeleton width="100%" height={16} />
                  <Skeleton width="80%" height={14} style={{ marginTop: 8 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Movies Section Skeleton */}
        <div className={styles.similarSection}>
          <Skeleton width={200} height={32} style={{ marginBottom: 24 }} />
          <div className={styles.similarGrid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
