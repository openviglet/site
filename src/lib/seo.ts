import type { Metadata } from 'next'
import type { Solution } from '@/data/solutions'
import type { FaqItem } from '@/data/narrative'

/** Absolute origin this site is served from (see CNAME). Used for canonicals. */
export const SITE_ORIGIN = 'https://www.viglet.org'

interface PageMeta {
  title: string
  description: string
  /** Absolute canonical URL; og:url follows it. */
  canonical: string
  /** The build-time card in /og/{ogId}.png (see scripts/og-images.mjs). */
  ogId: string
  /** og:/twitter: title and description, when they differ from the page's. */
  ogTitle?: string
  ogDescription?: string
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
  const image = `${SITE_ORIGIN}/og/${meta.ogId}.png`
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: meta.canonical },
    openGraph: {
      type: 'website',
      siteName: 'Viglet',
      title: ogTitle,
      description: ogDescription,
      url: meta.canonical,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
  }
}

export const homeMetadata = pageMetadata({
  title: 'Viglet',
  description: 'Open source enterprise search, data exchange and content management, self-hosted with Docker.',
  canonical: `${SITE_ORIGIN}/`,
  ogId: 'home',
  ogTitle: 'Viglet · Open Source Tools for Enterprise Intelligence',
  ogDescription: 'Enterprise search, data exchange and content management. Open source, self-hosted with Docker.',
})

/** The routes with no data behind them; each self-canonicalises. */
export const staticPages = {
  compare: {
    path: '/compare/',
    title: 'Compare Dumont, Shio and Turing · Viglet',
    description: 'Viglet Dumont, Shio and Turing side by side: what each reads, delivers and runs on, and how they connect.',
  },
  partner: {
    path: '/partner/',
    title: 'Partner with Viglet · Viglet',
    description: 'Viglet works with integrators, consultancies and software vendors that build on Turing, Dumont and Shio. Tell us about your project.',
  },
  about: {
    path: '/about/',
    title: 'About · Viglet',
    description: 'Learn about Viglet, the open-source platform for enterprise intelligence.',
  },
  contact: {
    path: '/contact/',
    title: 'Contact · Viglet',
    description: 'Talk to the Viglet team about using Dumont, Shio or Turing in your organization.',
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
 * exists (e.g. /turing/ → openviglet.github.io/turing/), so search engines treat that site
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
  }).replaceAll('<', String.raw`<`)
}
