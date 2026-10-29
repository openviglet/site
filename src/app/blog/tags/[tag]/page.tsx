import { notFound } from 'next/navigation'
import BlogIndexPage from '@/views/BlogIndexPage'
import { blogTags, getPostsByTag, usedTags } from '@/data/blog'
import { blogTagMetadata } from '@/lib/seo'

type Props = { params: Promise<{ tag: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return usedTags().map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: Props) {
  return blogTagMetadata((await params).tag)
}

export default async function Page({ params }: Props) {
  const { tag } = await params
  const info = blogTags[tag]
  if (!info) notFound()
  return <BlogIndexPage posts={getPostsByTag(tag)} heading={info.label} intro={info.description} activeTag={tag} />
}
