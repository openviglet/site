# viglet.org: Roadmap (active backlog)

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
| ⏳ | Partial: direction is right, more work remains |
| 🛠 | In progress |

> **Origin (2026-06-16):** this backlog was seeded by analysing the **cursarei**
> project (`D:\Git\alegauss\cursarei`), a lightweight Next.js course-aggregator
> that is, in practice, a live showcase of the Viglet stack (Dumont crawls →
> Turing searches/answers → Shio serves content). The bet behind every block is
> in [STRATEGY.md](STRATEGY.md) §I. These are **content / front-end / SEO** tasks
> on a static React+Vite SPA; AI features call a Turing instance and **degrade
> gracefully** (§ non-goals).

## Block A — Showcase & proof ("Built with Viglet")

- 💭 **W3** (deps: W1 ⏸) **Showcase index** — `/showcase`: a gallery of reference deployments (cursarei first), each card linking to a live demo and case study, seeding a logos trust bar on the home page. → §II.3
- 💭 **W4** (deps: W1 ⏸) **Live-demo CTA** — prominent "try it live" link to the running cursarei (and any future hosted demo) from the home hero and the Turing solution page. → §II.4

## Block B — Embedded AI (dogfood Turing on our own site)

- ⏳ **W7** (deps: W6 ✅, W19 ⏸) **Natural-language problem → product match** — match with a language model limited to the closed product list, as a W19 API route with the intent table as fallback. → §III.3

## Block C — Interactive product selection

## Block E — Discoverability / GEO

> **Origin (2026-10-17):** relevance pass from the alegauss/visibility analysis
> (`estrategia/viglet.md`). Search Console reads about 8 clicks a month, nearly all
> on the brand; the only generic queries with impressions are AEM ones, on page
> four. Turing is the long-term relevance bet from 2027, through search and AI
> assistants. Design → IMPROVEMENTS §XI.

- 📋 **W40** (deps: W1 ⏸, W39 ✅) **Home in searched words, AEM as the front door** — a home headline naming the searched problem and the AEM page reworked around "aem search" queries, cross-linked with the Turing and Dumont AEM docs and proven by the W1 case study. → §XI.3

## Block F — Reference app / developer funnel

- 💭 **W16** (deps: W1 ⏸, W2 ✅) **Publish cursarei as an open-source starter** — "clone this to build an AI search portal on Viglet", a reference repo as the technical lead magnet that turns the devs who clone it into Dumont and Turing users. → §VII.1

## Block G — Platform migration (Next.js server + Viglet Cloud)

> **Direction (2026-06-16).** viglet.org will move from the static React+Vite SPA
> to a **Next.js server** app and be **deployed on Viglet Cloud as one more site**,
> the exact shape cursarei already has (Next.js 15 + Docker in `viglet/cloud`).
> This is the enabler that makes Block B's AI features **native** (API routes,
> server-side RAG, SQLite click/cache like cursarei) instead of calls to an
> external endpoint, and makes viglet.org itself a Cloud reference deployment.
> Rationale + migration plan → STRATEGY §VII; design → IMPROVEMENTS §VIII.

## Block I — Viglet Cloud (beta) surface

> **Origin (2026-07-19):** Viglet Cloud launched but is **beta / testing-only**
> right now. It is the **4th surface** in the channel model (STRATEGY §II): the
> *managed/hosted* delivery of the same products, sitting beside self-host via
> Docker: "**self-host with Docker** *or* **run it on Cloud (beta)**". Decision:
> **light-touch, honest** exposure: a **Beta** badge on every mention, a footer
> link, one small home callout, and a low-friction early-access capture. **Not** a
> 4th product card equal to Dumont/Shio/Turing; **not** a primary CTA. Reuses Block
> D's privacy discipline (W10/W12) for the signup. turing.viglet.org gets the same
> light mention (cross-repo, like Block E ↔ Turing Block O). Design → IMPROVEMENTS §X.

## Non-goals (do NOT add as tasks)

Binding constraints: see [IMPROVEMENTS.md](IMPROVEMENTS.md) §0 and
[STRATEGY.md](STRATEGY.md) §I.6 for the full text. Summary:

- **No blog tooling beyond Markdown files.** The blog moved here (W46) as
  Markdown in `content/blog/`, prerendered by Next.js. No CMS, editor or second
  framework (Astro etc.) for it.
- **Backend is gated on the Block G migration.** *Today* the site is a static SPA
  (Vite → GitHub Pages), so AI features (W5–W7) call an external Turing instance
  over HTTP. *After* W17/W18 (Next.js on Viglet Cloud), they become native API
  routes (W19). Either way they **must** degrade to a deterministic UI when the
  backend is unavailable, never a hard error or a never-resolving spinner. Do
  not bolt a bespoke Node server onto the Vite build as an interim. Wait for the
  Next.js migration.
- **Don't remove** the `vite-plugin-llmtxt` / `vite-plugin-sitemap` /
  `vite-plugin-spa-prerender` plugins: they are the SEO/GEO foundation.
- **Don't reintroduce Jekyll/Bootstrap/AngularJS.** The site is React 19 + Vite 8
  + Tailwind v4 + `@viglet/viglet-design-system`. (The root `README.md` is stale.)
- **Don't invent product claims.** Mirror cursarei's grounding rule: no
  superlatives, no unverifiable benchmarks. Comparisons state objective facts.
