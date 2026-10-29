import { blogDescription, blogPosts, blogTitle } from '@/data/blog'
import { SITE_ORIGIN } from '@/lib/seo'

export const dynamic = 'force-static'

const escapeXml = (s: string) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

/** The blog's RSS 2.0 feed (W46), at the address docs.viglet.org/blog/rss.xml used. */
export function GET() {
  const items = blogPosts
    .map((p) => {
      const url = `${SITE_ORIGIN}${p.url}`
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(p.description)}</description>
    </item>`
    })
    .join('\n')
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(blogTitle)}</title>
    <link>${SITE_ORIGIN}/blog/</link>
    <description>${escapeXml(blogDescription)}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
