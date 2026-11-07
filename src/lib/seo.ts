import type { Metadata } from 'next'
import type { Solution } from '@/data/solutions'
import type { FaqItem } from '@/data/narrative'
import { blogAuthors, blogDescription, blogTags, type BlogPostMeta } from '@/data/blog'
import { hubMessage } from '@/data/hub'

/** Absolute origin this site is served from (see CNAME). Used for canonicals. */
export const SITE_ORIGIN = 'https://www.viglet.org'

interface PageMeta {
  title: string
  description: string
  /** Absolute canonical URL; og:url follows it. */
  canonical: string
  /** The build-time card in /og/{ogId}.png (see scripts/og-images.mjs). */
  ogId?: string
  /** A fixed image in public/ (e.g. '/og-banner.png') used instead of a build-time card. */
  ogImage?: string
  /** og:/twitter: title and description, when they differ from the page's. */
  ogTitle?: string
  ogDescription?: string
  keywords?: string[]
  /** A blog post (W46): og:type article, with its date, authors and tags. */
  article?: { publishedTime: string; authors: string[]; tags: string[] }
}

/**
 * Title, description, canonical and the Open Graph / Twitter tags of one route
 * (W27). og:image must be an absolute URL for social crawlers. Next replaces a
 * nested `openGraph` object wholesale, so the site-wide `type` and `siteName`
 * are repeated here instead of living only in the root layout.
 */
export function pageMetadata(meta: PageMeta): Metadata {
  const ogTitle = meta.ogTitle ?? meta.title
  const ogDescription = meta.ogDescription ?? meta.description
  const imagePath = meta.ogImage ?? `/og/${meta.ogId}.png`
  const image = SITE_ORIGIN + imagePath
  const og = {
    siteName: 'Viglet',
    title: ogTitle,
    description: ogDescription,
    url: meta.canonical,
    images: [image],
  }
  return {
    title: { absolute: meta.title },
    description: meta.description,
    ...(meta.keywords?.length ? { keywords: meta.keywords } : {}),
    alternates: { canonical: meta.canonical },
    openGraph: meta.article ? { ...og, type: 'article', ...meta.article } : { ...og, type: 'website' },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
  }
}

export const homeMetadata = pageMetadata({
  title: 'Viglet · Open-source search, AI answers and content tools',
  description: hubMessage.description,
  canonical: `${SITE_ORIGIN}/`,
  ogId: 'home',
  ogTitle: hubMessage.title,
  ogDescription: hubMessage.description,
})

/** The routes with no data behind them; each self-canonicalises. */
export const staticPages = {
  compare: {
    path: '/compare/',
    title: 'Compare Viglet Dumont, Viglet Shio and Viglet Turing · Viglet',
    description: 'Viglet Dumont, Viglet Shio and Viglet Turing side by side: what each reads, delivers and runs on, and how they connect.',
  },
  partner: {
    path: '/partner/',
    title: 'Partner with Viglet · Viglet',
    description: 'Viglet works with integrators, consultancies and software vendors that build on Viglet Turing, Viglet Dumont and Viglet Shio. Tell us about your project.',
  },
  about: {
    path: '/about/',
    title: 'About · Viglet',
    description: 'Learn about Viglet, the open-source platform for enterprise intelligence.',
  },
  contact: {
    path: '/contact/',
    title: 'Contact · Viglet',
    description: 'Talk to the Viglet team about using Viglet Dumont, Viglet Shio or Viglet Turing in your organization.',
  },
  docs: {
    path: '/docs/',
    title: 'Documentation · Viglet',
    description: 'Get started with Viglet Turing, Viglet Dumont and Viglet Shio: the getting-started guide, installation guide, developer guide and REST API of each product.',
  },
  blog: {
    path: '/blog/',
    title: 'Blog · Viglet',
    description: blogDescription,
  },
} as const

export function staticPageMetadata(id: keyof typeof staticPages): Metadata {
  const page = staticPages[id]
  return pageMetadata({
    title: page.title,
    description: page.description,
    canonical: `${SITE_ORIGIN}${page.path}`,
    ogId: id,
  })
}

