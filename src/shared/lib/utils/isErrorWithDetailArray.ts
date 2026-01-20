/**
 * Type guard для проверки ошибки с массивом details
 * Используется для обработки ошибок формата JSON:API
 * @param error - объект ошибки
 * @returns true если error содержит массив errors с полем detail
 */
export function isErrorWithDetailArray(error: unknown): error is { errors: { detail: string }[] } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'errors' in error &&
    Array.isArray((error as any).errors) &&
    (error as any).errors.length > 0 &&
    typeof (error as any).errors[0].detail === 'string'
  )
}
