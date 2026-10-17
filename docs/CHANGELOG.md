# viglet.org: Shipped Ledger (CHANGELOG)

> Concise index of work that has shipped. **`git log` is the authoritative
> history**: this file is just a searchable map of *what* shipped and *where*
> the rationale lived.
>
> Maintenance: when a task in [ROADMAP.md](ROADMAP.md) ships, move its one-line
> entry here (under its block), reference the commit if useful, and delete it
> from ROADMAP (and its design subsection from [IMPROVEMENTS.md](IMPROVEMENTS.md)).
> See [../AGENTS.md](../AGENTS.md) → "Roadmap & docs maintenance".

## Block 0 — Foundation (pre-roadmap, shipped)

> Work that predates this four-doc system, listed for context. These were not
> `W`-numbered; the backlog numbering starts at `W1`.

- **Stack migration**: site rebuilt as a **React 19 + Vite 8 + Tailwind v4** SPA consuming `@viglet/viglet-design-system`, `react-router-dom` v7, and i18next (replaced the legacy Jekyll/Bootstrap/AngularJS site; root `README.md` still references the old `jekyll serve` and is stale).
- **SEO/GEO build plugins**: [vite-plugin-llmtxt.ts](../vite-plugin-llmtxt.ts) (emits `llms.txt`), [vite-plugin-sitemap.ts](../vite-plugin-sitemap.ts), and [vite-plugin-spa-prerender.ts](../vite-plugin-spa-prerender.ts) (static HTML per route for crawlers).
- **Six routes**: home, solution (`/:identifier/`), download, release-notes, partner, about ([src/App.tsx](../src/App.tsx)); data-driven from `src/data/{solutions,features,modules,categories}.ts`.
- **feat(seo): Blog link in footer** → `docs.viglet.org/blog` (`50dfa49`).
- **feat(seo): FAQPage JSON-LD + llms.txt enriched with blog guides** (`d9133a2`), partial credit toward **W13** (the blog-guide half of the enrichment).
- **fix(seo): scope FAQPage JSON-LD to the home page only** (`525a792`).

## Block A — Showcase & proof

- **W2** — "Built with Viglet" pipeline diagram: reusable [PipelineDiagram.tsx](../src/components/PipelineDiagram.tsx) rendering the Dumont → Turing → Shio flow as product-coloured, numbered process cards. Data-driven from `narrative.ts`; consumed by the home "how the three connect" band (W21) and reusable by any future showcase (W1/W3).

## Block D — Engagement & lead capture (privacy-first)

- **W12** — Consent banner (analytics opt-in): Google Analytics no longer loads unconditionally: the `gtag` snippet was removed from `index.html` and moved to [src/lib/analytics.ts](../src/lib/analytics.ts), loaded at runtime **only after the visitor opts in** ([ConsentBanner.tsx](../src/components/ConsentBanner.tsx), mounted globally in the root layout, since W17 [src/app/layout.tsx](../src/app/layout.tsx)). Accept/Decline are equally prominent (LGPD), the choice persists in `localStorage`, and a "Cookie settings" footer control reopens the banner. Nothing tracks before consent.
- **W10** — Release-alert / newsletter opt-in: A single LGPD-compliant signup ([NewsletterSignup.tsx](../src/components/NewsletterSignup.tsx)) in the footer: explicit **unchecked** consent, unsubscribe note, email validation, timeout-guarded submit (never a dead spinner), success/error states. Since the site is a static SPA (no backend until Block G), it POSTs JSON to a third-party **form service**. **Activation (ops step):** set the `NEWSLETTER_ENDPOINT` repo secret (Formspree / Buttondown / Web3Forms …) → wired into the build as `VITE_NEWSLETTER_ENDPOINT` ([deploy.yml](../.github/workflows/deploy.yml), [.env.example](../.env.example)). Until it's set the signup renders nothing: no half-built form ships. W10 (release alerts) and W11 (newsletter digest) are unified into one opt-in (`tags: ['release','newsletter']`).
- **W11** — shipped together with W10 as one opt-in: Release-alert / newsletter opt-in: A single LGPD-compliant signup ([NewsletterSignup.tsx](../src/components/NewsletterSignup.tsx)) in the footer: explicit **unchecked** consent, unsubscribe note, email validation, timeout-guarded submit (never a dead spinner), success/error states. Since the site is a static SPA (no backend until Block G), it POSTs JSON to a third-party **form service**. **Activation (ops step):** set the `NEWSLETTER_ENDPOINT` repo secret (Formspree / Buttondown / Web3Forms …) → wired into the build as `VITE_NEWSLETTER_ENDPOINT` ([deploy.yml](../.github/workflows/deploy.yml), [.env.example](../.env.example)). Until it's set the signup renders nothing: no half-built form ships. W10 (release alerts) and W11 (newsletter digest) are unified into one opt-in (`tags: ['release','newsletter']`).

