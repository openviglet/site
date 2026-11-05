import AboutPage from '@/views/AboutPage'
import JsonLd from '@/components/JsonLd'
import { staticPageJsonLd, staticPageMetadata } from '@/lib/seo'

export const metadata = staticPageMetadata('about')

export default function Page() {
  return (
    <>
      <JsonLd data={staticPageJsonLd('about')} />
      <AboutPage />
    </>
  )
}
