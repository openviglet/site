import PartnerPage from '@/views/PartnerPage'
import JsonLd from '@/components/JsonLd'
import { staticPageJsonLd, staticPageMetadata } from '@/lib/seo'

export const metadata = staticPageMetadata('partner')

export default function Page() {
  return (
    <>
      <JsonLd data={staticPageJsonLd('partner')} />
      <PartnerPage />
    </>
  )
}
