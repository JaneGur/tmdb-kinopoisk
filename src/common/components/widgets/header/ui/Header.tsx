import { Link, NavLink } from 'react-router-dom'
import { ROUTES } from '@common/constants'
import { ThemeToggle } from '@features/theme/ui/ThemeToggle'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to={ROUTES.HOME} className={styles.logoLink}>
          <img 
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
            alt="TMDB Logo"
            className={styles.logo}
          />
        </Link>

        <nav className={styles.nav}>
          <NavLink 
            to={ROUTES.HOME} 
            className={({ isActive }) => 
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Главная
          </NavLink>
          <NavLink 
            to={ROUTES.CATEGORIES} 
            className={({ isActive }) => 
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Категории
          </NavLink>
          <NavLink 
            to={ROUTES.FILTERED} 
            className={({ isActive }) => 
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Фильтры
          </NavLink>
          <NavLink 
            to={ROUTES.SEARCH} 
            className={({ isActive }) => 
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Поиск
          </NavLink>
          <NavLink 
            to={ROUTES.FAVORITES} 
            className={({ isActive }) => 
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Избранное
          </NavLink>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  )
}
