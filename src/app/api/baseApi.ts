import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ENV } from '@common/config/env.ts'
import { handleErrors } from '@common/utils'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: ENV.TMDB_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set('Authorization', `Bearer ${ENV.TMDB_API_KEY}`)
        headers.set('Content-Type', 'application/json')
        return headers
      },
    })(args, api, extraOptions)

    // Глобальная обработка ошибок
    if (result.error) {
      handleErrors(result.error)
    }

    return result
  },
  endpoints: () => ({}),
  tagTypes: ['Movies', 'MovieDetails', 'MovieCredits', 'SimilarMovies', 'Search', 'Discover', 'Genres'],
})
