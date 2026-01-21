import { toast } from 'react-toastify'

/**
 * Показывает toast с сообщением об ошибке
 * @param message - текст ошибки для пользователя
 * @param error - опциональный объект ошибки для логирования в консоль
 */
export const errorToast = (message: string, error?: unknown) => {
  toast(message, { theme: 'colored', type: 'error' })

  if (error) {
    console.error(`${message}\n`, error)
  }
}
