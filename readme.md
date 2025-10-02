# WB Tariffs Sync Service

Микросервис для автоматической синхронизации тарифов Wildberries с Google Таблицами. Сервис ежечасно получает актуальные тарифы через WB API и обновляет данные в указанных Google Sheets.

## 🚀 Возможности

- Автоматический сбор тарифов Wildberries каждый час
- Синхронизация данных с Google Таблицами
- Docker-контейнеризация для простого развертывания
- Устойчивость к ошибкам (retry механизмы)
- Логирование процесса выполнения

## 📋 Предварительные требования

- Docker
- Docker Compose
- API ключ Wildberries
- Google Service Account для доступа к Sheets API

## ⚙️ Установка и настройка

1. Клонирование репозитория

```bash
  git clone <your-repository-url>
  cd <repository-name>
```

2. Настройка переменных окружения
   Создайте файл .env на основе шаблона:

```bash
  cp .env.example .env
```

Заполните .env файл необходимыми значениями:
env

```bash
  # Wildberries API Configuration
  WB_API_URL="https://api.wildberries.ru/api/v1/tariffs/box"
  WB_API_KEY="your_wildberries_api_key_here"

  # Google Sheets Configuration
  GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account@project.iam.gserviceaccount.com"
  GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
  GOOGLE_SHEETS_IDS="your_google_sheet_id_here"

  # Database Configuration
  DB_HOST="postgres"
  DB_PORT=5432
  DB_NAME="postgres"
  DB_USER="postres"
  DB_PASSWORD="postres"
```

## Получение credentials

1. Wildberries API:

   - Получите API ключ в личном кабинете Wildberries
   - Укажите его в WB_API_KEY

2. Google Sheets API:

   - Создайте проект в Google Cloud Console
   - Включите Google Sheets API
   - Создайте Service Account и скачайте JSON ключ
   - Скопируйте client_email и private_key в соответствующие переменные
   - Предоставьте доступ Service Account к вашей Google Таблице

## 🐳 Запуск приложения

```bash
  # Первый запуск или после изменений кода
  docker compose up --build

  # Последующие запуски
  docker compose up

  # Запуск в фоновом режиме
  docker compose up -d
```
