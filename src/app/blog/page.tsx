import BlogIndexPage from '@/views/BlogIndexPage'
import { blogDescription, blogPosts, blogTitle } from '@/data/blog'
import JsonLd from '@/components/JsonLd'
import { blogIndexJsonLd, staticPageMetadata } from '@/lib/seo'

export const metadata = staticPageMetadata('blog')

export default function Page() {
  return (
    <>
      <JsonLd data={blogIndexJsonLd(blogPosts, blogTitle)} />
      <BlogIndexPage posts={blogPosts} heading={blogTitle} intro={blogDescription} />
    </>
  )
}
