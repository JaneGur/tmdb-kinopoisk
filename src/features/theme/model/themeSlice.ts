import { createSlice } from '@reduxjs/toolkit'

export type Theme = 'light' | 'dark'

type ThemeState = {
  current: Theme
}

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem('theme') as Theme | null
  if (savedTheme) return savedTheme
  
  // Проверяем системные настройки
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  
  return 'light'
}

const initialState: ThemeState = {
  current: getInitialTheme(),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.current = state.current === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.current)
      document.documentElement.setAttribute('data-theme', state.current)
    },
    setTheme: (state, action: { payload: Theme }) => {
      state.current = action.payload
      localStorage.setItem('theme', action.payload)
      document.documentElement.setAttribute('data-theme', action.payload)
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export const themeReducer = themeSlice.reducer
