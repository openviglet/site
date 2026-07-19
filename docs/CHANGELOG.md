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

## Block A — Showcase & proof

- **W2 — "Built with Viglet" pipeline diagram** — reusable
  [PipelineDiagram.tsx](../src/components/PipelineDiagram.tsx) rendering the
  Dumont → Turing → Shio flow as product-coloured, numbered process cards.
  Data-driven from `narrative.ts`; consumed by the home "how the three connect"
  band (W21) and reusable by any future showcase (W1/W3).

## Block H — Conversion narrative & product essence

> Ported turing.viglet.org's conversion craft to the multi-product story with
> **zero new runtime deps** (the OG rasterizer is an optional build-only dep).
> Grounding rule held: no invented metrics. Design rationale was IMPROVEMENTS §IX
> (removed on ship).

- **W20 — Narrative content model** — typed
  [src/data/narrative.ts](../src/data/narrative.ts) (`outcomes`, `pipeline`,
  `essence` pillars per product, `providerGroups`, `faq`) with `getX()` helpers.
  The foundation the sections below `map()` over.
- **W21 — Home → conversion narrative** — [HomePage.tsx](../src/pages/HomePage.tsx)
  restructured to *hook → see → outcomes → suite → how-the-three-connect →
  works-with-your-stack → FAQ → convert → community*, with a dark-gradient closing
  CTA. (The compare-teaser sub-idea was skipped — its W9 comparison table isn't
  built yet, so it would have been a dead link.)
- **W22 — Outcome-led section** — [Outcomes.tsx](../src/components/sections/Outcomes.tsx)
  ("what changes for you"), results-first with product-accented cards.
- **W23 — Reusable Terminal component** — [Terminal.tsx](../src/components/Terminal.tsx)
  (`Terminal` macOS faux-terminal + `CommandBlock`). DownloadPage's private
  `CopyableCommand` was promoted into it; reused on home (closing CTA) and each
  SolutionPage.
- **W24 — Per-product essence on SolutionPage** — data-driven pillars +
  tagline per product on [SolutionPage.tsx](../src/pages/SolutionPage.tsx),
  from `narrative.ts` `essence`.
- **W25 — "Works with your stack" pill wall** — [StackWall.tsx](../src/components/sections/StackWall.tsx),
  a grouped providers/tech grid (sources · engines · AI/LLMs · delivery).
- **W26 — Home FAQ + FAQPage JSON-LD** — [HomeFaq.tsx](../src/components/sections/HomeFaq.tsx)
  renders `narrative.ts` `faq[]`; `index.html`'s static FAQPage JSON-LD now
  mirrors it verbatim (superset that folds in the Block E GEO Q&As), so
  structured data matches on-page content.
- **W27 — Per-route OG social images** — build-time
  [scripts/og-images.mjs](../scripts/og-images.mjs) renders a per-identity
  1200×630 card (SVG → PNG via optional `@resvg/resvg-js`, defensive skip);
  [vite-plugin-spa-prerender.ts](../vite-plugin-spa-prerender.ts) injects
  per-route `og:image`/`twitter:image` (+ default OG tags in `index.html`).
  Build-time only — no server (respects the Block G non-goal).
- **W28 — Scripted product demo** — [ScriptedDemo.tsx](../src/components/sections/ScriptedDemo.tsx),
  a deterministic, always-resolving search-and-answer widget over Viglet's own
  content (the home "see" band). Reduced-motion safe; upgradeable to a real
  Turing-backed demo once Block B / Cloud lands.
