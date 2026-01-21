import { Routes, Route } from 'react-router-dom'
import { Layout } from '@app/layout/Layout'
import { HomePage } from '@common/components/pages/home'
import { CategoriesPage } from '@common/components/pages/categories'
import { FilteredPage } from '@common/components/pages/filtered'
import { MovieDetailsPage } from '@common/components/pages/movie-details'
import { SearchPage } from '@common/components/pages/search'
import { FavoritesPage } from '@common/components/pages/favorites'
import { NotFoundPage } from '@common/components/pages/not-found'

export const Path = {
  Main: '/',
  Categories: '/categories',
  Filtered: '/filtered',
  MovieDetails: '/movie/:id',
  Search: '/search',
  Favorites: '/favorites',
  NotFound: '*',
} as const

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="categories" element={<CategoriesPage />} />
      <Route path="filtered" element={<FilteredPage />} />
      <Route path="movie/:id" element={<MovieDetailsPage />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="favorites" element={<FavoritesPage />} />
      <Route path={Path.NotFound} element={<NotFoundPage />} />
    </Route>
  </Routes>
)
