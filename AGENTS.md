# AGENTS.md — moda.studio (fashion-studio)

Compact instruction file for AI coding agents working in this repository. Every line answers: "would an agent likely miss this without help?" If you need the full picture instead, read `Project_Architecture_Document.md`.

## Commands

| Task | Command | Notes |
|------|---------|-------|
| Install | `npm install` | npm, not bun/pnpm — `package-lock.json` is authoritative |
| Dev server | `npm run dev` | Port 3000; loads `.env` automatically |
| Production build | `npm run build` | Do not skip before claiming "done" |
| Lint | `npm run lint` | ESLint 9 flat config + `eslint-config-next` |
| Typecheck | `npm run typecheck` | `tsc --noEmit`, strict mode |
| Unit tests | `npm test` | Vitest, node env, `src/**/*.test.ts` |
| Single unit test | `npx vitest run src/lib/subscribe.test.ts` | |
| E2E | `npm run e2e` | Playwright **chromium**; builds are NOT auto-run — run `npm run build` first; webServer starts `next start` on port 3002 |
| Single e2e file | `npx playwright test e2e/smoke.spec.ts --project=chromium` | |

Gate order when finishing a change: `lint` → `typecheck` → `test` → `build` → `e2e`. E2E runs against the **production build**, not the dev server (dev HMR can diverge from prod).

## Database

- SQLite via `better-sqlite3` + Drizzle ORM. **No Docker, no Postgres.**
- `DATABASE_URL` uses the `file:` scheme; relative paths resolve from the repo root (npm scripts always run there).
- Schema changes: edit `src/db/schema.ts` → `npm run db:generate` (writes `drizzle/`) → `npm run db:migrate` (applies). `npm run db:push` is a force-push for scratch syncs, not the migration path.
- `db/*.db` files are gitignored dev artifacts. The connection singleton lives on `globalThis` to survive Next.js dev HMR (`src/db/index.ts`).
- Drizzle SQLite has no `db.execute` — use `db.run(sql\`...\`)`.

## Framework quirks that will bite you

- **Tailwind v4, CSS-first config.** All tokens live in `@theme` inside `src/app/globals.css`. There is no `tailwind.config.js`.
- **Tailwind v4 renamed the v3 blur/shadow scale.** The source site was built on v3: v3 `backdrop-blur-sm` (4px) is v4 `backdrop-blur-xs` or `backdrop-blur-[4px]`; v3 `shadow-sm` is v4 `shadow-xs`. Also prefer `bg-[rgba(r,g,b,a)]` over `/alpha` suffixes when matching the source pixel-for-pixel — v4 emits `oklab()` color-mix. (Verified by computed-style + pixel probes against the live source.)
- **Same-page hash links must go through `<HashLink>`** (`src/components/hash-link.tsx`). Plain Next.js `<Link href="/#anchor">` on the same page computes stale scroll targets or skips scrolling. `HashLink` intercepts and calls `scrollIntoView`, which honors `scroll-padding-top` (5rem, set on `html`).
- **`public/` shadows app routes.** A stray `public/robots.txt` or `public/logo.svg` wins over `app/robots.ts` / metadata icons. Never add static files whose paths collide with generated routes (`robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `icon*`).
- Scroll-reveal/entrance animations are CSS + IntersectionObserver (`Reveal`, `UnderlineHighlight` — both set `data-visible`). There is **no framer-motion** in this repo; the source site's motion was reimplemented in CSS keyframes. All animations must stay disabled under `prefers-reduced-motion` (see the media query at the bottom of `globals.css`).
- CSP is strict (`img-src 'self'`): all images are self-hosted under `public/images`. Do not hotlink external assets. `next/image` runs `unoptimized: true` by design (parity + sandbox constraints).

## Layout & conventions

- Content lives in `src/lib/site.ts` (single source of truth for every string/link/image path) and `src/lib/design-system.ts` (DS page content). Change copy there, not in components.
- Pages are Server Components by default; only interactive islands (`hero`, `site-header`, `newsletter-form`, `reveal`, `underline-highlight`, `hash-link`, `design-system`) are `"use client"`.
- The route `/DesignSystem` is intentionally capitalized (source parity).
- `skills/` is an operator-managed library — excluded from lint/typecheck/compilation (see `eslint.config.mjs`, `tsconfig.json`, `vitest.config.ts` include patterns). Do not "fix" files in it.
- Placeholder links (`href="#"` for Stockists, legal pages, socials) are inherited from the source design on purpose. Real in-page targets exist for the rest; keep that mapping in `src/lib/site.ts`.

## Testing quirks

- E2E newsletter tests write real rows into the dev SQLite file — harmless (gitignored), don't mock.
- Axe runs in `e2e/a11y.spec.ts` with zero tolerance for serious/critical violations. If you introduce one, fix the UI (e.g. contrast), don't disable the rule.
- `getByRole("alert")` is ambiguous on any Next page (the route announcer also has `role="alert"`) — target `#newsletter-error` instead.

## Env

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | prod yes / dev defaulted | SQLite `file:` URL, defaults to `file:./db/app.db` |
| `NEXT_PUBLIC_SITE_URL` | prod yes | Canonical origin for metadataBase, sitemap, robots |
