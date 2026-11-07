import type { ComponentType } from 'react'
import {
  IconSearch,
  IconMessageChatbot,
  IconDatabaseImport,
  IconLicense,
  IconArrowsShuffle,
  IconBox,
  IconWorldSearch,
  IconTransform,
  IconServerBolt,
  IconPuzzle,
  IconLayoutGrid,
  IconApi,
  IconRobot,
  IconShieldCheck,
} from '@tabler/icons-react'

/**
 * Narrative content model (Block H / W20): the single data source for the
 * conversion-narrative sections ported from turing.viglet.org's `site-content.ts`.
 *
 * Copy lives here; the sections (`Outcomes`, `Pipeline`, `Providers`, home FAQ,
 * per-product essence) are pure `map()` over these arrays. Follows the existing
 * `src/data/*` convention (typed export + `getX()` helpers).
 *
 * Grounding rule (ROADMAP § non-goals): every claim is observable from a running
 * product or the data in `solutions.ts` / `features.ts` / `modules.ts`. No
 * invented metrics, no superlatives, no unverifiable benchmarks.
 */

type Icon = ComponentType<{ size?: number; className?: string }>

/* -------------------------------------------------------------------------- */
/* Outcomes (W22): "what changes for you", results-first, not a feature list   */
/* -------------------------------------------------------------------------- */

export interface Outcome {
  icon: Icon
  /** The outcome (a result), not the feature. */
  title: string
  /** One line on how the suite delivers it. */
  body: string
  /** Product the outcome maps to. Drives the accent colour. */
  solution: string
}

export const outcomes: Outcome[] = [
  {
    icon: IconSearch,
    title: 'Get cited answers from your content',
    body: 'Semantic navigation and a RAG chatbot answer questions from your own content and cite the sources.',
    solution: 'turing',
  },
  {
    icon: IconDatabaseImport,
    title: 'Connect your existing content sources',
    body: 'Connectors for Adobe AEM, SQL databases, file systems and the web push content into your search engine. Configure the supported connectors and map the fields your search needs.',
    solution: 'dumont',
  },
  {
    icon: IconLayoutGrid,
    title: 'Model content, ship a site',
    body: 'Define your own post types, query them over GraphQL, and serve a JavaScript site with native cache and built-in search.',
    solution: 'shio',
  },
  {
    icon: IconLicense,
    title: 'Own your stack: Apache 2.0, self-hosted',
    body: 'Every product is open source under Apache 2.0 and runs from a single Docker image on your own infrastructure, with storage and model connections configured by your team.',
    solution: 'dumont',
  },
]

export function getOutcomes(): Outcome[] {
  return outcomes
}

/* -------------------------------------------------------------------------- */
/* Pipeline (W2 / W21): how Viglet Dumont → Viglet Turing → Viglet Shio connect as one platform     */
/* -------------------------------------------------------------------------- */

export interface ProductConnection {
  id: string
  source: string
  solution: 'dumont' | 'shio'
  action: string
  payload: string
  destination: string
  description: string
}

// Independent integration paths, not a required three-product installation.
export const productConnections: ProductConnection[] = [
  {
    id: 'external-search',
    source: 'AEM, databases, files and websites',
    solution: 'dumont',
    action: 'Viglet Dumont connects and extracts',
    payload: 'Content and mapped fields',
    destination: 'Viglet Turing search and cited answers',
    description: 'Viglet Dumont feeds supported sources into Viglet Turing. It can also deliver directly to Apache Solr or Elasticsearch.',
  },
  {
    id: 'cms-search',
    source: 'Content managed in Viglet Shio',
    solution: 'shio',
    action: 'Viglet Shio indexes content',
    payload: 'Authored content for indexing',
    destination: 'Viglet Turing search and cited answers',
    description: 'Add Viglet Turing when a Viglet Shio site needs search and answers over its content.',
  },
  {
    id: 'cms-delivery',
    source: 'People and agents author content',
    solution: 'shio',
    action: 'Viglet Shio publishes and delivers',
    payload: 'Rendered pages or REST / GraphQL',
    destination: 'Your website or application',
    description: 'Use Viglet Shio as a CMS on its own. Viglet Turing and Viglet Dumont are not required to publish content.',
  },
]

/* -------------------------------------------------------------------------- */
/* Per-product essence (W24): pillars per product for SolutionPage             */
/* -------------------------------------------------------------------------- */

export interface Pillar {
  icon: Icon
  /** The capability as a verb ("Connect", "Model", "Answer"). */
  step: string
  title: string
  description: string
}

