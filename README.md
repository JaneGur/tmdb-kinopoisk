# TMDB Kinopoisk App

Приложение для поиска и просмотра информации о фильмах, используя API TMDB.

## Технологический стек

- **React** - библиотека для создания UI
- **TypeScript** - типизация
- **Redux Toolkit** - state management и RTK Query для API запросов
- **React Router** - роутинг
- **CSS Modules** - стилизация компонентов
- **Vite** - сборщик проекта

## Структура проекта

Проект построен по принципам Feature-Sliced Design (FSD) с использованием рекомендаций Redux Toolkit:

```
src/
├── app/              # Инициализация приложения
│   ├── store/        # Redux store
│   ├── router/       # React Router конфигурация
│   └── styles/       # Глобальные стили
├── pages/            # Страницы приложения
├── features/         # Фичи (бизнес-логика)
├── entities/         # Бизнес-сущности
├── widgets/          # Крупные компоненты
└── shared/           # Переиспользуемый код
    ├── ui/           # UI kit
    ├── api/          # Базовая конфигурация API
    ├── lib/          # Утилиты, хуки, константы
    └── config/       # Конфигурация
```

### Сегменты (FSD)

Каждая фича/сущность может содержать следующие сегменты:

- **ui** - компоненты UI, стили
- **api** - взаимодействие с backend (RTK Query)
- **model** - Redux slices, типы, бизнес-логика
- **lib** - вспомогательные функции
- **config** - конфигурационные файлы

## Установка и запуск

### 1. Установите зависимости

```bash
npm install
```

### 2. Настройте переменные окружения

Создайте файл `.env` в корне проекта:

```env
VITE_TMDB_API_KEY=ваш_api_ключ
```

Получить API ключ можно на [TMDB](https://www.themoviedb.org/settings/api)

### 3. Запустите dev сервер

```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:5173

## Скрипты

- `npm run dev` - запуск dev сервера
- `npm run build` - сборка для production
- `npm run preview` - предварительный просмотр production сборки

## Роуты

- `/` - Главная страница
- `/movie/:id` - Детальная информация о фильме
- `/search` - Поиск фильмов
- `/favorites` - Избранные фильмы

## API

Приложение использует [TMDB API](https://www.themoviedb.org/documentation/api) для получения данных о фильмах.