## Block E — Discoverability / GEO

- **W13** — Enrich `llms.txt`: the llms.txt generator (since W17 [src/lib/llms.ts](../src/lib/llms.ts)) now emits, alongside the blog-guide half (`d9133a2`): a **Positioning** section (one grounded line per product), a **Use Cases** section (problem → product mapping), and a **Positioning & Comparisons** section carrying the "open-source alternative to Algolia/Coveo/Lucidworks" and "enterprise search for Adobe AEM/WordPress" framing Block E targets. The per-product **Details** blocks were reconciled with [narrative.ts](../src/data/narrative.ts) (dropped stale Shio OpenText/NodeJS copy, corrected Turing's LLM/engine list, added Dumont's EDS source), and the Products-section GitHub links now use each solution's real `-ce` repo (via the `github` field) instead of a hardcoded `openviglet/<id>`. All copy obeys the §0 grounding rule.
- **W14** — Comparison / positioning landing pages: New `/compare/:slug/` route ([ComparePage.tsx](../src/views/ComparePage.tsx)) rendering data-driven pages from [comparisons.ts](../src/data/comparisons.ts) whose titles are the queries evaluators type: "open-source alternative to Algolia/Coveo/Lucidworks" and "enterprise search for Adobe AEM". Facts-only, non-disparaging tables (Viglet vs hosted SaaS), a "how it works" approach, per-page FAQ + client-injected FAQPage JSON-LD, and cross-links into the docs guides. Registered across every SEO surface: [sitemap](../src/app/sitemap.ts), [prerender](../src/lib/seo.ts) (per-page title/canonical/OG), [llms.txt](../src/lib/llms.ts) (paths since W17) (new "Comparison & Positioning Pages" section) and per-page OG cards ([og-images.mjs](../scripts/og-images.mjs)). Cross-repo with Turing STRATEGY Block O.
- **W15** — Cross-link product pages → docs guides: A per-product "Guides" section on [SolutionPage.tsx](../src/pages/SolutionPage.tsx) linking to the matching `docs.viglet.org/blog` integration/comparison guides (Turing + Dumont; Shio has no published guide, so the section hides). Tightens the GEO graph and the human funnel at once.
- **Dynamic guides (docs endpoint).** The W14/W15 cross-links are **not** hardcoded. The docs site now emits a machine-readable `/guides.json` from its **published** blog posts (new `guides-json` Docusaurus plugin in the **vigletdocs** repo; `draft: true` posts are excluded upstream, so nothing ever links a 404). viglet.org fetches it at runtime ([guides.ts](../src/data/guides.ts) `useGuides`) with a committed snapshot ([guides.generated.json](../src/data/guides.generated.json), refreshed at build by [scripts/fetch-guides.mjs](../scripts/fetch-guides.mjs)) as an instant, offline-safe fallback. New guides appear without a viglet.org redeploy; any fetch failure degrades to the snapshot (§ non-goals: degrade gracefully). Product mapping comes from a `viglet_products` frontmatter field on each post.
- **W34** — Model Catalog in the Turing module grid: Added a **Model Catalog** entry to the Turing modules in [modules.ts](../src/data/modules.ts) (linking `github.com/openviglet/model-catalog`), surfacing the vendor-neutral public LLM/embedding/rerank/media catalog that Turing reads for its model picker as an ecosystem piece alongside the SDKs / CLI / MCP server. Data-only (renders on the Turing SolutionPage via the existing external-link card; no route, so no sitemap/prerender change). Cross-repo with `openviglet/model-catalog`.
- **W38 (this site and llms.txt)** — Turing now leads every list on viglet.org and in llms.txt, each product has one descriptor (solutions.ts) used verbatim on its cards, pages, meta, OG cards and llms.txt, and Dumont is the Data Exchange Platform, as in its own repo.
- **W39 (build-time render and hydration)** — Every route's dist index.html now carries its rendered body, h1 and copy (16 files, from an SSR build of src/entry-server.tsx written in by scripts/prerender-html.mjs), and the browser hydrates it with no mismatch in a jsdom run of ten routes.
- **W41** — The partner page now says Viglet works with integrators and vendors, that there is no formal program yet, shows the real partners and a form, with no tiers, perks or reply times, and the home stats band is gone.
- **W42** — The owner kept GA consent-only, with no consent-mode pings: Search Console is the search number, and visitors who decline stay uncounted.
- **W43** — The six product repos carry the solutions.ts descriptors and https homepages, turing-ce keeps its richer search-facing description, and Shio's topics drop angularjs and nashorn for react.

