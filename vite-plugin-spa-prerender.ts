import type { Plugin } from 'vite'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'

/**
 * Generates an index.html in every SPA route directory so that
 * GitHub Pages returns 200 instead of 404 for deep links.
 *
 * Each generated file is a copy of the root index.html — React Router
 * handles the rest on the client side. Per-page <title> and
 * <meta description> are injected for basic SEO.
 */

const staticRoutes: { path: string; title: string; description: string }[] = [
  {
    path: '/partner/',
    title: 'Partner Program — Viglet',
    description: 'Join the Viglet partner ecosystem — technology, solution, and community tiers.',
  },
  {
    path: '/about/',
    title: 'About — Viglet',
    description: 'Learn about Viglet, the open-source platform for enterprise intelligence.',
  },
]

const productSubRoutes: { suffix: string; titleFn: (name: string) => string; descFn: (name: string) => string }[] = [
  {
    suffix: '/',
    titleFn: (n) => `${n} — Viglet`,
    descFn: (n) => `${n} — open-source enterprise intelligence by Viglet.`,
  },
  {
    suffix: '/download/',
    titleFn: (n) => `Download ${n} — Viglet`,
    descFn: (n) => `Download the latest release of ${n}.`,
  },
  {
    suffix: '/release-notes/',
    titleFn: (n) => `Release Notes — ${n} — Viglet`,
    descFn: (n) => `Changelog and release notes for ${n}.`,
  },
]

interface ProductMeta {
  identifier: string
  fullName: string
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
    products.push({ identifier: id, fullName: get('fullName') })
  }
  return products
}

function injectMeta(html: string, title: string, description: string): string {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${description}" />`,
    )
}

export default function viteSpaPrerender(): Plugin {
  return {
    name: 'vite-plugin-spa-prerender',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist')
      const rootHtml = readFileSync(resolve(distDir, 'index.html'), 'utf-8')
      const solutionsPath = resolve(__dirname, 'src/data/solutions.ts')
      const products = extractProducts(solutionsPath)

      let count = 0

      // Static routes
      for (const route of staticRoutes) {
        const dir = resolve(distDir, route.path.replace(/^\//, ''))
        mkdirSync(dir, { recursive: true })
        writeFileSync(resolve(dir, 'index.html'), injectMeta(rootHtml, route.title, route.description), 'utf-8')
        count++
      }

      // Product routes
      for (const product of products) {
        for (const sub of productSubRoutes) {
          const routePath = `/${product.identifier}${sub.suffix}`
          const dir = resolve(distDir, routePath.replace(/^\//, ''))
          mkdirSync(dir, { recursive: true })
          const title = sub.titleFn(product.fullName)
          const desc = sub.descFn(product.fullName)
          writeFileSync(resolve(dir, 'index.html'), injectMeta(rootHtml, title, desc), 'utf-8')
          count++
        }
      }

      console.log(`✓ SPA pre-render: ${count} index.html files generated`)
    },
  }
}
