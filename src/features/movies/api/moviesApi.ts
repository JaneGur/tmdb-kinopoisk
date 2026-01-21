import { baseApi } from '@common/api/baseApi'
import { withZodCatch } from '@common/utils'
import type { 
  MoviesResponse, 
  SearchMoviesParams, 
  DiscoverMoviesParams,
  GenresResponse,
  MovieDetails,
  MovieCredits 
} from '@common/components/movie'
import {
  moviesResponseSchema,
  genresResponseSchema,
  movieDetailsSchema,
  movieCreditsSchema,
} from '@common/components/movie'

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MoviesResponse, number | void>({
      query: (page = 1) => ({
        url: '/movie/popular',
        params: {
          page,
          language: 'ru-RU',
        },
      }),
      ...withZodCatch(moviesResponseSchema),
      providesTags: ['Movies'],
    }),

    getTopRatedMovies: builder.query<MoviesResponse, number | void>({
      query: (page = 1) => ({
        url: '/movie/top_rated',
        params: {
          page,
          language: 'ru-RU',
        },
      }),
      ...withZodCatch(moviesResponseSchema),
      providesTags: ['Movies'],
    }),

    getUpcomingMovies: builder.query<MoviesResponse, number | void>({
      query: (page = 1) => ({
        url: '/movie/upcoming',
        params: {
          page,
          language: 'ru-RU',
        },
      }),
      ...withZodCatch(moviesResponseSchema),
      providesTags: ['Movies'],
    }),

    getNowPlayingMovies: builder.query<MoviesResponse, number | void>({
      query: (page = 1) => ({
        url: '/movie/now_playing',
        params: {
          page,
          language: 'ru-RU',
        },
      }),
      ...withZodCatch(moviesResponseSchema),
      providesTags: ['Movies'],
    }),

    searchMovies: builder.query<MoviesResponse, SearchMoviesParams>({
      query: ({ query, page = 1, include_adult = false, language = 'ru-RU', ...params }) => ({
        url: '/search/movie',
        params: {
          query,
          page,
          include_adult,
          language,
          ...params,
        },
      }),
      ...withZodCatch(moviesResponseSchema),
      providesTags: ['Search'],
    }),

    discoverMovies: builder.query<MoviesResponse, DiscoverMoviesParams>({
      query: (params) => ({
        url: '/discover/movie',
        params: {
          language: 'ru-RU',
          include_adult: false,
          include_video: false,
          ...params,
        },
      }),
      ...withZodCatch(moviesResponseSchema),
      providesTags: ['Discover'],
    }),

    getGenres: builder.query<GenresResponse, void>({
      query: () => ({
        url: '/genre/movie/list',
        params: {
          language: 'ru-RU',
        },
      }),
      ...withZodCatch(genresResponseSchema),
      providesTags: ['Genres'],
    }),

    getMovieDetails: builder.query<MovieDetails, number>({
      query: (movieId) => ({
        url: `/movie/${movieId}`,
        params: {
          language: 'ru-RU',
        },
      }),
      ...withZodCatch(movieDetailsSchema),
      providesTags: (_result, _error, movieId) => [{ type: 'MovieDetails', id: movieId }],
    }),

    getMovieCredits: builder.query<MovieCredits, number>({
      query: (movieId) => ({
        url: `/movie/${movieId}/credits`,
        params: {
          language: 'ru-RU',
        },
      }),
      ...withZodCatch(movieCreditsSchema),
      providesTags: (_result, _error, movieId) => [{ type: 'MovieCredits', id: movieId }],
    }),

    getSimilarMovies: builder.query<MoviesResponse, { movieId: number; page?: number }>({
      query: ({ movieId, page = 1 }) => ({
        url: `/movie/${movieId}/similar`,
        params: {
          language: 'ru-RU',
          page,
        },
      }),
      ...withZodCatch(moviesResponseSchema),
      providesTags: (_result, _error, { movieId }) => [{ type: 'SimilarMovies', id: movieId }],
    }),
  }),
})

export const { 
  useGetPopularMoviesQuery, 
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useSearchMoviesQuery,
  useDiscoverMoviesQuery,
  useGetGenresQuery,
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMoviesQuery,
} = moviesApi