/**
 * The three pages every product has. Descriptions build on the product's own
 * one-liner from src/data/solutions.ts: boilerplate repeated across products is
 * the kind Google discards in favour of a snippet scraped off the page.
 */
export const productPages = {
  overview: {
    suffix: '/',
    title: (name: string) => `${name} · Viglet`,
    description: (name: string, d: string) => `${name}: ${d} Free and open source.`,
  },
  download: {
    suffix: '/download/',
    title: (name: string) => `Download ${name} · Viglet`,
    description: (name: string, d: string) => `Download and run the latest ${name} release with Docker. ${d}`,
  },
  releaseNotes: {
    suffix: '/release-notes/',
    title: (name: string) => `Release Notes · ${name} · Viglet`,
    description: (name: string, d: string) => `Changelog and release notes for ${name}. ${d}`,
  },
} as const

/**
 * The product landing canonicalises to the dedicated product site when one
 * exists (e.g. /turing/ → turing.viglet.org/), so search engines treat that site
 * as the primary version; every other product page self-canonicalises. The OG
 * card is always the product's own.
 */
export function productPageMetadata(solution: Solution, page: keyof typeof productPages): Metadata {
  const p = productPages[page]
  const path = `/${solution.identifier}${p.suffix}`
  return pageMetadata({
    title: p.title(solution.fullName),
    description: p.description(solution.fullName, solution.description),
    canonical: page === 'overview' && solution.site ? solution.site : `${SITE_ORIGIN}${path}`,
    ogId: solution.identifier,
  })
}

/** A blog post's metadata (W46); its OG card is /og/blog-{slug}.png. */
export function blogPostMetadata(post: BlogPostMeta): Metadata {
  return pageMetadata({
    title: `${post.title} · Viglet Blog`,
    description: post.description,
    canonical: `${SITE_ORIGIN}${post.url}`,
    ogId: `blog-${post.slug}`,
    ogTitle: post.title,
    keywords: post.keywords,
    article: {
      publishedTime: post.date,
      authors: post.authors.map((a) => blogAuthors[a]?.name ?? a),
      tags: post.tags.map((t) => blogTags[t]?.label ?? t),
    },
  })
}

/** A tag page (/blog/tags/{tag}/) shares the blog's OG card. */
export function blogTagMetadata(tag: string): Metadata {
  const label = blogTags[tag]?.label ?? tag
  return pageMetadata({
    title: `${label} · Viglet Blog`,
    description: blogTags[tag]?.description ?? `Viglet blog posts tagged ${label}.`,
    canonical: `${SITE_ORIGIN}/blog/tags/${tag}/`,
    ogId: 'blog',
  })
}

/* ------------------------------------------------------------------ */
/* JSON-LD: every route carries structured data (W49).                 */
/*                                                                     */
/* The root layout emits the site graph (Organization + WebSite) once; */
/* each page adds its own WebPage (or subtype) with a BreadcrumbList,  */
/* and product pages a SoftwareApplication. Nodes link by `@id`, so    */
/* the organization is described in one place.                         */
/* ------------------------------------------------------------------ */

type JsonLdNode = Record<string, unknown>

const ORG_ID = `${SITE_ORIGIN}/#organization`
const WEBSITE_ID = `${SITE_ORIGIN}/#website`
const APACHE_LICENSE = 'https://www.apache.org/licenses/LICENSE-2.0'

/** Serialises a node or graph; `<` is escaped so no text can close the inline <script>. */
export function serializeJsonLd(data: JsonLdNode): string {
  return JSON.stringify(data).replaceAll('<', String.raw`<`)
}

/** The publisher, inline (name + url) as well as by `@id`, for readers that do not merge scripts. */
const publisherRef = { '@type': 'Organization', '@id': ORG_ID, name: 'Viglet', url: SITE_ORIGIN }

