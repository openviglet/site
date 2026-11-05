import DocsPage from '@/views/DocsPage'
import JsonLd from '@/components/JsonLd'
import { staticPageJsonLd, staticPageMetadata } from '@/lib/seo'

export const metadata = staticPageMetadata('docs')

export default function Page() {
  return (
    <>
      <JsonLd data={staticPageJsonLd('docs')} />
      <DocsPage />
    </>
  )
}
