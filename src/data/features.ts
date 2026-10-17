export interface Feature {
  title: string
  solution: string
  content: string
}

export const features: Feature[] = [
  { title: 'Content Delivery API', solution: 'shio', content: 'A versioned, read-only REST API: fetch content by id, by URL for slug routing, or by query, and get stable, frozen JSON back.' },
  { title: 'GraphQL Delivery', solution: 'shio', content: 'A GraphQL schema generated from your own post types, served read-only at /graphql. Query only the fields your front-end needs.' },
  { title: 'Content Modeling as Code', solution: 'shio', content: 'Model post types in the console, or version your content model as code with the Post Types DSL and the Shio CLI. Push and pull with drift detection.' },
  { title: 'API Tokens & Environments', solution: 'shio', content: 'Per-environment (prod/preview) keys with READ / PREVIEW / WRITE scopes and per-site allow-lists, protected by rate limiting and ETag / Cache-Control caching.' },
  { title: 'Draft Preview & Scheduling', solution: 'shio', content: 'Preview unpublished drafts with short-lived tokens, schedule content to go live, and restore earlier versions from the console.' },
  { title: 'Visual Editing', solution: 'shio', content: 'Edit any externally rendered page inline through the Adobe Universal Editor bridge. The CMS stays decoupled from your front-end.' },
  { title: 'React & JavaScript SDKs', solution: 'shio', content: 'Official SDKs with hooks (useShioPost, useShioQuery, useShioChildren) to render content with Next.js or any framework, plus outbound webhooks on publish.' },
  { title: 'Native Cache & Search', solution: 'shio', content: 'Delivery runs on a Hazelcast-backed native cache. Content is indexed automatically, with Viglet Turing integration for enterprise search.' },
  // ── Dumont: Data Exchange Platform ─────────────────────────────────────
  { title: 'Multi-source connectors', solution: 'dumont', content: 'Index from Adobe AEM, JDBC databases, filesystem assets, Adobe Edge Delivery Services, WordPress, and any website through the web crawler, all on one plugin architecture.' },
  { title: 'Search-engine-agnostic delivery', solution: 'dumont', content: 'Publish the same content to Viglet Turing, Apache Solr, or Elasticsearch by changing a single property. Switching engines needs no rewrite.' },
  { title: 'Declarative structured sources', solution: 'dumont', content: 'Model listings and detail pages as a typed schema with reusable Sitemap, HtmlListing and TabularListing strategies. A new source is a manifest, with no code to write.' },
  { title: 'AI-assisted source setup', solution: 'dumont', content: 'Point Viglet Dumont at a URL and get a draft extraction strategy and field manifest to confirm. Nothing is published automatically and no value is guessed.' },
  { title: 'Auditable, grounding-safe ingestion', solution: 'dumont', content: 'Per-field coverage and drift monitoring plus field-level provenance catch silent layout changes; absent fields are omitted rather than sent as empty strings.' },
  { title: 'Enterprise-ready platform', solution: 'dumont', content: 'Multi-tenancy, OAuth2/OIDC with Keycloak SSO, API-key auth, queued batch indexing, delta re-crawl, and cron scheduling.' },
  { title: 'Modern, embeddable console', solution: 'dumont', content: 'A React 19 admin console with AI-powered connector insights that runs standalone or embeds in Viglet Turing through Module Federation.' },
  // ── Turing: Enterprise Search + RAG + Agents ────────────────────────────
  { title: 'One query API, three engines', solution: 'turing', content: 'Run faceted, multilingual, typo-tolerant search on Apache Solr, Elasticsearch or an embedded Lucene index. Swap engines per site without changing your front-end.' },
  { title: 'Hybrid keyword + vector ranking', solution: 'turing', content: 'Reciprocal Rank Fusion merges BM25 with per-site vector scores, so semantic matches rank alongside exact keyword matches.' },
  { title: 'Cited RAG answers you can audit', solution: 'turing', content: 'Every streamed answer carries source chips (title, URL, score) traceable to the exact passage, with a pluggable reranker, a relevance gate and an optional groundedness check.' },
  { title: 'AI agents with tools, skills & MCP', solution: 'turing', content: 'Agents call custom tools, run Anthropic-standard skills in a Docker sandbox, and federate over MCP in both directions: as a client, and with Viglet Turing as the server.' },
  { title: 'Native provider tools', solution: 'turing', content: 'Turn on each vendor’s server-side web search, code execution, computer use, URL fetch and image generation across OpenAI, Anthropic and Gemini, opt-in per agent.' },
  { title: 'Bring any LLM, keep your data', solution: 'turing', content: 'OpenAI, Anthropic, Gemini, Azure and local Ollama models plug in behind one interface, switchable per agent, with keys encrypted at rest.' },
  { title: 'Self-host, multi-tenant, observable', solution: 'turing', content: 'Apache 2.0 on your own infrastructure with OIDC SSO, multi-tenancy behind a feature flag, chat & conversion analytics, LLM cost tracking and Micrometer metrics.' },
]

export function getFeaturesBySolution(identifier: string): Feature[] {
  return features.filter((f) => f.solution === identifier)
}
