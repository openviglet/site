import type { ComponentType } from 'react'
import {
  IconLicense,
  IconServer,
  IconCoin,
  IconShieldLock,
  IconSearch,
  IconVector,
  IconMessageChatbot,
  IconPlugConnected,
} from '@tabler/icons-react'

/**
 * Comparison / positioning landing pages (Block E / W14).
 *
 * These are the pages whose **titles are the queries evaluators type** —
 * "open-source alternative to Algolia", "enterprise search for Adobe AEM" — the
 * GEO surface that manufactures the semantic association between "Viglet" and
 * those queries (STRATEGY §I.4, cross-repo with Turing STRATEGY Block O). Each
 * page cross-links *into* the published docs blog guides (`guides.ts`), which are
 * the real conversion path (the how-tos live on docs.viglet.org, not here).
 *
 * GROUNDING RULE (ROADMAP § non-goals): facts only, no disparagement. The
 * comparison tables contrast objective, verifiable dimensions; the competitor
 * column states category facts ("hosted SaaS", "usage-based pricing") and defers
 * nuanced per-vendor detail to the docs comparison posts rather than asserting
 * specifics that could be wrong. No superlatives, no invented benchmarks.
 *
 * ⚠️ Build scripts (vite-plugin-sitemap / -spa-prerender / -llmtxt, og-images.mjs)
 * regex-extract `slug`, `metaTitle`, `metaDescription` from this file. Keep those
 * three fields as plain single-quoted strings with NO embedded quotes/apostrophes,
 * declared before any nested `{` in each object, or extraction breaks.
 */

type Icon = ComponentType<{ size?: number; className?: string }>

export interface CompareRow {
  icon: Icon
  label: string
  /** What Viglet provides (the highlighted column). */
  viglet: string
  /** The alternative being compared against (category-level, non-disparaging). */
  other: string
}

export interface CompareTable {
  /** Header for the highlighted (Viglet) column. */
  vigletHeader: string
  /** Header for the comparison column. */
  otherHeader: string
  rows: CompareRow[]
}

export interface Approach {
  step: string
  title: string
  body: string
}

export interface CompareFaq {
  q: string
  a: string
}

export interface Comparison {
  /** URL segment under /compare/. */
  slug: string
  /** Browser <title> (the query). Plain string, no quotes/apostrophes. */
  metaTitle: string
  /** <meta description>. Plain string, no quotes/apostrophes. */
  metaDescription: string
  /** On-page H1. */
  h1: string
  /** Eyebrow badge. */
  eyebrow: string
  /** Accent product identifier — reuses the product-* colour classes. */
  accent: string
  /** Lead paragraph. */
  intro: string
  /** Products that power the answer (identifiers, in order). */
  products: string[]
  /** Objective, non-disparaging comparison. */
  table: CompareTable
  /** How Viglet delivers it, as ordered steps. */
  approach: Approach[]
  /** Docs blog guide slugs to cross-link (must be published — see guides.ts). */
  guideSlugs: string[]
  /** Page-specific FAQ (GEO-friendly). */
  faq: CompareFaq[]
}

