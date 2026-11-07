import Link from 'next/link'
import { IconRss } from '@tabler/icons-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/PageHero'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { blogTags, formatPostDate, usedTags, type BlogPostMeta } from '@/data/blog'

/**
 * /blog/ and /blog/tags/{tag}/ (W46). A server component: the list is static
 * data, so the page ships as HTML with no client code of its own.
 */
export default function BlogIndexPage({
  posts,
  heading,
  intro,
  activeTag,
}: Readonly<{ posts: BlogPostMeta[]; heading: string; intro: string; activeTag?: string }>) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main id="main-content" className="flex-1">
        <PageHero label="Blog" title={heading} description={intro}>
          <Button size="lg" variant="outline" asChild><a href="/blog/rss.xml"><IconRss size={16} /> RSS feed</a></Button>
        </PageHero>
        <div className="px-6 border-b border-border bg-muted">
          <nav aria-label="Tags" className="max-w-5xl mx-auto flex flex-wrap gap-2 py-6">
            <TagLink href="/blog/" label="All posts" active={!activeTag} />
            {usedTags().map((t) => (
              <TagLink key={t} href={`/blog/tags/${t}/`} label={blogTags[t].label} active={t === activeTag} />
            ))}
          </nav>
        </div>

        <section className="px-6 py-12 md:py-16" aria-label="Published articles">
        <div className="max-w-5xl mx-auto space-y-5">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={p.url}
              className="block bg-card border border-border rounded-2xl p-6 md:p-8 hover:-translate-y-0.5 hover:shadow-hover transition-all no-underline"
            >
              <time dateTime={p.date} className="text-sm text-muted-foreground">{formatPostDate(p.date)}</time>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mt-1 mb-2">{p.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {p.tags.map((t) => (
                  <Badge key={t} variant="secondary">{blogTags[t]?.label ?? t}</Badge>
                ))}
              </div>
            </Link>
          ))}
        </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function TagLink({ href, label, active }: Readonly<{ href: string; label: string; active: boolean }>) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`px-1 py-2 text-sm font-semibold no-underline border-b-2 transition-colors ${
        active
          ? 'text-foreground border-brand'
          : 'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
      }`}
    >
      {label}
    </Link>
  )
}
