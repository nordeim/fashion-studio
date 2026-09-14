---
IMPORTANT: File is read fresh for every conversation. Be brief and practical.
project_type: nextjs
version: 1.0.0
framework_version: "16.3"
last_updated: 2026-09-14
---

# moda.studio (fashion-studio)

A production-grade clone of the Moda Studio fashion platform (source: `moda-studio-a6695d6f.base44.app`) — a curated, sustainable, minimalist fashion marketing site with a public living design system. Built on the home-financing repo's Next.js foundation. Maintained by nordeim.

**Tech Stack**: Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS 4 (CSS-first), Drizzle ORM + SQLite (better-sqlite3), Radix Tabs, Vitest, Playwright, ESLint 9

## Core Identity & Purpose

The site presents one brand story: hero → seasonal collections → sustainability → essentials → about → newsletter. Two routes (`/` and `/DesignSystem`), one API surface (`/api/subscribe`, `/api/health`), one database table (`subscribers`). Every visual decision traces to the source site's design system (see `src/lib/design-system.ts` and `/DesignSystem`). When in doubt about styling, open `/DesignSystem` — it is the executable style guide.

## Foundational Principles

### Meticulous Approach (Six-Phase Workflow)

1. **ANALYZE** — Never make surface-level assumptions; check the source site's compiled behavior before changing parity-sensitive styles
2. **PLAN** — Create a structured plan for non-trivial changes
3. **VALIDATE** — Confirm understanding of the design intent before restyling
4. **IMPLEMENT** — Small, testable increments
5. **VERIFY** — `lint → typecheck → test → build → e2e` before declaring done
6. **DELIVER** — Update docs (`README.md`, `Project_Architecture_Document.md`) when behavior or interfaces change

### Project-Specific Principles

- **Source parity where visible, engineering judgment where invisible.** Pixel-level parity for rendering (colors, blur, spacing); improvements allowed for semantics (h1 on hero, functional mobile menu, WCAG AA contrast).
- **Self-hosted everything.** Strict CSP with `img-src 'self'`; no third-party runtime dependencies on the page.
- **CSS-only motion.** No framer-motion. All animations respect `prefers-reduced-motion`.
- **Content is data.** Copy lives in `src/lib/site.ts`, not scattered in JSX.

## Implementation Standards

### Next.js 16 Specific

- App Router conventions; Server Components by default, `"use client"` only for interactive islands
- `next/font/google` for Space Grotesk (`--font-space-grotesk` variable, weights 300–700)
- Metadata API for SEO (root metadata in `app/layout.tsx`, page metadata per route)
- Route handlers for API endpoints (`app/api/*/route.ts`); `export const dynamic = "force-dynamic"` on DB-touching routes
- `next/image` everywhere for content imagery (runs unoptimized by config — keep it)
- `robots.ts`, `sitemap.ts`, `manifest.ts` for crawlers/PWA — never add colliding static files in `public/`

### TypeScript Strict Mode

- `strict: true`; never `any` — use `unknown` and narrow
- Prefer `interface` for object shapes, `type` for unions
- Early returns; no deeply nested conditionals
- Exported functions carry explicit return types when inference is non-obvious

### Tailwind CSS 4

- **CSS-first config**: tokens are defined in `@theme` in `src/app/globals.css`; there is no `tailwind.config.js`
- Use semantic tokens (`bg-background`, `text-foreground`, `text-muted`, `text-subtle`, `bg-accent`, `bg-accent-light`, `border-border`) — do not reintroduce raw hex values in JSX
- **v3→v4 token drift**: v3 `shadow-sm` = v4 `shadow-xs`; v3 `backdrop-blur-sm` (4px) = v4 `backdrop-blur-xs`/`backdrop-blur-[4px]`; `/alpha` suffixes emit `oklab()` color-mix — use explicit `bg-[rgba(...)]` when matching source pixels
- Component animations are defined as `@keyframes` inside `@theme` (tree-shaken) or `@layer components` classes (`.hero-letter`, `.animate-fade-up`, `.animate-grow-x`, `[data-reveal]`)

### React 19

- No `forwardRef` needed (ref as prop)
- Handle all form states: idle, submitting, success, error (`NewsletterForm` is the reference implementation)
- Disable submit controls during async operations; announce status changes via `aria-live` / `role="status"`

## Development Workflow

### Environment Setup

