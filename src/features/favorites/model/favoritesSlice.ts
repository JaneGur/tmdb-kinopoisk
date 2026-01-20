import { createSlice } from '@reduxjs/toolkit'
import type { Movie } from '@entities/movie'

// Минимальный набор данных для хранения в localStorage
export interface FavoriteMovie {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
  release_date: string
}

interface FavoritesState {
  items: FavoriteMovie[]
}

const getInitialFavorites = (): FavoriteMovie[] => {
  const saved = localStorage.getItem('favorites')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return []
    }
  }
  return []
}

const initialState: FavoritesState = {
  items: getInitialFavorites(),
}

// Преобразуем Movie в FavoriteMovie (только нужные поля)
const toFavoriteMovie = (movie: Movie): FavoriteMovie => ({
  id: movie.id,
  title: movie.title,
  poster_path: movie.poster_path,
  vote_average: movie.vote_average,
  release_date: movie.release_date,
})

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: { payload: Movie }) => {
      const exists = state.items.find(item => item.id === action.payload.id)
      if (!exists) {
        state.items.push(toFavoriteMovie(action.payload))
        localStorage.setItem('favorites', JSON.stringify(state.items))
      }
    },
    removeFromFavorites: (state, action: { payload: number }) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      localStorage.setItem('favorites', JSON.stringify(state.items))
    },
    toggleFavorite: (state, action: { payload: Movie }) => {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      if (index >= 0) {
        state.items.splice(index, 1)
      } else {
        state.items.push(toFavoriteMovie(action.payload))
      }
      localStorage.setItem('favorites', JSON.stringify(state.items))
    },
  },
})

export const { addToFavorites, removeFromFavorites, toggleFavorite } = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer
