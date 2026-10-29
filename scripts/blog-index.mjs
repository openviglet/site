// Index the blog posts in content/blog/*.md into src/data/blog.generated.json.
//
// The posts' frontmatter is the single source of truth for every surface that
// lists them: /blog/ and its tag pages, the per-product "Guides" section (W15),
// the comparison pages, site search, llms.txt, the sitemap and the OG cards.
// Client views can't read the filesystem, so the metadata is baked into JSON
// here; the post body is read and rendered at build time by src/lib/blog.ts.
// Runs as `predev` and `prebuild`. The output is committed so a bare `next dev`
// still works, and is only rewritten when a post changed (clean git diffs).

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import matter from 'gray-matter'

const SRC = resolve(process.cwd(), 'content/blog')
const OUT = resolve(process.cwd(), 'src/data/blog.generated.json')
const KNOWN_PRODUCTS = ['turing', 'dumont', 'shio']
// A post about a source CMS involves its Dumont connector.
const SOURCE_TAGS = new Set(['aem', 'wordpress'])

/** Explicit `viglet_products` wins; otherwise Turing, plus Dumont for a source connector. */
function solutionsOf(data) {
  const explicit = (data.viglet_products ?? []).filter((p) => KNOWN_PRODUCTS.includes(p))
  if (explicit.length > 0) return [...new Set(explicit)]
  const tags = data.tags ?? []
  return tags.some((t) => SOURCE_TAGS.has(t)) ? ['turing', 'dumont'] : ['turing']
}

const posts = []
for (const file of readdirSync(SRC).filter((f) => f.endsWith('.md'))) {
  const { data } = matter(readFileSync(resolve(SRC, file), 'utf-8'))
  if (data.draft) continue
  const slug = file.replace(/\.md$/, '')
  if (data.slug && data.slug !== slug) throw new Error(`blog-index: ${file} declares slug "${data.slug}"`)
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? '')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`blog-index: ${file} has no YYYY-MM-DD date`)
  posts.push({
    slug,
    title: data.title,
    description: data.description ?? '',
    url: `/blog/${slug}/`,
    date,
    authors: data.authors ?? [],
    tags: data.tags ?? [],
    keywords: data.keywords ?? [],
    solutions: solutionsOf(data),
  })
}

// Newest first: stable, deterministic output.
posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))

const next = JSON.stringify({ posts }, null, 2) + '\n'
let current = ''
try { current = readFileSync(OUT, 'utf-8') } catch { /* no index yet */ }
if (next === current) {
  console.log(`blog-index: up to date (${posts.length} posts).`)
} else {
  writeFileSync(OUT, next, 'utf-8')
  console.log(`blog-index: wrote ${posts.length} posts to src/data/blog.generated.json`)
}
