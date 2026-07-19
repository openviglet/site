# Last task number — `W33`

> **Single source of truth for the next free task number.** The next new task is
> `W34`; after assigning it, bump the number above and the log line below.

## Why this file exists

Task numbers are **non-contiguous across blocks** — a block's header range is not
a reliable guide to what's free, because a later block can consume numbers inside
an earlier block's band. Grepping three files (`ROADMAP.md`, `CHANGELOG.md`,
`IMPROVEMENTS.md`) is error-prone; this counter is authoritative.

The **`W`** prefix (website) keeps these tasks from colliding with the Turing
repo's `T` counter — the two repos cross-reference each other (GEO / Block E ↔
Turing Block O) but number independently.

## Rule

1. **Before creating a task**, read the number above and use `W<n+1>`.
2. **After creating it**, increment the number above and append a log line below.
3. Never infer the next number from a block header range or a `git log` scan.

## Log (most recent first)

- **W33** — [cross-repo] Cloud (beta) mention on turing.viglet.org (Block I) — 2026-07-19
- **W32** — "Or run on Cloud (beta)" on Download/Self-host (Block I) — 2026-07-19
- **W31** — Beta early-access capture (Block I) — 2026-07-19
- **W30** — Home "Viglet Cloud — beta" callout (Block I) — 2026-07-19
- **W29** — Cloud as a surface (data + footer link) (Block I) — 2026-07-19
- **W28** — Interactive/scripted product demo in the hero (Block H) — 2026-07-19
- **W27** — Per-route OG social images (Block H) — 2026-07-19
- **W26** — Home FAQ + FAQPage JSON-LD (Block H) — 2026-07-19
- **W25** — "Works with your stack" pill wall (Block H) — 2026-07-19
- **W24** — Per-product "essence" on SolutionPage (Block H) — 2026-07-19
- **W23** — Reusable terminal component (Block H) — 2026-07-19
- **W22** — Outcome-led section (Block H) — 2026-07-19
- **W21** — Home → conversion narrative (Block H) — 2026-07-19
- **W20** — Narrative content model (Block H) — 2026-07-19
- **W19** — Native AI API routes (Block G) — 2026-06-16
- **W18** — Deploy on Viglet Cloud as a site (Block G) — 2026-06-16
- **W17** — Migrate SPA → Next.js, App Router (Block G) — 2026-06-16
- **W16** — Publish cursarei as an open-source starter (Block F) — 2026-06-16
- **W15** — Cross-link product pages → docs blog guides (Block E) — 2026-06-16
- **W14** — Comparison landing pages (Block E) — 2026-06-16
- **W13** — Enrich llms.txt with positioning + use-cases (Block E) — 2026-06-16
- **W12** — Consent banner (analytics opt-in) (Block D) — 2026-06-16
- **W11** — Newsletter signup (Block D) — 2026-06-16
- **W10** — Release / feature alert opt-in (Block D) — 2026-06-16
- **W9** — Product comparison table (Block C) — 2026-06-16
- **W8** — "Which Viglet product?" wizard (Block C) — 2026-06-16
- **W7** — NL problem → product match (Block B) — 2026-06-16
- **W6** — Semantic site search (Block B) — 2026-06-16
- **W5** — Product-finder copilot (Block B) — 2026-06-16
- **W4** — Live-demo CTA (Block A) — 2026-06-16
- **W3** — Showcase index (Block A) — 2026-06-16
- **W2** — "Built with Viglet" architecture diagram (Block A) — 2026-06-16
- **W1** — Cursarei case-study page (Block A) — 2026-06-16
