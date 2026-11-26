# Weight Tracker

Log your weight in seconds and see the real trend, not the daily noise.

## Features

- Quick weight logging
- 7-day moving average chart
- Goal weight with projected finish date
- Auth (login/signup)

## Stack

- **Client:** React, TypeScript, Vite, Tailwind, shadcn/ui, Redux Toolkit
- **Server:** Express, TypeScript, Drizzle ORM
- **Database:** Postgres (Supabase)

## Structure

```
auth/
├── apps/
    ├── client/   # Vite + React (:5173)
    └── server/   # Express (:3000)
```

## Setup

```bash
npm install
```

Create `apps/server/.env`:

```
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@[POOLER-HOST]:5432/postgres
```

Create the database table:

```bash
npm run db:push -w apps/server
```

## Run

```bash
npm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:3000

The client proxies `/api` to the server in development.

## API

| Method | Route                | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Create account      |
| POST   | `/api/auth/login`    | Log in              |
| POST   | `/api/auth/logout`   | Log out             |
| GET    | `/api/auth/me`       | Current user        |
| GET    | `/api/health`        | Server health check |

## Scripts

| Command                          | Description                 |
| -------------------------------- | --------------------------- |
| `npm run dev`                    | Run client and server       |
| `npm run build`                  | Build client and server     |
| `npm run db:push -w apps/server` | Sync schema to the database |
