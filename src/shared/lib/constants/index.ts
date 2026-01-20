export const IMAGE_SIZES = {
  POSTER: {
    SMALL: 'w185',
    MEDIUM: 'w342',
    LARGE: 'w500',
    ORIGINAL: 'original',
  },
  BACKDROP: {
    SMALL: 'w300',
    MEDIUM: 'w780',
    LARGE: 'w1280',
    ORIGINAL: 'original',
  },
} as const

export const ROUTES = {
  HOME: '/',
  MOVIE: '/movie',
  CATEGORIES: '/categories',
  FILTERED: '/filtered',
  SEARCH: '/search',
  FAVORITES: '/favorites',
} as const
