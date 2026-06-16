# viglet.org — Improvements (design rationale)

> **What this file is:** the *design rationale* (the what & why) for **unshipped**
> work — the spec behind each backlog item. One of four roadmap documents; keep
> them in sync (see [../AGENTS.md](../AGENTS.md) → "Roadmap & docs maintenance").
>
> | File | Holds | One line per |
> |---|---|---|
> | [ROADMAP.md](ROADMAP.md) | **Task status** (single source of truth) — active backlog | task |
> | [CHANGELOG.md](CHANGELOG.md) | What has **shipped** (git is authoritative) | shipped task |
> | [STRATEGY.md](STRATEGY.md) | Business/positioning (the bets, not the build) | — |
> | **IMPROVEMENTS.md** (this file) | Design rationale for active sections | — |
>
> **Founding rule:** once a task ships, remove its detail here and reduce it to a
> one-line entry in CHANGELOG.md. Do not re-accrete shipped reports into this file.

**Status legend** (status itself lives in ROADMAP.md): ⏳ partial · 📋 designed · 💭 idea.

## 0. Binding constraints (non-goals)

Mirror of [ROADMAP.md](ROADMAP.md) → Non-goals; check before proposing work.

- The technical blog lives on `docs.viglet.org` (Docusaurus), **not** here.
- Backend is gated on the Block G migration; until then AI calls an external
  Turing instance and degrades gracefully. No interim bespoke Node server.
- Keep the `llms.txt` / sitemap / prerender plugins (or their Next.js equivalents
  after W17). Don't reintroduce Jekyll/Bootstrap/AngularJS.
- No invented product claims, no superlatives, no unverifiable benchmarks
  (cursarei's grounding rule).

---

## I. Why cursarei seeds this roadmap

`D:\Git\alegauss\cursarei` is a Next.js 15 course aggregator (~6,900 courses,
100+ institutions). Architecturally it is a **live proof of the Viglet stack**:

| cursarei layer | file evidence | Viglet product |
|---|---|---|
| Python crawler indexing 100+ sources | `crawler/engine.py`, `crawler/institutions/*.py` | **Dumont** (web crawler / connector) |
| Lexical (Fuse.js) + semantic (embeddings) + NL-filter search | `src/lib/searchEngine.ts`, `semanticSearch.ts`, `nlFilters.ts` | **Turing ES** |
| AI copilot / compare-summary / profile (RAG, graceful fallback) | `src/lib/llmRuntime.ts`, `copilot.ts`, `api/*/route.ts` | **Turing** (LLM/RAG) |
| Editorial area intros / FAQs | `data/areaIntros.json`, `areaFaqs.json` | **Shio CMS** |

The strategic consequence (full argument in [STRATEGY.md](STRATEGY.md) §I): stop
*describing* the products and start *showing* them. Every block below is a
front-end/content projection of that idea onto the marketing site.

---

## II. Block A — Showcase & proof

### II.1 W1 — Cursarei case-study page

A `/showcase/cursarei` route. Structure: hero (one-line "what & for whom") →
the numbers (courses, institutions, build-time pages) → "the problem" → **how
each Viglet product powers a layer** (links to II.2 diagram) → live-demo CTA →
"build your own" (links Block F). Data-driven from a `src/data/showcase.ts`
entry so future case studies reuse the same page component. Grounding: only
facts observable from the running app — no invented metrics.

### II.2 W2 — "Built with Viglet" architecture diagram

A reusable React/SVG component rendering the pipeline **Dumont → Turing → Shio**
with one-line captions per stage. Lives in `src/components/` (design-system
tokens, no inline colors per the DS convention). Consumed by W1 and any future
showcase. It is the asset that converts "three product pages" into "one coherent
platform story."

### II.3 W3 — Showcase index

`/showcase` gallery; each card = {logo, one-liner, live-demo link, case-study
link}. cursarei is card #1. Feeds a home-page trust strip ("Built with Viglet").
Keep it data-driven; an empty gallery is worse than no page, so ship with ≥1 real
entry.

### II.4 W4 — Live-demo CTA

The highest-leverage, lowest-effort item: a "try it live" link to the running
cursarei from the home hero and the Turing solution page. A working search beats
any feature copy. Open in a new tab; label it as a reference deployment.

---

## III. Block B — Embedded AI (dogfood Turing)

> All three call a Turing instance *today* (external endpoint) and become native
> API routes after Block G (W19). All three **must** ship a deterministic
> fallback path — the visitor never sees an error if the LLM is down.

### III.1 W5 — Product-finder copilot

A chat widget answering "which Viglet product do I need?" via RAG over
`docs.viglet.org`. The pitch writes itself: *the chat you're using is our
product.* Mirror cursarei's `copilot.ts` (retrieval → grounded answer, IDs
validated against a closed list) and `llmRuntime.ts` (content-keyed cache, daily
budget, 20s timeout, fallback). **Fallback:** a static decision-tree
("indexing? → Dumont"; "content? → Shio"; "search/AI? → Turing") rendered as
chips. No superlatives; link every claim to a docs page.

### III.2 W6 — Semantic site search

Turing-powered search over products + release notes + docs. Replaces/augments any
static filter. Every query exercises the product. **Fallback:** client-side
fuzzy filter over the existing `src/data/*` (Fuse-style), so search always works.

### III.3 W7 — NL problem → product match

cursarei's `nlFilters` pattern repurposed: free-text problem statement → matched
product(s) + reasons. "preciso crawlear minha intranet e ter busca com IA" →
Dumont + Turing. Backed by W6's retrieval; fallback to keyword detection over a
small intent table.

---

