import ProductComparePage from '@/views/ProductComparePage'
import JsonLd from '@/components/JsonLd'
import { staticPageJsonLd, staticPageMetadata } from '@/lib/seo'

export const metadata = staticPageMetadata('compare')

export default function Page() {
  return (
    <>
      <JsonLd data={staticPageJsonLd('compare')} />
      <ProductComparePage />
    </>
  )
}
