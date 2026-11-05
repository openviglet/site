import { notFound } from 'next/navigation'
import ComparePage from '@/views/ComparePage'
import { comparisons, getComparison } from '@/data/comparisons'
import JsonLd from '@/components/JsonLd'
import { faqJsonLd, pageJsonLd, pageMetadata, SITE_ORIGIN, staticPages } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props) {
  const comparison = getComparison((await params).slug)
  if (!comparison) return {}
  return pageMetadata({
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    canonical: `${SITE_ORIGIN}/compare/${comparison.slug}/`,
    ogId: `compare-${comparison.slug}`,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const comparison = getComparison(slug)
  if (!comparison) notFound()
  return (
    <>
      {/* FAQPage structured data for the visible FAQ below. It helps search
          engines and LLM assistants answer the queries these pages target (GEO). */}
      {comparison.faq.length > 0 && (
        <JsonLd data={faqJsonLd(comparison.faq)} />
      )}
      <JsonLd
        data={pageJsonLd({
          path: `/compare/${comparison.slug}/`,
          name: comparison.metaTitle,
          description: comparison.metaDescription,
          crumbs: [
            { name: 'Compare', path: staticPages.compare.path },
            { name: comparison.metaTitle, path: `/compare/${comparison.slug}/` },
          ],
        })}
      />
      <ComparePage slug={slug} />
    </>
  )
}
