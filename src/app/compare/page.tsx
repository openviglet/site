import ProductComparePage from '@/views/ProductComparePage'
import { staticPageMetadata } from '@/lib/seo'

export const metadata = staticPageMetadata('compare')

export default function Page() {
  return <ProductComparePage />
}
