import ContactPage from '@/views/ContactPage'
import { staticPageMetadata } from '@/lib/seo'

export const metadata = staticPageMetadata('contact')

export default function Page() {
  return <ContactPage />
}
