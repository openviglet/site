import HomePage from '@/views/HomePage'
import { faq } from '@/data/narrative'
import { solutions } from '@/data/solutions'
import JsonLd from '@/components/JsonLd'
import { faqJsonLd, homeMetadata, pageJsonLd, softwareApplicationNode } from '@/lib/seo'

export const metadata = homeMetadata

export default function Page() {
  return (
    <>
      {/* FAQPage structured data for the home FAQ section (W26), which renders
          the same Q&A visibly, so structured data matches on-page content. */}
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={pageJsonLd({
          path: '/',
          name: 'Viglet',
          description: String(homeMetadata.description),
          crumbs: [],
          extra: solutions.map(softwareApplicationNode),
        })}
      />
      <HomePage />
    </>
  )
}
