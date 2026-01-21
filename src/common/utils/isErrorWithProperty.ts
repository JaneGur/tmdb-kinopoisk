/**
 * Универсальная дженериковая функция для проверки наличия свойства в ошибке
 * @param error - объект ошибки
 * @param property - название свойства для проверки
 * @returns true если error содержит указанное свойство типа string
 */
export function isErrorWithProperty<T extends string>(
  error: unknown,
  property: T
): error is Record<T, string> {
  return (
    typeof error === 'object' &&
    error != null &&
    property in error &&
    typeof (error as Record<string, unknown>)[property] === 'string'
  )
}
