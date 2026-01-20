import type { RootState } from '@app/store'
import { useSelector } from 'react-redux'

/**
 * Хук для отслеживания глобального состояния загрузки
 * Проверяет все активные запросы и мутации RTK Query
 * @returns true если есть активные запросы/мутации
 */
export const useGlobalLoading = () => {
  return useSelector((state: RootState) => {
    // Получаем все активные запросы из RTK Query API
    const queries = Object.values(state.api.queries || {})
    const mutations = Object.values(state.api.mutations || {})

    // Проверяем, есть ли активные запросы (статус 'pending')
    const hasActiveQueries = queries.some(query => query?.status === 'pending')
    const hasActiveMutations = mutations.some(mutation => mutation?.status === 'pending')

    return hasActiveQueries || hasActiveMutations
  })
}
