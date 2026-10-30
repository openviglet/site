import DocsPage from '@/views/DocsPage'
import { staticPageMetadata } from '@/lib/seo'

export const metadata = staticPageMetadata('docs')

export default function Page() {
  return <DocsPage />
}
