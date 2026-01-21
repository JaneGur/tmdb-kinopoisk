import { useState, useEffect } from 'react'
import { useGetGenresQuery } from '@features/movies'
import { Button } from '@common/components/ui/button'
import { DualRangeSlider } from '@common/components/ui/dual-range-slider'
import { useDebounce } from '@common/hooks/useDebounce'
import styles from './MovieFilters.module.css'

export type FilterValues = {
  sort_by: string
  with_genres: string
  'vote_average.gte': string
  'vote_average.lte': string
}

type MovieFiltersProps = {
  onFilterChange: (filters: FilterValues) => void
}

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Популярность ↓' },
  { value: 'popularity.asc', label: 'Популярность ↑' },
  { value: 'vote_average.desc', label: 'Рейтинг ↓' },
  { value: 'vote_average.asc', label: 'Рейтинг ↑' },
  { value: 'release_date.desc', label: 'Дата выхода ↓' },
  { value: 'release_date.asc', label: 'Дата выхода ↑' },
  { value: 'title.asc', label: 'Название А-Я' },
  { value: 'title.desc', label: 'Название Я-А' },
]

export function MovieFilters({ onFilterChange }: MovieFiltersProps) {
  const { data: genresData } = useGetGenresQuery()
  
  const [filters, setFilters] = useState<FilterValues>({
    sort_by: 'popularity.desc',
    with_genres: '',
    'vote_average.gte': '',
    'vote_average.lte': '',
  })

  // Локальное состояние для ползунков рейтинга (без debounce)
  const [localRatingMin, setLocalRatingMin] = useState<number>(0)
  const [localRatingMax, setLocalRatingMax] = useState<number>(10)

  // Debounced значения для рейтинга
  const debouncedRatingMin = useDebounce(localRatingMin, 200)
  const debouncedRatingMax = useDebounce(localRatingMax, 200)

  // Обновляем фильтры при изменении debounced значений рейтинга
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      'vote_average.gte': debouncedRatingMin > 0 ? String(debouncedRatingMin) : '',
      'vote_average.lte': debouncedRatingMax < 10 ? String(debouncedRatingMax) : '',
    }))
  }, [debouncedRatingMin, debouncedRatingMax])

  const handleSortChange = (value: string) => {
    setFilters(prev => ({ ...prev, sort_by: value }))
  }

  const handleGenreToggle = (genreId: string) => {
    setFilters(prev => {
      const currentGenres = prev.with_genres.split(',').filter(Boolean)
      const hasGenre = currentGenres.includes(genreId)
      
      const newGenres = hasGenre
        ? currentGenres.filter(id => id !== genreId)
        : [...currentGenres, genreId]
      
      return { ...prev, with_genres: newGenres.join(',') }
    })
  }

  const handleRatingMinChange = (value: number) => {
    // Минимум не может быть больше максимума
    if (value <= localRatingMax) {
      setLocalRatingMin(value)
    }
  }

  const handleRatingMaxChange = (value: number) => {
    // Максимум не может быть меньше минимума
    if (value >= localRatingMin) {
      setLocalRatingMax(value)
    }
  }

  const handleReset = () => {
    setFilters({
      sort_by: 'popularity.desc',
      with_genres: '',
      'vote_average.gte': '',
      'vote_average.lte': '',
    })
    setLocalRatingMin(0)
    setLocalRatingMax(10)
  }

  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  const selectedGenres = filters.with_genres.split(',').filter(Boolean)

  // Получаем названия выбранных жанров
  const selectedGenreNames = genresData?.genres
    .filter(g => selectedGenres.includes(String(g.id)))
    .map(g => g.name) || []

  // Проверяем, есть ли активные фильтры
  const hasActiveFilters = !!(
    filters.with_genres || 
    localRatingMin > 0 ||
    localRatingMax < 10
  )

  return (
    <aside className={styles.filters}>
      <div className={styles.header}>
        <h2>Фильтры</h2>
        <Button 
          variant="text" 
          size="small" 
          onClick={handleReset}
          disabled={!hasActiveFilters}
        >
          Сбросить
        </Button>
      </div>

      {/* Активные фильтры - сводка */}
      {hasActiveFilters && (
        <div className={styles.activeSummary}>
          <p className={styles.summaryTitle}>Применено:</p>
          <div className={styles.summaryList}>
            {selectedGenreNames.length > 0 && (
              <div className={styles.summaryItem}>
                <strong>Жанры:</strong> {selectedGenreNames.join(', ')}
              </div>
            )}
            {(localRatingMin > 0 || localRatingMax < 10) && (
              <div className={styles.summaryItem}>
                <strong>Рейтинг:</strong> {localRatingMin.toFixed(1)} - {localRatingMax.toFixed(1)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Сортировка */}
      <div className={styles.section}>
        <h3>Сортировка</h3>
        <select 
          value={filters.sort_by} 
          onChange={(e) => handleSortChange(e.target.value)}
          className={styles.select}
        >
          {SORT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Жанры */}
      <div className={styles.section}>
        <h3>Жанры</h3>
        <div className={styles.genreList}>
          {genresData?.genres.map(genre => (
            <button
              key={genre.id}
              className={`${styles.genreChip} ${
                selectedGenres.includes(String(genre.id)) ? styles.selected : ''
              }`}
              onClick={() => handleGenreToggle(String(genre.id))}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {/* Рейтинг */}
      <div className={styles.section}>
        <h3>Рейтинг</h3>
        <DualRangeSlider
          min={0}
          max={10}
          step={0.1}
          valueMin={localRatingMin}
          valueMax={localRatingMax}
          onMinChange={handleRatingMinChange}
          onMaxChange={handleRatingMaxChange}
        />
      </div>
    </aside>
  )
}
