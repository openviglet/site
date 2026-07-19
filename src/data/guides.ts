import { useEffect, useState } from 'react'
import generated from './guides.generated.json'

/**
 * Docs blog guides (Block E / W14 + W15) — the cross-links into
 * `docs.viglet.org/blog` that the comparison landing pages and the per-product
 * "Guides" section render.
 *
 * DYNAMIC, not hardcoded. The single source of truth is the docs site itself,
 * which emits a machine-readable endpoint (`GUIDES_ENDPOINT`) from its published
 * blog posts (see the `guides-json` Docusaurus plugin in the vigletdocs repo).
 * Drafts are excluded upstream, so we never link a post that would 404.
 *
 * Two layers, both grounded, so the UI is always correct and never blocks:
 *  1. **Committed snapshot** (`guides.generated.json`) — baked into the bundle so
 *     the guides render on first paint (no spinner, no layout shift) and the site
 *     works offline / if the docs endpoint is briefly unavailable. It is
 *     refreshed at build time by `scripts/fetch-guides.mjs` (best-effort).
 *  2. **Runtime refresh** (`useGuides`) — fetches the live endpoint client-side
 *     and upgrades the list, so guides published after the last viglet.org build
 *     appear without a redeploy. Any failure degrades to the snapshot (ROADMAP
 *     § non-goals: dynamic features must degrade gracefully — never a hard error).
 */

/** Live endpoint on the docs site (GitHub Pages serves it CORS-open: `*`). */
export const GUIDES_ENDPOINT = 'https://docs.viglet.org/guides.json'

/** How long to wait on the runtime refresh before giving up on the snapshot. */
const FETCH_TIMEOUT_MS = 6000

export interface DocGuide {
  /** Docusaurus post slug (URL segment under /blog/). */
  slug: string
  /** Post title, from the docs frontmatter. */
  title: string
  /** One-line summary. */
  description: string
  /** Absolute URL to the post. */
  url: string
  /** ISO date (optional). */
  date?: string
  /** Post tags (optional). */
  tags?: string[]
  /** Product identifiers this guide is relevant to (drives W15 placement). */
  solutions: string[]
}

interface GuidesPayload {
  source?: string
  guides?: DocGuide[]
}

/** The baked snapshot — instant, always-available fallback. */
export const bakedGuides: DocGuide[] = ((generated as GuidesPayload).guides ?? []).filter(
  (g) => g?.slug && g?.url && g?.title,
)

/** Guides relevant to a product identifier (W15 — per-product cross-links). */
export function getGuidesBySolution(guides: DocGuide[], identifier: string): DocGuide[] {
  return guides.filter((g) => g.solutions?.includes(identifier))
}

/** Resolve an ordered list of slugs to guides, skipping any that no longer exist. */
export function getGuidesBySlugs(guides: DocGuide[], slugs: string[]): DocGuide[] {
  return slugs.map((s) => guides.find((g) => g.slug === s)).filter((g): g is DocGuide => Boolean(g))
}

/** Validate + normalize a fetched payload; returns null when unusable. */
function parsePayload(data: unknown): DocGuide[] | null {
  const guides = (data as GuidesPayload)?.guides
  if (!Array.isArray(guides)) return null
  const clean = guides.filter(
    (g) => g && typeof g.slug === 'string' && typeof g.url === 'string' && typeof g.title === 'string',
  )
  return clean.length > 0 ? clean : null
}

/**
 * The live guide list: starts from the baked snapshot, then refreshes from the
 * docs endpoint on mount. Never throws, never leaves the UI empty.
 */
export function useGuides(): DocGuide[] {
  const [guides, setGuides] = useState<DocGuide[]>(bakedGuides)

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    fetch(GUIDES_ENDPOINT, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data) => {
        const fresh = parsePayload(data)
        if (fresh && !cancelled) setGuides(fresh)
      })
      .catch(() => {
        /* keep the baked snapshot — offline / endpoint down / timeout */
      })
      .finally(() => clearTimeout(timer))

    return () => {
      cancelled = true
      controller.abort()
      clearTimeout(timer)
    }
  }, [])

  return guides
}
