import type { MetadataRoute } from 'next'
import { solutions } from '@/data/solutions'
import { comparisons } from '@/data/comparisons'
import { blogPosts, usedTags } from '@/data/blog'
import { productPages, SITE_ORIGIN, staticPages } from '@/lib/seo'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString().split('T')[0]
  const urls: MetadataRoute.Sitemap = [
    { url: `${SITE_ORIGIN}/`, lastModified, priority: 1.0 },
    ...Object.values(staticPages).map((p) => ({ url: `${SITE_ORIGIN}${p.path}`, lastModified, priority: 0.7 })),
  ]

  for (const s of solutions) {
    for (const page of Object.values(productPages)) {
      // A product landing that canonicalises to its dedicated site is left out:
      // listing a URL that declares another canonical is a contradictory signal.
      if (page.suffix === '/' && s.site) continue
      urls.push({
        url: `${SITE_ORIGIN}/${s.identifier}${page.suffix}`,
        lastModified,
        priority: page.suffix === '/' ? 0.9 : 0.6,
      })
    }
  }

  // Comparison / positioning landing pages (GEO surface), high priority.
  for (const c of comparisons) {
    urls.push({ url: `${SITE_ORIGIN}/compare/${c.slug}/`, lastModified, priority: 0.8 })
  }

  // Blog posts carry their own date; tag pages are listings.
  for (const p of blogPosts) {
    urls.push({ url: `${SITE_ORIGIN}${p.url}`, lastModified: p.date, priority: 0.7 })
  }
  for (const t of usedTags()) {
    urls.push({ url: `${SITE_ORIGIN}/blog/tags/${t}/`, lastModified, priority: 0.4 })
  }

  return urls
}
