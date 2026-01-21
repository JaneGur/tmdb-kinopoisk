/**
 * Обрезает строку до максимальной длины
 * @param str - строка для обрезки
 * @param maxLength - максимальная длина (по умолчанию 100)
 * @returns обрезанная строка с многоточием или исходная строка
 */
export function trimToMaxLength(str: string, maxLength = 100): string {
  return str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str
}
