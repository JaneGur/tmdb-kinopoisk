import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ENV } from '@shared/config/env'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.TMDB_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${ENV.TMDB_API_KEY}`)
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Movies', 'MovieDetails', 'Search'],
})
