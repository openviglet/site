# viglet.org: Improvements (design rationale)

> **What this file is:** the *design rationale* (the what & why) for **unshipped**
> work, the spec behind each backlog item. One of four roadmap documents; keep
> them in sync (see [../AGENTS.md](../AGENTS.md) → "Roadmap & docs maintenance").
>
> | File | Holds | One line per |
> |---|---|---|
> | [ROADMAP.md](ROADMAP.md) | **Task status** (single source of truth): active backlog | task |
> | [CHANGELOG.md](CHANGELOG.md) | What has **shipped** (git is authoritative) | shipped task |
> | [STRATEGY.md](STRATEGY.md) | Business/positioning (the bets, not the build) | n/a |
> | **IMPROVEMENTS.md** (this file) | Design rationale for active sections | n/a |
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

## II. Block A: Showcase & proof

### II.1 W1: Cursarei case-study page

A `/showcase/cursarei` route. Structure: hero (one-line "what & for whom") →
the numbers (courses, institutions, build-time pages) → "the problem" → **how
each Viglet product powers a layer** (links to II.2 diagram) → live-demo CTA →
"build your own" (links Block F). Data-driven from a `src/data/showcase.ts`
entry so future case studies reuse the same page component. Grounding: only
facts observable from the running app, no invented metrics.

### II.3 W3: Showcase index

`/showcase` gallery; each card = {logo, one-liner, live-demo link, case-study
link}. cursarei is card #1. Feeds a home-page trust strip ("Built with Viglet").
Keep it data-driven; an empty gallery is worse than no page, so ship with ≥1 real
entry.

### II.4 W4: Live-demo CTA

The highest-leverage, lowest-effort item: a "try it live" link to the running
cursarei from the home hero and the Turing solution page. A working search beats
any feature copy. Open in a new tab; label it as a reference deployment.

---

## III. Block B: Embedded AI (dogfood Turing)

> All three call a Turing instance *today* (external endpoint) and become native
> API routes after Block G (W19). All three **must** ship a deterministic
> fallback path: the visitor never sees an error if the LLM is down.

### III.1 W5: Product-finder copilot

A chat widget answering "which Viglet product do I need?" via RAG over
`docs.viglet.org`. The pitch writes itself: *the chat you're using is our
product.* Mirror cursarei's `copilot.ts` (retrieval → grounded answer, IDs
validated against a closed list) and `llmRuntime.ts` (content-keyed cache, daily
budget, 20s timeout, fallback). **Fallback:** a static decision-tree
("indexing? → Dumont"; "content? → Shio"; "search/AI? → Turing") rendered as
chips. No superlatives; link every claim to a docs page.

### III.2 W6: Semantic site search

Turing-powered search over products + release notes + docs. Replaces/augments any
static filter. Every query exercises the product. **Fallback:** client-side
fuzzy filter over the existing `src/data/*` (Fuse-style), so search always works.

### III.3 W7: NL problem → product match

cursarei's `nlFilters` pattern repurposed: free-text problem statement → matched
product(s) + reasons. "preciso crawlear minha intranet e ter busca com IA" →
Dumont + Turing. Backed by W6's retrieval; fallback to keyword detection over a
small intent table.

---

## IV. Block C: Interactive product selection

### IV.1 W8: "Which Viglet product?" wizard

2–3 question client-side selector (no backend) → recommends Dumont / Shio /
Turing or a combo, with a one-paragraph rationale and links. The non-AI sibling
of W5: instant, offline, always available. Questions branch on {what you have,
what you want, who runs it}.

### IV.2 W9: Product comparison table

Dumont × Shio × Turing side-by-side; expandable rows (cursarei `Compare`).
Selection/filter state in the URL query string (cursarei `urlState.ts`) so a
comparison is shareable and back/forward works. Rows: purpose, primary use case,
deploy model, integrates-with, license. Facts only.

---

## VII. Block F: Reference app / developer funnel

### VII.1 W16: Publish cursarei as an open-source starter

A reference repo ("AI search portal on Viglet: clone & run") is the strongest
*technical* lead-magnet: developers who clone it become Dumont/Turing users.
Positioning in [STRATEGY.md](STRATEGY.md) §I.5. Mechanics (what to genericize,
what to strip, license) gated until W1/W2 land so the case study and the repo
tell one story. Depends on the cursarei owner's go-ahead (it's their codebase).

---

## VIII. Block G: Next.js + Viglet Cloud migration

> The platform shift that makes Block B native and turns viglet.org itself into a
> Cloud reference deployment. Bet + sequencing in [STRATEGY.md](STRATEGY.md) §VII.

### VIII.1 W17: Migrate SPA → Next.js (App Router, SSG-first)

