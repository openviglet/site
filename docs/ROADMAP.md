# viglet.org — Roadmap (active backlog)

> **Single source of truth for task status.** Flat, one line per task.
> Only **unshipped** work lives here (📋 designed · 💭 idea · ⏳ partial · 🛠 in-progress).
> Shipped work is moved to [CHANGELOG.md](CHANGELOG.md); design rationale (the
> *what/why* per task) lives in [IMPROVEMENTS.md](IMPROVEMENTS.md); strategy/positioning
> lives in [STRATEGY.md](STRATEGY.md).
>
> Tasks use a **`W`** (website) prefix so they never collide with Turing's `T`
> counter. **Next free number → [last-task.md](last-task.md).**
>
> **How to pick work:** lowest-numbered task in a block whose `deps` are all shipped.
> The `→` pointer is the section in IMPROVEMENTS.md with the full design.

| Symbol | Meaning |
|---|---|
| 📋 | Designed but not started |
| 💭 | Idea worth exploring; needs design |
| ⏳ | Partial — direction is right, more work remains |
| 🛠 | In progress |

> **Origin (2026-06-16):** this backlog was seeded by analysing the **cursarei**
> project (`D:\Git\alegauss\cursarei`) — a lightweight Next.js course-aggregator
> that is, in practice, a live showcase of the Viglet stack (Dumont crawls →
> Turing searches/answers → Shio serves content). The bet behind every block is
> in [STRATEGY.md](STRATEGY.md) §I. These are **content / front-end / SEO** tasks
> on a static React+Vite SPA; AI features call a Turing instance and **degrade
> gracefully** (§ non-goals).

## Block A — Showcase & proof ("Built with Viglet")

- 📋 **W1** (deps: —) **Cursarei case-study page** `/showcase/cursarei` — what it does (~6.9k courses, 100+ institutions), the problem it solves, and how each Viglet product powers a layer. The single strongest conversion asset: a buyer *sees* the stack working. → §II.1
- 💭 **W3** (deps: W1) **Showcase index** `/showcase` — gallery of reference deployments (cursarei first), each card linking to a live demo + case study. Seeds a "logos" trust bar on the home page. → §II.3
- 💭 **W4** (deps: W1) **Live-demo CTA** — prominent "try it live" link to the running cursarei (and any future hosted demo) from the home hero and the Turing solution page. → §II.4

## Block B — Embedded AI (dogfood Turing on our own site)

