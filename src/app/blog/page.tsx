import BlogIndexPage from '@/views/BlogIndexPage'
import { blogDescription, blogPosts, blogTitle } from '@/data/blog'
import { staticPageMetadata } from '@/lib/seo'

export const metadata = staticPageMetadata('blog')

export default function Page() {
  return <BlogIndexPage posts={blogPosts} heading={blogTitle} intro={blogDescription} />
}
