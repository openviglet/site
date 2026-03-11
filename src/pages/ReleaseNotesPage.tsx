import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  IconDownload,
  IconArrowRight,
  IconBrandGithub,
  IconCalendar,
  IconTag,
  IconExternalLink,
} from '@tabler/icons-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SolutionMenu from '@/components/SolutionMenu'
import { getSolution } from '@/data/solutions'
import VigletLogo from '@/components/VigletLogo'
import ProductBadge from '@/components/ProductBadge'
import ProductButton from '@/components/ProductButton'
import { Badge } from '@/components/ui/badge'

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

function ChangeItem({ text, githubOrg }: Readonly<{ text: string; githubOrg?: string }>) {
  const entry = parseChange(text)
  if (!entry) return null

  const parts = entry.description.split(/(#\d+)/g)
  const descNode = parts.map((part, i) => {
    const issue = part.match(/^#(\d+)$/)
    if (issue) {
      const org = githubOrg || 'openviglet'
      return (
        <a
          key={i}
          href={`https://github.com/${org}/viglet/issues/${issue[1]}`}
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
    <li className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
      {entry.type ? (
        <Badge variant={entry.type} className="mt-0.5 shrink-0 uppercase font-bold tracking-wider">
          {entry.type}
        </Badge>
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
      )}
      <span className="flex-1">{descNode}</span>
    </li>
  )
}

export default function ReleaseNotesPage() {
  const { identifier = '' } = useParams<{ identifier: string }>()
  const solution = getSolution(identifier)
  const [releases, setReleases] = useState<Release[]>([])
  const [status, setStatus] = useState<'loading' | 'error' | 'done'>('loading')

  useEffect(() => {
    if (!solution) return
    setStatus('loading')
    fetch(`/static_files/json/${identifier}/changelog.json`)
      .then((r) => r.json())
      .then((data: Release[]) => { setReleases(data); setStatus('done') })
      .catch(() => setStatus('error'))
  }, [identifier, solution])

  if (!solution) return <Navigate to="/" replace />

  const totalReleases = releases.length
  const latestDate = releases[0]?.pub_date ? formatDate(releases[0].pub_date) : null

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <SolutionMenu solution={solution} />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden py-20 px-6 border-b border-slate-100">
        <div className={`absolute inset-0 product-hero-${identifier} opacity-[0.03]`} />
        <div className={`absolute top-[-120px] right-[-120px] w-[700px] h-[700px] rounded-full pointer-events-none product-blob-${identifier}`} />
        <div className={`absolute bottom-[-200px] left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none product-blob-${identifier} opacity-50`} />

        <div className="max-w-5xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

            <div className="shrink-0">
              <VigletLogo identifier={identifier} size={180} glow />
            </div>

            <div className="flex-1 min-w-0 text-center md:text-left">
              <ProductBadge identifier={identifier} className="mb-4">Changelog</ProductBadge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                {solution.shortName} Release Notes
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl">
                Track every improvement, fix, and new capability across all releases.
              </p>

              <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
                {solution.release && (
                  <ProductButton identifier={identifier} size="lg" asChild>
                    <Link to={`${solution.permalink}download/`}>
                      <IconDownload size={18} />
                      Download {solution.release}
                    </Link>
                  </ProductButton>
                )}
                {solution.github && (
                  <ProductButton identifier={identifier} productVariant="ghost" size="lg" asChild>
                    <a href={`${solution.github}/releases`} target="_blank" rel="noopener">
                      <IconBrandGithub size={18} />
                      GitHub Releases
                    </a>
                  </ProductButton>
                )}
              </div>

              {/* Info bar */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm text-slate-400 justify-center md:justify-start">
                {solution.release && (
                  <span className="flex items-center gap-1.5">
                    <IconTag size={14} />
                    Latest: v{solution.release}
                  </span>
                )}
                {latestDate && (
                  <span className="flex items-center gap-1.5">
                    <IconCalendar size={14} />
                    {latestDate}
                  </span>
                )}
                {totalReleases > 0 && (
                  <span className="flex items-center gap-1.5">
                    <IconTag size={14} />
                    {totalReleases} release{totalReleases !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      {status === 'done' && releases.length > 0 && (() => {
        let totalNew = 0, totalFixed = 0, totalImproved = 0
        for (const r of releases) {
          for (const n of r.notes) {
            const e = parseChange(n)
            if (!e) continue
            if (e.type === 'new' || e.type === 'added') totalNew++
            else if (e.type === 'fixed') totalFixed++
            else if (e.type === 'improved') totalImproved++
          }
        }
        return (
          <section className="py-10 px-6 bg-white border-b border-slate-100">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                <div className="text-center">
                  <p className={`text-3xl font-extrabold product-text-${identifier}`}>{totalReleases}</p>
                  <p className="text-sm text-slate-500 mt-1">Releases</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">{totalNew}</p>
                  <p className="text-sm text-slate-500 mt-1">New Features</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-blue-600">{totalImproved}</p>
                  <p className="text-sm text-slate-500 mt-1">Improvements</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-amber-600">{totalFixed}</p>
                  <p className="text-sm text-slate-500 mt-1">Bug Fixes</p>
                </div>
              </div>
            </div>
          </section>
        )
      })()}

      {/* ===== CHANGELOG ===== */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          {status === 'loading' && (
            <div className="flex flex-col items-center py-20">
              <div className={`w-10 h-10 rounded-full border-4 border-slate-200 border-t-current product-text-${identifier} animate-spin mb-4`} />
              <p className="text-slate-400">Loading release notes…</p>
            </div>
          )}
          {status === 'error' && (
            <div className="text-center py-20">
              <p className="text-slate-400 mb-4">
                An error occurred while fetching release notes.
              </p>
              {solution.github && (
                <ProductButton identifier={identifier} size="sm" asChild>
                  <a href={`${solution.github}/releases`} target="_blank" rel="noopener">
                    <IconBrandGithub size={14} />
                    View on GitHub
                  </a>
                </ProductButton>
              )}
            </div>
          )}
          {status === 'done' && (
            <div className="relative pl-2">
              <span className={`absolute left-[43px] top-0 bottom-0 w-0.5 product-bg-${identifier} vg-timeline-line z-0`} />
              <div>
                {releases.map((release, idx) => {
                  const validNotes = release.notes.filter(
                    (n) => n.trim() && !/^\s*\[pretext\]\s/i.test(n),
                  )
                  const isLatest = idx === 0
                  return (
                    <div key={release.version} className="mb-12 last:mb-0">
                      {/* version + date row */}
                      <div className="relative z-10 flex flex-wrap items-center gap-3 mb-5">
                        <ProductBadge identifier={identifier} className="shrink-0 min-w-[70px] justify-center">
                          {release.version}
                        </ProductBadge>
                        {isLatest && (
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            Latest
                          </span>
                        )}
                        {release.pub_date && (
                          <span className="flex items-center gap-1 text-sm text-slate-400">
                            <IconCalendar size={13} />
                            {formatDate(release.pub_date)}
                          </span>
                        )}
                        {solution.github && (
                          <a
                            href={`${solution.github}/releases/tag/v${release.version}`}
                            target="_blank"
                            rel="noopener"
                            className="text-slate-400 hover:text-slate-600 transition-colors no-underline ml-auto"
                            title="View on GitHub"
                          >
                            <IconExternalLink size={14} />
                          </a>
                        )}
                      </div>
                      {/* items */}
                      <ul className="relative z-10 pl-14 space-y-2.5 pb-2">
                        {validNotes.map((note) => (
                          <ChangeItem key={note} text={note} githubOrg={solution.githubOrg} />
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className={`relative overflow-hidden product-hero-${identifier}`}>
        <div className="absolute inset-0 download-hero-highlight" />
        <div className="max-w-4xl mx-auto py-16 px-6 text-center relative">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Try the latest version
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
            {solution.shortName} v{solution.release} is available now. Download and get started in minutes.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {solution.release && (
              <Link
                to={`${solution.permalink}download/`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors text-sm no-underline"
              >
                <IconDownload size={16} />
                Download {solution.shortName}
              </Link>
            )}
            {solution.getStarted && (
              <a
                href={solution.getStarted}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-sm no-underline"
              >
                Documentation
                <IconArrowRight size={16} />
              </a>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
