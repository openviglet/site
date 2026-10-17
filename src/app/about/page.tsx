import AboutPage from '@/views/AboutPage'
import { staticPageMetadata } from '@/lib/seo'

export const metadata = staticPageMetadata('about')

export default function Page() {
  return <AboutPage />
}
