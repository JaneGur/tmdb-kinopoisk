import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@pages/home'
import { MovieDetailsPage } from '@pages/movie-details'
import { SearchPage } from '@pages/search'
import { FavoritesPage } from '@pages/favorites'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/movie/:id',
    element: <MovieDetailsPage />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
  {
    path: '/favorites',
    element: <FavoritesPage />,
  },
])
