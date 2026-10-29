import { notFound } from 'next/navigation'
import BlogPostPage from '@/views/BlogPostPage'
import { blogPosts, getPost } from '@/data/blog'
import { renderPost } from '@/lib/blog'
import { blogPostingJsonLd, blogPostMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const post = getPost((await params).slug)
  return post ? blogPostMetadata(post) : {}
}

export default async function Page({ params }: Props) {
  const post = getPost((await params).slug)
  if (!post) notFound()
  const { html, readingMinutes } = await renderPost(post.slug)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: blogPostingJsonLd(post) }} />
      <BlogPostPage post={post} html={html} readingMinutes={readingMinutes} />
    </>
  )
}
