# 🎬 TMDB Kinopoisk App

Современное веб-приложение для поиска и просмотра информации о фильмах, построенное на основе [The Movie Database (TMDB) API](https://www.themoviedb.org/).

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat&logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.5-764ABC?style=flat&logo=redux)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=flat&logo=vite)

---

## 📋 Содержание

- [О проекте](#о-проекте)
- [Технологический стек](#технологический-стек)
- [Функциональность](#функциональность)
- [Установка и запуск](#установка-и-запуск)
- [Структура проекта](#структура-проекта)
- [API интеграция](#api-интеграция)
- [Страницы приложения](#страницы-приложения)
- [Компоненты](#компоненты)
- [Особенности реализации](#особенности-реализации)
- [Обработка ошибок](#обработка-ошибок)
- [Темная/Светлая тема](#темнаясветлая-тема)
- [Производительность](#производительность)
- [Лицензия](#лицензия)

---

## 🎯 О проекте

**TMDB Kinopoisk App** — это полнофункциональное приложение для просмотра информации о фильмах с возможностями:
- Просмотра популярных, топ-рейтинговых, предстоящих и текущих фильмов
- Поиска фильмов по названию
- Фильтрации и сортировки по различным критериям
- Просмотра детальной информации о фильмах, актерах и похожих фильмах
- Управления списком избранных фильмов
- Переключения между темной и светлой темами

**Демо:** [https://tmdb-kinopoisk.vercel.app/](https://tmdb-kinopoisk.vercel.app/)

---

## 🛠 Технологический стек

### **Frontend**
- **[React 18.3](https://react.dev/)** — UI библиотека
- **[TypeScript 5.6](https://www.typescriptlang.org/)** — типизация
- **[Vite 7.3](https://vite.dev/)** — сборщик и dev-сервер

### **State Management**
- **[Redux Toolkit 2.5](https://redux-toolkit.js.org/)** — управление состоянием
- **[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)** — работа с API
- **Redux Slices** — изолированные модули состояния (theme, favorites)

### **Routing**
- **[React Router 7.5](https://reactrouter.com/)** — навигация

### **Styling**
- **CSS Modules** — изолированные стили
- **CSS Variables** — темизация
- **Responsive Design** — адаптивная верстка

### **Validation & Error Handling**
- **[Zod 3.24](https://zod.dev/)** — валидация схем API
- **[React Toastify 11.0](https://fkhadra.github.io/react-toastify/)** — уведомления об ошибках

### **UI/UX**
- **[React Loading Skeleton 3.5](https://github.com/dvtng/react-loading-skeleton)** — скелетоны загрузки
- **Custom Components** — кастомные UI компоненты

### **Architecture**
- **[Feature-Sliced Design (FSD)](https://feature-sliced.design/)** — архитектура проекта

---

## ✨ Функциональность

### 🏠 **Главная страница**
- Welcome Section с поиском фильмов
- Рандомный backdrop из популярных фильмов
- 4 категории фильмов: Popular, Top Rated, Upcoming, Now Playing
- По 6 карточек в каждой категории
- Кнопки "View More" для каждой категории

### 🎭 **Карточка фильма**
- Постер фильма (с заглушкой при отсутствии)
- Название и рейтинг
- Визуальный индикатор рейтинга
- Кнопка добавления в избранное (❤️)
- Клик по карточке → переход на детальную страницу

### 📑 **Страница категорий**
- 4 кнопки категорий (Popular / Top Rated / Upcoming / Now Playing)
- Активная категория визуально выделена
- URL меняется при переключении категории
- Пагинация (Prev/Next)
- Состояние сохраняется при перезагрузке

### 🔍 **Страница поиска**
- Поиск фильмов по названию
- Кнопка поиска (disabled если поле пустое)
- Состояния:
  - Начальное: "Enter a movie title to start searching"
  - Нет результатов: "No matches found for \"{query}\""
  - Результаты: карточки фильмов
- Пагинация
- Кнопка "X" сбрасывает поиск

### 🎛 **Страница фильтрации**
- **Сортировка** (sort_by):
  - По популярности (убывание/возрастание)
  - По рейтингу (убывание/возрастание)
  - По дате выпуска (убывание/возрастание)
  - По названию (А-Я / Я-А)
- **Фильтры**:
  - По рейтингу (0-10, шаг 0.1, debounce 200ms)
  - По жанрам (множественный выбор)
- Кнопка "Reset" для сброса всех фильтров
- Пагинация

### 🎥 **Страница детальной информации о фильме**
- **Блок 1: Основная информация**
  - Большой постер
  - Название и год выпуска
  - Рейтинг с визуальным индикатором
  - Жанры
  - Продолжительность
  - Описание фильма
  - Кнопка добавления в избранное
- **Блок 2: Актеры**
  - Топ-6 актеров в главных ролях
  - Фото актера (с заглушкой при отсутствии)
  - Реальное имя
  - Имя персонажа
- **Блок 3: Похожие фильмы**
  - Минимум 6 карточек похожих фильмов
- **Кнопка "Back"** - возврат на предыдущую страницу

### ❤️ **Страница избранных**
- Список избранных фильмов
- Статистика (количество фильмов, средний рейтинг)
- Кнопка "Clear All" для очистки
- Данные хранятся в localStorage

### 🌓 **Темная/Светлая тема**
- Переключатель в Header
- Тема сохраняется в localStorage
- Применяется ко всем страницам
- Плавные переходы между темами

### 🚫 **Страница 404**
- Красивая страница для несуществующих роутов
- Кнопки "Go to Home" и "Go Back"
- Анимации появления
- TMDB градиент

---

## 🚀 Установка и запуск

### **Предварительные требования**
- Node.js >= 18.x
- npm >= 9.x

### **1. Клонирование репозитория**
```bash
git clone https://github.com/yourusername/tmdb-kinopoisk-app.git
cd tmdb-kinopoisk-app
```

### **2. Установка зависимостей**
```bash
npm install
```

### **3. Настройка окружения**

Создайте файл `.env` в корне проекта:

```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_ACCESS_TOKEN=your_access_token_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

**Где получить ключи:**
1. Зарегистрируйтесь на [TMDB](https://www.themoviedb.org/)
2. Перейдите в [API Settings](https://www.themoviedb.org/settings/api)
3. Скопируйте:
   - **API Key** → `VITE_TMDB_API_KEY`
   - **API Read Access Token** → `VITE_TMDB_ACCESS_TOKEN`

### **4. Запуск приложения**

**Development режим:**
```bash
npm run dev
```

Приложение будет доступно по адресу: `http://localhost:5173`

**Production сборка:**
```bash
npm run build
npm run preview
```

---

## 📁 Структура проекта

Проект следует архитектуре **Feature-Sliced Design (FSD)**:

```
src/
├── app/                      # Инициализация приложения
│   ├── layout/              # Общий Layout
│   ├── router/              # Настройка роутинга
│   ├── store/               # Redux store
│   └── styles/              # Глобальные стили
│
├── pages/                    # Страницы приложения
│   ├── home/                # Главная страница
│   ├── categories/          # Страница категорий
│   ├── filtered/            # Страница фильтрации
│   ├── search/              # Страница поиска
│   ├── favorites/           # Страница избранных
│   ├── movie-details/       # Детальная страница фильма
│   └── not-found/           # Страница 404
│
├── widgets/                  # Составные блоки
│   ├── header/              # Шапка сайта
│   ├── footer/              # Подвал сайта
│   ├── welcome-section/     # Welcome секция
│   ├── movies-section/      # Секция с фильмами
│   └── movie-filters/       # Фильтры фильмов
│
├── features/                 # Бизнес-логика
│   ├── movies/              # API работы с фильмами
│   ├── theme/               # Управление темой
│   └── favorites/           # Управление избранными
│
├── entities/                 # Бизнес-сущности
│   └── movie/               # Сущность "Фильм"
│       ├── model/           # Типы и схемы
│       └── ui/              # UI компоненты
│
└── shared/                   # Переиспользуемые модули
    ├── api/                 # Базовая настройка API
    ├── config/              # Конфигурация
    ├── lib/                 # Утилиты и хуки
    │   ├── hooks/           # Custom hooks
    │   ├── utils/           # Вспомогательные функции
    │   └── constants/       # Константы
    └── ui/                  # UI-kit компоненты
        ├── button/
        ├── card/
        ├── rating/
        ├── linear-progress/
        └── dual-range-slider/
```

### **Сегменты FSD**
- **ui** — UI компоненты, стили, форматеры
- **api** — Взаимодействие с backend, типы данных
- **model** — Модель данных, схемы, store, бизнес-логика
- **lib** — Библиотечный код для слайса
- **config** — Конфигурация и feature flags

---

## 🌐 API интеграция

### **TMDB API v3**

Приложение использует следующие endpoints:

#### **Movies**
```typescript
GET /movie/popular           // Популярные фильмы
GET /movie/top_rated         // Топ-рейтинговые фильмы
GET /movie/upcoming          // Предстоящие фильмы
GET /movie/now_playing       // Фильмы в прокате
GET /movie/{id}              // Детали фильма
GET /movie/{id}/credits      // Актеры и съемочная группа
GET /movie/{id}/similar      // Похожие фильмы
```

#### **Search & Discover**
```typescript
GET /search/movie            // Поиск фильмов
GET /discover/movie          // Фильтрация и сортировка
GET /genre/movie/list        // Список жанров
```

### **RTK Query Setup**

```typescript
// src/shared/api/baseApi.ts
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
  tagTypes: ['Movies', 'MovieDetails', 'Search', 'Discover', 'Genres'],
})
```

### **Валидация с Zod**

Все API ответы валидируются с помощью Zod:

```typescript
// src/entities/movie/model/schemas.ts
export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  vote_average: z.number(),
  // ...
})

// Использование в API
getPopularMovies: builder.query<MoviesResponse, number | void>({
  query: (page = 1) => ({ url: '/movie/popular', params: { page } }),
  ...withZodCatch(moviesResponseSchema),
})
```

---

## 📄 Страницы приложения

### **1. Home Page** (`/`)
- Welcome Section с поиском
- 4 секции категорий фильмов
- Каждая секция: заголовок, 6 карточек, кнопка "View More"

### **2. Categories Page** (`/categories?category=popular`)
- Переключение между категориями
- URL параметр: `?category=popular|top_rated|upcoming|now_playing`
- Пагинация
- Сохранение состояния при перезагрузке

### **3. Filtered Page** (`/filtered`)
- Левая панель: фильтры и сортировка
- Правая панель: результаты
- Параметры в URL
- Пагинация

### **4. Search Page** (`/search?query=...`)
- Строка поиска
- Результаты поиска
- URL параметр: `?query=...&page=1`
- Пагинация

### **5. Favorites Page** (`/favorites`)
- Список избранных фильмов
- Статистика
- Кнопка "Clear All"
- Данные из localStorage

### **6. Movie Details Page** (`/movie/:id`)
- Информация о фильме
- Актеры (топ-6)
- Похожие фильмы (топ-6)
- Кнопка "Back"

### **7. Not Found Page** (`*`)
- Страница 404
- Кнопки навигации
- Анимации

---

## 🧩 Компоненты

### **Shared UI Components**

#### **Button**
```typescript
<Button 
  variant="primary" | "secondary" | "outlined" | "text"
  size="small" | "medium" | "large"
  disabled={boolean}
  onClick={handler}
>
  Click me
</Button>
```

#### **Card**
```typescript
<Card>
  <Card.Image src="..." alt="..." />
  <Card.Title>Title</Card.Title>
  <Card.Content>Content</Card.Content>
</Card>
```

#### **Rating**
```typescript
<Rating value={7.5} maxValue={10} />
```

#### **DualRangeSlider**
```typescript
<DualRangeSlider
  min={0}
  max={10}
  step={0.1}
  minValue={minRating}
  maxValue={maxRating}
  onChange={(min, max) => setRating({ min, max })}
/>
```

#### **LinearProgress**
```typescript
// Автоматически показывается при RTK Query запросах
<LinearProgress />
```

### **Entity Components**

#### **MovieCard**
```typescript
<MovieCard movie={movieData} />
```

#### **MovieCardSkeleton**
```typescript
<MovieCardSkeleton />
```

### **Widget Components**

#### **Header**
- Логотип TMDB
- Навигация (5 пунктов)
- Переключатель темы

#### **Footer**
- Copyright информация
- TMDB attribution

#### **WelcomeSection**
- Рандомный backdrop
- Поиск фильмов

#### **MoviesSection**
```typescript
<MoviesSection
  title="Popular Movies"
  data={moviesData}
  isLoading={isLoading}
  isError={isError}
  category="popular"
  limit={6}
/>
```

#### **MovieFilters**
```typescript
<MovieFilters
  onFiltersChange={(filters) => handleFilters(filters)}
/>
```

---

## 🎨 Особенности реализации

### **1. Глобальное состояние загрузки**

Автоматическое отображение `LinearProgress` при любых RTK Query запросах:

```typescript
// src/shared/lib/hooks/useGlobalLoading.ts
export const useGlobalLoading = () => {
  return useSelector((state: RootState) => {
    const queries = Object.values(state.api.queries || {})
    const mutations = Object.values(state.api.mutations || {})
    
    const hasActiveQueries = queries.some(query => query?.status === 'pending')
    const hasActiveMutations = mutations.some(mutation => mutation?.status === 'pending')
    
    return hasActiveQueries || hasActiveMutations
  })
}
```

### **2. Skeleton Loaders**

Использование `react-loading-skeleton` для всех страниц:

```typescript
{isLoading && page === 1 ? (
  Array.from({ length: 20 }).map((_, index) => (
    <MovieCardSkeleton key={index} />
  ))
) : (
  data?.results.map(movie => <MovieCard key={movie.id} movie={movie} />)
)}
```

### **3. Debounced Search**

Оптимизация поисковых запросов:

```typescript
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  
  return debouncedValue
}

// Использование
const debouncedMinRating = useDebounce(minRating, 200)
```

### **4. URL State Management**

Синхронизация фильтров с URL:

```typescript
const [searchParams, setSearchParams] = useSearchParams()

// Чтение
const category = searchParams.get('category') || 'popular'
const page = Number(searchParams.get('page')) || 1

// Запись
setSearchParams({ category: 'top_rated', page: '1' })
```

### **5. LocalStorage Persistence**

Сохранение темы и избранных фильмов:

```typescript
// Theme
const savedTheme = localStorage.getItem('theme') as Theme | null
const initialState: ThemeState = { theme: savedTheme || 'dark' }

// Favorites
const savedFavorites = localStorage.getItem('favorites')
const initialState: FavoritesState = {
  favorites: savedFavorites ? JSON.parse(savedFavorites) : [],
}
```

### **6. Responsive Images**

Использование TMDB Image CDN с разными размерами:

```typescript
export const getImageUrl = (
  path: string | null,
  size: 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'
): string => {
  if (!path) return 'https://placehold.co/500x750/e0e0e0/666666?text=No+Poster'
  return `${ENV.TMDB_IMAGE_BASE_URL}/${size}${path}`
}
```

---

## 🚨 Обработка ошибок

### **Глобальная обработка**

Централизованная обработка всех типов ошибок:

```typescript
// src/shared/lib/utils/handleErrors.ts
export const handleErrors = (error: FetchBaseQueryError) => {
  switch (error.status) {
    case 'FETCH_ERROR':
    case 'PARSING_ERROR':
      errorToast(error.error)
      break
      
    case 404:
      if (isErrorWithProperty(error.data, 'status_message')) {
        errorToast(error.data.status_message)
      }
      break
      
    case 401:
    case 429:
      // Rate limit или авторизация
      errorToast('Authentication error or rate limit exceeded')
      break
      
    default:
      if (error.status >= 500 && error.status < 600) {
        errorToast('Server error occurred. Please try again later.')
      }
  }
}
```

### **Валидация с Zod**

Автоматическая валидация всех API ответов:

```typescript
export const withZodCatch = <T extends ZodType>(schema: T) => ({
  responseSchema: schema,
  catchSchemaFailure: (err: any): FetchBaseQueryError => {
    errorToast('Zod validation error. Details in the console', err.issues)
    return {
      status: 'CUSTOM_ERROR',
      error: 'Schema validation failed',
    }
  },
})
```

### **Type Guards**

Безопасная работа с неизвестными типами ошибок:

```typescript
export function isErrorWithProperty<T extends string>(
  error: unknown,
  property: T
): error is Record<T, string> {
  return (
    typeof error === 'object' &&
    error != null &&
    property in error &&
    typeof (error as Record<string, unknown>)[property] === 'string'
  )
}
```

### **Toast Notifications**

Пользовательские уведомления с React Toastify:

```typescript
export const errorToast = (message: string, error?: unknown) => {
  toast(message, { theme: 'colored', type: 'error' })
  if (error) console.error(`${message}\n`, error)
}

export const successToast = (message: string) => {
  toast(message, { theme: 'colored', type: 'success' })
}
```

---

## 🌓 Темная/Светлая тема

### **Redux Slice**

```typescript
// src/features/theme/model/themeSlice.ts
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', state.theme)
    },
  },
})
```

### **CSS Variables**

```css
/* src/app/styles/global.css */
:root[data-theme='light'] {
  --color-background: #ffffff;
  --color-text-primary: #000000;
  /* ... */
}

:root[data-theme='dark'] {
  --color-background: #0d1117;
  --color-text-primary: #ffffff;
  /* ... */
}
```

### **Применение темы**

```typescript
// src/app/App.tsx
function ThemeInitializer() {
  const theme = useAppSelector(selectTheme)
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
  
  return null
}
```

---

## ⚡ Производительность

### **Оптимизации**

1. **Code Splitting** - автоматическое разделение кода Vite
2. **Lazy Loading** - отложенная загрузка изображений
3. **Memoization** - использование `useMemo` и `useCallback`
4. **Debouncing** - отложенные API запросы (200ms)
5. **Caching** - RTK Query автоматическое кэширование
6. **Pagination** - загрузка фильмов по 20 штук
7. **Optimized Images** - использование разных размеров TMDB CDN
8. **CSS Modules** - изолированные стили без глобального scope

### **RTK Query Cache Tags**

```typescript
tagTypes: [
  'Movies',
  'MovieDetails',
  'MovieCredits',
  'SimilarMovies',
  'Search',
  'Discover',
  'Genres'
]

providesTags: (result, error, movieId) => [
  { type: 'MovieDetails', id: movieId }
]
```

---

## 📦 Скрипты

```json
{
  "dev": "vite",                    // Запуск dev-сервера
  "build": "tsc -b && vite build",  // Production сборка
  "preview": "vite preview",        // Просмотр production сборки
  "lint": "eslint ."                // Проверка кода
}
```

---

## 🔧 Конфигурация

### **TypeScript**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "paths": {
      "@app/*": ["./src/app/*"],
      "@pages/*": ["./src/pages/*"],
      "@widgets/*": ["./src/widgets/*"],
      "@features/*": ["./src/features/*"],
      "@entities/*": ["./src/entities/*"],
      "@shared/*": ["./src/shared/*"]
    }
  }
}
```

### **Vite**
```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': '/src/app',
      '@pages': '/src/pages',
      '@widgets': '/src/widgets',
      '@features': '/src/features',
      '@entities': '/src/entities',
      '@shared': '/src/shared',
    },
  },
})
```

---

## 🎓 Что можно улучшить

### **Функциональность**
- [ ] Infinite scroll вместо пагинации
- [ ] Авторизация пользователей
- [ ] Рейтинг фильмов
- [ ] Создание списков просмотра
- [ ] Социальные функции (комментарии, обсуждения)
- [ ] PWA поддержка
- [ ] Мультиязычность (i18n)

### **Производительность**
- [ ] Server-Side Rendering (SSR) с Next.js
- [ ] Virtual scrolling для больших списков
- [ ] Image lazy loading
- [ ] Service Worker для offline режима
- [ ] Bundle size optimization

### **Тестирование**
- [ ] Unit тесты (Jest, Vitest)
- [ ] Integration тесты (React Testing Library)
- [ ] E2E тесты (Playwright, Cypress)
- [ ] Visual regression тесты (Chromatic)

### **DevOps**
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Автоматический deploy на Vercel
- [ ] Code coverage reports
- [ ] Automated dependency updates (Dependabot)

---

## 🤝 Вклад в проект

Contributions are welcome! Пожалуйста, следуйте этим шагам:

1. Fork проекта
2. Создайте feature ветку (`git checkout -b feature/AmazingFeature`)
3. Commit изменения (`git commit -m 'Add some AmazingFeature'`)
4. Push в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

---

## 📝 Лицензия

Этот проект создан в образовательных целях и использует [TMDB API](https://www.themoviedb.org/).

**Важно:** Данные предоставлены The Movie Database (TMDB). Этот проект использует TMDB API, но не одобрен и не сертифицирован TMDB.

---

## 🙏 Благодарности

- **[The Movie Database (TMDB)](https://www.themoviedb.org/)** - за предоставление бесплатного API
- **[React Team](https://react.dev/)** - за отличную библиотеку
- **[Redux Toolkit Team](https://redux-toolkit.js.org/)** - за упрощение работы с Redux
- **[Feature-Sliced Design](https://feature-sliced.design/)** - за архитектурную методологию

---

## 📧 Контакты

Если у вас есть вопросы или предложения, создайте [Issue](https://github.com/yourusername/tmdb-kinopoisk-app/issues).

---

## 🎬 Скриншоты

### Главная страница (Темная тема)
```
┌─────────────────────────────────────────┐
│  🎬 TMDB  Main | Categories | ...  🌙   │
├─────────────────────────────────────────┤
│                                         │
│         Welcome to TMDB                 │
│      Search millions of movies          │
│                                         │
│  ┌─────────────────────┐ [Search]      │
│  │ Search movies...    │               │
│  └─────────────────────┘               │
│                                         │
├─────────────────────────────────────────┤
│  Popular Movies             [View More] │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ │
│  │ 🎬│ │ 🎬│ │ 🎬│ │ 🎬│ │ 🎬│ │ 🎬│ │
│  │★8.5│ │★7.2│ │★9.1│ │★6.8│ │★8.0│ │★7.5│ │
│  └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ │
│                                         │
│  Top Rated                  [View More] │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ │
│  ...                                    │
└─────────────────────────────────────────┘
```

### Детальная страница фильма
```
┌─────────────────────────────────────────┐
│  [← Back]                               │
│                                         │
│  ┌────┐  The Shawshank Redemption       │
│  │    │  1994 · 142 min                 │
│  │ 🎬 │  ★ 8.7 / 10                     │
│  │    │  Drama, Crime                   │
│  └────┘                                 │
│         Two imprisoned men bond...      │
│                                         │
│  Top Billed Cast                        │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ │
│  │ 👤│ │ 👤│ │ 👤│ │ 👤│ │ 👤│ │ 👤│ │
│  │Tim│ │Morg│ │Bob │ │Will│ │Clancy│James│ │
│  └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ │
│                                         │
│  Similar Movies                         │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ │
│  ...                                    │
└─────────────────────────────────────────┘
```

---

<div align="center">

**Сделано с ❤️ и React**

[⬆ Вернуться к началу](#-tmdb-kinopoisk-app)

</div>
