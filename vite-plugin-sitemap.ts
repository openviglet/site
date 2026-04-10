import type { Plugin } from 'vite'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const SITE_URL = 'https://www.viglet.org'

/** Static routes (non-dynamic) */
const staticRoutes = ['/', '/partner/', '/about/']

/** Sub-routes generated for each product identifier */
const productSubRoutes = ['/', '/download/', '/release-notes/']

function extractIdentifiers(solutionsPath: string): string[] {
  const src = readFileSync(solutionsPath, 'utf-8')
  const matches = [...src.matchAll(/identifier:\s*['"]([^'"]+)['"]/g)]
  return matches.map((m) => m[1])
}

function buildSitemap(identifiers: string[]): string {
  const today = new Date().toISOString().split('T')[0]

  const urls: { loc: string; priority: string }[] = []

  for (const route of staticRoutes) {
    urls.push({ loc: `${SITE_URL}${route}`, priority: route === '/' ? '1.0' : '0.7' })
  }

  for (const id of identifiers) {
    for (const sub of productSubRoutes) {
      urls.push({
        loc: `${SITE_URL}/${id}${sub}`,
        priority: sub === '/' ? '0.9' : '0.6',
      })
    }
  }

  const entries = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${u.priority}</priority>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`
}

export default function viteSitemap(): Plugin {
  return {
    name: 'vite-plugin-sitemap',
    closeBundle() {
      const solutionsPath = resolve(__dirname, 'src/data/solutions.ts')
      const identifiers = extractIdentifiers(solutionsPath)
      const sitemap = buildSitemap(identifiers)
      const outPath = resolve(__dirname, 'dist/sitemap.xml')
      writeFileSync(outPath, sitemap, 'utf-8')
      console.log(`\n✓ sitemap.xml generated with ${identifiers.length} products (${3 + identifiers.length * 3} URLs)`)
    },
  }
}
