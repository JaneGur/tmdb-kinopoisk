import { useEffect, useRef, useState } from 'react'
import styles from './DualRangeSlider.module.css'

type DualRangeSliderProps = {
  min: number
  max: number
  step: number
  valueMin: number
  valueMax: number
  onMinChange: (value: number) => void
  onMaxChange: (value: number) => void
}

export function DualRangeSlider({
  min,
  max,
  step,
  valueMin,
  valueMax,
  onMinChange,
  onMaxChange,
}: DualRangeSliderProps) {
  const [isDraggingMin, setIsDraggingMin] = useState(false)
  const [isDraggingMax, setIsDraggingMax] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  // Вычисляем проценты для визуализации
  const minPercent = ((valueMin - min) / (max - min)) * 100
  const maxPercent = ((valueMax - min) / (max - min)) * 100

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDraggingMin(false)
      setIsDraggingMax(false)
    }

    document.addEventListener('mouseup', handleMouseUp)
    return () => document.removeEventListener('mouseup', handleMouseUp)
  }, [])

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    if (value <= valueMax) {
      onMinChange(value)
    }
  }

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    if (value >= valueMin) {
      onMaxChange(value)
    }
  }

  return (
    <div className={styles.container}>
      {/* Отображение значений */}
      <div className={styles.values}>
        <div className={styles.valueBox}>
          <span className={styles.valueLabel}>От</span>
          <span className={styles.valueNumber}>{valueMin.toFixed(1)}</span>
        </div>
        <div className={styles.valueBox}>
          <span className={styles.valueLabel}>До</span>
          <span className={styles.valueNumber}>{valueMax.toFixed(1)}</span>
        </div>
      </div>

      {/* Слайдер */}
      <div className={styles.sliderContainer} ref={trackRef}>
        {/* Трек (фон) */}
        <div className={styles.track}>
          {/* Активная область между ползунками */}
          <div
            className={styles.activeTrack}
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
        </div>

        {/* Минимальный ползунок */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMin}
          onChange={handleMinInputChange}
          onMouseDown={() => setIsDraggingMin(true)}
          className={`${styles.slider} ${styles.sliderMin} ${isDraggingMin ? styles.dragging : ''}`}
          style={{ zIndex: valueMin > max - (max - min) / 2 ? 5 : 3 }}
        />

        {/* Максимальный ползунок */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMax}
          onChange={handleMaxInputChange}
          onMouseDown={() => setIsDraggingMax(true)}
          className={`${styles.slider} ${styles.sliderMax} ${isDraggingMax ? styles.dragging : ''}`}
          style={{ zIndex: valueMax < (max - min) / 2 ? 5 : 3 }}
        />

        {/* Thumbs визуализация */}
        <div
          className={`${styles.thumb} ${isDraggingMin ? styles.thumbActive : ''}`}
          style={{ left: `${minPercent}%` }}
        />
        <div
          className={`${styles.thumb} ${isDraggingMax ? styles.thumbActive : ''}`}
          style={{ left: `${maxPercent}%` }}
        />
      </div>

      {/* Метки на шкале */}
      <div className={styles.labels}>
        <span>{min}</span>
        <span>{(min + max) / 2}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}
