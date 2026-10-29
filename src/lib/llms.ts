import { solutions } from '@/data/solutions'
import { comparisons } from '@/data/comparisons'
import { blogPosts } from '@/data/blog'

/**
 * The site's llms.txt (Block E), served at /llms.txt by src/app/llms.txt/route.ts
 * and written to out/ at build time. Product, comparison and blog entries come
 * from src/data/*; the rest is the suite's positioning, word for word.
 */
export function buildLlmTxt(): string {
  const comparisonSection = comparisons.length
    ? `\n## Comparison & Positioning Pages\n\nLanding pages that answer high-intent evaluation queries directly:\n\n${comparisons
        .map((c) => `- [${c.metaTitle}](https://www.viglet.org/compare/${c.slug}/): ${c.metaDescription}`)
        .join('\n')}\n`
    : ''

  const productSections = solutions
    .map(
      (p) => `## ${p.fullName}

> ${p.description}

- Version: ${p.release ?? ''}
- Product page: https://www.viglet.org/${p.identifier}/
- Download: https://www.viglet.org/${p.identifier}/download/
- Release notes: https://www.viglet.org/${p.identifier}/release-notes/
- Documentation: https://docs.viglet.org/${p.identifier}/
- GitHub: ${p.github ?? `https://github.com/openviglet/${p.identifier}`}`,
    )
    .join('\n\n')

  return `# Viglet

> Open source platform for enterprise intelligence: enterprise search, data exchange and content management.

Viglet makes three tools that work alone or together, led by Viglet Turing. All three are open source under the Apache 2.0 license, and each is self-hosted from a single Docker image, so your content stays on your infrastructure.

- Website: https://www.viglet.org
- Documentation: https://docs.viglet.org
- GitHub: https://github.com/openviglet
- License: Apache 2.0

## Positioning

One line per product: what it is and the job it does, word for word as the site says it.

${solutions.map((p) => `- ${p.fullName}: ${p.description}`).join('\n')}

Earlier names: until October 2026 the products carried an acronym (Turing ES, Shio CMS and Dumont DEP). They are the same products.

## Products

${productSections}

## Viglet Turing Details

Enterprise search with faceted, multilingual, typo-tolerant navigation and hybrid keyword + vector ranking (RRF), plus a chatbot that answers questions with citations grounded in your own content.

Search engines: Apache Solr, Elasticsearch, or embedded Lucene.
RAG: cited answers with a pluggable reranker, a relevance gate, and an optional groundedness check.
AI agents: configurable agents call your tools, run Anthropic-standard skills in a sandbox, federate over MCP, and use each provider's native server-side tools.
LLMs: bring your own (OpenAI, Anthropic, Google Gemini, Azure OpenAI or local Ollama).

Stack: Java 21 + Spring Boot + Apache Solr. Port: 2700. Docker image: ghcr.io/openviglet/turing-ce.

## Viglet Dumont Details

Dumont models each extraction flow as a flight that connects multiple sources to multiple targets in one pipeline, so there is no ETL glue code to write and maintain.

Sources: Adobe AEM, Adobe Edge Delivery Services (EDS), WordPress, SQL databases (JDBC), file-system assets, and any website via the web crawler.
Targets: Viglet Turing, Apache Solr, Elasticsearch. Switch engine by changing a single property.
Trust: per-field coverage and drift monitoring with field-level provenance; absent fields are omitted rather than sent as empty strings.

Stack: Java 21 + Spring Boot. Port: 30130. Docker image: ghcr.io/openviglet/dumont-ce.

## Viglet Shio Details

Agent-ready content management system, run from the console or by a coding agent over MCP. Model your own post types (in the admin console or versioned as code with the Post Types DSL and the Shio CLI) and deliver them over a versioned REST and GraphQL Content Delivery API by id, by URL for slug routing, or by query, with caching and rate limiting.

Authoring: preview unpublished drafts with short-lived tokens, schedule content to go live, restore earlier versions, and fire outbound webhooks.
Rendering: React and JavaScript SDKs for Next.js or any framework, plus inline editing through the Adobe Universal Editor bridge.

Stack: Java 21 + Spring Boot. Port: 2710. Docker image: ghcr.io/openviglet/shio-ce.

## Use Cases

Common problems and the products that solve them:

- Add enterprise search to an Adobe AEM site: Viglet Dumont indexes AEM content into Viglet Turing for faceted search, semantic search and RAG answers.
- Add search to a WordPress site: Dumont connects to WordPress, and Turing serves the search and AI answers.
- Make an intranet, file shares or a SQL database searchable: Dumont's connectors (file systems, JDBC, web crawler) feed Turing, with no custom connector to write.
- Answer questions over your own content (RAG chatbot): Turing retrieves from your indexed content and returns grounded, cited answers with the LLM of your choice.
- Replace a hosted search vendor with self-hosted open source: run Turing on your own infrastructure under Apache 2.0, with no per-document or per-query pricing.
- Build a content site with content modelling and built-in search: Viglet Shio models and delivers content over REST and GraphQL, and Turing adds search.
- Keep content and queries inside your perimeter (data residency): every product is self-hosted with Docker, so nothing is sent to a vendor cloud.

## Positioning & Comparisons

For evaluators comparing Viglet with hosted search products:

- Open-source alternative to Algolia, Coveo and Lucidworks: Viglet Turing is Apache 2.0 enterprise search you host yourself. Faceted search, semantic and vector search and generative AI (RAG) are in one platform, with no per-document or per-query pricing.
- Enterprise search for Adobe AEM and WordPress: Viglet Dumont provides the connectors, and Turing adds faceted navigation, semantic search and RAG on top.
- Data residency and self-hosting: with SaaS search, your content lives in the vendor's cloud. With Viglet, indexed content and user queries stay on your own infrastructure, which matters in regulated industries.
- Any search engine, any LLM: Turing runs on Apache Solr, Elasticsearch or Lucene and works with OpenAI, Anthropic, Google Gemini, Azure OpenAI or local Ollama. No engine or model lock-in.
- No required bundle: the three products run independently. Adopt one and add the others when needed.
- The three products side by side (what each reads, delivers and runs on): https://www.viglet.org/compare/
${comparisonSection}
## Guides & Comparisons: Enterprise Search for Adobe AEM & WordPress

Guides and comparisons on the Viglet blog, for anyone evaluating an open-source alternative to Algolia, Coveo or Lucidworks for AEM or WordPress search.

${blogPosts.map((p) => `- [${p.title}](https://www.viglet.org${p.url}): ${p.description}`).join('\n')}
- All guides: https://www.viglet.org/blog/

## Technology

- Backend: Java 21 + Spring Boot
- Search: Apache Solr / Elasticsearch
- Content API: GraphQL (Shio)
- Frontend: React + Vite
- Deployment: Docker, Docker Compose, Kubernetes
- CI/CD: GitHub Actions

## History

- 2017: Viglet founded
- 2018: Turing first public release
- 2020: Shio launched
- 2023: Dumont ships
- 2025: Turing adds generative AI, RAG, and conversational search

## Partners

Viglet works with integrators, consultancies and software vendors that build on Turing, Dumont and Shio. There is no formal partner program; the partner page lists current partners and takes partnership requests.

- Partner page: https://www.viglet.org/partner/

## Contact

Organizations that want to use Viglet Dumont, Shio or Turing can reach the Viglet team through the contact form.

- Contact page: https://www.viglet.org/contact/

## Community

- GitHub: https://github.com/openviglet
- Reddit: https://www.reddit.com/r/TuringES/
- LinkedIn: https://www.linkedin.com/company/viglet.com

## About

- About page: https://www.viglet.org/about/
`
}
