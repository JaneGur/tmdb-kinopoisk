import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { errorToast } from './errorToast'
import { isErrorWithProperty } from './isErrorWithProperty'
import { isErrorWithDetailArray } from './isErrorWithDetailArray'
import { trimToMaxLength } from './trimToMaxLength'


export const handleErrors = (error: FetchBaseQueryError) => {
  if (!error) return

  switch (error.status) {
    // Ошибки сети, парсинга, кастомные и таймаут
    case 'FETCH_ERROR':
    case 'PARSING_ERROR':
    case 'CUSTOM_ERROR':
    case 'TIMEOUT_ERROR':
      errorToast(error.error)
      break

    // Ошибки валидации и доступа
    case 400:
    case 403:
      if (isErrorWithDetailArray(error.data)) {
        errorToast(trimToMaxLength(error.data.errors[0].detail))
      } else {
        errorToast(JSON.stringify(error.data))
      }
      break

    // Ресурс не найден
    case 404:
      if (isErrorWithProperty(error.data, 'status_message')) {
        errorToast(error.data.status_message)
      } else if (isErrorWithProperty(error.data, 'error')) {
        errorToast(error.data.error)
      } else {
        errorToast('Resource not found')
      }
      break

    // Ошибки авторизации и rate limit
    case 401:
    case 429:
      if (isErrorWithProperty(error.data, 'status_message')) {
        errorToast(error.data.status_message)
      } else if (isErrorWithProperty(error.data, 'message')) {
        errorToast(error.data.message)
      } else {
        errorToast('Authentication error or rate limit exceeded')
      }
      break

    // Серверные ошибки и прочие
    default:
      if (typeof error.status === 'number' && error.status >= 500 && error.status < 600) {
        errorToast('Server error occurred. Please try again later.', error)
      } else {
        errorToast('Some error occurred')
      }
  }
}
