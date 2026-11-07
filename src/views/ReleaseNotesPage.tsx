'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SolutionMenu from '@/components/SolutionMenu'
import ProductPageHero from '@/components/ProductPageHero'
import { getSolution } from '@/data/solutions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { fullProductNames } from '@/lib/product-names'

type ChangeType = 'new' | 'added' | 'improved' | 'fixed' | 'removed'

interface ChangeEntry {
  type: ChangeType | null
  description: string
  issueNumbers: string[]
}

interface Release {
  version: string
  pub_date: string | null
  notes: string[]
}

function parseChange(text: string): ChangeEntry | null {
  const trimmed = text.trim()
  if (!trimmed) return null
  const match = trimmed.match(/^\[(new|added|improved|fixed|removed)\]\s+(.*)/i)
  if (match) {
    const description = match[2]
    const issueNumbers = [...description.matchAll(/#(\d+)/g)].map((m) => m[1])
    return { type: match[1].toLowerCase() as ChangeType, description, issueNumbers }
  }
  if (!/^\s*\[pretext\]\s/i.test(trimmed)) {
    return { type: null, description: trimmed, issueNumbers: [] }
  }
  return null
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  try {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateStr))
  } catch {
    return dateStr
  }
}

function ChangeItem({ text, repository }: Readonly<{ text: string; repository?: string }>) {
  const entry = parseChange(text)
  if (!entry) return null

  const parts = fullProductNames(entry.description).split(/(#\d+)/g)
  const descNode = parts.map((part, i) => {
    const issue = part.match(/^#(\d+)$/)
    if (issue && repository) {
      return (
        <a
          key={i}
          href={`${repository}/issues/${issue[1]}`}
          target="_blank"
          rel="noopener"
          className="text-brand hover:underline"
        >
          {part}
        </a>
      )
    }
    return <span key={i}>{part}</span>
  })

  return (
    <li className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed">
      {entry.type ? (
        <Badge variant="outline" className="mt-0.5 shrink-0 uppercase font-bold tracking-wider">
          {entry.type}
        </Badge>
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
      )}
      <span className="flex-1 min-w-0 break-words">{descNode}</span>
    </li>
  )
}

function releaseId(version: string): string {
  return `release-${version.replace(/[^a-zA-Z0-9_.-]/g, '-')}`
}

function readReleases(value: unknown): Release[] {
  if (!Array.isArray(value)) throw new Error('Invalid release feed')
  const ids = new Set<string>()
  for (const release of value) {
    if (!release || typeof release.version !== 'string' || !release.version.trim() ||
      (release.pub_date !== null && typeof release.pub_date !== 'string') ||
      !Array.isArray(release.notes) || !release.notes.every((note: unknown) => typeof note === 'string')) {
      throw new Error('Invalid release entry')
    }
    const id = releaseId(release.version)
    if (ids.has(id)) throw new Error('Duplicate release anchor')
    ids.add(id)
  }
  return value as Release[]
}

export default function ReleaseNotesPage({ identifier }: Readonly<{ identifier: string }>) {
  const solution = getSolution(identifier)
  const [releases, setReleases] = useState<Release[]>([])
  const [status, setStatus] = useState<'loading' | 'error' | 'done'>('loading')

  useEffect(() => {
    if (!solution) return
    let active = true
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), 10000)
    setStatus('loading')
    setReleases([])
    fetch(solution.changelogUrl ?? `/static_files/json/${identifier}/changelog.json`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error('Feed unavailable'); return response.json() })
      .then(readReleases)
      .then((data) => { if (active) { setReleases(data); setStatus('done') } })
      .catch(() => { if (active) setStatus('error') })
      .finally(() => window.clearTimeout(timer))
    return () => { active = false; controller.abort(); window.clearTimeout(timer) }
  }, [identifier, solution])

  useEffect(() => {
    if (status !== 'done' || !window.location.hash) return
    try { document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView() } catch { /* malformed fragments do not block reading */ }
  }, [status, releases])

  if (!solution) return null
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <SolutionMenu solution={solution} />
      <main id="main-content" className="flex-1">
        <ProductPageHero solution={solution} label="Release history" title={`${solution.fullName} release notes`} description="Changes published in the product changelog. Use official releases for downloadable artifacts and current availability.">
          <Button size="lg" asChild><Link href={`${solution.permalink}download/`}>Install {solution.fullName}</Link></Button>
          {solution.github && <Button size="lg" variant="outline" asChild><a href={`${solution.github}/releases/`}>Official releases</a></Button>}
        </ProductPageHero>
        <section className="max-w-5xl mx-auto px-6 py-10" aria-label="Release history" aria-busy={status === 'loading'}>
          {status === 'loading' && <p role="status" className="text-muted-foreground">Loading release notes...</p>}
          {status === 'error' && <div role="status" className="rounded-xl border border-border bg-muted p-6"><h2 className="text-xl font-bold text-foreground">Release history is unavailable</h2><p className="mt-3 text-muted-foreground">The changelog could not be loaded. You can still <a href={`${solution.github}/releases/`} className="text-brand underline underline-offset-4">read official releases on GitHub</a>.</p></div>}
          {status === 'done' && releases.length === 0 && <p role="status" className="text-muted-foreground">No entries are published in this changelog yet. Check <a href={`${solution.github}/releases/`} className="text-brand underline underline-offset-4">official releases</a> for availability.</p>}
          {status === 'done' && releases.length > 0 && <div className="space-y-6">
            <p className="text-sm text-muted-foreground">{releases.length} entries in the published changelog</p>
            {releases.map((release) => (
              <article key={release.version} id={releaseId(release.version)} className="rounded-2xl border border-border bg-card p-5 md:p-7 scroll-mt-36">
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-5">
                  <h2 className="text-2xl font-bold text-foreground"><a href={`#${releaseId(release.version)}`} className="hover:underline underline-offset-4">{release.version}</a></h2>
                  {release.pub_date && <time dateTime={release.pub_date} className="text-sm text-muted-foreground">{formatDate(release.pub_date)}</time>}
                </div>
                <ul className="space-y-3">{release.notes.map((note, i) => <ChangeItem key={`${i}-${note}`} text={note} repository={solution.github} />)}</ul>
              </article>
            ))}
          </div>}
        </section>
      </main>
      <Footer />
    </div>
  )
}