/** Organization + WebSite, emitted on every page by the root layout. */
export function siteJsonLd(): string {
  return serializeJsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'Viglet',
        url: SITE_ORIGIN,
        logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/favicons/android-chrome-512x512.png`, width: 512, height: 512 },
        description: homeMetadata.description,
        foundingDate: '2017',
        sameAs: [
          'https://github.com/openviglet',
          'https://www.linkedin.com/company/viglet.com',
          'https://www.reddit.com/r/TuringES/',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: 'Viglet',
        url: `${SITE_ORIGIN}/`,
        inLanguage: 'en',
        publisher: { '@id': ORG_ID },
      },
    ],
  })
}

/** One product as a SoftwareApplication, shared by its overview, download and release-notes pages. */
export function softwareApplicationNode(solution: Solution): JsonLdNode {
  const base = `${SITE_ORIGIN}/${solution.identifier}/`
  return {
    '@type': 'SoftwareApplication',
    '@id': `${base}#software`,
    name: solution.fullName,
    description: solution.description,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: solution.category,
    operatingSystem: 'Docker',
    url: solution.site ?? base,
    image: `${SITE_ORIGIN}/og/${solution.identifier}.png`,
    downloadUrl: `${base}download/`,
    releaseNotes: `${base}release-notes/`,
    license: APACHE_LICENSE,
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@id': ORG_ID },
    sameAs: [solution.site, solution.github, solution.docs].filter(Boolean),
  }
}

export interface Crumb {
  name: string
  /** Site-relative path with its trailing slash, e.g. '/blog/'. */
  path: string
}

export type WebPageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'

interface PageJsonLd {
  path: string
  name: string
  description: string
  type?: WebPageType
  /** The trail after Home; empty for the home page itself. */
  crumbs: Crumb[]
  /** What the page is about, by node or `{ '@id' }` reference. */
  mainEntity?: JsonLdNode
  /** Nodes emitted alongside the page (e.g. the SoftwareApplication it references). */
  extra?: JsonLdNode[]
}

/** A route's WebPage (or subtype) and its BreadcrumbList. */
export function pageJsonLd(page: PageJsonLd): string {
  const url = `${SITE_ORIGIN}${page.path}`
  const trail = [{ name: 'Home', path: '/' }, ...page.crumbs]
  const hasTrail = page.crumbs.length > 0
  return serializeJsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': page.type ?? 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: page.name,
        description: page.description,
        inLanguage: 'en',
        isPartOf: { '@id': WEBSITE_ID },
        publisher: { '@id': ORG_ID },
        ...(hasTrail ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
        ...(page.mainEntity ? { mainEntity: page.mainEntity } : {}),
      },
      ...(hasTrail
        ? [
            {
              '@type': 'BreadcrumbList',
              '@id': `${url}#breadcrumb`,
              itemListElement: trail.map((c, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: c.name,
                item: `${SITE_ORIGIN}${c.path}`,
              })),
            },
          ]
        : []),
      ...(page.extra ?? []),
    ],
  })
}

/** The pages in `staticPages`: breadcrumb label and WebPage subtype. */
const staticPageJsonLdInfo: Record<keyof typeof staticPages, { crumb: string; type: WebPageType }> = {
  compare: { crumb: 'Compare', type: 'WebPage' },
  partner: { crumb: 'Partner', type: 'WebPage' },
  about: { crumb: 'About', type: 'AboutPage' },
  contact: { crumb: 'Contact', type: 'ContactPage' },
  docs: { crumb: 'Documentation', type: 'CollectionPage' },
  blog: { crumb: 'Blog', type: 'CollectionPage' },
}

export function staticPageJsonLd(
  id: keyof typeof staticPages,
  more: Pick<PageJsonLd, 'mainEntity' | 'extra'> = {},
): string {
  const page = staticPages[id]
  const info = staticPageJsonLdInfo[id]
  return pageJsonLd({
    path: page.path,
    name: page.title,
    description: page.description,
    type: info.type,
    crumbs: [{ name: info.crumb, path: page.path }],
    // the About page is about the organization the layout already describes
    ...(id === 'about' ? { mainEntity: { '@id': ORG_ID } } : {}),
    ...more,
  })
}