export interface SolutionEssence {
  /** The line under the product name is `solutions.ts`'s `description`, the
   *  one descriptor the product uses everywhere (W38), so it is not repeated here. */
  pillars: Pillar[]
}

/**
 * Per-product storytelling: the 3–4 verbs that define each product, grounded in
 * `features.ts` / `modules.ts`. Keyed by solution identifier so one component
 * renders all three on `SolutionPage`.
 */
export const essence: Record<string, SolutionEssence> = {
  dumont: {
    pillars: [
      {
        icon: IconPuzzle,
        step: 'Connect',
        title: 'Connectors for your existing sources',
        description:
          'Ready-to-use connectors for Adobe AEM, JDBC databases, filesystem assets, Adobe Edge Delivery Services and a web crawler. Configure credentials, field mappings and indexing for each source.',
      },
      {
        icon: IconTransform,
        step: 'Model',
        title: 'Sources as a schema',
        description:
          'Describe listings and detail pages with a declarative structured-source framework, or point Viglet Dumont at a URL and confirm the extraction strategy it drafts.',
      },
      {
        icon: IconArrowsShuffle,
        step: 'Deliver',
        title: 'Deliver to your search engine',
        description:
          'Send the extracted flow to Viglet Turing, Apache Solr or Elasticsearch by changing a single property. Switching engines needs no rewrite.',
      },
      {
        icon: IconShieldCheck,
        step: 'Trust',
        title: 'Auditable & grounding-safe',
        description:
          'Per-field coverage and drift monitoring plus field-level provenance catch silent layout changes, and absent fields are omitted rather than sent as empty strings.',
      },
    ],
  },
  shio: {
    pillars: [
      {
        icon: IconLayoutGrid,
        step: 'Model',
        title: 'Post types in the console or as code',
        description:
          'Create post types with exactly the attributes you need, in the admin or as versioned code with the Post Types DSL and the Viglet Shio CLI.',
      },
      {
        icon: IconApi,
        step: 'Deliver',
        title: 'Headless Content Delivery API',
        description:
          'Fetch content from a versioned REST and GraphQL delivery API by id, by URL for slug routing, or by query, with caching and rate limiting.',
      },
      {
        icon: IconServerBolt,
        step: 'Publish',
        title: 'Drafts, preview & scheduling',
        description:
          'Preview unpublished drafts with short-lived tokens, schedule content to go live, restore earlier versions, and fire outbound webhooks.',
      },
      {
        icon: IconPuzzle,
        step: 'Render',
        title: 'SDKs & visual editing',
        description:
          'Render with Next.js or any framework using the React and JavaScript SDKs, and edit pages inline through the Adobe Universal Editor bridge.',
      },
    ],
  },
  turing: {
    pillars: [
      {
        icon: IconWorldSearch,
        step: 'Search',
        title: 'Faceted search, any engine',
        description:
          'Faceted, multilingual, typo-tolerant search on Apache Solr, Elasticsearch or embedded Lucene, with hybrid keyword + vector ranking (RRF).',
      },
      {
        icon: IconMessageChatbot,
        step: 'Ask',
        title: 'Cited RAG answers',
        description:
          'A chatbot grounded in your content streams answers with source citations, a pluggable reranker, a relevance gate and an optional groundedness check.',
      },
      {
        icon: IconRobot,
        step: 'Automate',
        title: 'Agents, tools, skills & MCP',
        description:
          'Configurable agents call your tools, run Anthropic-standard skills in a sandbox, federate over MCP, and use each provider’s native server-side tools.',
      },
      {
        icon: IconBox,
        step: 'Run',
        title: 'Self-hosted, any LLM',
        description:
          'Runs on your own infrastructure under Apache 2.0, with OpenAI, Anthropic, Gemini, Azure or local Ollama models. Multi-tenant and observable.',
      },
    ],
  },
}

export function getEssence(identifier: string): SolutionEssence | undefined {
  return essence[identifier]
}

/* -------------------------------------------------------------------------- */
/* Providers (W25): "works with your stack" pill wall                          */
/* -------------------------------------------------------------------------- */

export interface Provider {
  name: string
  /** Dot colour for the pill. */
  color: string
  /** Optional deep-link into the docs (bidirectional with W15). */
  href?: string
}

export interface ProviderGroup {
  label: string
  providers: Provider[]
}

/**
 * The stack Viglet fits into, derived from `modules.ts` / `features.ts`. Grouped
 * so a visitor can answer "does it work with *my* environment?" at a glance.
 * Objective names only; links point into the docs where a guide exists.
 */
