import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@app/layout/Layout'
import { HomePage } from '@pages/home'
import { CategoriesPage } from '@pages/categories'
import { FilteredPage } from '@pages/filtered'
import { MovieDetailsPage } from '@pages/movie-details'
import { SearchPage } from '@pages/search'
import { FavoritesPage } from '@pages/favorites'
import { NotFoundPage } from '@pages/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'categories',
        element: <CategoriesPage />,
      },
      {
        path: 'filtered',
        element: <FilteredPage />,
      },
      {
        path: 'movie/:id',
        element: <MovieDetailsPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
