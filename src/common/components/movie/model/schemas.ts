import { z } from 'zod'

/**
 * Схема для валидации Movie объекта
 */
export const movieSchema = z.object({
  id: z.number(),
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
})

/**
 * Схема для валидации ответа со списком фильмов
 */
export const moviesResponseSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
})

/**
 * Схема для валидации жанра
 */
export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
})

/**
 * Схема для валидации ответа с жанрами
 */
export const genresResponseSchema = z.object({
  genres: z.array(genreSchema),
})

/**
 * Схема для валидации production company
 */
export const productionCompanySchema = z.object({
  id: z.number(),
  name: z.string(),
  logo_path: z.string().nullable(),
})

/**
 * Схема для валидации production country
 */
export const productionCountrySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
})

/**
 * Схема для валидации spoken language
 */
export const spokenLanguageSchema = z.object({
  iso_639_1: z.string(),
  name: z.string(),
})

/**
 * Схема для валидации детальной информации о фильме
 */
export const movieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  original_title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string(),
  runtime: z.number(),
  vote_average: z.number(),
  vote_count: z.number(),
  genres: z.array(genreSchema),
  adult: z.boolean(),
  budget: z.number(),
  revenue: z.number(),
  status: z.string(),
  tagline: z.string(),
  homepage: z.string(),
  imdb_id: z.string(),
  original_language: z.string(),
  popularity: z.number(),
  production_companies: z.array(productionCompanySchema),
  production_countries: z.array(productionCountrySchema),
  spoken_languages: z.array(spokenLanguageSchema),
})

/**
 * Схема для валидации актера
 */
export const castMemberSchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  cast_id: z.number(),
  character: z.string(),
  credit_id: z.string(),
  order: z.number(),
})

/**
 * Схема для валидации члена съемочной группы
 */
export const crewMemberSchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  credit_id: z.string(),
  department: z.string(),
  job: z.string(),
})

/**
 * Схема для валидации credits (актеры и crew)
 */
export const movieCreditsSchema = z.object({
  id: z.number(),
  cast: z.array(castMemberSchema),
  crew: z.array(crewMemberSchema),
})
