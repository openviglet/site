# viglet.org: Agent Guide

The Viglet marketing website (https://viglet.org). This file is the per-turn
guide for coding agents: the stack, the conventions, and **how to use the
roadmap docs**. Keep it lean: reference material belongs in `docs/`.

## Project Structure

- **Next.js 16 (App Router) + React 19 + TypeScript**, two builds of the same
  pages: the default static export (`out/`, served by GitHub Pages) and
  `SITE_OUTPUT=server` for `next start` (the Viglet Cloud image,
  `docker/Dockerfile.site` in the cloud repo). The root `README.md` is
  **stale**: it still says `jekyll serve`; ignore it.
- **Tailwind CSS v4** (`@tailwindcss/postcss`) + **`@viglet/viglet-design-system`**:
  use design-system components/tokens; **never inline colors**.
- **Routing**: one folder per route under [src/app/](src/app/) (home,
  `[identifier]/` with download and release-notes, compare, partner, about,
  contact). Each `page.tsx` holds the route's metadata and renders a client view
  from [src/views/](src/views/).
- **i18n**: `i18next` + `react-i18next`.
- **Content is data-driven**: `src/data/{solutions,features,modules,categories}.ts`:
  add a product/feature by editing data, not by hand-writing pages.
- **SEO/GEO outputs** (do not remove), all read from `src/data/*`:
  - [src/lib/seo.ts](src/lib/seo.ts) → per-route title, description, canonical, OG/Twitter, FAQ JSON-LD
  - [src/app/llms.txt/route.ts](src/app/llms.txt/route.ts) → `llms.txt`
  - [src/app/sitemap.ts](src/app/sitemap.ts) → `sitemap.xml`
  - `generateStaticParams` → full HTML per route at build time
- **Products**: Viglet Turing (`turing`), Viglet Dumont (`dumont`), Viglet Shio (`shio`).

> **Block G:** the site moves to a **Next.js server on Viglet Cloud** (W18), the
> shape cursarei already has. GitHub Pages keeps serving www.viglet.org until the
> DNS cutover; only then does the static export go and API routes (W19) become
> possible. Anything new must work in both builds until then. Read
> [docs/STRATEGY.md](docs/STRATEGY.md) §VII before large architectural changes.

## Build & Run

```bash
npm install
npm run dev        # next dev server
npm run build      # prebuild (guides, OG cards → public/og) + tsc + next build → out/
npm run preview    # serve out/ on http://localhost:4173 (needs Python)
# the Cloud build: SITE_OUTPUT=server npm run build, then SITE_OUTPUT=server npm start
```

> **Windows**: this is the primary dev environment. If `node_modules` native
> binaries are locked by the IDE or Next, don't loop on reinstalls. Rely on IDE
> TypeScript diagnostics.

## Conventions

- TypeScript throughout; prefer typed data modules over inline literals.
- Design system first: reach for `@viglet/viglet-design-system` and the local
  `src/components/ui/*` before writing bespoke CSS.
- Keep routes' trailing slashes (`/:identifier/`): they're baked into the
  sitemap, the canonicals (`trailingSlash: true`), and existing inbound links.
- SEO/GEO is a feature: when you add a route or a product, update the data
  `src/lib/seo.ts`, the sitemap and llms.txt read.
- **No invented product claims**: no superlatives, no unverifiable benchmarks.

## Roadmap & docs maintenance

The roadmap is **split across four files in `docs/`** that must be kept in sync.
Each has one job: never duplicate content between them; when you touch one, check
whether a sibling needs updating. (This system mirrors the Turing repo's.)

| File | Single responsibility | Granularity |
|---|---|---|
| [docs/ROADMAP.md](docs/ROADMAP.md) | **Task status**: the *only* source of truth for what's done/active. Active backlog only (📋 designed · 💭 idea · ⏳ partial · 🛠 in-progress). | one line per task |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | What has **shipped**: a searchable index; `git log` is authoritative for detail. | one line per shipped task |
| [docs/IMPROVEMENTS.md](docs/IMPROVEMENTS.md) | **Design rationale** (what/why) for *unshipped* sections only. No status tables, no shipped reports. | prose per active section |
| [docs/STRATEGY.md](docs/STRATEGY.md) | Business/positioning (the bets: showcase, dogfooding, GEO, the Cloud migration). | prose |

**Task numbering: the next free `W<n>` lives in [docs/last-task.md](docs/last-task.md).**
Read it before adding a task, use `W<n+1>`, then bump the counter + append a log
line. Numbers are **non-contiguous across blocks**: never infer the next from a
block header range or a `git log` scan. The `W` prefix keeps these distinct from
the Turing repo's `T` numbers.

**The cross-file update rules (follow these every time):**

1. **When a task ships:** move its one-liner from `ROADMAP.md` → `CHANGELOG.md`
   (under its block) and **delete** its design subsection from `IMPROVEMENTS.md`.
   `git log` is the history. Don't leave a shipped report in `IMPROVEMENTS.md`.
2. **When you add a task:** add the one-liner to `ROADMAP.md` (with `deps` + a
   `→ §x.y` pointer) and, if it needs design, the rationale subsection in
   `IMPROVEMENTS.md`. Status lives **only** in `ROADMAP.md`.
3. **Status belongs to exactly one file.** If a marker in `IMPROVEMENTS.md`
   disagrees with `ROADMAP.md`/`CHANGELOG.md`, the roadmap files win.
4. **Keep entries terse**: *what + why + pointer* (~1 sentence). Detail goes in
   code/commits, not table cells.
5. **Strategy ≠ backlog.** Positioning/market discussion goes in `STRATEGY.md`,
   never as a numbered task.
6. **Non-goals are binding**: `ROADMAP.md` → "Non-goals" + `IMPROVEMENTS.md` §0
   list what *not* to build. Check them before proposing work.

## Cross-repo links

- **cursarei** (`D:\Git\alegauss\cursarei`): the Next.js reference app this
  roadmap is modeled on; the working source for the Next.js/SSG/`llms.txt`/Docker
  patterns Block G needs.
- **Turing** (`d:\Git\viglet\turing\2026.1`): Block E (GEO) is the cross-repo
  counterpart of Turing's STRATEGY Block O, which already names this repo.
- **docs.viglet.org** (`vigletdocs.github.io`): home of the technical blog the
  product pages link into.
