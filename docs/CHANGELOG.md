# viglet.org — Shipped Ledger (CHANGELOG)

> Concise index of work that has shipped. **`git log` is the authoritative
> history** — this file is just a searchable map of *what* shipped and *where*
> the rationale lived.
>
> Maintenance: when a task in [ROADMAP.md](ROADMAP.md) ships, move its one-line
> entry here (under its block), reference the commit if useful, and delete it
> from ROADMAP (and its design subsection from [IMPROVEMENTS.md](IMPROVEMENTS.md)).
> See [../AGENTS.md](../AGENTS.md) → "Roadmap & docs maintenance".

## Block 0 — Foundation (pre-roadmap, shipped)

> Work that predates this four-doc system, listed for context. These were not
> `W`-numbered; the backlog numbering starts at `W1`.

- **Stack migration** — site rebuilt as a **React 19 + Vite 8 + Tailwind v4** SPA
  consuming `@viglet/viglet-design-system`, `react-router-dom` v7, and i18next
  (replaced the legacy Jekyll/Bootstrap/AngularJS site; root `README.md` still
  references the old `jekyll serve` and is stale).
- **SEO/GEO build plugins** — [vite-plugin-llmtxt.ts](../vite-plugin-llmtxt.ts)
  (emits `llms.txt`), [vite-plugin-sitemap.ts](../vite-plugin-sitemap.ts), and
  [vite-plugin-spa-prerender.ts](../vite-plugin-spa-prerender.ts) (static HTML
  per route for crawlers).
- **Six routes** — home, solution (`/:identifier/`), download, release-notes,
  partner, about ([src/App.tsx](../src/App.tsx)); data-driven from
  `src/data/{solutions,features,modules,categories}.ts`.
- **feat(seo): Blog link in footer** → `docs.viglet.org/blog` (`50dfa49`).
- **feat(seo): FAQPage JSON-LD + llms.txt enriched with blog guides** (`d9133a2`)
  — partial credit toward **W13** (the blog-guide half of the enrichment).
- **fix(seo): scope FAQPage JSON-LD to the home page only** (`525a792`).