- 💭 **W5** (deps: —) **Product-finder copilot** — chat widget "Qual produto Viglet eu preciso?" backed by a Turing instance doing RAG over `docs.viglet.org`. The feature *is* the demo: the chat the visitor uses is the product. Must fall back to a static decision-tree when the Turing endpoint is unavailable. → §III.1
- 💭 **W6** (deps: —) **Semantic site search** — Turing-powered search over products + release notes + docs, replacing/augmenting any static search. Every query is a micro-demo. Graceful fallback to client-side filtering. → §III.2
- 💭 **W7** (deps: W6) **Natural-language problem → product match** — "preciso indexar minha intranet e adicionar busca com IA" → returns Dumont + Turing with reasons (cursarei's `nlFilters` pattern, ported to product matching). → §III.3

## Block C — Interactive product selection

- 📋 **W8** (deps: —) **"Which Viglet product?" wizard** — 2–3 question selector → recommends Dumont / Shio / Turing (or a combination) with rationale. Pure client-side; no backend. → §IV.1
- 💭 **W9** (deps: —) **Product comparison table** — Dumont × Shio × Turing side-by-side with expandable rows; filter/selection state preserved in the URL (cursarei's `Compare` + `urlState` pattern). → §IV.2

## Block E — Discoverability / GEO (cross-repo with Turing Block O)

> Executes Turing [STRATEGY.md] §IX.4 / §X — make LLM assistants suggest Viglet
> for "open-source enterprise search / Algolia alternative / AEM search". Turing's
> roadmap already names this repo (`openviglet.github.io`) as a GEO surface.

- ⏳ **W13** (deps: —) **Enrich `llms.txt`** — extend [vite-plugin-llmtxt.ts](../vite-plugin-llmtxt.ts) with product positioning, use-cases, and comparison framing so LLM crawlers connect "Viglet" to the target queries. (Blog-guide enrichment already shipped — see CHANGELOG.) → §VI.1
- 💭 **W14** (deps: —) **Comparison landing pages** — "open-source alternative to Algolia/Coveo", "enterprise search for AEM/WordPress" — positioning pages that cross-link *into* the docs how-to guides (the conversion path, per Turing STRATEGY §X.2). → §VI.2
- 💭 **W15** (deps: W14) **Cross-link product pages → docs blog guides** — every solution page links to the matching `docs.viglet.org/blog` integration guide; bidirectional with the docs repo. → §VI.3

## Block F — Reference app / developer funnel

- 💭 **W16** (deps: W1, W2) **Publish cursarei as an open-source starter** — "clone this to build an AI search portal on Viglet". A reference repo is the strongest technical lead-magnet; devs who clone it become Dumont/Turing users. Strategy/positioning in §I.5; mechanics gated. → §VII.1

## Block G — Platform migration (Next.js server + Viglet Cloud)

> **Direction (2026-06-16).** viglet.org will move from the static React+Vite SPA
> to a **Next.js server** app and be **deployed on Viglet Cloud as one more site**
> — the exact shape cursarei already has (Next.js 15 + Docker in `viglet/cloud`).
> This is the enabler that makes Block B's AI features **native** (API routes,
> server-side RAG, SQLite click/cache like cursarei) instead of calls to an
> external endpoint, and makes viglet.org itself a Cloud reference deployment.
> Rationale + migration plan → STRATEGY §VII; design → IMPROVEMENTS §VIII.

- 💭 **W17** (deps: —) **Migrate SPA → Next.js (App Router, SSG-first)** — port the 6 pages ([App.tsx](../src/App.tsx) routes) to the App Router, keep `@viglet/viglet-design-system` + Tailwind v4 + i18next, and reproduce the three Vite plugins' output (`llms.txt`, sitemap, prerendered HTML) via Next equivalents (`app/llms.txt/route.ts`, `sitemap.ts`, static export/SSG). No visual/SEO regression is the bar. → §VIII.1
- 💭 **W18** (deps: W17) **Deploy on Viglet Cloud as a site** — Dockerfile + Cloud wiring mirroring cursarei's deployment in the `viglet/cloud` repo; viglet.org becomes a managed Cloud site (proves the Cloud platform on our own marketing surface). → §VIII.2
- 💭 **W19** (deps: W17) **Native AI API routes** — once on Next.js server, implement W5–W7 backends as App Router API routes (copilot, semantic search, NL match) with content-keyed cache + daily budget + deterministic fallback, following cursarei's `llmRuntime` pattern. Supersedes the "external Turing call" approach in Block B once shipped. → §VIII.3

## Block I — Viglet Cloud (beta) surface

> **Origin (2026-07-19):** Viglet Cloud launched but is **beta / testing-only**
> right now. It is the **4th surface** in the channel model (STRATEGY §II) — the
> *managed/hosted* delivery of the same products, sitting beside self-host via
> Docker: "**self-host with Docker** *or* **run it on Cloud (beta)**". Decision:
> **light-touch, honest** exposure — a **Beta** badge on every mention, a footer
> link, one small home callout, and a low-friction early-access capture. **Not** a
> 4th product card equal to Dumont/Shio/Turing; **not** a primary CTA. Reuses Block
> D's privacy discipline (W10/W12) for the signup. turing.viglet.org gets the same
> light mention (cross-repo, like Block E ↔ Turing Block O). Design → IMPROVEMENTS §X.

- 📋 **W29** (deps: —) **Cloud as a surface (data + footer link)** — represent Viglet Cloud in the data layer (a `cloud` entry / `src/data/cloud.ts`: url, `beta: true`, one-liner) and add a "Cloud · Beta" link to the footer across all pages. Foundation for W30–W32. → §X.1
- 💭 **W30** (deps: W29) **Home "Viglet Cloud — beta" callout** — a small band (not a product card) framing hosted-vs-self-host, explicitly **Beta**, with an early-access CTA. Honest about the testing phase; no stability claims. → §X.2
- 💭 **W31** (deps: W30, W10, W12) **Beta early-access capture** — low-friction "entrar na beta" email opt-in, LGPD-compliant, reusing Block D's capture + consent-banner discipline (W10/W12). Degrades gracefully while the site is a static SPA (no backend until Block G). → §X.3
- 💭 **W32** (deps: W29) **"Or run on Cloud (beta)" on Download/Self-host** — a line on the Docker download pages presenting Cloud as the hosted alternative to `docker run`. Pairs the two delivery modes at the moment of intent. → §X.4
- 💭 **W33** (deps: W29) **[cross-repo] Cloud (beta) mention on turing.viglet.org** — mirror the light mention in turing's `SelfHost` section ("or try it on Cloud — beta") + footer. Tracked here; **executed in the turing repo** (`frontend/apps/site`). → §X.5

## Non-goals (do NOT add as tasks)

Binding constraints — see [IMPROVEMENTS.md](IMPROVEMENTS.md) §0 and
[STRATEGY.md](STRATEGY.md) §I.6 for the full text. Summary:

- **No blog on viglet.org.** The technical blog lives on `docs.viglet.org`
  (Docusaurus, native blog plugin). viglet.org links *into* it. Building editorial
  tooling in this custom SPA is days of work and dilutes the docs' authority
  (Turing STRATEGY §X.2 — decided).
- **Backend is gated on the Block G migration.** *Today* the site is a static SPA
  (Vite → GitHub Pages), so AI features (W5–W7) call an external Turing instance
  over HTTP. *After* W17/W18 (Next.js on Viglet Cloud), they become native API
  routes (W19). Either way they **must** degrade to a deterministic UI when the
  backend is unavailable — never a hard error or a never-resolving spinner. Do
  not bolt a bespoke Node server onto the Vite build as an interim — wait for the
  Next.js migration.
- **Don't remove** the `vite-plugin-llmtxt` / `vite-plugin-sitemap` /
  `vite-plugin-spa-prerender` plugins — they are the SEO/GEO foundation.
- **Don't reintroduce Jekyll/Bootstrap/AngularJS.** The site is React 19 + Vite 8
  + Tailwind v4 + `@viglet/viglet-design-system`. (The root `README.md` is stale.)
- **Don't invent product claims.** Mirror cursarei's grounding rule: no
  superlatives, no unverifiable benchmarks. Comparisons state objective facts.
