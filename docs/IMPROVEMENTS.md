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

---

## IX. Block H — Conversion narrative & product essence

> **Source:** teardown of **turing.viglet.org** (`turing/2026.1/frontend/apps/site`)
> — same stack as this repo (React 19 + Vite 8 + Tailwind v4, **no Next, no
> animation library**), so every *structural* pattern below ports with **zero new
> runtime deps**. turing.viglet sells one product's essence with a
> hook→see→outcomes→how→proof→compare→convert flow, a data-driven content model
> (`src/lib/site-content.ts`), dev terminals, an honest comparison + FAQ, and
> per-route OG images. viglet.org is the *portfolio* site (all products) but stops
> at hero + product cards + community. This block ports the craft to the
> multi-product story. **Already done, so not tasked:** anti-FOUC theme boot
> (index.html) and per-route canonical/meta (vite-plugin-spa-prerender). Binding:
> the grounding rule (§0) — no invented metrics, comparisons state objective facts.

### IX.1 W20 — Narrative content model

A typed `src/data/narrative.ts` holding `outcomes[]`, `pillars[]`, `faq[]`,
`providers[]` (and room for future arrays), so the new sections are pure `map()`
over data with copy separated from layout — the pattern that makes turing's
`site-content.ts` scale to many sections. This is the **foundation** for W21–W26;
build it first so those tasks are layout-only. Reuse the existing `src/data/*`
conventions (typed export + `getX()` helpers). No product claim that isn't
observable from a running product.

### IX.2 W21 — Home → conversion narrative

Restructure [HomePage.tsx](../src/pages/HomePage.tsx) from *hero · trust · products
· community* to the turing flow: **hook** (keep hero) → **see** → **outcomes**
(W22) → **how the three connect** (a Dumont → Turing → Shio band that consumes the
W2 pipeline diagram — the asset that turns "three product pages" into one platform
story) → **proof** (keep/upgrade the trust strip) → **compare** (a teaser that
deep-links the W9 comparison table) → **convert** (a stronger dark-gradient closing
CTA). Sections stay data-driven (W20). No visual regression on the parts kept.

### IX.3 W22 — Outcome-led section ("what changes for you")

A results-first band around the product cards: lead with outcomes ("find answers,
not links"; "extract from any source without glue code"; "model content, ship a
site") rather than feature lists, with self-justifying subheads (turing's
`OUTCOMES` pattern: "A capability list is easy to skim past — here's what actually
changes"). Data from W20. Grounding rule binds — outcomes must be defensible.

### IX.4 W23 — Reusable terminal component

Promote DownloadPage's private `CopyableCommand` into a shared
`src/components/Terminal.tsx`: a macOS-style faux terminal (traffic-light dots,
monospace, colored prompt/flag/comment spans, click-to-copy) plus a plain
copy-command pill variant. Reuse on home, solution, and download pages. Pure
presentation, design-system tokens (no inline colors), `prefers-reduced-motion`
safe. Cheap to build, high credibility for the dev audience.

### IX.5 W24 — Per-product "essence" on SolutionPage

Give each product the storytelling turing.viglet gives one: data-driven **pillars**
(the 3–4 verbs/capabilities that define it) + **outcomes** per product on
[SolutionPage.tsx](../src/pages/SolutionPage.tsx), replacing the flat feature grid
with a narrative. Extend the W20 model with a `solution` key per entry so the same
component renders all three. This is what makes a portfolio page feel like a
product page.

### IX.6 W25 — "Works with your stack" pill wall

A providers/tech grid (AEM, WordPress, Solr, Elasticsearch, databases, the LLM
providers) derived from [modules.ts](../src/data/modules.ts) / [features.ts](../src/data/features.ts)
— turing's `PROVIDERS` pill-wall pattern. Each pill objective and, where a guide
exists, deep-linking into `docs.viglet.org` (bidirectional with W15). Answers
"does it fit *my* environment?" at a glance.

### IX.7 W26 — Home FAQ + FAQPage JSON-LD

An honest, objection-pre-empting FAQ ("Do I need all three?", "Is it really free?",
"Self-hosted vs Cloud?", "How is this different from X?") rendered from the W20
`faq[]` and **emitted as FAQPage JSON-LD** for rich results — extending the
FAQPage JSON-LD already shipped (CHANGELOG). Answers first, no hype.

### IX.8 W27 — Per-route OG social images

Port turing's `scripts/og-image.mjs`: at build time, render a per-route SVG
(product logo + title + brand gradient) and rasterize to PNG (`@resvg/resvg-js`),
wiring `og:image`/`twitter:image` per route. Fits the existing **build-time** plugin
model ([vite-plugin-spa-prerender.ts](../vite-plugin-spa-prerender.ts) already does
per-route canonical/meta) — **no runtime server**, so it respects the Block G
non-goal. Big social-share win over the current single static image.

### IX.9 W28 — Interactive/scripted product demo in the hero

turing's strongest move: the product *is* the hero visual (a live search box, not a
screenshot). Port the idea as an embedded demo widget that runs a **deterministic
scripted interaction** by default (dependency-light, always-working), and upgrades
to a real Turing-backed demo once Block B / the Cloud migration lands. Must never
show a broken/never-resolving state (same fallback discipline as Block B). Relates
to W4 (live-demo CTA) — the CTA links out; this embeds.