Port the six routes ([src/App.tsx](../src/App.tsx)) to the App Router. **Keep:**
`@viglet/viglet-design-system`, Tailwind v4, i18next, react-i18next, the
data-driven `src/data/*` model. **Reproduce the build plugins' output** with Next
equivalents: `app/llms.txt/route.ts` (port [vite-plugin-llmtxt.ts](../vite-plugin-llmtxt.ts)),
`app/sitemap.ts` (port [vite-plugin-sitemap.ts](../vite-plugin-sitemap.ts)), and
SSG/`generateStaticParams` for the per-route prerender that
[vite-plugin-spa-prerender.ts](../vite-plugin-spa-prerender.ts) does today.
**Bar:** zero visual and SEO regression (same URLs, same `<head>`, same JSON-LD,
same `llms.txt`). cursarei is the working reference for every one of these
patterns. Read it before designing. Keep dynamic segments matching today's
trailing-slash routes (`/:identifier/`).

### VIII.2 W18: Deploy on Viglet Cloud as a site

Add a Dockerfile (Next standalone output) and wire viglet.org into Viglet Cloud
as a managed site. Mirror cursarei's deployment (Dockerfile + config in the
`viglet/cloud` repo). Dogfooding: the marketing site runs on the Cloud platform
it markets. Decommission the GitHub Pages deploy only after Cloud serves the same
content at the same domain (CNAME cutover last).

### VIII.3 W19: Native AI API routes

With the server in place, implement W5–W7 backends as App Router route handlers,
porting cursarei's `src/lib/llmRuntime.ts` discipline: SHA-keyed content cache
(invalidates when source content changes), per-feature daily token budget,
timeout, and **deterministic fallback on no-key / budget-exhausted / error**.
Optionally SQLite (better-sqlite3) for click/cache as cursarei does. This
supersedes the external-endpoint approach in Block B once shipped. Update those
tasks' notes when it lands.

---
## X. Block I: Viglet Cloud (beta) surface

> **Context:** Viglet Cloud is live but **beta / testing-only**. It is the 4th
> surface in the channel model (STRATEGY §II): the *managed/hosted* delivery of the
> same products, paired with self-host via Docker. The whole block is **light-touch
> and honest**: a **Beta** badge on every mention, no over-promising, no 4th
> product card, no primary CTA. It plants the seed and captures interested
> evaluators without implying production stability. All copy obeys §0 grounding.

### X.1 W29: Cloud as a surface (data + footer link)

Represent Cloud once, in data, so every mention stays consistent: a `src/data/cloud.ts`
(or a `cloud` entry beside `solutions`) with `url` (viglet.cloud), `beta: true`, and
a one-line value prop. Add a "**Cloud · Beta**" link to the shared footer
([Footer.tsx](../src/components/layout/Footer.tsx)) so it appears site-wide. This is
the low-risk foundation W30–W32 build on; nothing here claims stability.

### X.2 W30: Home "Viglet Cloud (beta)" callout

A small home band (**not** a product card in the suite) that frames the two
delivery modes: "self-host with Docker, or **run it on Cloud (beta)**". Carries an
explicit `Beta` badge and an early-access CTA (W31). Honest about the testing phase;
no SLAs, no "production-ready" language. Sits after the products section, before the
community/CTA close.

### X.3 W31: Beta early-access capture

A low-friction "**entrar na beta**" email opt-in, the highest-value light-touch
move: it turns anonymous interest into a contactable early-access list. **Reuse
Block D**: the W10 capture pattern + the W12 consent banner (LGPD/privacy-first, no
analytics/marketing cookies without consent). While the site is a static SPA there
is no backend, so submit to a privacy-respecting form endpoint or gate the whole
feature behind availability, and **degrade gracefully** (never a hard error or a
dead spinner), exactly as Block B requires. Revisit as a native route after Block G.

### X.4 W32: "Or run on Cloud (beta)" on Download/Self-host

At the moment of intent (the Docker download pages: [DownloadPage.tsx](../src/pages/DownloadPage.tsx)),
add a single line pairing the two delivery modes: after the `docker run` quick-start,
"prefer not to self-host? **Run it on Cloud (beta)**". Keeps Docker as the default,
Cloud as the hosted alternative. Beta-labelled; links to the W30 callout / viglet.cloud.

### X.5 W33: [cross-repo] Cloud (beta) mention on turing.viglet.org

Mirror the light mention on the Turing site so the two surfaces tell one story:
a line in turing's `SelfHost` section ("or try it on Cloud (beta)") and a footer
link. **Executed in the Turing repo** (`turing/2026.1/frontend/apps/site`), tracked
here, the same cross-repo arrangement as Block E ↔ Turing Block O. Keep wording and
Beta-labelling identical to viglet.org's so the brand voice is consistent.

---

## XI. Block E (2026-10): Relevance pass

