import Link from 'next/link'
import { IconRss } from '@tabler/icons-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
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
    <div className="min-h-screen bg-muted flex flex-col">
      <Header />

      <section className="bg-background border-b border-border py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Badge variant="brand" className="mb-4">Blog</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">{heading}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{intro}</p>
          <nav aria-label="Tags" className="flex flex-wrap gap-2 mt-8">
            <TagLink href="/blog/" label="All posts" active={!activeTag} />
            {usedTags().map((t) => (
              <TagLink key={t} href={`/blog/tags/${t}/`} label={blogTags[t].label} active={t === activeTag} />
            ))}
          </nav>
        </div>
      </section>

      <main className="flex-1 py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-5">
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
          <p className="text-center pt-4">
            <a href="/blog/rss.xml" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand no-underline">
              <IconRss size={16} />
              RSS feed
            </a>
          </p>
        </div>
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
      className={`px-3 py-1 rounded-full text-sm font-semibold no-underline border transition-colors ${
        active
          ? 'bg-brand text-white border-brand'
          : 'bg-background text-muted-foreground border-border hover:text-foreground hover:border-brand-border'
      }`}
    >
      {label}
    </Link>
  )
}
