https://sabinabonu02.github.io/web_core9.6.2/

# Сайт сервисного центра CPS

Адаптивный сайт сервисного центра. Проект собирается с помощью Webpack; стили написаны на SCSS.

## Требования

- Node.js `20.17.0`
- npm (устанавливается вместе с Node.js)

Проверить активную версию Node.js:

```powershell
node -v
```

Ожидаемый результат: `v20.17.0`.

Если установлен NVM for Windows, нужную версию можно установить и включить так:

```powershell
nvm install 20.17.0
nvm use 20.17.0
```

## Установка и запуск

Открой терминал в папке проекта и выполни:

```powershell
npm install
npm start
```

Webpack запустит локальный сервер. Открой в браузере адрес:

```text
http://localhost:9000/
```

Чтобы остановить сервер, нажми `Ctrl+C` в терминале.

## Сборка проекта

Для создания production-сборки выполни:

```powershell
npm run build
```

Готовые файлы сборки появятся в папке `dist`.

## Публикация на GitHub Pages

Публикация доступна после подключения проекта к GitHub и настройки GitHub Pages. Выполни:

```powershell
npm run deploy
```

Перед публикацией npm автоматически запускает production-сборку.

## Структура проекта

- `src/index.html` — разметка страницы.
- `src/scss/style.scss` — основные стили страницы.
- `src/scss/sidebar.scss` — стили бокового меню.
- `src/js/index.js` — JavaScript и импорты SCSS.
- `src/img/` — изображения и иконки.
- `src/fonts/` — файлы шрифтов.
- `dist/` — результат production-сборки.

SCSS импортируется из `src/js/index.js` и компилируется Webpack. Отдельно подключать SCSS-файлы через `<link>` в HTML не нужно.
