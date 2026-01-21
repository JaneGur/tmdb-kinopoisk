import { ENV } from '@common/config/env'

/**
 * Получить полный URL изображения из TMDB
 */
export function getImageUrl(path: string | null, size: string = 'original'): string {
  if (!path) return '/placeholder.jpg'
  return `${ENV.TMDB_IMAGE_BASE_URL}/${size}${path}`
}

/**
 * Форматирование даты
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Форматирование рейтинга
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

// Error handling utilities
export { errorToast } from './errorToast'
export { successToast } from './successToast'
export { handleErrors } from './handleErrors'
export { isErrorWithProperty } from './isErrorWithProperty'
export { isErrorWithDetailArray } from './isErrorWithDetailArray'
export { trimToMaxLength } from './trimToMaxLength'
export { withZodCatch } from './withZodCatch'
