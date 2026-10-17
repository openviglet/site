import { solutions } from '@/data/solutions'

/**
 * Dumont × Shio × Turing side by side (Block C / W9), rendered by
 * `ProductComparePage` at `/compare/`. Each row has a one-line summary per
 * product and an optional detail shown when the row is expanded.
 *
 * Rows that `solutions.ts` already knows (deploy, license, release) are derived
 * from it, so a new release or image never needs a second edit here.
 *
 * Grounding rule (ROADMAP § non-goals): facts only, each restating
 * `solutions.ts`, `features.ts`, `modules.ts` or the llms.txt product details.
 * No scores, no "best for", no invented claims.
 */

export interface CompareCell {
  summary: string
  detail?: string
}

export interface CompareRowDef {
  id: string
  label: string
  cells: Record<string, CompareCell>
}

const written: CompareRowDef[] = [
  {
    id: 'job',
    label: 'The job it does',
    cells: {
      dumont: { summary: 'Extracts content from your sources and delivers it to a search engine.', detail: 'Each extraction flow connects several sources to several targets in one pipeline, so there is no ETL glue code to write.' },
      shio: { summary: 'Models content and serves it to sites and apps.', detail: 'Define your own post types, deliver them over an API, and render them with any framework.' },
      turing: { summary: 'Searches your content and answers questions about it.', detail: 'Faceted search, cited RAG answers and AI agents over the content you index.' },
    },
  },
  {
    id: 'reads',
    label: 'What it reads',
    cells: {
      dumont: { summary: 'Adobe AEM, Adobe EDS, WordPress, SQL databases, file systems, websites.', detail: 'Sources are plugins on one architecture: AEM pages, fragments and assets; JDBC databases; documents and media on file systems; any site through the web crawler, with robots.txt and sitemap discovery.' },
      shio: { summary: 'Content your team authors in its console, or pushes as code.', detail: 'Post types are created in the admin or versioned as code with the Post Types DSL and the Shio CLI, with push, pull and drift detection.' },
      turing: { summary: 'Content indexed by Dumont, by Shio, or through its API and Java SDK.', detail: 'Dumont’s Turing target and Shio’s indexing feed it directly; the Java SDK indexes from any JVM application.' },
    },
  },
  {
    id: 'delivers',
    label: 'What it delivers',
    cells: {
      dumont: { summary: 'Indexed content in Viglet Turing, Apache Solr or Elasticsearch.', detail: 'Switching the target engine is a single property, with no rewrite.' },
      shio: { summary: 'A versioned REST and GraphQL Content Delivery API, plus webhooks.', detail: 'Fetch content by id, by URL for slug routing, or by query, with caching and rate limiting. Outbound webhooks fire on publish and unpublish.' },
      turing: { summary: 'A search API, a chatbot with cited answers, and AI agents.', detail: 'Search runs on Apache Solr, Elasticsearch or embedded Lucene with hybrid keyword and vector ranking. Agents call your tools and federate over MCP, with Turing also exposed as an MCP server.' },
    },
  },
  {
    id: 'ai',
    label: 'AI',
    cells: {
      dumont: { summary: 'Drafts an extraction strategy from a URL, for you to confirm.', detail: 'Nothing is published automatically and no value is guessed; absent fields are omitted rather than sent as empty strings.' },
      shio: { summary: 'Search and AI over its content come from Viglet Turing.', detail: 'While modeling post types you choose which attributes Turing indexes.' },
      turing: { summary: 'Cited RAG, agents and skills, on the LLM you choose.', detail: 'OpenAI, Anthropic, Google Gemini, Azure OpenAI or local Ollama, switchable per agent, with keys encrypted at rest.' },
    },
  },
  {
    id: 'sdks',
    label: 'SDKs & tools',
    cells: {
      dumont: { summary: 'A React admin console, standalone or embedded in Turing.', detail: 'The console embeds in Viglet Turing through Module Federation.' },
      shio: { summary: 'React SDK, JavaScript SDK, Shio CLI.', detail: 'Hooks such as useShioPost and useShioQuery, the Adobe Universal Editor bridge for inline editing, and create-shio-app to scaffold a project.' },
      turing: { summary: 'React SDK, JavaScript SDK, Turing CLI, Java SDK.', detail: 'The JavaScript SDK has no dependencies and works in Adobe EDS blocks, a plain script tag or any bundler.' },
    },
  },
]

function derived(): CompareRowDef[] {
  const cell = (fn: (s: (typeof solutions)[number]) => CompareCell) =>
    Object.fromEntries(solutions.map((s) => [s.identifier, fn(s)]))
  return [
    {
      id: 'deploy',
      label: 'How it runs',
      cells: cell((s) => ({
        summary: `Self-hosted, one Docker image${s.runPort ? ` on port ${s.runPort}` : ''}.`,
        detail: s.dockerImage ? `Image ${s.dockerImage}. Java 21 + Spring Boot, bundled in the container.` : undefined,
      })),
    },
    {
      id: 'license',
      label: 'License',
      cells: cell((s) => ({
        summary: 'Open source, Apache 2.0.',
        detail: s.github ? `Source: ${s.github}` : undefined,
      })),
    },
    {
      id: 'release',
      label: 'Latest release',
      cells: cell((s) => ({ summary: s.release ? `v${s.release}` : 'See the release notes.' })),
    },
  ]
}

export const compareRows: CompareRowDef[] = [...written, ...derived()]
