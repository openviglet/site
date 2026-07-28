import type { Plugin } from 'vite'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const SITE_URL = 'https://www.viglet.org'

/** Static routes (non-dynamic) */
const staticRoutes = ['/', '/partner/', '/about/']

/** Sub-routes generated for each product identifier */
const productSubRoutes = ['/', '/download/', '/release-notes/']

interface ProductMeta {
  identifier: string
  /** Dedicated product site, if any (e.g. turing.viglet.org). When set, the
   *  product landing canonicalises there (see vite-plugin-spa-prerender) and is
   *  therefore left out of the sitemap. */
  site: string
}

function extractProducts(solutionsPath: string): ProductMeta[] {
  const src = readFileSync(solutionsPath, 'utf-8')
  const blocks = src.split(/\{/).slice(1)
  const products: ProductMeta[] = []
  for (const block of blocks) {
    const get = (key: string) => {
      const m = block.match(new RegExp(`${key}:\\s*['"]([^'"]+)['"]`))
      return m ? m[1] : ''
    }
    const id = get('identifier')
    if (!id) continue
    products.push({ identifier: id, site: get('site') })
  }
  return products
}

/** Comparison landing-page slugs (Block E / W14) from src/data/comparisons.ts. */
function extractComparisonSlugs(comparisonsPath: string): string[] {
  const src = readFileSync(comparisonsPath, 'utf-8')
  const matches = [...src.matchAll(/\bslug:\s*['"]([^'"]+)['"]/g)]
  return matches.map((m) => m[1])
}

function buildSitemap(products: ProductMeta[], compareSlugs: string[]): string {
  const today = new Date().toISOString().split('T')[0]

  const urls: { loc: string; priority: string }[] = []

  for (const route of staticRoutes) {
    urls.push({ loc: `${SITE_URL}${route}`, priority: route === '/' ? '1.0' : '0.7' })
  }

  for (const product of products) {
    for (const sub of productSubRoutes) {
      // Skip the landing page of products that canonicalise to a dedicated
      // site — listing a URL that declares another canonical is a contradictory
      // signal. Sub-pages self-canonicalise, so they stay.
      if (sub === '/' && product.site) continue
      urls.push({
        loc: `${SITE_URL}/${product.identifier}${sub}`,
        priority: sub === '/' ? '0.9' : '0.6',
      })
    }
  }

  // Comparison / positioning landing pages (GEO surface) — high priority.
  for (const slug of compareSlugs) {
    urls.push({ loc: `${SITE_URL}/compare/${slug}/`, priority: '0.8' })
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
      const comparisonsPath = resolve(__dirname, 'src/data/comparisons.ts')
      const products = extractProducts(solutionsPath)
      const compareSlugs = extractComparisonSlugs(comparisonsPath)
      const sitemap = buildSitemap(products, compareSlugs)
      const outPath = resolve(__dirname, 'dist/sitemap.xml')
      writeFileSync(outPath, sitemap, 'utf-8')
      const offSite = products.filter((p) => p.site).length
      const total = staticRoutes.length + products.length * productSubRoutes.length - offSite + compareSlugs.length
      console.log(`\n✓ sitemap.xml generated with ${products.length} products + ${compareSlugs.length} comparison pages (${total} URLs, ${offSite} landing page(s) canonicalised off-site)`)
    },
  }
}
