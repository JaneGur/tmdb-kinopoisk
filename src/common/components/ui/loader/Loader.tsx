import styles from './Loader.module.css'

type LoaderProps = {
  size?: 'small' | 'medium' | 'large'
}

export function Loader({ size = 'medium' }: LoaderProps) {
  return (
    <div className={`${styles.loader} ${styles[size]}`}>
      <div className={styles.spinner}></div>
    </div>
  )
}
