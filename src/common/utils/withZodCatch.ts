import { errorToast } from './errorToast'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { ZodType } from 'zod'

/**
 * Утилита для обертки Zod схемы с обработкой ошибок валидации
 * @param schema - Zod схема для валидации ответа
 * @returns объект с responseSchema и catchSchemaFailure для RTK Query
 */
export const withZodCatch = <T extends ZodType>(schema: T) => ({
  responseSchema: schema,
  catchSchemaFailure: (err: any): FetchBaseQueryError => {
    errorToast('Zod validation error. Details in the console', err.issues)
    return {
      status: 'CUSTOM_ERROR',
      error: 'Schema validation failed',
    }
  },
})
