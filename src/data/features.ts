export interface Feature {
  title: string
  solution: string
  content: string
}

export const features: Feature[] = [
  { title: 'Content Delivery API', solution: 'shio', content: 'Consume content headlessly over a versioned, read-only REST API — fetch by id, by URL for slug routing, or query — returning stable, frozen JSON.' },
  { title: 'GraphQL Delivery', solution: 'shio', content: 'A real GraphQL schema generated from your own post types, served read-only at /graphql — query exactly the fields your front-end needs.' },
  { title: 'Content Modeling as Code', solution: 'shio', content: 'Model post types in the console, or version your content model as code with the Post Types DSL and the Shio CLI — push and pull with drift detection.' },
  { title: 'API Tokens & Environments', solution: 'shio', content: 'Per-environment (prod/preview) keys with READ / PREVIEW / WRITE scopes and per-site allow-lists, protected by rate limiting and ETag / Cache-Control caching.' },
  { title: 'Draft Preview & Scheduling', solution: 'shio', content: 'Preview unpublished drafts with short-lived tokens, schedule content to go live, and restore earlier versions from the console.' },
  { title: 'Visual Editing', solution: 'shio', content: 'Edit any externally-rendered page inline through the Adobe Universal Editor bridge — visual authoring without coupling the CMS to your front-end.' },
  { title: 'React & JavaScript SDKs', solution: 'shio', content: 'Official SDKs with hooks (useShioPost, useShioQuery, useShioChildren) to render content with Next.js or any framework, plus outbound webhooks on publish.' },
  { title: 'Native Cache & Search', solution: 'shio', content: 'A Hazelcast-backed native cache keeps delivery fast; content is indexed automatically and integrates with Turing ES for enterprise search.' },
  // ── Dumont DEP — Data Extraction Platform ──────────────────────────────────
  { title: 'Multi-source connectors', solution: 'dumont', content: 'Index from Adobe AEM, JDBC databases, filesystem assets, Adobe Edge Delivery Services, WordPress, and any website via the web crawler — all through one plugin architecture.' },
  { title: 'Search-engine-agnostic delivery', solution: 'dumont', content: 'Publish the same content to Viglet Turing ES, Apache Solr, or Elasticsearch by changing a single property — no rewrite when your engine changes.' },
  { title: 'Declarative structured sources', solution: 'dumont', content: 'Model listings and detail pages as a typed schema with reusable Sitemap, HtmlListing and TabularListing strategies — a new source becomes a manifest, not code.' },
  { title: 'AI-assisted source setup', solution: 'dumont', content: 'Point Dumont at a URL and get a draft extraction strategy and field manifest to confirm — never auto-published, never a guessed value.' },
  { title: 'Auditable, grounding-safe ingestion', solution: 'dumont', content: 'Per-field coverage and drift monitoring plus field-level provenance catch silent layout changes; absent fields are omitted rather than sent as empty strings.' },
  { title: 'Enterprise-ready platform', solution: 'dumont', content: 'Multi-tenancy, OAuth2/OIDC with Keycloak SSO, API-key auth, queued batch indexing, delta re-crawl, and cron scheduling.' },
  { title: 'Modern, embeddable console', solution: 'dumont', content: 'A React 19 admin console with AI-powered connector insights that runs standalone or embeds directly into Turing via Module Federation.' },
  // ── Turing ES — Enterprise Search + RAG + Agents ───────────────────────────
  { title: 'One query API, three engines', solution: 'turing', content: 'Run faceted, multilingual, typo-tolerant search on Apache Solr, Elasticsearch or an embedded Lucene index — swap engines per site without touching your front-end.' },
  { title: 'Hybrid keyword + vector ranking', solution: 'turing', content: 'Reciprocal Rank Fusion fuses BM25 with per-site vector scores, giving semantic relevance without losing exact-match precision.' },
  { title: 'Cited RAG answers you can audit', solution: 'turing', content: 'Every streamed answer carries source chips (title, URL, score) traceable to the exact passage, with a pluggable reranker, a relevance gate and an optional groundedness check.' },
  { title: 'AI agents with tools, skills & MCP', solution: 'turing', content: 'Agents call custom tools, run Anthropic-standard skills in a Docker sandbox, and federate over MCP in both directions — client and Turing-as-server.' },
  { title: 'Native provider tools', solution: 'turing', content: 'Turn on each vendor’s server-side web search, code execution, computer use, URL fetch and image generation across OpenAI, Anthropic and Gemini — opt-in per agent.' },
  { title: 'Bring any LLM, keep your data', solution: 'turing', content: 'OpenAI, Anthropic, Gemini, Azure and local Ollama models plug in behind one interface, switchable per agent, with keys encrypted at rest.' },
  { title: 'Self-host, multi-tenant, observable', solution: 'turing', content: 'Apache 2.0 on your own infrastructure with OIDC SSO, multi-tenancy behind a feature flag, chat & conversion analytics, LLM cost tracking and Micrometer metrics.' },
]

export function getFeaturesBySolution(identifier: string): Feature[] {
  return features.filter((f) => f.solution === identifier)
}
