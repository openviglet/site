import { cloud } from '@/data/cloud'

/**
 * "Which Viglet product?" wizard (Block C / W8): three client-side questions
 * (what you have, what you want, who runs it) → the products that fit, with a
 * reason each. No backend and no model: instant, offline, always available.
 *
 * The first two answers each name a product; the result is their union in
 * pipeline order (extract → search → serve). The third adds a note on how it
 * runs. A `links` sentence is only written for a pair that really integrates
 * (Dumont's Turing target, Shio's Turing indexing). Dumont does not feed Shio,
 * so that pair gets no sentence.
 *
 * Grounding rule (ROADMAP § non-goals): every line restates `features.ts`,
 * `modules.ts` or the home FAQ. No invented claims.
 */

export interface WizardOption {
  id: string
  label: string
  /** Product this answer points to; absent for the "who runs it" question. */
  solution?: string
  /** Why that product, in one sentence. */
  reason?: string
  /** A note shown under the result (the "who runs it" question). */
  note?: string
  /** Optional link for the note: an in-site route, or an absolute URL. */
  noteLink?: { label: string; to: string }
}

export interface WizardQuestion {
  id: string
  question: string
  options: WizardOption[]
}

export const wizardQuestions: WizardQuestion[] = [
  {
    id: 'have',
    question: 'Where is your content today?',
    options: [
      {
        id: 'sources',
        label: 'In Adobe AEM, WordPress, a database, files or websites',
        solution: 'dumont',
        reason: 'Viglet Dumont extracts it with a ready connector for each of those sources, so there is no custom ETL to write.',
      },
      {
        id: 'engine',
        label: 'Already in Apache Solr or Elasticsearch',
        solution: 'turing',
        reason: 'Viglet Turing runs its search on Apache Solr or Elasticsearch, the engines you already use.',
      },
      {
        id: 'nowhere',
        label: 'Nowhere yet: we are starting a new site or app',
        solution: 'shio',
        reason: 'Viglet Shio models the content from scratch, as post types in the console or as versioned code.',
      },
    ],
  },
  {
    id: 'want',
    question: 'What do you want to give your users?',
    options: [
      {
        id: 'search',
        label: 'Search with filters',
        solution: 'turing',
        reason: 'Viglet Turing serves faceted, multilingual, typo-tolerant search with hybrid keyword and vector ranking.',
      },
      {
        id: 'answers',
        label: 'Answers to their questions, from AI',
        solution: 'turing',
        reason: 'Viglet Turing answers from your content with cited RAG, on the LLM you choose.',
      },
      {
        id: 'site',
        label: 'A site or app that serves our content',
        solution: 'shio',
        reason: 'Viglet Shio delivers content over a versioned REST and GraphQL API and renders it with Next.js or any framework.',
      },
      {
        id: 'index',
        label: 'Our content inside a search engine we choose',
        solution: 'dumont',
        reason: 'Viglet Dumont delivers it to Viglet Turing, Apache Solr or Elasticsearch, and switching engines is one property.',
      },
    ],
  },
  {
    id: 'run',
    question: 'Who will run it?',
    options: [
      {
        id: 'self',
        label: 'Our team, on our own servers',
        note: 'Every product is open source under Apache 2.0 and runs from a single Docker image on your infrastructure.',
      },
      {
        id: 'hosted',
        label: 'We would rather someone hosted it',
        note: `${cloud.name} runs the products for you. It is in beta, so features may change.`,
        noteLink: { label: 'Create a beta account', to: cloud.signUpUrl },
      },
    ],
  },
]

/** Sentences for the pairs that integrate, keyed by `a+b` in pipeline order. */
const links: Record<string, string> = {
  'dumont+turing': 'They connect directly: Dumont’s Turing target pushes the extracted content into Turing.',
  'turing+shio': 'They connect directly: while modeling post types in Shio you choose which attributes Turing indexes.',
}

const pipelineOrder = ['dumont', 'turing', 'shio']

export interface WizardPick {
  solution: string
  reasons: string[]
}

export interface WizardResult {
  picks: WizardPick[]
  links: string[]
  note?: WizardOption
}

/** The recommendation for a set of answers (question id → option id). */
export function recommend(answers: Record<string, string>): WizardResult {
  const chosen = wizardQuestions
    .map((q) => q.options.find((o) => o.id === answers[q.id]))
    .filter((o): o is WizardOption => Boolean(o))

  const bySolution = new Map<string, string[]>()
  for (const o of chosen) {
    if (!o.solution || !o.reason) continue
    const reasons = bySolution.get(o.solution) ?? []
    reasons.push(o.reason)
    bySolution.set(o.solution, reasons)
  }

  const picks = pipelineOrder
    .filter((id) => bySolution.has(id))
    .map((solution) => ({ solution, reasons: bySolution.get(solution) ?? [] }))

  const ids = picks.map((p) => p.solution)
  const pairLinks: string[] = []
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const sentence = links[`${ids[i]}+${ids[j]}`]
      if (sentence) pairLinks.push(sentence)
    }
  }

  return { picks, links: pairLinks, note: chosen.find((o) => o.note) }
}
