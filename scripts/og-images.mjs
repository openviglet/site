// Per-route OG social images (Block H / W27).
//
// At build time, render a per-route 1200×630 SVG (Viglet wordmark + page title
// + brand/product gradient) and rasterize it to PNG. X / LinkedIn / Slack /
// Facebook do NOT render SVG og:images, so we ship real PNGs. This runs AFTER
// `vite build` (see package.json). The prerender plugin wires the matching
// `og:image` / `twitter:image` tags per route.
//
// Defensive by design: if the optional `@resvg/resvg-js` dependency isn't
// installed (e.g. a bare local build), we log a warning and skip WITHOUT failing
// the build — the SVG is still written to dist/og/ as a fallback. CI installs
// the dep, so the deployed site always gets PNGs. The `id`s here MUST match the
// ids the prerender plugin references (home, dumont, shio, turing, about,
// partner).

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const DIST = resolve(process.cwd(), 'dist')
const OUT = resolve(DIST, 'og')

if (!existsSync(DIST)) {
  console.warn('og-images: dist/ not found — run after `vite build`. Skipping.')
  process.exit(0)
}
mkdirSync(OUT, { recursive: true })

/* ---- Extract product identities from src/data/solutions.ts (grounded) ----- */

function extractProducts() {
  const src = readFileSync(resolve(process.cwd(), 'src/data/solutions.ts'), 'utf-8')
  const blocks = src.split(/\{/).slice(1)
  const out = []
  for (const b of blocks) {
    const get = (k) => {
      const m = b.match(new RegExp(`${k}:\\s*['"]([^'"]+)['"]`))
      return m ? m[1] : ''
    }
    const id = get('identifier')
    if (!id) continue
    out.push({
      id,
      title: get('fullName'),
      subtitle: get('description'),
      acronym: get('logoAcronym'),
    })
  }
  return out
}

// Gradient stops mirror the `.product-hero-*` / theme-color values in index.css.
const GRADIENTS = {
  brand: ['#C2410C', '#F97316'],
  dumont: ['#003300', '#006400'],
  shio: ['#cc2200', '#ff6347'],
  turing: ['#1a3a9e', '#4169e1'],
}

const products = extractProducts().map((p) => ({
  ...p,
  grad: GRADIENTS[p.id] ?? GRADIENTS.brand,
}))

const identities = [
  {
    id: 'home',
    title: 'Open Source Tools for Enterprise Intelligence',
    subtitle: 'Data extraction, content management & semantic search',
    acronym: '',
    grad: GRADIENTS.brand,
  },
  ...products,
  {
    id: 'about',
    title: 'About Viglet',
    subtitle: 'The open-source platform for enterprise intelligence',
    acronym: '',
    grad: GRADIENTS.brand,
  },
  {
    id: 'partner',
    title: 'Partner Program',
    subtitle: 'Join the Viglet partner ecosystem',
    acronym: '',
    grad: GRADIENTS.brand,
  },
]

/* ---- SVG template ---------------------------------------------------------- */

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Greedy word-wrap to at most `maxLines` lines of ~`maxChars`. */
function wrap(text, maxChars, maxLines) {
  const words = text.split(/\s+/)
  const lines = []
  let line = ''
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars && line) {
      lines.push(line)
      line = w
      if (lines.length === maxLines - 1) break
    } else {
      line = (line + ' ' + w).trim()
    }
  }
  if (line) lines.push(line)
  return lines.slice(0, maxLines)
}

function svgFor(item) {
  const [c1, c2] = item.grad
  const titleLines = wrap(item.title, 26, 3)
  const titleStartY = 300 - (titleLines.length - 1) * 38
  const titleTspans = titleLines
    .map((l, i) => `<tspan x="100" y="${titleStartY + i * 76}">${escapeXml(l)}</tspan>`)
    .join('')

  const acronymBadge = item.acronym
    ? `<rect x="100" y="90" width="104" height="104" rx="26" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>
       <text x="152" y="162" font-family="Arial, sans-serif" font-size="52" font-weight="700" fill="#ffffff" text-anchor="middle">${escapeXml(item.acronym)}</text>`
    : ''

  const wordmarkY = item.acronym ? 150 : 150
  const wordmarkX = item.acronym ? 230 : 100

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.75" cy="0.15" r="0.9">
      <stop offset="0" stop-color="rgba(255,255,255,0.18)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  ${acronymBadge}
  <text x="${wordmarkX}" y="${wordmarkY}" font-family="Arial, sans-serif" font-size="34" font-weight="800" letter-spacing="1" fill="rgba(255,255,255,0.92)">viglet</text>
  <text font-family="Arial, sans-serif" font-size="64" font-weight="800" fill="#ffffff">${titleTspans}</text>
  <text x="100" y="${titleStartY + titleLines.length * 76 + 6}" font-family="Arial, sans-serif" font-size="32" fill="rgba(255,255,255,0.82)">${escapeXml(wrap(item.subtitle, 60, 1)[0] ?? '')}</text>
  <text x="100" y="560" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.65)">Open Source · Apache 2.0 · self-hosted with Docker</text>
</svg>`
}

/* ---- Render ---------------------------------------------------------------- */

let Resvg
try {
  ({ Resvg } = await import('@resvg/resvg-js'))
} catch {
  console.warn(
    'og-images: @resvg/resvg-js not installed — writing SVG fallbacks only, ' +
      'skipping PNG rasterization.',
  )
}

let svgCount = 0
let pngCount = 0
for (const item of identities) {
  const svg = svgFor(item)
  writeFileSync(resolve(OUT, `${item.id}.svg`), svg)
  svgCount++
  if (Resvg) {
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 }, font: { loadSystemFonts: true } })
    writeFileSync(resolve(OUT, `${item.id}.png`), resvg.render().asPng())
    pngCount++
  }
}

console.log(`og-images: wrote ${svgCount} SVG${Resvg ? ` + ${pngCount} PNG` : ' (PNG skipped)'} to dist/og/`)
