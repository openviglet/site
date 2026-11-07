import Link from 'next/link'
import { IconArrowLeft } from '@tabler/icons-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Badge } from '@/components/ui/badge'
import { blogAuthors, blogTags, formatPostDate, type BlogPostMeta } from '@/data/blog'
import { evaluationPaths, productPaths } from '@/data/hub'

/**
 * One blog post (W46). `html` is rendered at build time by src/lib/blog.ts
 * from the post's own Markdown, never from visitor input; `.blog-prose` in
 * index.css styles it.
 */
export default function BlogPostPage({
  post,
  html,
  readingMinutes,
}: Readonly<{ post: BlogPostMeta; html: string; readingMinutes: number }>) {
  const context = evaluationPaths.find((path) => post.tags.includes(path.id))
  const nextSteps = context
    ? [{ label: context.id === 'wordpress' ? context.guideLabel : context.action, href: context.id === 'wordpress' ? context.guide : context.href, action: context.id === 'aem' ? 'demo_open' : 'product_open', product: 'turing' }]
    : productPaths.filter((path) => post.solutions.includes(path.product)).map((path) => ({ label: path.action, href: path.href, action: path.product === 'turing' ? 'demo_open' : 'product_open', product: path.product }))
  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        <article className="max-w-3xl mx-auto py-14 px-6">
          <Link href="/blog/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand no-underline mb-8">
            <IconArrowLeft size={16} />
            All posts
          </Link>

          <header className="mb-10">
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-5">
              {post.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {readingMinutes} min read
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              {post.authors.map((id) => {
                const a = blogAuthors[id]
                if (!a) return null
                return (
                  <a key={id} href={a.url} target="_blank" rel="noopener" className="flex items-center gap-3 no-underline">
                    <img src={a.imageUrl} alt="" width={40} height={40} className="w-10 h-10 rounded-full border border-border" />
                    <span>
                      <span className="block text-sm font-bold text-foreground">{a.name}</span>
                      <span className="block text-xs text-muted-foreground">{a.title}</span>
                    </span>
                  </a>
                )
              })}
            </div>
          </header>

          <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />

          <aside className="mt-10 rounded-2xl border border-border bg-muted p-6" aria-label="Next steps">
            <h2 className="text-xl font-bold text-foreground">Put it to work</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-4">
              {nextSteps.map((step) => <a key={step.href} href={step.href} data-viglet-action={step.action} data-viglet-product={step.product} data-viglet-journey={context?.id ?? 'general'} data-viglet-placement="blog" className="text-brand font-semibold underline underline-offset-4">{step.label}</a>)}
              <Link href="/contact/" data-viglet-action="contact_intent" data-viglet-journey={context?.id ?? 'general'} data-viglet-placement="blog" className="text-brand font-semibold underline underline-offset-4">Discuss your deployment</Link>
            </div>
          </aside>

          <footer className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
            {post.tags.map((t) => (
              <Link key={t} href={`/blog/tags/${t}/`} className="no-underline">
                <Badge variant="secondary">{blogTags[t]?.label ?? t}</Badge>
              </Link>
            ))}
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  )
}
