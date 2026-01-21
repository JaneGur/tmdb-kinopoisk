import { Outlet } from 'react-router-dom'
import { Header } from '@common/components/widgets/header'
import { Footer } from '@common/components/widgets/footer'
import styles from './Layout.module.css'

export function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
