import ContactPage from '@/views/ContactPage'
import JsonLd from '@/components/JsonLd'
import { staticPageJsonLd, staticPageMetadata } from '@/lib/seo'

export const metadata = staticPageMetadata('contact')

export default function Page() {
  return (
    <>
      <JsonLd data={staticPageJsonLd('contact')} />
      <ContactPage />
    </>
  )
}
