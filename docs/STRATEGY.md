# viglet.org — Strategy & Positioning

> Business/positioning decisions that are **not** build tasks: what the site is
> *for*, the bets, the sequencing. Extracted so the backlog stays executable and
> strategy stays debatable on its own terms. Build work lives in
> [ROADMAP.md](ROADMAP.md) / [IMPROVEMENTS.md](IMPROVEMENTS.md).

---

## I. The core thesis — cursarei is the proof, viglet.org should sell it

### I.1 The realization

The **cursarei** project (`D:\Git\alegauss\cursarei`) is not just "a site about
schools." It is a working, public application built on exactly the three
primitives Viglet sells:

- **Dumont** — a crawler indexing 100+ institutions (cursarei's Python crawler).
- **Turing ES** — lexical + semantic + natural-language search, plus RAG copilot
  and comparison summaries (cursarei's search + AI layer).
- **Shio CMS** — editorial content per area (cursarei's area intros/FAQs).

So the question shifts from "*what features should viglet.org copy from
cursarei?*" to the more valuable one: **"how do we use cursarei to prove the
Viglet stack and lower the barrier to adoption?"** Everything in the roadmap
flows from that.

### I.2 Bet 1 — Show, don't tell (Block A + F)

The strongest sales asset for a search/AI platform is a working demo, not a
feature list. A `/showcase/cursarei` case study, a "Built with Viglet"
architecture diagram, and a live-demo link cost little and convert more than any
landing copy. Publishing cursarei as a clonable starter (Block F) turns the demo
into a developer funnel: clone → run → become a Dumont/Turing user.

### I.3 Bet 2 — Dogfood the product as the site's own UX (Block B)

A product-finder copilot and semantic search on viglet.org are simultaneously a
**feature and a demonstration**: the visitor *uses* Turing to decide to adopt
Turing. This is the highest-converting move because it removes the
imagination gap. Hard requirement: graceful degradation — the marketing site
must never break because an LLM endpoint is down.

### I.4 The binding reality — distribution, not features, is the bottleneck

Echoes Turing STRATEGY §IX: the products are mature; the installed base is small.
A pretty site nobody finds converts nothing. Hence two of the six original blocks
are pure distribution: **GEO** (Block E — make LLM assistants name Viglet) and
**lead capture** (Block D — turn the rare qualified visitor into a contact). Spend
effort proportional to this: a showcase + GEO + capture beats a fourth redesign.

### I.5 Bet 3 — The reference repo as a lead-magnet (Block F)

Developers adopt stacks they can clone and run in an afternoon. cursarei,
genericized and published as "build an AI search portal on Viglet," is the
cheapest durable acquisition channel for the technical buyer. Gated on the case
study (W1/W2) so the repo and the story ship together, and on the cursarei
owner's go-ahead (it's their codebase).

### I.6 Non-negotiables (the trust posture)

- **No invented claims.** Mirror cursarei's grounding rule: no superlatives, no
  unverifiable benchmarks; comparisons state objective facts only.
- **Privacy-first.** Analytics is opt-in (Block D, W12); LGPD-clean capture.
- **The blog is not here.** Technical how-tos live on `docs.viglet.org`
  (Docusaurus); viglet.org is the positioning surface that links into them
  (decided in Turing STRATEGY §X.2 — do not relitigate).

---

## II. Channel split — what each surface is for

| Surface | Role | Stack reality |
|---|---|---|
| **viglet.org** (this repo) | Positioning, product, comparison, **showcase**, lead capture, embedded AI demo. | React+Vite SPA today → **Next.js on Viglet Cloud** (§VII). Emits `llms.txt`. |
| **docs.viglet.org** | Technical blog + integration how-tos (the conversion path GEO links into). | Docusaurus 3 — native blog plugin. |
| **Off-domain** | Strongest GEO lever: GitHub (the cursarei starter repo), directories, dev communities. | Where independent corroboration is born. |

---

## III. Sequencing — what to do first

Convicted order (effort vs. payoff), not an exhaustive list:

1. **W4 live-demo CTA + W1 case study (Block A).** Lowest effort, immediate
   proof. Mostly content; no backend.
2. **W8 wizard + W9 comparison (Block C).** Pure client-side; clarifies the
   "which product?" decision that loses buyers today.
3. **W13 llms.txt + W14 comparison pages (Block E).** Distribution; rides
   existing competitor query volume; cross-repo with Turing Block O.
4. **Block G migration (W17/W18)** when the AI features (Block B) become the
   priority — it's the enabler, so it precedes a *native* W5–W7.
5. **Block B embedded AI.** Highest conversion, highest cost; ship against an
   external Turing endpoint first if Block G slips, then move native (W19).
6. **W10 capture + W16 starter repo.** Durable funnels; run continuously.

---

## VII. The Next.js + Viglet Cloud migration (Block G)

### VII.1 The bet

viglet.org should become a **Next.js server app deployed on Viglet Cloud as one
more site** — the same shape cursarei already runs in the `viglet/cloud` repo.
Two reasons it's strategic, not just technical:

1. **It makes the dogfooding real, end to end.** Today Block B's AI features
   would call an external Turing endpoint and the site ships as static HTML.
   On Next.js + Cloud, the copilot, semantic search, and NL match are **native
   API routes** (cursarei's `llmRuntime` pattern) — and viglet.org *itself* runs
   on the Cloud platform it sells. The marketing site becomes a Cloud reference
   deployment.
2. **It collapses two codebases onto one proven pattern.** cursarei has already
   solved Next.js 15 + SSG + `llms.txt`/sitemap + Docker-on-Cloud. Migrating
   viglet.org to the same stack means one set of patterns to maintain and a
   straight path to the Block F starter repo.

### VII.2 The cost and the bar

It's a real migration, not a reskin: port six routes to the App Router, reproduce
the three Vite plugins' SEO/GEO output as Next equivalents, add a Dockerfile, and
wire Cloud deployment. **The bar is zero visual and SEO regression** — same URLs
(trailing slashes preserved), same `<head>`/JSON-LD, same `llms.txt`, same
sitemap. cursarei is the working reference for every pattern; read it first.

### VII.3 Sequencing & risk

- **Don't bolt an interim Node server onto the Vite build.** If Block B is needed
  before the migration, ship it against an external Turing endpoint with
  graceful fallback; don't fork the build system twice.
- **CNAME cutover is last.** Keep GitHub Pages serving until Cloud serves
  identical content at the same domain, then switch DNS. One-way, so verify first.
- **Risk:** Cloud deploy maturity. viglet.org is low-stakes traffic, which makes
  it a *good* first/early Cloud site — failures here are cheap and instructive,
  exactly the argument Turing STRATEGY §VIII.2 makes for the Cloud bet.
