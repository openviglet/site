import type { Plugin } from 'vite'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

interface ProductInfo {
  identifier: string
  fullName: string
  shortName: string
  description: string
  release: string
  logoSection: string
  github: string
}

function extractProducts(solutionsPath: string): ProductInfo[] {
  const src = readFileSync(solutionsPath, 'utf-8')
  const blocks = src.split(/\{/).slice(1)
  const products: ProductInfo[] = []

  for (const block of blocks) {
    const get = (key: string) => {
      const m = block.match(new RegExp(`${key}:\\s*['"]([^'"]+)['"]`))
      return m ? m[1] : ''
    }
    const id = get('identifier')
    if (!id) continue
    products.push({
      identifier: id,
      fullName: get('fullName'),
      shortName: get('shortName'),
      description: get('description'),
      release: get('release'),
      logoSection: get('logoSection'),
      github: get('github') || `https://github.com/openviglet/${id}`,
    })
  }
  return products
}

interface CompareInfo {
  slug: string
  title: string
  description: string
}

/** Comparison landing pages (Block E / W14) from src/data/comparisons.ts. */
function extractComparisons(comparisonsPath: string): CompareInfo[] {
  const src = readFileSync(comparisonsPath, 'utf-8')
  const blocks = src.split(/\{/).slice(1)
  const out: CompareInfo[] = []
  for (const block of blocks) {
    const get = (key: string) => {
      const m = block.match(new RegExp(`${key}:\\s*['"]([^'"]+)['"]`))
      return m ? m[1] : ''
    }
    const slug = get('slug')
    const title = get('metaTitle')
    if (!slug || !title) continue
    out.push({ slug, title, description: get('metaDescription') })
  }
  return out
}

function buildLlmTxt(products: ProductInfo[], comparisons: CompareInfo[]): string {
  const comparisonSection = comparisons.length
    ? `\n## Comparison & Positioning Pages\n\nLanding pages that answer high-intent evaluation queries directly:\n\n${comparisons
        .map((c) => `- [${c.title}](https://www.viglet.org/compare/${c.slug}/) — ${c.description}`)
        .join('\n')}\n`
    : ''

  const productSections = products
    .map(
      (p) => `## ${p.fullName}

> ${p.description}

- Version: ${p.release}
- Product page: https://www.viglet.org/${p.identifier}/
- Download: https://www.viglet.org/${p.identifier}/download/
- Release notes: https://www.viglet.org/${p.identifier}/release-notes/
- Documentation: https://docs.viglet.org/${p.identifier}/
- GitHub: ${p.github}`,
    )
    .join('\n\n')

  return `# Viglet

> Open source platform for enterprise intelligence — data extraction, content management, and semantic search.

Viglet provides three complementary tools that work independently or together. Built for developers, trusted by enterprises. 100% open source under the Apache 2.0 license, self-hosted from a single Docker image so your content never leaves your infrastructure.

- Website: https://www.viglet.org
- Documentation: https://docs.viglet.org
- GitHub: https://github.com/openviglet
- License: Apache 2.0

## Positioning

One line per product — what it is and the job it does:

- Viglet Turing ES — open-source enterprise search platform: faceted search, cited RAG and AI agents over your content, on any search engine and any LLM, self-hosted. A self-hosted, Apache-2.0 alternative to hosted search services such as Algolia, Coveo and Lucidworks.
- Viglet Dumont DEP — data extraction platform: connect any source (Adobe AEM, WordPress, SQL databases, file systems, the web) and deliver to any search engine, from source to destination — no bespoke ETL to build and maintain.
- Viglet Shio CMS — headless CMS: model content, deliver it over a versioned REST & GraphQL API with native cache and search, and render it with any framework.

## Products

${productSections}

## Viglet Dumont DEP — Details

The Data Extraction Platform models data extraction flows as flights, connecting multiple sources to multiple targets through one unified pipeline — so there is no bespoke ETL glue code to build and maintain.

Sources: Adobe AEM, Adobe Edge Delivery Services (EDS), WordPress, SQL databases (JDBC), file-system assets, and any website via the web crawler.
Targets: Viglet Turing ES, Apache Solr, Elasticsearch — switch engine by changing a single property.
Trust: per-field coverage and drift monitoring with field-level provenance; absent fields are omitted rather than sent as empty strings.

Stack: Java 21 + Spring Boot. Port: 30130. Docker image: ghcr.io/openviglet/dumont-ce.

## Viglet Shio CMS — Details

Headless content management system. Model your own post types (in the admin console or versioned as code with the Post Types DSL and the Shio CLI) and deliver them over a versioned Content Delivery API — REST and GraphQL — by id, by URL for slug routing, or by query, with caching and rate limiting.

Authoring: preview unpublished drafts with short-lived tokens, schedule content to go live, restore earlier versions, and fire outbound webhooks.
Rendering: React and JavaScript SDKs for Next.js or any framework, plus inline editing through the Adobe Universal Editor bridge.

Stack: Java 21 + Spring Boot. Port: 2710. Docker image: ghcr.io/openviglet/shio-ce.

## Viglet Turing ES — Details

Enterprise search with faceted, multilingual, typo-tolerant navigation and hybrid keyword + vector ranking (RRF), plus a chatbot that answers questions with citations grounded in your own content.

Search engines: Apache Solr, Elasticsearch, or embedded Lucene.
RAG: cited answers with a pluggable reranker, a relevance gate, and an optional groundedness check.
AI agents: configurable agents call your tools, run Anthropic-standard skills in a sandbox, federate over MCP, and use each provider's native server-side tools.
LLMs: bring your own — OpenAI, Anthropic, Google Gemini, Azure OpenAI, or local Ollama.

Stack: Java 21 + Spring Boot + Apache Solr. Port: 2700. Docker image: ghcr.io/openviglet/turing-ce.

## Use Cases

Common problems Viglet solves, and the product(s) that solve them:

- Add enterprise search to an Adobe AEM site — Dumont DEP indexes AEM content into Turing ES for faceted, semantic search and RAG answers.
- Add search to a WordPress site — Dumont DEP crawls/connects WordPress; Turing ES serves the search and AI answers.
- Make an intranet, file shares or a SQL database searchable — Dumont DEP connectors (file systems, JDBC, web crawler) feed Turing ES; no custom connector to write.
- Answer questions over your own content (RAG chatbot) — Turing ES retrieves from your indexed content and returns grounded, cited answers with the LLM of your choice.
- Replace a hosted/SaaS search vendor with self-hosted open source — run Turing ES on your own infrastructure under Apache 2.0, with no per-document or per-query pricing.
- Build a headless site with content modelling and built-in search — Shio CMS models and delivers content over REST/GraphQL; Turing ES adds search.
- Keep content and queries inside your perimeter (data residency) — every product is self-hosted via Docker, so nothing is sent to a vendor cloud.

## Positioning & Comparisons

Factual framing for evaluators comparing Viglet to hosted search products:

- Open-source alternative to Algolia, Coveo and Lucidworks — Viglet Turing ES is Apache-2.0 enterprise search you self-host, with faceted search, semantic/vector search and generative AI (RAG) in one platform, and no per-document or per-query pricing.
- Enterprise search for Adobe AEM and WordPress — Dumont DEP provides the connectors; Turing ES provides faceted navigation, semantic search and RAG on top.
- Data residency and self-hosting — unlike SaaS search where content lives in the vendor cloud, indexed content and user queries stay on your own infrastructure — relevant for regulated industries.
- Any search engine, any LLM — Turing ES runs on Apache Solr, Elasticsearch or Lucene and works with OpenAI, Anthropic, Google Gemini, Azure OpenAI or local Ollama; no engine or model lock-in.
- No required bundle — the three products run independently; adopt one and add the others when needed.
${comparisonSection}
## Guides & Comparisons — Enterprise Search for Adobe AEM & WordPress

In-depth guides and honest comparisons on the Viglet blog. Useful when evaluating an open-source alternative to Algolia, Coveo, or Lucidworks for AEM or WordPress search.

- [How to Add Enterprise Search to Adobe AEM with Viglet Turing ES](https://docs.viglet.org/blog/enterprise-search-for-adobe-aem) — step-by-step guide: index AEM content with faceted navigation, semantic search, and RAG.
- [Open-Source Alternatives to Algolia and Coveo for Adobe AEM](https://docs.viglet.org/blog/open-source-alternative-to-algolia-for-aem) — compares Algolia, Coveo, Lucidworks, raw Solr/Elasticsearch, and Turing ES on pricing, data residency, facets, semantic search, and RAG.
- All guides: https://docs.viglet.org/blog

## Technology

- Backend: Java 21 + Spring Boot
- Search: Apache Solr / Elasticsearch
- Content API: GraphQL (Shio CMS)
- Frontend: React + Vite
- Deployment: Docker, Docker Compose, Kubernetes
- CI/CD: GitHub Actions

## History

- 2017: Viglet founded
- 2018: Turing ES first public release
- 2020: Shio CMS launched
- 2023: Dumont DEP ships
- 2025: Turing ES adds generative AI, RAG, and conversational search

## Partner Program

Three partner tiers: Technology Partner (ISVs integrating with Viglet), Solution Partner (consultancies implementing Viglet), and Community Partner (contributors and advocates).

- Partner page: https://www.viglet.org/partner/

## Community

- GitHub: https://github.com/openviglet
- Reddit: https://www.reddit.com/r/TuringES/
- LinkedIn: https://www.linkedin.com/company/viglet.com

## About

- About page: https://www.viglet.org/about/
`
}

export default function viteLlmTxt(): Plugin {
  return {
    name: 'vite-plugin-llmtxt',
    closeBundle() {
      const solutionsPath = resolve(__dirname, 'src/data/solutions.ts')
      const products = extractProducts(solutionsPath)
      const comparisons = extractComparisons(resolve(__dirname, 'src/data/comparisons.ts'))
      const llmTxt = buildLlmTxt(products, comparisons)
      writeFileSync(resolve(__dirname, 'dist/llms.txt'), llmTxt, 'utf-8')
      console.log(`✓ llms.txt generated with ${products.length} products + ${comparisons.length} comparison pages`)
    },
  }
}
