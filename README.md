# Назва вашого проєкту

Короткий опис вашого проєкту.

## Зміст

*   [Вимоги](#вимоги)
*   [Завантаження](#завантаження)
*   [Встановлення бази даних (PostgreSQL) за допомогою Docker](#встановлення-бази-даних-postgresql-за-допомогою-docker)
*   [Налаштування підключення до бази даних](#налаштування-підключення-до-бази-даних)
*   [Наповнення бази даних даними](#наповнення-бази-даних-даними)


## Вимоги

*   Node.js (LTS версія)
*   npm або yarn
*   Docker (для встановлення бази даних)
*   Docker Compose (рекомендовано)

## Завантаження

1.  Клонуйте репозиторій
2.  Встановіть залежності:

    ```bash
    npm install # або yarn install
    ```

## Встановлення бази даних (PostgreSQL) за допомогою Docker

Для встановлення PostgreSQL використовується Docker Compose.

1.  Переконайтесь, що у вас встановлені Docker та Docker Compose.

2.  Створіть файл `.env` в корені проєкту та додайте наступні змінні (замініть значення на свої):

    ```
    POSTGRES_USER=your_db_user
    POSTGRES_PASSWORD=your_db_password
    ```

    **Увага:** Не зберігайте важливі паролі в файлі `.env`, який потрапляє в систему контролю версій (Git). Цей спосіб підходить лише для локальної розробки. Для продакшену використовуйте більш безпечні способи зберігання секретів.

3.  Запустіть Docker Compose:

    ```bash
    docker-compose up -d
    ```

    Ця команда створить та запустить контейнер з PostgreSQL. База даних буде доступна на порту, вказаному в `.env` файлі (за замовчуванням 5433).

## Налаштування підключення до бази даних

Файл `data-source.ts` вже налаштований для використання змінних середовища. Переконайтесь, що він виглядає приблизно так:

```typescript
// ... imports

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5433,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "Katy", // Значення за замовчуванням для локальної розробки (ОБОВ'ЯЗКОВО ЗМІНИТИ В ПРОДАКШЕНІ!)
  database: process.env.POSTGRES_DB || "manga_store",
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  // ... інші налаштування
});
```

Для заповнення бд таблицями виконайте команду:

 ```bash
 npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
```

## Наповнення бази даних даними

Для заповнення бд тестовими даними виконайте команду:

 ```bash
 npx ts-node src/index.ts
```