import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeShiki from '@shikijs/rehype'
import rehypeStringify from 'rehype-stringify'
import type { Element, Root } from 'hast'

/**
 * Renders a blog post's Markdown (content/blog/{slug}.md) to HTML at build time
 * (W46): GitHub-flavoured Markdown, heading anchors, and code highlighted by
 * Shiki in both colour modes, so the page ships as static HTML with no client
 * Markdown or highlighter bundle. Raw HTML in a post is dropped, so a post can't
 * inject markup. The post list and frontmatter come from src/data/blog.ts.
 */

const CONTENT_DIR = resolve(process.cwd(), 'content/blog')

/** Links that leave the site open in a new tab, as everywhere else on it. */
function rehypeExternalLinks() {
  const walk = (node: Root | Element) => {
    for (const child of node.children) {
      if (child.type !== 'element') continue
      const href = child.tagName === 'a' ? String(child.properties.href ?? '') : ''
      if (/^https?:\/\//.test(href) && !href.startsWith('https://www.viglet.org/')) {
        child.properties.target = '_blank'
        child.properties.rel = ['noopener']
      }
      walk(child)
    }
  }
  return (tree: Root) => walk(tree)
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeExternalLinks)
  .use(rehypeShiki, {
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: 'light',
    fallbackLanguage: 'text',
  })
  .use(rehypeStringify)

export interface RenderedPost {
  html: string
  /** Whole minutes at 230 words a minute, never under one. */
  readingMinutes: number
}

export async function renderPost(slug: string): Promise<RenderedPost> {
  const source = await readFile(resolve(CONTENT_DIR, `${slug}.md`), 'utf-8')
  const { content } = matter(source)
  const html = String(await processor.process(content))
  const words = content.split(/\s+/).filter(Boolean).length
  return { html, readingMinutes: Math.max(1, Math.round(words / 230)) }
}
