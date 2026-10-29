import generated from './blog.generated.json'

/**
 * The Viglet blog (W46): integration how-tos and comparisons, moved here from
 * docs.viglet.org/blog. Posts are Markdown in content/blog/; their frontmatter
 * is indexed into blog.generated.json by scripts/blog-index.mjs, and the body
 * is rendered at build time by src/lib/blog.ts. Everything that lists posts
 * (/blog/, tag pages, the per-product "Guides" section, the comparison pages,
 * site search, llms.txt, the sitemap) reads this module.
 */

export interface BlogPostMeta {
  /** URL segment under /blog/, and the file name in content/blog/. */
  slug: string
  title: string
  /** One-line summary, also the meta description. */
  description: string
  /** Site-relative URL, with its trailing slash. */
  url: string
  /** ISO date (YYYY-MM-DD). */
  date: string
  /** Keys of `blogAuthors`. */
  authors: string[]
  /** Keys of `blogTags`. */
  tags: string[]
  keywords: string[]
  /** Product identifiers this post is relevant to (drives W15 placement). */
  solutions: string[]
}

export interface BlogAuthor {
  name: string
  title: string
  url: string
  imageUrl: string
}

export interface BlogTag {
  label: string
  description: string
}

export const blogTitle = 'Viglet Blog: Enterprise Search & AI'
export const blogDescription =
  'Guides and comparisons on enterprise search for Adobe AEM and WordPress, semantic search, RAG, and AI agents with Viglet Turing.'

export const blogAuthors: Record<string, BlogAuthor> = {
  alexandre: {
    name: 'Alexandre Oliveira',
    title: 'Creator & Lead Developer, Viglet Turing',
    url: 'https://github.com/alegauss',
    imageUrl: 'https://github.com/alegauss.png',
  },
  viglet: {
    name: 'Viglet Team',
    title: 'Open Source Enterprise Search',
    url: 'https://www.viglet.org',
    imageUrl: 'https://github.com/openviglet.png',
  },
}

/** Tag pages live at /blog/tags/{key}/, the addresses docs.viglet.org used. */
export const blogTags: Record<string, BlogTag> = {
  aem: { label: 'Adobe AEM', description: 'Enterprise search and indexing for Adobe Experience Manager.' },
  wordpress: { label: 'WordPress', description: 'Adding enterprise search to WordPress sites.' },
  'enterprise-search': { label: 'Enterprise Search', description: 'Faceted, semantic, and AI-powered enterprise search.' },
  'semantic-search': { label: 'Semantic Search', description: 'Vector and semantic search with embeddings.' },
  comparison: { label: 'Comparison', description: 'How Viglet Turing compares to other search platforms.' },
  rag: { label: 'RAG', description: 'Retrieval-Augmented Generation over enterprise content.' },
  'open-source': { label: 'Open Source', description: 'Apache 2.0 open-source software.' },
  'vector-search': { label: 'Vector Search', description: 'Embedding-based vector and kNN search.' },
  mcp: { label: 'MCP', description: 'Model Context Protocol tools and agents over enterprise content.' },
  cms: { label: 'CMS', description: 'Content management with Viglet Shio, for people and AI agents.' },
  'data-integration': { label: 'Data Integration', description: 'Connecting content sources to a search index with Viglet Dumont.' },
}

/** Every published post, newest first. */
export const blogPosts: BlogPostMeta[] = generated.posts

export function getPost(slug: string): BlogPostMeta | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  return blogPosts.filter((p) => p.tags.includes(tag))
}

/** Tags at least one post uses, in `blogTags` order. */
export function usedTags(): string[] {
  return Object.keys(blogTags).filter((t) => blogPosts.some((p) => p.tags.includes(t)))
}

/** Posts relevant to a product identifier (W15, per-product cross-links). */
export function getPostsBySolution(identifier: string): BlogPostMeta[] {
  return blogPosts.filter((p) => p.solutions.includes(identifier))
}

/** Resolve an ordered list of slugs to posts, skipping any that no longer exist. */
export function getPostsBySlugs(slugs: string[]): BlogPostMeta[] {
  return slugs.map((s) => getPost(s)).filter((p): p is BlogPostMeta => Boolean(p))
}

/** "June 14, 2026", fixed to UTC so the build and the browser agree. */
export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
