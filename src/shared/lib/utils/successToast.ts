import { toast } from 'react-toastify'

/**
 * Показывает toast с сообщением об успехе
 * @param message - текст сообщения для пользователя
 */
export const successToast = (message: string) => {
  toast(message, { theme: 'colored', type: 'success' })
}