---

## X. Block I — Viglet Cloud (beta) surface

> **Context:** Viglet Cloud is live but **beta / testing-only**. It is the 4th
> surface in the channel model (STRATEGY §II): the *managed/hosted* delivery of the
> same products, paired with self-host via Docker. The whole block is **light-touch
> and honest** — a **Beta** badge on every mention, no over-promising, no 4th
> product card, no primary CTA. It plants the seed and captures interested
> evaluators without implying production stability. All copy obeys §0 grounding.

### X.1 W29 — Cloud as a surface (data + footer link)

Represent Cloud once, in data, so every mention stays consistent: a `src/data/cloud.ts`
(or a `cloud` entry beside `solutions`) with `url` (viglet.cloud), `beta: true`, and
a one-line value prop. Add a "**Cloud · Beta**" link to the shared footer
([Footer.tsx](../src/components/layout/Footer.tsx)) so it appears site-wide. This is
the low-risk foundation W30–W32 build on; nothing here claims stability.

### X.2 W30 — Home "Viglet Cloud — beta" callout

A small home band — **not** a product card in the suite — that frames the two
delivery modes: "self-host with Docker, or **run it on Cloud (beta)**". Carries an
explicit `Beta` badge and an early-access CTA (W31). Honest about the testing phase;
no SLAs, no "production-ready" language. Sits after the products section, before the
community/CTA close.

### X.3 W31 — Beta early-access capture

A low-friction "**entrar na beta**" email opt-in — the highest-value light-touch
move: it turns anonymous interest into a contactable early-access list. **Reuse
Block D**: the W10 capture pattern + the W12 consent banner (LGPD/privacy-first, no
analytics/marketing cookies without consent). While the site is a static SPA there
is no backend, so submit to a privacy-respecting form endpoint or gate the whole
feature behind availability — and **degrade gracefully** (never a hard error or a
dead spinner), exactly as Block B requires. Revisit as a native route after Block G.

### X.4 W32 — "Or run on Cloud (beta)" on Download/Self-host

At the moment of intent (the Docker download pages — [DownloadPage.tsx](../src/pages/DownloadPage.tsx)),
add a single line pairing the two delivery modes: after the `docker run` quick-start,
"prefer not to self-host? **Run it on Cloud — beta**". Keeps Docker as the default,
Cloud as the hosted alternative. Beta-labelled; links to the W30 callout / viglet.cloud.

### X.5 W33 — [cross-repo] Cloud (beta) mention on turing.viglet.org

Mirror the light mention on the Turing site so the two surfaces tell one story:
a line in turing's `SelfHost` section ("or try it on Cloud — beta") and a footer
link. **Executed in the Turing repo** (`turing/2026.1/frontend/apps/site`), tracked
here — the same cross-repo arrangement as Block E ↔ Turing Block O. Keep wording and
Beta-labelling identical to viglet.org's so the brand voice is consistent.
