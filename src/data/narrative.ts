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
 * conversion-narrative sections ported from openviglet.github.io/turing's `site-content.ts`.
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
    title: 'Extract from any source, without glue code',
    body: 'Connectors for Adobe AEM, WordPress, SQL databases, file systems and the web push content into your search engine. There is no custom ETL to build and maintain.',
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
    body: 'Every product is open source under Apache 2.0 and runs from a single Docker image on your own infrastructure, so your content stays inside your perimeter.',
    solution: 'dumont',
  },
]

export function getOutcomes(): Outcome[] {
  return outcomes
}

/* -------------------------------------------------------------------------- */
/* Pipeline (W2 / W21): how Dumont → Turing → Shio connect as one platform     */
/* -------------------------------------------------------------------------- */

export interface PipelineStage {
  /** Product identifier. Drives logo + accent colour. */
  solution: string
  /** Short verb-phrase step label. */
  step: string
  title: string
  description: string
}

/**
 * The reusable "Built with Viglet" pipeline: extract with Dumont → search &
 * answer with Turing → model & serve with Shio. It presents the three product
 * pages as one platform.
 */
export const pipeline: PipelineStage[] = [
  {
    solution: 'dumont',
    step: 'Extract',
    title: 'Connect any source',
    description:
      'Viglet Dumont crawls and connects Adobe AEM, WordPress, SQL databases, file systems and the web, and normalizes everything into one flow from source to destination.',
  },
  {
    solution: 'turing',
    step: 'Search & answer',
    title: 'Index, search, answer',
    description:
      'Viglet Turing indexes that flow into Apache Solr, Elasticsearch or Lucene, adds faceted semantic navigation, and answers questions with a RAG chatbot grounded in your content.',
  },
  {
    solution: 'shio',
    step: 'Model & serve',
    title: 'Model & deliver content',
    description:
      'Viglet Shio models the content, exposes it over GraphQL, and serves a cached, search-ready site. It is the editorial layer of the platform.',
  },
]

export function getPipeline(): PipelineStage[] {
  return pipeline
}

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
        title: 'Any source, out of the box',
        description:
          'Ready-to-use connectors for Adobe AEM, JDBC databases, filesystem assets, Adobe Edge Delivery Services, WordPress and a web crawler. No custom connector to write.',
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
        title: 'Push to any search engine',
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
          'Create post types with exactly the attributes you need, in the admin or as versioned code with the Post Types DSL and the Shio CLI.',
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
    a: 'Yes. Viglet Turing is open-source enterprise search under the Apache 2.0 license. You self-host it on your own infrastructure with no per-document or per-query pricing, and it includes faceted search, semantic/vector search and generative AI (RAG).',
  },
  {
    q: 'How do I run it?',
    a: 'One Docker command per product, pulling the image from the GitHub Container Registry (ghcr.io). The runtime is bundled in the container, so there is no Java install and no manual setup. To have Viglet host it for you instead, Viglet Cloud is in beta at viglet.cloud.',
  },
  {
    q: 'Which sources can I index (Adobe AEM, WordPress, databases)?',
    a: 'Viglet Dumont connects Adobe AEM, WordPress, SQL databases, file systems and any website through its web crawler, and delivers the content into Apache Solr, Elasticsearch or Viglet Turing.',
  },
  {
    q: 'Does it support semantic search and RAG with the LLM of my choice?',
    a: 'Yes. Viglet Turing includes vector/semantic search and Retrieval-Augmented Generation with the LLM of your choice (OpenAI/ChatGPT, Ollama, Anthropic or Google Gemini), on SaaS or on-premises. Answers are grounded in your indexed content, with citations.',
  },
  {
    q: 'Where is my content stored?',
    a: "On your own infrastructure. Every product is self-hosted with Docker, so indexed content and user queries never leave your perimeter. This matters for regulated industries with data-residency requirements, where SaaS search keeps content in the vendor's cloud.",
  },
]

export function getFaq(): FaqItem[] {
  return faq
}
