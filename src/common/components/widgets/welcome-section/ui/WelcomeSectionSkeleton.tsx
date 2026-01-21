import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './WelcomeSection.module.css'

/**
 * Скелетон для Welcome Section
 */
export function WelcomeSectionSkeleton() {
  return (
    <section className={styles.welcome}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <Skeleton width={300} height={40} style={{ marginBottom: 16 }} />
          <Skeleton width={400} height={20} style={{ marginBottom: 32 }} />
          <div className={styles.searchForm}>
            <Skeleton height={50} style={{ flex: 1 }} />
            <Skeleton width={120} height={50} />
          </div>
        </div>
      </div>
    </section>
  )
}