export const providerGroups: ProviderGroup[] = [
  {
    label: 'Sources',
    providers: [
      { name: 'Adobe AEM', color: '#eb1000' },
      { name: 'Adobe EDS', color: '#fa0f00' },
      { name: 'WordPress', color: '#21759b' },
      { name: 'SQL Databases', color: '#00758f' },
      { name: 'File Systems', color: '#64748b' },
      { name: 'Web Crawler', color: '#0ea5e9' },
    ],
  },
  {
    label: 'Search engines',
    providers: [
      { name: 'Apache Solr', color: '#d9411e' },
      { name: 'Elasticsearch', color: '#f59e0b' },
      { name: 'Lucene', color: '#8b5cf6' },
    ],
  },
  {
    label: 'AI & LLMs',
    providers: [
      { name: 'OpenAI', color: '#10a37f' },
      { name: 'Anthropic', color: '#d9774f' },
      { name: 'Google Gemini', color: '#4285f4' },
      { name: 'Ollama', color: '#64748b' },
    ],
  },
  {
    label: 'Delivery',
    providers: [
      { name: 'Docker', color: '#2496ed' },
      { name: 'Kubernetes', color: '#326ce5' },
      { name: 'GraphQL', color: '#e10098' },
      { name: 'Node.js', color: '#5fa04e' },
    ],
  },
]

export function getProviderGroups(): ProviderGroup[] {
  return providerGroups
}

/* -------------------------------------------------------------------------- */
/* FAQ (W26): honest, objection-pre-empting Q&A (also emitted as JSON-LD)       */
/* -------------------------------------------------------------------------- */

export interface FaqItem {
  q: string
  a: string
}

/**
 * The home FAQ. It answers common objections and folds in the "open-source
 * alternative to Algolia / AEM search" queries Block E targets (GEO).
 *
 * SINGLE SOURCE OF TRUTH for the home FAQPage. The visible section (W26)
 * renders this array, and the home route (src/app/page.tsx) builds its FAQPage
 * JSON-LD from it, so structured data matches on-page content (Google requires
 * the FAQ text to be present on the page).
 */
export const faq: FaqItem[] = [
  {
    q: 'Do I need all three products?',
    a: 'No. Each product runs on its own: Viglet Turing for search and AI, Viglet Dumont to feed it content, and Viglet Shio to model and serve content. They also work together, but there is no lock-in and no required bundle.',
  },
  {
    q: 'Which Viglet product do I need?',
    a: 'Match the product to the job: Viglet Dumont extracts and moves data (indexing, ETL, connectors); Viglet Shio models and serves content (CMS, sites, delivery API); Viglet Turing searches and answers (enterprise search, semantic navigation, AI chatbot).',
  },
  {
    q: 'Is Viglet a free, open-source alternative to Algolia, Coveo or Lucidworks?',
    a: 'Yes. Viglet Turing is open-source enterprise search under the Apache 2.0 license. You self-host it without per-document or per-query license fees, and it includes faceted search, semantic/vector search and generative AI (RAG).',
  },
  {
    q: 'How do I run it?',
    a: 'One Docker command per product, pulling the image from the GitHub Container Registry (ghcr.io). The runtime is bundled in the container, so no separate Java install is needed; configure storage, sources and any model providers for your deployment. To have Viglet host it for you instead, Viglet Cloud is in beta at viglet.cloud.',
  },
  {
    q: 'Which sources can I index (Adobe AEM, WordPress, databases)?',
    a: 'Viglet Dumont connects AEM, databases, files and websites to Viglet Turing, Solr or Elasticsearch. The Viglet Turing Search plugin connects WordPress and WooCommerce directly to Viglet Turing; it does not require Viglet Dumont.',
  },
  {
    q: 'Does it support semantic search and RAG with the LLM of my choice?',
    a: 'Yes. Viglet Turing includes vector/semantic search and Retrieval-Augmented Generation with the LLM of your choice (OpenAI/ChatGPT, Ollama, Anthropic or Google Gemini), on SaaS or on-premises. Answers are grounded in your indexed content, with citations.',
  },
  {
    q: 'What does self-hosting involve?',
    a: 'There are no product license fees. Your team runs the infrastructure, configures persistent storage, manages backups and updates, and pays for any external models or services it enables. For help planning a deployment, contact Viglet about implementation and support options.',
  },
  {
    q: 'Where is my content stored?',
    a: "You control where the application and indexed content are hosted. To keep processing within your infrastructure, configure local models and embeddings and review external integrations. Cloud model providers and external tools receive the data needed for the requests you enable.",
  },
]

export function getFaq(): FaqItem[] {
  return faq
}
