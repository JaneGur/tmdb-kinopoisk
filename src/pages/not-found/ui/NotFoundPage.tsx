import { useNavigate } from 'react-router-dom'
import { Button } from '@shared/ui/button'
import styles from './NotFoundPage.module.css'

/**
 * Страница 404 - Не найдено
 * Показывается для несуществующих роутов
 */
export function NotFoundPage() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.description}>
          Oops! The page you're looking for doesn't exist.
          <br />
          It might have been moved or deleted.
        </p>
        
        <div className={styles.actions}>
          <Button onClick={handleGoHome} size="large">
            Go to Home
          </Button>
          <Button onClick={handleGoBack} variant="outlined" size="large">
            Go Back
          </Button>
        </div>

        {/* Decorative elements */}
        <div className={styles.illustration}>
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Film reel */}
            <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="4" opacity="0.2" />
            <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="4" opacity="0.2" />
            <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="4" opacity="0.2" />
            
            {/* Film holes */}
            <circle cx="100" cy="40" r="8" fill="currentColor" opacity="0.3" />
            <circle cx="100" cy="160" r="8" fill="currentColor" opacity="0.3" />
            <circle cx="40" cy="100" r="8" fill="currentColor" opacity="0.3" />
            <circle cx="160" cy="100" r="8" fill="currentColor" opacity="0.3" />
            
            {/* X mark */}
            <line x1="70" y1="70" x2="130" y2="130" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <line x1="130" y1="70" x2="70" y2="130" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}
