import { combineReducers } from '@reduxjs/toolkit'
import { baseApi } from '@shared/api/baseApi'
import { themeReducer } from '@features/theme'
import { favoritesReducer } from '@features/favorites'

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  theme: themeReducer,
  favorites: favoritesReducer,
})
