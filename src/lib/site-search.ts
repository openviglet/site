import { createTuringClient, fetchSearch } from '@viglet/turing-sdk'
import { solutions, getSolution } from '@/data/solutions'
import { features } from '@/data/features'
import { modules } from '@/data/modules'
import { comparisons } from '@/data/comparisons'
import { blogPosts } from '@/data/blog'

/**
 * Site search (Block B / W6): two layers, so search always answers.
 *
 *  1. **Local index** over the site's own data (`src/data/*`): products, their
 *     download and release-notes pages, features, modules, comparison pages,
 *     the static pages and the blog posts. Scored in the browser, no
 *     network, so it works offline and when Turing is down.
 *  2. **Live Viglet Turing** results from the public demo instance
 *     (`turing-demo.viglet.org`, SN site `turing-docs`) through the product's own
 *     `@viglet/turing-sdk`, so a query is also a demo of the product. That site
 *     indexes the Turing docs only; Dumont and Shio docs and the release notes
 *     are not in it yet (the W6 remainder). Any failure (CORS on a dev origin,
 *     timeout, instance down) leaves the local results alone.
 */

export interface SearchEntry {
  title: string
  body: string
  /** In-site route or an absolute URL when `external`. */
  href: string
  external?: boolean
  /** Product identifier, for the accent dot. */
  solution?: string
  /** Short label shown beside the title ("Product", "Feature", "Guide"...). */
  kind: string
}

export const TURING_DEMO_API = 'https://turing-demo.viglet.org/api'
export const TURING_DEMO_SITE = 'turing-docs'
const LIVE_TIMEOUT_MS = 5000

/** Lowercase and strip accents, so "conteúdo" matches "conteudo". */
function normalize(value: string): string {
  return value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

function tokens(value: string): string[] {
  return normalize(value).split(/[^a-z0-9]+/).filter(Boolean)
}

const staticPages: SearchEntry[] = [
  { title: 'About Viglet', body: 'Who makes Dumont, Shio and Turing, and the history of the project.', href: '/about/', kind: 'Page' },
  { title: 'Contact', body: 'Talk to the Viglet team about using Dumont, Shio or Turing in your organization.', href: '/contact/', kind: 'Page' },
  { title: 'Partner with Viglet', body: 'Integrators, consultancies and software vendors building on Turing, Dumont and Shio: current partners and how to start.', href: '/partner/', kind: 'Page' },
  { title: 'Documentation', body: 'Get started, install and develop with Turing, Dumont and Shio: the documentation of each product.', href: '/docs/', kind: 'Page' },
  { title: 'Blog', body: 'Guides and comparisons on enterprise search, semantic search, RAG and AI agents.', href: '/blog/', kind: 'Page' },
]

/** Every in-site entry, built once from the data modules. */
function buildLocalIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [...staticPages]
  for (const s of solutions) {
    entries.push({ title: s.fullName, body: `${s.category}. ${s.description}`, href: s.permalink, solution: s.identifier, kind: 'Product' })
    entries.push({ title: `Download ${s.fullName}`, body: `Run ${s.shortName} with Docker. ${s.dockerImage ?? ''}`, href: `${s.permalink}download/`, solution: s.identifier, kind: 'Download' })
    entries.push({ title: `${s.fullName} release notes`, body: `Changelog and release notes for ${s.shortName}.`, href: `${s.permalink}release-notes/`, solution: s.identifier, kind: 'Release notes' })
  }
  for (const f of features) {
    entries.push({ title: f.title, body: f.content, href: getSolution(f.solution)?.permalink ?? '/', solution: f.solution, kind: 'Feature' })
  }
  for (const m of modules) {
    const product = getSolution(m.solution)
    entries.push({ title: `${m.title} (${product?.shortName ?? m.solution})`, body: m.description, href: product?.permalink ?? '/', solution: m.solution, kind: 'Module' })
  }
  for (const c of comparisons) {
    entries.push({ title: c.h1, body: c.metaDescription, href: `/compare/${c.slug}/`, solution: c.accent, kind: 'Comparison' })
  }
  for (const p of blogPosts) {
    entries.push({ title: p.title, body: p.description, href: p.url, solution: p.solutions[0], kind: 'Guide' })
  }
  return entries
}

const localIndex = buildLocalIndex()

/**
 * Scores the local index. Every query word must prefix-match a word of the
 * entry (AND semantics); a title hit weighs more than a body hit.
 */
export function searchLocal(query: string, limit = 8): SearchEntry[] {
  const words = tokens(query)
  if (words.length === 0) return []
  const scored: { entry: SearchEntry; score: number }[] = []
  for (const entry of localIndex) {
    const title = tokens(entry.title)
    const body = tokens(entry.body)
    let score = 0
    let all = true
    for (const w of words) {
      const inTitle = title.some((t) => t.startsWith(w))
      const inBody = body.some((t) => t.startsWith(w))
      if (!inTitle && !inBody) {
        all = false
        break
      }
      score += (inTitle ? 3 : 0) + (inBody ? 1 : 0)
      if (title.includes(w)) score += 1
    }
    if (all) scored.push({ entry, score })
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.entry)
}

export interface LiveResult {
  /** May carry `<mark>` highlights from Turing; render with `highlightParts`. */
  title: string
  description: string
  url: string
  section?: string
}

/** Cookieless: the search endpoint is anonymous, so no session travels with it. */
const turing = createTuringClient({ baseURL: TURING_DEMO_API, credentials: 'omit' })

/**
 * Live Turing results for `query`; `[]` on any failure, never a throw. The
 * published SDK (2026.3.9) takes no timeout or abort signal yet, so a race
 * bounds the wait and the caller drops answers to a stale query.
 */
export async function searchTuring(query: string): Promise<LiveResult[]> {
  try {
    const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), LIVE_TIMEOUT_MS))
    const res = await Promise.race([
      fetchSearch(turing, TURING_DEMO_SITE, { q: query, rows: '5', _setlocale: 'en_US' }),
      timeout,
    ])
    return (res.results?.document ?? [])
      .map((d) => ({
        title: String(d.fields.title ?? ''),
        description: String(d.fields.description ?? ''),
        url: String(d.fields.url ?? ''),
        section: d.fields.section ? String(d.fields.section) : undefined,
      }))
      .filter((r) => r.title && /^https:\/\//.test(r.url))
  } catch {
    return []
  }
}

/**
 * Splits a Turing highlight into plain and marked runs. Only `<mark>` is kept;
 * any other tag is dropped, so the text never reaches the DOM as HTML.
 */
export function highlightParts(value: string): { text: string; mark: boolean }[] {
  const clean = value.replace(/<(?!\/?mark>)[^>]*>/g, '')
  const parts: { text: string; mark: boolean }[] = []
  const re = /<mark>([\s\S]*?)<\/mark>/g
  let last = 0
  for (const m of clean.matchAll(re)) {
    if (m.index > last) parts.push({ text: clean.slice(last, m.index), mark: false })
    parts.push({ text: m[1], mark: true })
    last = m.index + m[0].length
  }
  if (last < clean.length) parts.push({ text: clean.slice(last), mark: false })
  return parts.map((p) => ({ ...p, text: p.text.replace(/<\/?mark>/g, '') }))
}
