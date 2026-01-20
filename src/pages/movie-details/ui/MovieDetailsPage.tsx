import { useParams } from 'react-router-dom'
import styles from './MovieDetailsPage.module.css'

export function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className={styles.container}>
      <h1>Детали фильма</h1>
      <p>ID фильма: {id}</p>
    </div>
  )
}
