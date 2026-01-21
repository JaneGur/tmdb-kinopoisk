import styles from './LinearProgress.module.css'

/**
 * Компонент линейного прогресс-индикатора
 * Показывается в верхней части экрана при загрузке данных
 */
export function LinearProgress() {
  return (
    <div className={styles.container}>
      <div className={styles.bar} />
    </div>
  )
}
