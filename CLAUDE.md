# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository shape

`Cherio` is a **pnpm + Turbo monorepo** (`pnpm@10.7.0`). Workspaces live in `apps/*` and `packages/*` (see `pnpm-workspace.yaml`). Always use **pnpm** — the workspace protocol (`workspace:*`) links local packages, and npm/yarn will corrupt the lockfile.

Six apps + one shared package, each independently deployable:

| App / package | Stack | Dev port | Purpose |
|---|---|---|---|
| `apps/website` | Next.js 16, next-intl | 4000 | Marketing site; contact form via Mailjet |
| `apps/cleanmytext` | Next.js 16, next-intl, Radix | 4001 | Text-cleaning / TOON-format tool |
| `apps/showcase` | Next.js 16, next-intl, Zustand, RHF+Zod, Leaflet | 4002 | E-commerce storefront (fr/en/ar) |
| `apps/myportfolio` | Next.js 16, next-intl | 4003 | Personal portfolio (en/fr) + CV PDF generator |
| `apps/backoffice` | React 19 + Vite, Mantine, React Router v7, TanStack Query/Table, RHF+Zod | 4003 (vite) | Admin panel (package name `showcase-backoffice`) |
| `apps/backend` | Express + TypeScript, Prisma, PostgreSQL | 3001 | REST API for `showcase`/`backoffice` |
| `packages/shared` | React 19 component library + types | — | Shared atoms, types, utils |

> **Port collision:** `myportfolio` (Next) and `backoffice` (Vite) both default to **4003**. Don't run them simultaneously without changing one.

## Commands

Run from the repo root unless noted. Turbo caches build/lint/test; `dev` and `tsc` are uncached.

```bash
pnpm dev                 # all apps (turbo dev)
pnpm dev:all             # all apps in parallel
pnpm dev:website         # single app (also :cleanmytext :showcase :myportfolio :backoffice :backend)
pnpm build               # turbo build (respects ^build dependency order)
pnpm lint                # eslint across workspaces
pnpm tsc:all             # type-check every workspace in parallel (tsc --noEmit)
pnpm format              # prettier --write across the repo
pnpm format:check        # prettier verification (CI-style)
./start-dev.sh           # docker-compose up postgres, then pnpm dev:all
```

Per-app equivalents exist as `pnpm --filter <name> <script>`. Each app also has `tsc` (= `tsc --noEmit`) and `lint`.

### Backend (`apps/backend`) — Prisma / Postgres

```bash
cd apps/backend/docker && docker-compose up -d   # Postgres 15 on :5432 (db=cherio, user/pass=postgres)
pnpm --filter backend dev            # nodemon + ts-node on :3001, Swagger at /api-docs
pnpm --filter backend db:migrate     # prisma migrate dev (create/apply migration)
pnpm --filter backend db:generate    # regenerate Prisma client (also runs on postinstall)
pnpm --filter backend db:seed        # ts-node prisma/seed.ts
pnpm --filter backend db:studio      # Prisma Studio
```
Requires `DATABASE_URL` and `SHADOW_DATABASE_URL` in `apps/backend/.env` (git-ignored; no example checked in).

### Portfolio CV generation
`pnpm --filter myportfolio cv` runs `scripts/generate-cv.mjs`, which renders themed HTML CVs and prints them to PDF via headless Chrome/Edge over the DevTools Protocol (no external deps). Output lands in `apps/myportfolio/public/cv/`.

### Tests
There is **no test runner wired up yet**. `pnpm test` runs `turbo test` (depends on `build`), but `backend` and `shared` have placeholder `test` scripts that intentionally exit 1. When adding tests, the project convention (`.cursor/config.json`) is Vitest or Jest per app — there is no shared config to inherit from.

## Architecture

### Backend request flow (`apps/backend/src`)
`index.ts` boots Express, mounts CORS + JSON, Swagger UI at `/api-docs`, then registers flat route modules (`authRoutes`, `productRoutes`, `categoryRoutes`, `contactRoutes`). The layering is strict:

- `routes/*` — wiring only; no business logic.
- `controllers/*` — **all business logic lives here.** They call Prisma directly.
- `middlewares/auth.ts` — JWT `authenticate` (also gates `/api/uploads` static file serving).
- `lib/prisma.ts` — the single Prisma client instance; import it, don't `new PrismaClient()`.
- `config/` — `swagger.ts`, `db.ts`.

Auth is JWT + bcrypt with refresh tokens (`RefreshToken` model). Prisma schema (`prisma/schema.prisma`) maps camelCase fields to `snake_case` columns via `@map`; the domain covers Users/Clients/Products/Categories/Orders/Invoices with status enums. Email goes through Mailjet (`node-mailjet`).

### The `shared` package — two import styles (important)
`packages/shared` exports React atoms (`Button`, `Card`, `Select`, `PhoneInput`, `JsonLd`), `types.ts`, and `utils/cn.ts`. It is consumed **two different ways**, so know which app you're in:

- **Next.js apps** import from source via the TS path alias **`@shared/*` → `packages/shared/src/*`** (see each app's `tsconfig.json` `paths`). No build step — edits to `shared/src` are picked up live.
- **`backoffice`** imports the built package by bare name: **`import { Bill } from 'shared'`**, resolving to `dist/` via the workspace symlink. This path needs `pnpm --filter shared build` to exist.

When editing shared code, remember Next apps see the source instantly but `backoffice` needs a rebuild.

### Frontend i18n (next-intl)
Every Next app is internationalized. Locales are defined in `<app>/i18n/routing.ts` (`showcase`: `fr`/`en`/`ar`, default `fr`; `myportfolio`: `en`/`fr`). Routes are under `app/[locale]/`. **Navigate with the wrapped `Link`/`useRouter`/`redirect` from `@/i18n/routing`, not `next/link`/`next/navigation`** — otherwise the locale prefix is lost. All user-facing strings come from `messages/<locale>.json`; there are no hardcoded strings. Arabic (`showcase`) must render `dir="rtl"`. Page `metadata` should include `alternates.languages` for every locale.

## Conventions (enforced by `.cursor/config.json`)

- **File-split component pattern** — keep concerns in separate colocated files:
  - `Component.tsx` — JSX / markup / event bindings **only** (no data fetching, no business logic).
  - `Component.hooks.ts` — state, async, business logic (`use`-prefixed, no JSX).
  - `Component.utils.ts` — pure, stateless, side-effect-free helpers (no React/DOM imports).
  - `Component.types.ts` — local types (interfaces for shapes, unions for constants; named exports only).
- **Next.js:** Server Components by default; add `'use client'` only for interactive parts.
- **`backoffice`:** Mantine components/theming only; state via context/hooks, avoid prop drilling.
- No `any`; strict TypeScript everywhere. Soft size limits: ≤200 lines/component, ≤40 lines/function.
- Naming: `PascalCase` components, `camelCase` functions/vars, `usePrefix` hooks.
- Prettier (`.prettierrc`): single quotes, semicolons, 100-col width, 2-space indent, `es5` trailing commas, LF endings.
- Git: commit as `[{workspace}] type: concise description`; branches `feature/*`, `fix/*`, `chore/*`.
