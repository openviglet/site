import { useParams, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SolutionMenu from '@/components/SolutionMenu'
import { getSolution } from '@/data/solutions'
import VigletLogo from '@/components/VigletLogo'
import ProductBadge from '@/components/ProductBadge'

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

const badgeVariantMap: Record<ChangeType, 'new' | 'added' | 'improved' | 'fixed' | 'removed'> = {
  new: 'new',
  added: 'added',
  improved: 'improved',
  fixed: 'fixed',
  removed: 'removed',
}

function ChangeItem({ text }: { text: string }) {
  const entry = parseChange(text)
  if (!entry) return null

  const parts = entry.description.split(/(#\d+)/g)
  const descNode = parts.map((part, i) => {
    const issue = part.match(/^#(\d+)$/)
    if (issue) {
      return (
        <a
          key={i}
          href={`https://github.com/openviglet/viglet/issues/${issue[1]}`}
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
        <Badge variant={badgeVariantMap[entry.type]} className="mt-0.5 shrink-0">
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



  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <SolutionMenu solution={solution} />

      {/* ===== HERO ===== */}
      <section className="relative bg-white border-b border-slate-100 overflow-hidden py-16 px-6">
        <div className={`absolute top-[-80px] right-[-80px] w-[560px] h-[560px] rounded-full pointer-events-none product-blob-${identifier}`} />
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">

            <div className="shrink-0">
              <VigletLogo identifier={identifier} size={160} glow />
            </div>

            <div className="flex-1 min-w-0">
              <ProductBadge identifier={identifier} className="mb-4">Changelog</ProductBadge>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                {solution.shortName} Release Notes
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
                Track every improvement, fix, and new capability across all releases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CHANGELOG ===== */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          {status === 'loading' && (
            <p className="text-center text-slate-400 py-16">Loading release notes…</p>
          )}
          {status === 'error' && (
            <p className="text-center text-slate-400 py-16">
              An error occurred while fetching release notes.
            </p>
          )}
          {status === 'done' && (
            <div className="divide-y divide-slate-100">
              {releases.map((release) => {
                const validNotes = release.notes.filter(
                  (n) => n.trim() && !/^\s*\[pretext\]\s/i.test(n),
                )
                return (
                  <div key={release.version} className="py-8 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold text-white shrink-0 product-bg-${identifier}`}
                      >
                        {release.version}
                      </span>
                      {release.pub_date && (
                        <span className="text-sm font-semibold text-slate-500">
                          {formatDate(release.pub_date)}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-2.5">
                      {validNotes.map((note, i) => (
                        <ChangeItem key={i} text={note} />
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
