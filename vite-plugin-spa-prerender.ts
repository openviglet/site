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

const staticRoutes: { path: string; title: string; description: string; ogId: string }[] = [
  {
    path: '/partner/',
    title: 'Partner Program — Viglet',
    description: 'Join the Viglet partner ecosystem — technology, solution, and community tiers.',
    ogId: 'partner',
  },
  {
    path: '/about/',
    title: 'About — Viglet',
    description: 'Learn about Viglet, the open-source platform for enterprise intelligence.',
    ogId: 'about',
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

/** Absolute origin this site is served from (see CNAME). Used for canonicals. */
const SITE_ORIGIN = 'https://www.viglet.org'

interface ProductMeta {
  identifier: string
  fullName: string
  /** Dedicated product site, if any (e.g. turing.viglet.org). When set, the
   *  product landing canonicalises there to avoid cross-domain duplication. */
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
    products.push({ identifier: id, fullName: get('fullName'), site: get('site') })
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

/**
 * Override the Open Graph / Twitter tags per route (W27). The home defaults live
 * in index.html; here we point og:title / description / url / image (+ twitter)
 * at the route's own values and its build-time card in /og/{ogId}.png (generated
 * by scripts/og-images.mjs). og:image must be an absolute URL for social
 * crawlers.
 */
function injectOg(
  html: string,
  opts: { title: string; description: string; url: string; ogId: string },
): string {
  const img = `${SITE_ORIGIN}/og/${opts.ogId}.png`
  const set = (h: string, attr: 'property' | 'name', key: string, value: string) =>
    h.replace(
      new RegExp(`<meta ${attr}="${key}" content="[^"]*" \\/>`),
      `<meta ${attr}="${key}" content="${value}" />`,
    )
  let out = html
  out = set(out, 'property', 'og:title', opts.title)
  out = set(out, 'property', 'og:description', opts.description)
  out = set(out, 'property', 'og:url', opts.url)
  out = set(out, 'property', 'og:image', img)
  out = set(out, 'name', 'twitter:title', opts.title)
  out = set(out, 'name', 'twitter:description', opts.description)
  out = set(out, 'name', 'twitter:image', img)
  return out
}

/**
 * Inject a <link rel="canonical">. Routes self-canonicalise to their absolute
 * URL on www.viglet.org; the product landing may point cross-domain to its
 * dedicated site (e.g. /turing/ → turing.viglet.org) so search engines treat
 * the product site as the primary version and don't split ranking signals.
 */
function injectCanonical(html: string, url: string): string {
  const tag = `<link rel="canonical" href="${url}" />`
  if (/<link rel="canonical"/.test(html)) {
    return html.replace(/<link rel="canonical" href="[^"]*" \/>/, tag)
  }
  return html.replace(/<\/title>/, `</title>\n    ${tag}`)
}

/**
 * The FAQPage JSON-LD (in index.html) is Turing-specific, so it belongs only
 * on the home page — not on the Dumont/Shio/About/Partner routes. The home is
 * dist/index.html (left untouched here); every other route is generated from
 * rootHtml, so strip the block out of those copies.
 */
function stripFaqStructuredData(html: string): string {
  return html.replace(
    /\s*<!-- FAQPage structured data[\s\S]*?<\/script>/,
    '',
  )
}

export default function viteSpaPrerender(): Plugin {
  return {
    name: 'vite-plugin-spa-prerender',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist')
      const rootHtml = stripFaqStructuredData(
        readFileSync(resolve(distDir, 'index.html'), 'utf-8'),
      )
      const solutionsPath = resolve(__dirname, 'src/data/solutions.ts')
      const products = extractProducts(solutionsPath)

      let count = 0

      // Static routes — self-canonical to their absolute URL.
      for (const route of staticRoutes) {
        const dir = resolve(distDir, route.path.replace(/^\//, ''))
        mkdirSync(dir, { recursive: true })
        const routeUrl = `${SITE_ORIGIN}${route.path}`
        let html = injectMeta(rootHtml, route.title, route.description)
        html = injectCanonical(html, routeUrl)
        html = injectOg(html, { title: route.title, description: route.description, url: routeUrl, ogId: route.ogId })
        writeFileSync(resolve(dir, 'index.html'), html, 'utf-8')
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
          // The product landing (suffix "/") canonicalises to the dedicated
          // product site when one exists; all other pages self-canonicalise.
          const canonical =
            sub.suffix === '/' && product.site
              ? product.site
              : `${SITE_ORIGIN}${routePath}`
          let html = injectMeta(rootHtml, title, desc)
          html = injectCanonical(html, canonical)
          // og:image always self-references the product card (not the dedicated
          // site); og:url matches the canonical.
          html = injectOg(html, { title, description: desc, url: canonical, ogId: product.identifier })
          writeFileSync(resolve(dir, 'index.html'), html, 'utf-8')
          count++
        }
      }

      console.log(`✓ SPA pre-render: ${count} index.html files generated`)
    },
  }
}