## Block H — Conversion narrative & product essence

> Ported turing.viglet.org's conversion craft to the multi-product story with
> **zero new runtime deps** (the OG rasterizer is an optional build-only dep).
> Grounding rule held: no invented metrics. Design rationale was IMPROVEMENTS §IX
> (removed on ship).

- **W20** — Narrative content model: typed [src/data/narrative.ts](../src/data/narrative.ts) (`outcomes`, `pipeline`, `essence` pillars per product, `providerGroups`, `faq`) with `getX()` helpers. The foundation the sections below `map()` over.
- **W21** — Home → conversion narrative: [HomePage.tsx](../src/pages/HomePage.tsx) restructured to *hook → see → outcomes → suite → how-the-three-connect → works-with-your-stack → FAQ → convert → community*, with a dark-gradient closing CTA. (The compare-teaser sub-idea was skipped: its W9 comparison table isn't built yet, so it would have been a dead link.)
- **W22** — Outcome-led section: [Outcomes.tsx](../src/components/sections/Outcomes.tsx) ("what changes for you"), results-first with product-accented cards.
- **W23** — Reusable Terminal component: [Terminal.tsx](../src/components/Terminal.tsx) (`Terminal` macOS faux-terminal + `CommandBlock`). DownloadPage's private `CopyableCommand` was promoted into it; reused on home (closing CTA) and each SolutionPage.
- **W24** — Per-product essence on SolutionPage: data-driven pillars + tagline per product on [SolutionPage.tsx](../src/pages/SolutionPage.tsx), from `narrative.ts` `essence`.
- **W25** — "Works with your stack" pill wall: [StackWall.tsx](../src/components/sections/StackWall.tsx), a grouped providers/tech grid (sources · engines · AI/LLMs · delivery).
- **W26** — Home FAQ + FAQPage JSON-LD: [HomeFaq.tsx](../src/components/sections/HomeFaq.tsx) renders `narrative.ts` `faq[]`; `index.html`'s static FAQPage JSON-LD now mirrors it verbatim (superset that folds in the Block E GEO Q&As), so structured data matches on-page content.
- **W27** — Per-route OG social images: build-time [scripts/og-images.mjs](../scripts/og-images.mjs) renders a per-identity 1200×630 card (SVG → PNG via optional `@resvg/resvg-js`, defensive skip); the prerender step (since W17 [src/lib/seo.ts](../src/lib/seo.ts)) injects per-route `og:image`/`twitter:image` (+ default OG tags in `index.html`). Build-time only: no server (respects the Block G non-goal).
- **W28** — Scripted product demo: [ScriptedDemo.tsx](../src/components/sections/ScriptedDemo.tsx), a deterministic, always-resolving search-and-answer widget over Viglet's own content (the home "see" band). Reduced-motion safe; upgradeable to a real Turing-backed demo once Block B / Cloud lands.
- **W35** — 2026 marks: the periodic-table squares (too close to Adobe's icons) became isometric cubes with the front-top corner cut in the angle of the Viglet V; [VigletLogo.tsx](../src/components/VigletLogo.tsx) now shows the SVGs in `public/logos/` (cube with symbol from 56 px, cube alone below). The flat Viglet V (cream outline) replaces `viglet_logo_sm.png` in header/footer and regenerates every favicon; OG cards carry the cube (or the V). Shio moves to violet `#7c3aed` and Dumont to teal `#0f766e` across `index.css`, `solutions.ts` and the OG gradients, to match the cubes. The marks are generated by `make_marks.py` in alegauss/visibility (`marca/logo/`). Regenerate there and copy, never edit the SVGs by hand.
- **W36** — Names without acronyms: "Viglet Turing / Shio / Dumont" (first mention) and "Turing / Shio / Dumont" after it, everywhere the site writes them: data, pages, FAQ JSON-LD, llms.txt, prerender and OG text. What each product *is* now goes in words beside the name: `solutions.ts` `logoSection` (ES / CMS / DEP) became `category` (Enterprise Search / Headless CMS / Data Extraction Platform). llms.txt keeps one line naming the old forms, so assistants that learned "Turing ES" connect the two; the AEM blog post keeps its published title.
- **W37** — Copy pass and no em dashes: every page, data file, FAQ (with its JSON-LD mirror), llms.txt, meta tag, OG card, code comment and doc rewritten in plain language (puffery and unsupported claims cut, no facts added), and every em dash removed from the repository. `fetch-guides.mjs` turns em dashes in blog titles into a colon or comma, so none comes back with a new post. The wordmark next to the V reads "Viglet", capital V.

## Block B — Embedded AI (dogfood Turing on our own site)

- **W6 (site data + live Turing docs)** — A header search (button, Ctrl+K or /) finds products, downloads, release notes, features, modules, comparisons and guides from src/data, and adds live Viglet Turing results over the Turing docs through @viglet/turing-sdk.
- **W7 (keyword intent table in search)** — Typing a problem into the site search (for example preciso indexar minha intranet e adicionar busca com IA) now shows the products that fit, each with a reason, from a keyword intent table in English and Portuguese.

## Block C — Interactive product selection

- **W8** — The home page asks three questions (where the content is, what users get, who runs it) and recommends Dumont, Shio, Turing or a combination, with a reason per product and links to its page and docs, all client-side.
- **W9** — /compare/ shows Dumont, Shio and Turing side by side (job, inputs, outputs, AI, SDKs, how it runs, license, release) with expandable rows, and the chosen columns and open rows live in the URL so a comparison is shareable.

## Block F — Reference app / developer funnel

## Block G — Platform migration (Next.js server + Viglet Cloud)

- **W17** — viglet.org is a Next.js 16 App Router static export: every route, llms.txt and the sitemap render from src/data at build time with the same head, h1 and body text as the Vite build, and GitHub Pages serves out/ unchanged (design §VIII.1 recorded in `next.config.ts`).
- **W18 (image and Cloud wiring)** — The cloud repo builds viglet.org into a next start image (Dockerfile.site, compose service, nginx for www.viglet.org and site.viglet.cloud, SHA-keyed deploy), checked against the Vite build route by route.

## Block I — Viglet Cloud (beta) surface

- **W29** — src/data/cloud.ts describes Viglet Cloud once (name, viglet.cloud, beta, one-liner) and every page's footer now lists Cloud with a Beta badge under Products.
- **W30** — The home page has a Viglet Cloud band marked Beta that frames self-hosting with Docker versus hosting on Cloud, with Try the beta (console sign-up) and Run with Docker, and the FAQ and wizard now say Cloud is in beta.
- **W32** — Every Docker download page now says, under the docker run command, Prefer not to self-host? Run it on Viglet Cloud (beta), linking to the Cloud sign-up.
- 🗑 **W31** — abandoned: Console sign-up already captures beta interest; a separate email list adds nothing, by the owner's call.
