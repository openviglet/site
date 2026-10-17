import HomePage from '@/views/HomePage'
import { faq } from '@/data/narrative'
import { faqJsonLd, homeMetadata } from '@/lib/seo'

export const metadata = homeMetadata

export default function Page() {
  return (
    <>
      {/* FAQPage structured data for the home FAQ section (W26), which renders
          the same Q&A visibly, so structured data matches on-page content. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faq) }} />
      <HomePage />
    </>
  )
}
