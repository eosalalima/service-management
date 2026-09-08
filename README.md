# Service Management

A production-minded Next.js App Router starter for managing customers, services, and work orders. It uses Server Components for database-backed screens, a validated Server Action for mutations, PostgreSQL, Prisma, Tailwind CSS, and strict TypeScript.

## Prerequisites

- Node.js 20.9 or newer and npm
- Docker with Compose **or** PostgreSQL 15+

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Create the environment file**
   ```bash
   cp .env.example .env
   ```
   The example is safe for local development. If you override Compose's `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, or `POSTGRES_PORT`, update `DATABASE_URL` to match. Never commit `.env`.
3. **Start PostgreSQL**
   ```bash
   docker compose up -d postgres
   docker compose ps
   ```
4. **Generate Prisma Client and apply migrations**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```
   In deployment environments, use `npm run db:deploy` instead of the development migration command.
5. **Seed deterministic sample data**
   ```bash
   npm run db:seed
   ```
6. **Start development**
   ```bash
   npm run dev
   ```
   Open <http://localhost:3000>; the root redirects to `/dashboard`.

## Commands

| Command                                   | Purpose                                  |
| ----------------------------------------- | ---------------------------------------- |
| `npm run dev`                             | Start the development server             |
| `npm run build` / `npm start`             | Build and run the production server      |
| `npm run lint`                            | Run ESLint                               |
| `npm run typecheck`                       | Run strict TypeScript checking           |
| `npm test`                                | Run focused Vitest tests                 |
| `npm run format` / `npm run format:check` | Write/check Prettier formatting          |
| `npm run db:generate`                     | Generate Prisma Client                   |
| `npm run db:migrate`                      | Create/apply a development migration     |
| `npm run db:deploy`                       | Apply committed migrations in deployment |
| `npm run db:seed`                         | Upsert sample records safely             |
| `npm run db:studio`                       | Open Prisma Studio                       |

Run the complete local quality gate with:

```bash
npm run format:check && npm run lint && npm run typecheck && npm test && npm run build
```

## Project structure

- `app/(dashboard)/` — route group with the shared dashboard shell and all operational pages
- `components/` — focused UI and the interactive accessible navigation drawer
- `lib/data.ts` — server-only, set-based Prisma reads
- `lib/prisma.ts` — one development-safe Prisma Client instance
- `lib/work-orders.ts` — Zod validation and testable domain transformations
- `prisma/schema.prisma` — PostgreSQL data model and indexes
- `prisma/migrations/` — committed SQL migration history
- `prisma/seed.ts` — deterministic, repeatable seed data
- `compose.yaml` — local PostgreSQL service and persistent named volume

## Architecture notes

Pages and layouts are React Server Components by default. Only the navigation shell and work-order form are Client Components because they require browser state or React form state. Prisma is imported exclusively by server modules, so `DATABASE_URL` is not exposed to the browser. Prices remain Prisma `Decimal` values on server-rendered lists and are converted to fixed strings before crossing the Server/Client Component boundary for form options.

The starter intentionally has no authentication. Add authentication, authorization, audit logging, pagination, and production observability before using it for sensitive or high-volume workloads.