/** The product overview, download and release-notes pages. */
export function productPageJsonLd(solution: Solution, page: keyof typeof productPages): string {
  const p = productPages[page]
  const productCrumb = { name: solution.fullName, path: `/${solution.identifier}/` }
  const crumbs =
    page === 'overview'
      ? [productCrumb]
      : [productCrumb, { name: page === 'download' ? 'Download' : 'Release Notes', path: `/${solution.identifier}${p.suffix}` }]
  const software = softwareApplicationNode(solution)
  return pageJsonLd({
    path: `/${solution.identifier}${p.suffix}`,
    name: p.title(solution.fullName),
    description: p.description(solution.fullName, solution.description),
    crumbs,
    mainEntity: { '@id': software['@id'] },
    extra: [software],
  })
}

/** A short BlogPosting summary, for the lists on the blog index and tag pages. */
function blogPostingSummary(post: BlogPostMeta): JsonLdNode {
  return {
    '@type': 'BlogPosting',
    '@id': `${SITE_ORIGIN}${post.url}#article`,
    headline: post.title,
    url: `${SITE_ORIGIN}${post.url}`,
    datePublished: post.date,
  }
}

/** The blog index: a CollectionPage whose main entity is the Blog and its posts. */
export function blogIndexJsonLd(posts: readonly BlogPostMeta[], title: string): string {
  return staticPageJsonLd('blog', {
    mainEntity: {
      '@type': 'Blog',
      '@id': `${SITE_ORIGIN}/blog/#blog`,
      name: title,
      description: blogDescription,
      url: `${SITE_ORIGIN}/blog/`,
      publisher: publisherRef,
      blogPost: posts.map(blogPostingSummary),
    },
  })
}

/** A tag page: a CollectionPage listing the posts under the tag. */
export function blogTagJsonLd(tag: string, posts: readonly BlogPostMeta[]): string {
  const label = blogTags[tag]?.label ?? tag
  const path = `/blog/tags/${tag}/`
  return pageJsonLd({
    path,
    name: `${label} · Viglet Blog`,
    description: blogTags[tag]?.description ?? `Viglet blog posts tagged ${label}.`,
    type: 'CollectionPage',
    crumbs: [
      { name: 'Blog', path: '/blog/' },
      { name: label, path },
    ],
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, item: blogPostingSummary(p) })),
    },
  })
}

/** A post's WebPage and breadcrumb; the BlogPosting itself is `blogPostingJsonLd`. */
export function blogPostPageJsonLd(post: BlogPostMeta): string {
  return pageJsonLd({
    path: post.url,
    name: post.title,
    description: post.description,
    crumbs: [
      { name: 'Blog', path: '/blog/' },
      { name: post.title, path: post.url },
    ],
    mainEntity: { '@id': `${SITE_ORIGIN}${post.url}#article` },
  })
}

/** BlogPosting structured data for one post, escaped like `faqJsonLd`. */
export function blogPostingJsonLd(post: BlogPostMeta): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_ORIGIN}${post.url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${SITE_ORIGIN}${post.url}`,
    mainEntityOfPage: `${SITE_ORIGIN}${post.url}`,
    image: `${SITE_ORIGIN}/og/blog-${post.slug}.png`,
    keywords: post.keywords.join(', '),
    author: post.authors.map((a) => ({
      '@type': 'Person',
      name: blogAuthors[a]?.name ?? a,
      url: blogAuthors[a]?.url,
    })),
    publisher: publisherRef,
    isPartOf: { '@id': `${SITE_ORIGIN}/blog/#blog` },
  }).replaceAll('<', String.raw`\u003c`)
}

/** FAQPage structured data, built from the same Q&A the page renders. `<` is
 *  escaped so no answer text can close the inline <script> it goes into. */
export function faqJsonLd(items: readonly FaqItem[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }).replaceAll('<', String.raw`\u003c`)
}
