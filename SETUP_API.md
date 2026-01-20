# Настройка API ключа TMDB

Для работы приложения необходим API ключ от The Movie Database (TMDB).

## Как получить API ключ:

1. Перейдите на https://www.themoviedb.org/
2. Зарегистрируйтесь или войдите в аккаунт
3. Перейдите в Settings → API
4. Создайте новый API ключ (выберите "Developer")
5. Скопируйте ваш API Read Access Token

## Настройка в проекте:

1. Создайте файл `.env` в корне проекта:

```bash
# В корне проекта (рядом с package.json)
touch .env
```

2. Добавьте в `.env` ваш API ключ:

```env
VITE_TMDB_API_KEY=your_api_read_access_token_here
```

**ВАЖНО:** Используйте **API Read Access Token**, а не обычный API Key!

## Пример:

```env
VITE_TMDB_API_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzFiNzA5...
```

После настройки перезапустите dev сервер:

```bash
npm run dev
```

## Проверка:

Откройте браузер на http://localhost:5176/ и проверьте:
- ✅ На главной странице отображается фоновое изображение
- ✅ Поиск работает корректно
- ✅ В консоли нет ошибок 401 (Unauthorized)
