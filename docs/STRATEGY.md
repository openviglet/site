# viglet.org: Strategy & Positioning

> Business/positioning decisions that are **not** build tasks: what the site is
> *for*, the bets, the sequencing. Extracted so the backlog stays executable and
> strategy stays debatable on its own terms. Build work lives in
> [ROADMAP.md](ROADMAP.md) / [IMPROVEMENTS.md](IMPROVEMENTS.md).

---

## I The hub helps visitors choose and evaluate

The hub translates the portfolio strategy into clear product choices, verifiable
evidence and direct evaluation paths.

### I.1 The hub follows the portfolio strategy

The portfolio positioning is maintained in
`D:/Git/alegauss/visibility/estrategia/viglet.md`, with product-specific evidence in
`produtos/` and portfolio priorities in `estrategia/portfolio.md`. This document
translates that direction into the job of viglet.org.

Turing leads the acquisition story: enterprise search and cited AI answers over a team's
content. Dumont connects existing sources to search. Shio has its own audience: people
and agents managing and publishing content through a CMS. A Turing-first hub must
preserve that separate reason to adopt Shio.

Cursarei is a candidate reference application, not evidence of integration merely
because its architecture has similar layers. Publish a Built with Viglet case only after
verifying the actual product integration. Existing product demonstrations can support
evaluation without waiting for that case.

### I.2 Evidence before promotion

Lead to demonstrations that already exist on the dedicated product sites. The hub may
show a clearly labelled illustrative preview, but it must not imply that a scripted
answer is a live result or a customer case.

For AEM, use the Turing site's WKND evaluation path and connector guides. Treat AEM as a
targeted acquisition hypothesis supported by historical search impressions, not as a
proven market winner. WordPress is a separate path with different installation
requirements. Customer names, results and logos require evidence and permission; product
demonstrations remain useful without them.

### I.3 Dogfooding must serve the visitor

Search on the hub can demonstrate Turing while helping visitors find a guide or product.
A second full product playground on the hub is justified only if it removes a
demonstrated obstacle; the existing product sites already own deeper evaluation.

External services must degrade to useful static content or local search. A live AI
feature is an experiment, not a claim of higher conversion without measurement.

### I.4 The binding reality: distribution, not features, is the bottleneck

Echoes Turing STRATEGY §IX: the products are mature; the installed base is small.
A pretty site nobody finds converts nothing. Hence two of the six original blocks
are pure distribution: **GEO** (Block E: make LLM assistants name Viglet) and
**lead capture** (Block D: turn the rare qualified visitor into a contact). Spend
effort proportional to this: a showcase + GEO + capture beats a fourth redesign.

### I.5 A starter is conditional on a reproducible integration

An example repository can help technical adoption when it installs reliably, uses the
claimed Viglet products and matches the published documentation. A cursarei-derived
starter requires verified integration and its owner's agreement. It does not block the
hub's message, existing demos or setup guides.

### I.6 Non-negotiables (the trust posture)

- **No invented claims.** Mirror cursarei's grounding rule: no superlatives, no
  unverifiable benchmarks; comparisons state objective facts only.
- **Privacy-first.** Analytics is opt-in (Block D, W12); LGPD-clean capture.
- **The blog is here (W46, 2026-10).** The integration how-tos and comparisons
  moved from `docs.viglet.org/blog` to `www.viglet.org/blog/`, so the guides the
  comparison pages link into build authority on the same domain. This reverses
  the earlier split decided in the Turing repo's STRATEGY. Product documentation stays on each
  product's own docs site.

---

## II Channel split: one job per surface

| Surface | Primary role |
|---|---|
| viglet.org | Explain the portfolio, help choose a product, establish trust and offer implementation contact. |
| turing.viglet.org, dumont.viglet.org, shio.viglet.org | Demonstrate each product, explain requirements and lead to installation and product documentation. |
| viglet.org/blog | Answer a specific question and link to the matching demo, guide or deployment conversation. |
| viglet.cloud | Offer the managed-hosting beta as a secondary option, explicitly labelled Beta. |
| GitHub and distribution channels | Supply source, releases and external discovery paths; use the visibility plan for channel work. |

Product navigation goes directly to the dedicated sites. Existing local overview,
download and release-note URLs remain available for inbound links. An evaluator should
not need to read successive product introductions before trying the product.

This repository is Next.js 16 with a static export and a server build. Preserve both
until the hosting cutover is verified. Blog posts remain Markdown and their existing
slugs stay stable.

## III Sequence by evaluation friction

First keep product claims, release information and setup requirements consistent. Then
shorten the path from a visitor's question to a demo, installation guide or
implementation contact.

Use a stable home composition with Turing first, independent product jobs, labelled
integrations and optional selection help. Prefer useful examples to decorative motion.
Preserve the existing product identity and design-system tokens.

Evaluate the AEM path as one focused acquisition experiment; keep WordPress and Shio
agent workflows distinct. Follow the visibility plan for articles and company LinkedIn
posts. Historical October figures are context, not current traffic.

Measure consented demo, guide and contact-intent actions alongside Search Console
discovery data. A click to a setup guide is not a completed installation; a contact-page
visit is not a qualified lead. Review actual inquiries separately. With limited traffic,
use absolute counts and qualitative feedback before proposing an A/B test or another
redesign.

## VII. The Next.js + Viglet Cloud migration (Block G)

### VII.1 Why retain the server deployment option (W16)

The site already uses Next.js 16. Its static export serves the current public
deployment; SITE_OUTPUT=server builds the same pages for next start on Viglet Cloud.

The server option enables future native API routes and a potential reference deployment
of the hosting platform. It is not a prerequisite for improving the hub or linking to
existing product demonstrations. Keep deployment modes compatible until the DNS cutover
is verified.

### VII.2 Compatibility is the migration bar

Preserve route URLs and trailing slashes, canonical metadata, rendered content, llms.txt
and the sitemap in both output modes. The Cloud image and deployment wiring are
maintained in the cloud repository. Check both builds before changing shared runtime
behavior; a successful local build is not evidence of a production cutover.

### VII.3 Cutover and fallback

DNS cutover remains the final deployment step after Cloud serves the required content at
the intended domain. Until that is verified, keep the static export and avoid native API
dependencies in shared pages. External demo or AI failures must leave a usable route to
documentation or deterministic local content.
