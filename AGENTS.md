# viglet.org — Agent Guide

The Viglet marketing website (https://viglet.org). This file is the per-turn
guide for coding agents: the stack, the conventions, and **how to use the
roadmap docs**. Keep it lean — reference material belongs in `docs/`.

## Project Structure

- **React 19 + TypeScript + Vite 8** SPA (the root `README.md` is **stale** — it
  still says `jekyll serve`; ignore it).
- **Tailwind CSS v4** (`@tailwindcss/vite`) + **`@viglet/viglet-design-system`** —
  use design-system components/tokens; **never inline colors**.
- **Routing**: `react-router-dom` v7, all routes in [src/App.tsx](src/App.tsx)
  (home, `/:identifier/`, download, release-notes, partner, about).
- **i18n**: `i18next` + `react-i18next`.
- **Content is data-driven**: `src/data/{solutions,features,modules,categories}.ts`
  — add a product/feature by editing data, not by hand-writing pages.
- **Build-time SEO/GEO plugins** (do not remove):
  - [vite-plugin-llmtxt.ts](vite-plugin-llmtxt.ts) → emits `llms.txt`
  - [vite-plugin-sitemap.ts](vite-plugin-sitemap.ts) → `sitemap.xml`
  - [vite-plugin-spa-prerender.ts](vite-plugin-spa-prerender.ts) → static HTML per route
- **Products**: Dumont DEP (`dumont`), Shio CMS (`shio`), Turing ES (`turing`).

> **Planned migration (Block G):** this SPA will move to **Next.js (server),
> deployed on Viglet Cloud** — the shape cursarei already has. Read
> [docs/STRATEGY.md](docs/STRATEGY.md) §VII before large architectural changes;
> don't bolt an interim Node backend onto the Vite build.

## Build & Run

```bash
npm install
npm run dev        # vite dev server
npm run build      # tsc -b && vite build
npm run preview    # serve the built site
```

> **Windows**: this is the primary dev environment. If `node_modules` native
> binaries are locked by the IDE/Vite, don't loop on reinstalls — rely on IDE
> TypeScript diagnostics.

## Conventions

- TypeScript throughout; prefer typed data modules over inline literals.
- Design system first: reach for `@viglet/viglet-design-system` and the local
  `src/components/ui/*` before writing bespoke CSS.
- Keep routes' trailing slashes (`/:identifier/`) — they're baked into the
  sitemap, prerender, and existing inbound links.
- SEO/GEO is a feature: when you add a route or a product, update the data the
  llms.txt / sitemap / prerender plugins read.
- **No invented product claims** — no superlatives, no unverifiable benchmarks.

## Roadmap & docs maintenance

The roadmap is **split across four files in `docs/`** that must be kept in sync.
Each has one job — never duplicate content between them; when you touch one, check
whether a sibling needs updating. (This system mirrors the Turing repo's.)

| File | Single responsibility | Granularity |
|---|---|---|
| [docs/ROADMAP.md](docs/ROADMAP.md) | **Task status** — the *only* source of truth for what's done/active. Active backlog only (📋 designed · 💭 idea · ⏳ partial · 🛠 in-progress). | one line per task |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | What has **shipped** — a searchable index; `git log` is authoritative for detail. | one line per shipped task |
| [docs/IMPROVEMENTS.md](docs/IMPROVEMENTS.md) | **Design rationale** (what/why) for *unshipped* sections only. No status tables, no shipped reports. | prose per active section |
| [docs/STRATEGY.md](docs/STRATEGY.md) | Business/positioning (the bets: showcase, dogfooding, GEO, the Cloud migration). | prose |

**Task numbering — the next free `W<n>` lives in [docs/last-task.md](docs/last-task.md).**
Read it before adding a task, use `W<n+1>`, then bump the counter + append a log
line. Numbers are **non-contiguous across blocks** — never infer the next from a
block header range or a `git log` scan. The `W` prefix keeps these distinct from
the Turing repo's `T` numbers.

**The cross-file update rules — follow these every time:**

1. **When a task ships:** move its one-liner from `ROADMAP.md` → `CHANGELOG.md`
   (under its block) and **delete** its design subsection from `IMPROVEMENTS.md`.
   `git log` is the history — don't leave a shipped report in `IMPROVEMENTS.md`.
2. **When you add a task:** add the one-liner to `ROADMAP.md` (with `deps` + a
   `→ §x.y` pointer) and, if it needs design, the rationale subsection in
   `IMPROVEMENTS.md`. Status lives **only** in `ROADMAP.md`.
3. **Status belongs to exactly one file.** If a marker in `IMPROVEMENTS.md`
   disagrees with `ROADMAP.md`/`CHANGELOG.md`, the roadmap files win.
4. **Keep entries terse** — *what + why + pointer* (~1 sentence). Detail goes in
   code/commits, not table cells.
5. **Strategy ≠ backlog.** Positioning/market discussion goes in `STRATEGY.md`,
   never as a numbered task.
6. **Non-goals are binding** — `ROADMAP.md` → "Non-goals" + `IMPROVEMENTS.md` §0
   list what *not* to build. Check them before proposing work.

## Cross-repo links

- **cursarei** (`D:\Git\alegauss\cursarei`) — the Next.js reference app this
  roadmap is modeled on; the working source for the Next.js/SSG/`llms.txt`/Docker
  patterns Block G needs.
- **Turing** (`d:\Git\viglet\turing\2026.1`) — Block E (GEO) is the cross-repo
  counterpart of Turing's STRATEGY Block O, which already names this repo.
- **docs.viglet.org** (`vigletdocs.github.io`) — home of the technical blog the
  product pages link into.
