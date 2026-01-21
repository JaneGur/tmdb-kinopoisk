import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './MovieCard.module.css'

/**
 * Скелетон для карточки фильма
 * Используется при загрузке списков фильмов
 */
export function MovieCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Skeleton height="100%" />
      </div>
      <div className={styles.info}>
        <Skeleton width="80%" height={20} />
        <Skeleton width="40%" height={16} style={{ marginTop: 8 }} />
        <Skeleton circle width={40} height={40} style={{ marginTop: 8 }} />
      </div>
    </div>
  )
}