```bash
npm install
cp .env.example .env      # DATABASE_URL defaults sensibly for local dev
npm run db:migrate        # apply drizzle/ migrations to db/app.db
npm run dev               # http://localhost:3000
```

### Build Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (port 3000) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` / `lint:fix` | ESLint 9 |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` / `test:watch` | Vitest unit tests |
| `npm run e2e` | Playwright (chromium) against a fresh prod build on :3002 |
| `npm run db:generate` | Generate migration from `src/db/schema.ts` |
| `npm run db:migrate` | Apply migrations |

## Testing Strategy

### Test Pyramid

- **Unit** (Vitest, node env): pure logic colocated as `src/lib/*.test.ts` — email parsing (`subscribe.test.ts`), rate-limit windows/eviction (`rate-limit.test.ts`)
- **E2E** (Playwright, chromium + webkit): `e2e/*.spec.ts` — smoke (sections/products/nav/footer/images), navigation (anchors, header frost, mobile menu, DS tabs, 404), newsletter (validation, success, API contract, health), a11y (axe, zero serious/critical), seo (metadata, robots, sitemap, manifest, security headers)

### Standards

- E2E runs against `next start`, never the dev server
- Never weaken an axe assertion to pass — fix the UI
- Bug fixes require a failing test first when the defect is in testable logic
- Newsletter e2e writes real rows into the gitignored SQLite file; no mocks

## Code Quality Standards

- Gate order before delivery: **lint → typecheck → test → build → e2e**
- No secrets in code or logs; `.env` is gitignored, `.env.example` documents the contract
- Comments explain **why** (parity probes, token drift, a11y adjustments), never restate the obvious
- Dead code, commented-out code, and placeholder values do not ship

## Git & Version Control

- Trunk-based: `main` only; short-lived feature branches when collaborating
- Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`); atomic commits, one logical change each
- Never commit `db/*.db`, `.env`, or workspace artifacts (see `.gitignore`)

## Error Handling & Debugging

- API routes return machine-readable JSON `{ ok, message }` with correct status codes; log structured context server-side (`console.error("[subscribe] ...", {...})`), never raw driver errors to clients
- Client fetches handle network errors and malformed responses explicitly (`NewsletterForm`)
- `app/error.tsx` (retry) and `app/not-found.tsx` (branded 404) are styled to match the brand
- Debug parity issues by measuring **computed styles** on the live source vs local, not by eyeballing

## Communication & Documentation

- Explain the "why" for parity deviations — future maintainers must be able to tell bug from decision
- Keep `README.md` (users) and `Project_Architecture_Document.md` (engineers) in sync with reality
- `AGENTS.md` holds the compact gotcha list; don't duplicate it here

## Project-Specific Standards

### Architecture

- One Server Component page per route; client islands for interactivity (`hero`, `site-header`, `newsletter-form`, `reveal`, `underline-highlight`, `hash-link`, `design-system`)
- `Reveal`/`UnderlineHighlight` implement scroll-triggered entrance via IntersectionObserver + CSS (`data-visible`), replacing the source's framer-motion
- `HashLink` owns same-page hash navigation (Next.js `<Link>` hash handling is unreliable); cross-page hash hrefs fall through to the router

### API Design

- `POST /api/subscribe` — JSON `{ email }`; validates (RFC-lite, ≤254 chars), rate-limits 5/min/IP, idempotent on duplicates; returns `{ ok, message }`
- `GET /api/health` — liveness + DB probe
- Security headers (CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) are emitted by `next.config.ts` for every response

### Database / Data Layer

- Drizzle + better-sqlite3, WAL mode, foreign keys ON, `globalThis` singleton for dev HMR
- One table: `subscribers (id, email UNIQUE, createdAt)` — see `src/db/schema.ts`
- Migrations in `drizzle/` are the source of truth; `db:push --force` is for scratch syncs only

### Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | SQLite file URL (prod: absolute path) | `file:./db/app.db` |
| `NEXT_PUBLIC_SITE_URL` | Canonical public origin | `https://moda.studio` |

## Anti-Patterns to Avoid

- Do not add framer-motion or any animation library — motion is CSS-only by decision (ADR-003)
- Do not hotlink external images/fonts/scripts — CSP is `img-src 'self'`, `font-src 'self'`
- Do not scatter copy strings through JSX — content belongs in `src/lib/site.ts`
- Do not create `public/` files that shadow generated routes (`robots.txt`, `sitemap.xml`, `manifest.webmanifest`)
- Do not loosen strict types, axe rules, or CSP to make a gate pass
