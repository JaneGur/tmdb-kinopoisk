import styles from './Rating.module.css'

interface RatingProps {
  value: number
  size?: 'small' | 'medium' | 'large'
}

export function Rating({ value, size = 'small' }: RatingProps) {
  const percentage = Math.round(value * 10)
  
  // Определяем цвет в зависимости от рейтинга
  const getColor = () => {
    if (percentage >= 70) return '#21d07a' // Зеленый
    if (percentage >= 40) return '#d2d531' // Желтый
    return '#db2360' // Красный
  }

  const color = getColor()
  const circumference = 2 * Math.PI * 16 // radius = 16
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className={`${styles.rating} ${styles[size]}`}>
      <svg className={styles.circle} viewBox="0 0 36 36">
        {/* Background circle */}
        <circle
          className={styles.circleBackground}
          cx="18"
          cy="18"
          r="16"
        />
        {/* Progress circle */}
        <circle
          className={styles.circleProgress}
          cx="18"
          cy="18"
          r="16"
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <span className={styles.value}>{percentage}%</span>
    </div>
  )
}