> **Context:** the numbers live in the alegauss/visibility repository
> (`estrategia/viglet.md`, read 13/10/2026). Search Console for `sc-domain:viglet.org`
> gave 0 to 8 clicks a month from April to September 2026, mostly on the brand
> ("viglet" was 10 of about 25 clicks from July to 12/10). The only generic queries
> with impressions are "aem search" (48), "aem search engine" (28) and "aem search
> component" (21), at positions 34 to 44. Google crawled `www.viglet.org/turing/`
> without indexing it and ignored its canonical to turing.viglet.org, because the
> page arrives as an empty React shell. cursarei is the one Viglet-built site where
> search clearly works (365 clicks and 43k impressions in September 2026).

### XI.1 W38: One entity, Turing first

Turing is the centre of the story: Dumont brings the content Turing indexes, Shio
is the CMS of the same family. Today the suite is listed Dumont, Shio, Turing
(`order` in [solutions.ts](../src/data/solutions.ts)) and the home treats the
three as equals. Put Turing first everywhere and describe the other two by their
relation to it. Assistants trust a fact they find written the same way in many
places, so pick one one-line descriptor per product and use it verbatim on this
site, in `llms.txt`, in the GitHub repository descriptions and topics (Shio's and
Dumont's are just "Shio CMS Community Edition" / "Dumont DEP Community Edition"),
and on turing/shio/dumont.viglet.org, which still carry the acronyms. Dumont is
"Data Extraction Platform" here and "Data Exchange Platform" on its own site: pick
one. The GitHub settings and the product sites are cross-repo, done by hand or in
their repositories.

### XI.2 W39: Real prerender

[vite-plugin-spa-prerender.ts](../vite-plugin-spa-prerender.ts) writes a per-route
`<head>` (title, description, OG, JSON-LD) but the body stays the empty app root:
`dist/turing/index.html` and `dist/shio/index.html` have no text and no `<h1>`
(checked 17/10/2026). Google renders JavaScript late and with less confidence; the
AI crawlers mostly do not run it at all, so for them viglet.org is `llms.txt` and
meta tags. Render each route to HTML at build time (React `renderToString` /
`renderToPipeableStream` with a static router, then `hydrateRoot` on the client),
keeping Vite and GitHub Pages. This is build-time only, so it respects the
"no interim Node server" rule of Block G, and it does not replace W17: it gives
the SPA the indexable HTML now. Done when every route's `index.html` carries its
`<h1>` and body copy, the page hydrates without mismatch warnings, and the Search
Console URL inspection of `/turing/` and `/shio/` shows the rendered text.

### XI.3 W40: Home in searched words, AEM as the front door

"Open Source Tools for Enterprise Intelligence" names a category nobody searches.
People search "open source enterprise search", "Algolia alternative", "RAG chat
self-hosted", and, the only ones already showing impressions, AEM search. Rewrite
the home headline around the problem in those words, Turing first (W38). Make the
AEM page the main landing: Dumont's AEM connector plus Turing's search, in the
searched terms ("search component", "search engine"), linked both ways with the
AEM posts on docs.viglet.org. Ship it with the W1 cursarei case study, the one
working proof, with its figures taken from cursarei itself (§0 grounding: nothing
invented). Measure in the Search Console, monthly: impressions and position of the
three AEM queries against the 13/10/2026 baseline above.

### XI.4 W41: Promise only what exists

The partner page ([PartnerPage.tsx](../src/pages/PartnerPage.tsx)) promises dedicated
partner success managers, priority support, a certification badge, sandbox
environments, lead sharing, swag and a reply "within 2 business days". With one or
two hours a week behind the site, each is a promise a partner can hold Viglet to.
Until a program exists, the page says what is true: Viglet works with integrators
and ISVs, and here is how to start the conversation (the contact form). Bring the
tiers back when there is something behind them. On the home page, the stats band
(3 open source projects, 100% open source, Apache 2.0, self-hosted) repeats what the
headline already says; replace it with proof (the W1 case study) or remove it.

### XI.5 W42: Decide how www.viglet.org is measured

Since 19/07/2026 the site loads Google Analytics only after the visitor accepts
(Block D, W12), and GA has received no event from www.viglet.org since then (read in
the alegauss/visibility repository, VS20). The visitors are not gone, they are not
counted. Two options, the owner's call:

1. **Search Console only.** It already covers the site and is the number that counts
   for search (it gave 3 clicks where GA showed 28 "google" visits in July 2026).
   Nothing to build; site visits outside search stay unknown.
2. **GA consent mode.** Before consent, GA sends cookieless, anonymous pings and models
   the rest. It brings visit counts back, but whether it fits LGPD as the site
   describes its analytics today is a legal judgment, and the consent banner text
   would have to say so.

Record the decision here and in the visibility repository's `CLAUDE.md`, where the
measurement decisions live.