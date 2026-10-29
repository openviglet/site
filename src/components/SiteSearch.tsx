import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IconSearch, IconX, IconExternalLink, IconSparkles, IconBulb } from '@tabler/icons-react'
import { matchProducts } from '@/data/intents'
import { getSolution } from '@/data/solutions'
import VigletLogo from '@/components/VigletLogo'
import { highlightParts, searchLocal, searchTuring, type LiveResult, type SearchEntry } from '@/lib/site-search'

const LIVE_DEBOUNCE_MS = 250

type Item =
  | { type: 'local'; entry: SearchEntry }
  | { type: 'live'; result: LiveResult }

function Highlighted({ value }: Readonly<{ value: string }>) {
  return (
    <>
      {highlightParts(value).map((p, i) =>
        p.mark ? (
          <mark key={i} className="bg-transparent font-bold text-foreground">{p.text}</mark>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </>
  )
}

/**
 * Header search (W6): a button that opens a search dialog over the site's own
 * data, plus live results from Viglet Turing. See `src/lib/site-search.ts`.
 * Opens on click, Ctrl+K / Cmd+K, or "/" outside a text field.
 */
export default function SiteSearch({ className = '' }: Readonly<{ className?: string }>) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const typing = target?.closest('input, textarea, select, [contenteditable="true"]')
      if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing)) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        className={`p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors ${className}`}
      >
        <IconSearch size={20} />
      </button>
      {open && <SearchDialog onClose={() => setOpen(false)} />}
    </>
  )
}

function SearchDialog({ onClose }: Readonly<{ onClose: () => void }>) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [live, setLive] = useState<{ query: string; results: LiveResult[] } | null>(null)
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const local = useMemo(() => searchLocal(query), [query])
  // W7: a problem statement ("index my intranet and add AI search") names the
  // products that fit, with a reason each, above the page results.
  const fits = useMemo(() => matchProducts(query), [query])
  const trimmed = query.trim()
  const liveResults = live && live.query === trimmed ? live.results : []
  const liveLoading = trimmed.length >= 2 && (!live || live.query !== trimmed)

  const items: Item[] = [
    ...local.map((entry) => ({ type: 'local' as const, entry })),
    ...liveResults.map((result) => ({ type: 'live' as const, result })),
  ]

  useEffect(() => {
    inputRef.current?.focus()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  useEffect(() => {
    if (trimmed.length < 2) return
    let stale = false
    const timer = setTimeout(() => {
      void searchTuring(trimmed).then((results) => {
        if (!stale) setLive({ query: trimmed, results })
      })
    }, LIVE_DEBOUNCE_MS)
    return () => {
      stale = true
      clearTimeout(timer)
    }
  }, [trimmed])

  function go(item: Item) {
    if (item.type === 'live') {
      window.open(item.result.url, '_blank', 'noopener')
    } else if (item.entry.external) {
      window.open(item.entry.href, '_blank', 'noopener')
    } else {
      router.push(item.entry.href)
    }
    onClose()
  }

  function onKeyDown(e: ReactKeyboardEvent) {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, Math.max(items.length - 1, 0)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && items[active]) {
      e.preventDefault()
      go(items[active])
    }
  }

  const rowClass = (i: number) =>
    `w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-lg transition-colors ${
      i === active ? 'bg-muted' : 'hover:bg-muted'
    }`

  return (
    <div
      className="fixed inset-0 z-60 bg-black/40 backdrop-blur-sm flex items-start justify-center px-4 pt-[10vh]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        onKeyDown={onKeyDown}
        className="w-full max-w-2xl bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <IconSearch size={18} className="text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            placeholder="Search products, features and docs"
            aria-label="Search query"
            className="w-full h-14 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors"
          >
            <IconX size={18} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {trimmed === '' && (
            <p className="px-3 py-6 text-sm text-muted-foreground text-center">
              Try "AEM", "RAG" or "GraphQL", or describe your problem: "index our intranet and add AI search".
            </p>
          )}

          {fits.length > 0 && (
            <div className="mb-2 pb-2 border-b border-border">
              <p className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <IconBulb size={14} />
                Products that fit
              </p>
              <div className="grid gap-2 px-1 sm:grid-cols-2">
                {fits.map((fit) => {
                  const product = getSolution(fit.solution)
                  if (!product) return null
                  return (
                    <Link
                      key={fit.solution}
                      href={product.permalink}
                      onClick={onClose}
                      className={`flex items-start gap-3 p-3 rounded-xl border border-border bg-card hover:bg-muted transition-colors no-underline product-card-${fit.solution}`}
                    >
                      <VigletLogo identifier={fit.solution} size={32} />
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-foreground">{product.fullName}</span>
                        <span className="block text-xs text-muted-foreground leading-relaxed">{fit.reasons.slice(0, 2).join(' ')}</span>
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {local.length > 0 && (
            <ul>
              {local.map((entry, i) => (
                <li key={`${entry.kind}-${entry.href}-${entry.title}`}>
                  <button type="button" className={rowClass(i)} onMouseEnter={() => setActive(i)} onClick={() => go({ type: 'local', entry })}>
                    <span className={`mt-2 w-2 h-2 rounded-full shrink-0 ${entry.solution ? `product-bg-${entry.solution}` : 'bg-muted-foreground'}`} />
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 text-sm font-bold text-foreground">
                        {entry.title}
                        {entry.external && <IconExternalLink size={12} className="text-muted-foreground shrink-0" />}
                      </span>
                      <span className="block text-xs text-muted-foreground line-clamp-2">
                        <span className="font-semibold">{entry.kind}</span> · {entry.body}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {trimmed.length >= 2 && (liveLoading || liveResults.length > 0) && (
            <div className="mt-2 pt-2 border-t border-border">
              <p className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider product-text-turing">
                <IconSparkles size={14} />
                Turing docs, searched live by Viglet Turing
              </p>
              {liveLoading && <p className="px-3 py-2 text-xs text-muted-foreground">Searching…</p>}
              <ul>
                {liveResults.map((result, j) => {
                  const i = local.length + j
                  return (
                    <li key={result.url}>
                      <button type="button" className={rowClass(i)} onMouseEnter={() => setActive(i)} onClick={() => go({ type: 'live', result })}>
                        <span className="mt-2 w-2 h-2 rounded-full shrink-0 product-bg-turing" />
                        <span className="min-w-0">
                          <span className="flex items-center gap-2 text-sm font-bold text-foreground">
                            <span><Highlighted value={result.title} /></span>
                            <IconExternalLink size={12} className="text-muted-foreground shrink-0" />
                          </span>
                          <span className="block text-xs text-muted-foreground line-clamp-2">
                            {result.section && <span className="font-semibold">{result.section} · </span>}
                            <Highlighted value={result.description} />
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {trimmed !== '' && local.length === 0 && !liveLoading && liveResults.length === 0 && (
            <p className="px-3 py-6 text-sm text-muted-foreground text-center">
              Nothing found for "{trimmed}". The full documentation is at{' '}
              <a href="https://docs.viglet.org" target="_blank" rel="noopener" className="text-brand font-semibold">
                docs.viglet.org
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