export const comparisons: Comparison[] = [
  {
    slug: 'open-source-alternative-to-algolia',
    metaTitle: 'Open-Source Alternative to Algolia, Coveo and Lucidworks — Viglet',
    metaDescription:
      'Viglet Turing ES is open-source, self-hosted enterprise search under Apache 2.0 — faceted search, semantic and vector search and cited RAG, with no per-document or per-query pricing.',
    h1: 'The open-source alternative to Algolia, Coveo and Lucidworks',
    eyebrow: 'Enterprise search',
    accent: 'turing',
    intro:
      'Hosted search services like Algolia, Coveo and Lucidworks are powerful — and priced per record and per query, with your content indexed in the vendor cloud. Viglet Turing ES is open-source enterprise search you run yourself: faceted navigation, semantic and vector search, and cited RAG answers, on your own infrastructure under the Apache 2.0 license.',
    products: ['turing', 'dumont'],
    table: {
      vigletHeader: 'Viglet Turing ES',
      otherHeader: 'Hosted SaaS search',
      rows: [
        {
          icon: IconLicense,
          label: 'License',
          viglet: 'Open source, Apache 2.0',
          other: 'Proprietary / commercial',
        },
        {
          icon: IconServer,
          label: 'Deployment',
          viglet: 'Self-hosted from one Docker image, on your infrastructure',
          other: 'Vendor-hosted SaaS (managed / on-prem tiers vary by vendor)',
        },
        {
          icon: IconCoin,
          label: 'Pricing model',
          viglet: 'No per-document or per-query fees — you pay for the infrastructure you run',
          other: 'Usage-based — priced per record, query or request',
        },
        {
          icon: IconShieldLock,
          label: 'Where content lives',
          viglet: 'Your own perimeter — indexed content and queries never leave it',
          other: 'The vendor cloud (with regional options on some plans)',
        },
        {
          icon: IconSearch,
          label: 'Search engine',
          viglet: 'Apache Solr, Elasticsearch or embedded Lucene — no engine lock-in',
          other: 'Proprietary engine',
        },
        {
          icon: IconVector,
          label: 'Semantic & vector search',
          viglet: 'Built in — hybrid keyword + vector ranking (RRF)',
          other: 'Available, varies by plan and vendor',
        },
        {
          icon: IconMessageChatbot,
          label: 'Generative answers (RAG)',
          viglet: 'Built in and cited — bring your own LLM (OpenAI, Anthropic, Gemini, Azure or local Ollama)',
          other: 'Available, varies by vendor',
        },
        {
          icon: IconPlugConnected,
          label: 'Source connectors',
          viglet: 'Via Dumont DEP — Adobe AEM, WordPress, SQL databases, file systems and the web',
          other: 'Vendor connectors and crawlers',
        },
      ],
    },
    approach: [
      {
        step: 'Extract',
        title: 'Connect your sources with Dumont DEP',
        body: 'Ready-to-use connectors pull content from Adobe AEM, WordPress, SQL databases, file systems and the web into one flow — no bespoke ETL to build and maintain.',
      },
      {
        step: 'Index & search',
        title: 'Index into Turing ES',
        body: 'Turing ES indexes the flow into Apache Solr, Elasticsearch or Lucene and serves faceted, multilingual, typo-tolerant search with hybrid keyword + vector ranking.',
      },
      {
        step: 'Answer',
        title: 'Add cited RAG answers',
        body: 'A chatbot grounded in your own content returns answers with source citations, using the LLM you choose — with a relevance gate and an optional groundedness check.',
      },
    ],
    guideSlugs: [
      'open-source-alternative-to-algolia-for-aem',
      'turing-es-vs-coveo-lucidworks',
      'solr-elasticsearch-or-turing-es',
    ],
    faq: [
      {
        q: 'Is Viglet Turing ES really free?',
        a: 'Turing ES is open source under the Apache 2.0 license — there are no license fees and no per-document or per-query charges. Your cost is the infrastructure you choose to run it on.',
      },
      {
        q: 'Can it do semantic search and RAG like the hosted vendors?',
        a: 'Yes. Turing ES bundles vector/semantic search (hybrid keyword + vector ranking with RRF) and Retrieval-Augmented Generation that returns cited answers grounded in your content, with the LLM of your choice.',
      },
      {
        q: 'How is data residency handled?',
        a: 'Because you self-host with Docker, indexed content and user queries stay inside your own perimeter — relevant for regulated industries, and different from SaaS search where content is stored in the vendor cloud.',
      },
      {
        q: 'Do I have to replace my search engine?',
        a: 'No. Turing ES runs on Apache Solr, Elasticsearch or embedded Lucene — you can keep the engine you already operate and change it later by switching a single property.',
      },
    ],
  },
  {
    slug: 'enterprise-search-for-aem',
    metaTitle: 'Enterprise Search for Adobe AEM — Viglet',
    metaDescription:
      'Add faceted, semantic search and cited RAG answers to Adobe Experience Manager with open-source Viglet — Dumont DEP indexes AEM content into Turing ES, self-hosted under Apache 2.0.',
    h1: 'Enterprise search for Adobe AEM',
    eyebrow: 'Adobe AEM',
    accent: 'turing',
    intro:
      'Adobe Experience Manager manages your content; it does not ship a faceted, semantic search experience out of the box. Viglet adds one, open source and self-hosted: Dumont DEP connects AEM and indexes it into Turing ES, which serves faceted navigation, semantic and vector search, and cited RAG answers over your AEM content.',
    products: ['dumont', 'turing'],
    table: {
      vigletHeader: 'Viglet on AEM',
      otherHeader: 'Hosted SaaS search',
      rows: [
        {
          icon: IconPlugConnected,
          label: 'AEM connector',
          viglet: 'Dumont DEP connector for Adobe AEM (and Adobe Edge Delivery Services)',
          other: 'Vendor connector or a custom crawler',
        },
        {
          icon: IconLicense,
          label: 'License',
          viglet: 'Open source, Apache 2.0',
          other: 'Proprietary / commercial',
        },
        {
          icon: IconServer,
          label: 'Deployment',
          viglet: 'Self-hosted from one Docker image, alongside your AEM environment',
          other: 'Vendor-hosted SaaS',
        },
        {
          icon: IconShieldLock,
          label: 'Where content lives',
          viglet: 'Your own perimeter — AEM content and queries never leave it',
          other: 'The vendor cloud',
        },
        {
          icon: IconSearch,
          label: 'Faceted search',
          viglet: 'Faceted, multilingual, typo-tolerant on Solr, Elasticsearch or Lucene',
          other: 'Provided by the vendor',
        },
        {
          icon: IconVector,
          label: 'Semantic & vector search',
          viglet: 'Built in — hybrid keyword + vector ranking (RRF)',
          other: 'Available, varies by plan and vendor',
        },
        {
          icon: IconMessageChatbot,
          label: 'Generative answers (RAG)',
          viglet: 'Built in and cited — bring your own LLM',
          other: 'Available, varies by vendor',
        },
        {
          icon: IconCoin,
          label: 'Pricing model',
          viglet: 'No per-document or per-query fees',
          other: 'Usage-based — priced per record, query or request',
        },
      ],
    },
    approach: [
      {
        step: 'Connect',
        title: 'Index AEM with Dumont DEP',
        body: 'The Dumont connector for Adobe AEM (and Adobe Edge Delivery Services) extracts pages and assets and normalizes them into one flow — with per-field coverage and drift monitoring so silent layout changes are caught.',
      },
      {
        step: 'Search',
        title: 'Serve faceted, semantic search with Turing ES',
        body: 'Turing ES indexes the AEM flow into Apache Solr, Elasticsearch or Lucene and adds faceted, multilingual navigation plus embedding-based vector search over your AEM content.',
      },
      {
        step: 'Answer',
        title: 'Answer questions over AEM content',
        body: 'A RAG chatbot returns answers grounded in your AEM content with citations, using the LLM you choose — kept on your own infrastructure.',
      },
    ],
    guideSlugs: [
      'enterprise-search-for-adobe-aem',
      'semantic-vector-search-aem',
      'open-source-alternative-to-algolia-for-aem',
    ],
    faq: [
      {
        q: 'Does AEM not already have search?',
        a: 'AEM includes full-text query capabilities for authoring and delivery, but not a turn-key faceted, semantic, typo-tolerant search experience with RAG answers. Viglet adds that layer on top, indexing AEM content into Turing ES.',
      },
      {
        q: 'How does Viglet get content out of AEM?',
        a: 'Dumont DEP has a ready-to-use connector for Adobe AEM (and Adobe Edge Delivery Services). It extracts pages and assets into a flow and delivers them to Turing ES, Apache Solr or Elasticsearch — no custom connector to write.',
      },
      {
        q: 'Can I add semantic and vector search to AEM?',
        a: 'Yes. Turing ES adds embedding-based vector search and semantic navigation over indexed AEM content, combined with keyword ranking (RRF) — all self-hosted.',
      },
      {
        q: 'Where does the AEM content end up?',
        a: 'On your own infrastructure. Turing ES and its search engine run from Docker inside your perimeter, so AEM content and user queries are never sent to a vendor cloud.',
      },
    ],
  },
]

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug)
}
