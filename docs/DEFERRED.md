# Set aside

## Block A — Showcase & proof ("Built with Viglet")

- ⏸ **W1** (deps: —) **Cursarei case-study page** — set aside (cursarei uses no Viglet product yet; resume when its Turing SN site is live.): `/showcase/cursarei`: what it does (8,279 courses, 74 institutions), the problem it solves and how each Viglet product powers a layer, so a buyer sees the stack working. → §II.1

## Block B — Embedded AI (dogfood Turing on our own site)

- ⏸ **W5** (deps: —) **Product-finder copilot** — set aside (the demo indexes only Turing docs, not Dumont or Shio.): a chat widget that answers which Viglet product a visitor needs, doing RAG over docs.viglet.org through a Turing instance, falling back to a static decision tree when Turing is unavailable. → §III.1
- ⏸ **W6** (deps: —) **Semantic site search** — set aside (the demo indexes only Turing docs, not Dumont or Shio.): index Dumont and Shio docs and the release notes on the Turing demo, so live results cover all three products. → §III.2

## Block C — Interactive product selection

## Block E — Discoverability / GEO

- ⏸ **W38** (deps: —) **One entity, Turing first** — set aside (needs the GitHub org admin and the product site repos.): copy the descriptors into the GitHub repo descriptions and topics and onto the three product sites, which still carry the acronyms. → §XI.1

## Block F — Reference app / developer funnel

## Block G — Platform migration (Next.js server + Viglet Cloud)

- ⏸ **W17** (deps: —) **Migrate SPA → Next.js (App Router, SSG-first)** — set aside (needs a browser for a visual check.): port the 6 routes of [App.tsx](../src/App.tsx) to the App Router keeping the design system, Tailwind v4 and i18next, and reproduce llms.txt, sitemap and prerender with no SEO regression. → §VIII.1

## Block I — Viglet Cloud (beta) surface

- ⏸ **W31** (deps: W10 ✅, W12 ✅, W30 ✅) **Beta early-access capture** — set aside (owner decides if a list adds to console sign-up.): an LGPD-compliant "entrar na beta" email opt-in reusing Block D's capture and consent discipline (W10/W12), degrading gracefully while the site has no backend. → §X.3
- ⏸ **W33** (deps: W29 ✅) **[cross-repo] Cloud (beta) mention on turing.viglet.org** — set aside (the Turing site holds another session's open rebrand.): mirror the light mention in turing's `SelfHost` section and footer, tracked here and executed in the turing repo (`frontend/apps/site`). → §X.5
