// Refresh the docs-blog guides snapshot at build time (Block E / W14 + W15).
//
// The docs site (docs.viglet.org) is the single source of truth for the blog
// guides this marketing site cross-links into. It emits a machine-readable
// endpoint from its PUBLISHED posts (drafts excluded) — see the `guides-json`
// Docusaurus plugin in the vigletdocs repo. This script pulls that endpoint and
// writes src/data/guides.generated.json, the snapshot baked into the bundle for
// first paint / offline (the runtime `useGuides` hook then keeps it live).
//
// Best-effort by design: if the endpoint is unreachable or malformed (offline
// build, docs mid-deploy), we KEEP the committed snapshot and exit 0 — the build
// never fails because of the docs site. Runs as `prebuild` (before vite build).

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const ENDPOINT = process.env.GUIDES_ENDPOINT || 'https://docs.viglet.org/guides.json'
const OUT = resolve(process.cwd(), 'src/data/guides.generated.json')
const TIMEOUT_MS = 10000

function keep(reason) {
  console.warn(`fetch-guides: ${reason} — keeping committed snapshot.`)
  process.exit(0)
}

const controller = new AbortController()
const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

try {
  const res = await fetch(ENDPOINT, { signal: controller.signal })
  if (!res.ok) keep(`endpoint returned HTTP ${res.status}`)

  const data = await res.json()
  const guides = Array.isArray(data?.guides)
    ? data.guides.filter((g) => g && typeof g.slug === 'string' && typeof g.url === 'string' && typeof g.title === 'string')
    : []

  if (guides.length === 0) keep('endpoint had no usable guides')

  // Only rewrite when the content actually changed (keeps git diffs clean).
  const next = JSON.stringify({ source: data.source || 'https://docs.viglet.org', guides }, null, 2) + '\n'
  let current = ''
  try { current = readFileSync(OUT, 'utf-8') } catch { /* no snapshot yet */ }

  if (next === current) {
    console.log(`fetch-guides: snapshot up to date (${guides.length} guides).`)
  } else {
    writeFileSync(OUT, next, 'utf-8')
    console.log(`fetch-guides: refreshed snapshot with ${guides.length} guides from ${ENDPOINT}`)
  }
} catch (err) {
  keep(err?.name === 'AbortError' ? 'request timed out' : `request failed (${err?.message || err})`)
} finally {
  clearTimeout(timer)
}
