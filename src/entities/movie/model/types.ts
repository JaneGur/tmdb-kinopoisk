export interface Movie {
  id: number
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface MoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface SearchMoviesParams {
  query: string
  include_adult?: boolean
  language?: string
  primary_release_year?: string
  page?: number
  region?: string
  year?: string
}

export interface DiscoverMoviesParams {
  page?: number
  language?: string
  sort_by?: string
  include_adult?: boolean
  include_video?: boolean
  primary_release_year?: number
  'primary_release_date.gte'?: string
  'primary_release_date.lte'?: string
  'release_date.gte'?: string
  'release_date.lte'?: string
  'vote_average.gte'?: number
  'vote_average.lte'?: number
  'vote_count.gte'?: number
  with_genres?: string
  with_original_language?: string
  year?: number
  'with_runtime.gte'?: number
  'with_runtime.lte'?: number
}

export interface Genre {
  id: number
  name: string
}

export interface GenresResponse {
  genres: Genre[]
}

export interface MovieDetails {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  runtime: number
  vote_average: number
  vote_count: number
  genres: Genre[]
  adult: boolean
  budget: number
  revenue: number
  status: string
  tagline: string
  homepage: string
  imdb_id: string
  original_language: string
  popularity: number
  production_companies: Array<{
    id: number
    name: string
    logo_path: string | null
  }>
  production_countries: Array<{
    iso_3166_1: string
    name: string
  }>
  spoken_languages: Array<{
    iso_639_1: string
    name: string
  }>
}

export interface CastMember {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface CrewMember {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  credit_id: string
  department: string
  job: string
}

export interface MovieCredits {
  id: number
  cast: CastMember[]
  crew: CrewMember[]
}