## IV. Block C — Interactive product selection

### IV.1 W8 — "Which Viglet product?" wizard

2–3 question client-side selector (no backend) → recommends Dumont / Shio /
Turing or a combo, with a one-paragraph rationale and links. The non-AI sibling
of W5: instant, offline, always available. Questions branch on {what you have,
what you want, who runs it}.

### IV.2 W9 — Product comparison table

Dumont × Shio × Turing side-by-side; expandable rows (cursarei `Compare`).
Selection/filter state in the URL query string (cursarei `urlState.ts`) so a
comparison is shareable and back/forward works. Rows: purpose, primary use case,
deploy model, integrates-with, license. Facts only.

---

## V. Block D — Engagement & lead capture

### V.1 W10 — Release / feature alert opt-in

Low-friction email capture ("avise-me sobre novas releases"). Converts anonymous
traffic into a contactable evaluator list — the scarce asset per
[STRATEGY.md](STRATEGY.md) §I.4 (distribution, not features, is the bottleneck).
LGPD: explicit opt-in, unsubscribe link, no pre-checked boxes. Storage: a form
endpoint (native after Block G; a form service before).

### V.2 W11 — Newsletter signup

Opt-in digest of releases + new `docs.viglet.org/blog` guides. Builds on W10's
capture plumbing. Cadence and content owned editorially, not in code.

### V.3 W12 — Consent banner

Privacy-first analytics gate (cursarei `ConsentBanner`): no analytics cookies
until consent; choice persisted in `localStorage`. Pre-requisite for any
measurement so we never ship tracking that violates the grounding/trust posture.

---

## VI. Block E — Discoverability / GEO

> Cross-repo execution of Turing [STRATEGY.md] §IX.4/§X. The thesis: an LLM
> recommends by semantic association built from the open web; "Viglet" is barely
> connected to "enterprise search / Algolia alternative / AEM search" in that
> corpus. These tasks manufacture the association on the surfaces models ingest.

### VI.1 W13 — Enrich `llms.txt`

Extend [vite-plugin-llmtxt.ts](../vite-plugin-llmtxt.ts) (the blog-guide half
shipped — see CHANGELOG) with: product positioning lines, the named use-cases,
and comparison framing ("open-source alternative to …"). Keep it factual and
skimmable — it's read by machines and humans.

### VI.2 W14 — Comparison landing pages

Positioning pages whose **titles are the queries users type** ("open-source
alternative to Algolia", "enterprise search for Adobe AEM"). They convert
existing competitor search volume and cross-link *into* the docs how-to guides
(the actual conversion path — Turing STRATEGY §X.2 keeps how-tos on docs, not
here). Facts-only comparisons; no disparagement.

### VI.3 W15 — Cross-link product pages → docs guides

Each solution page links to the matching `docs.viglet.org/blog` integration
guide; bidirectional with the docs repo. Tightens the GEO graph and the human
funnel simultaneously.

---

## VII. Block F — Reference app / developer funnel

### VII.1 W16 — Publish cursarei as an open-source starter

A reference repo ("AI search portal on Viglet — clone & run") is the strongest
*technical* lead-magnet: developers who clone it become Dumont/Turing users.
Positioning in [STRATEGY.md](STRATEGY.md) §I.5. Mechanics (what to genericize,
what to strip, license) gated until W1/W2 land so the case study and the repo
tell one story. Depends on the cursarei owner's go-ahead — it's their codebase.

---

## VIII. Block G — Next.js + Viglet Cloud migration

> The platform shift that makes Block B native and turns viglet.org itself into a
> Cloud reference deployment. Bet + sequencing in [STRATEGY.md](STRATEGY.md) §VII.

### VIII.1 W17 — Migrate SPA → Next.js (App Router, SSG-first)

Port the six routes ([src/App.tsx](../src/App.tsx)) to the App Router. **Keep:**
`@viglet/viglet-design-system`, Tailwind v4, i18next, react-i18next, the
data-driven `src/data/*` model. **Reproduce the build plugins' output** with Next
equivalents — `app/llms.txt/route.ts` (port [vite-plugin-llmtxt.ts](../vite-plugin-llmtxt.ts)),
`app/sitemap.ts` (port [vite-plugin-sitemap.ts](../vite-plugin-sitemap.ts)), and
SSG/`generateStaticParams` for the per-route prerender that
[vite-plugin-spa-prerender.ts](../vite-plugin-spa-prerender.ts) does today.
**Bar:** zero visual and SEO regression (same URLs, same `<head>`, same JSON-LD,
same `llms.txt`). cursarei is the working reference for every one of these
patterns — read it before designing. Keep dynamic segments matching today's
trailing-slash routes (`/:identifier/`).

### VIII.2 W18 — Deploy on Viglet Cloud as a site

Add a Dockerfile (Next standalone output) and wire viglet.org into Viglet Cloud
as a managed site — mirror cursarei's deployment (Dockerfile + config in the
`viglet/cloud` repo). Dogfooding: the marketing site runs on the Cloud platform
it markets. Decommission the GitHub Pages deploy only after Cloud serves the same
content at the same domain (CNAME cutover last).

### VIII.3 W19 — Native AI API routes

With the server in place, implement W5–W7 backends as App Router route handlers,
porting cursarei's `src/lib/llmRuntime.ts` discipline: SHA-keyed content cache
(invalidates when source content changes), per-feature daily token budget,
timeout, and **deterministic fallback on no-key / budget-exhausted / error**.
Optionally SQLite (better-sqlite3) for click/cache as cursarei does. This
supersedes the external-endpoint approach in Block B once shipped — update those
tasks' notes when it lands.
