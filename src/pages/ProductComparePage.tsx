import { Link, useSearchParams } from 'react-router-dom'
import { IconArrowRight, IconChevronDown, IconExternalLink } from '@tabler/icons-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Badge } from '@/components/ui/badge'
import VigletLogo from '@/components/VigletLogo'
import { solutions } from '@/data/solutions'
import { comparisons } from '@/data/comparisons'
import { compareRows } from '@/data/productComparison'

const ALL = solutions.map((s) => s.identifier)
const ROW_IDS = compareRows.map((r) => r.id)

/** `?products=a,b` → the known ids it names, in suite order; all when absent or empty. */
function parseList(value: string | null, known: string[]): string[] {
  if (!value) return []
  const wanted = new Set(value.split(',').map((v) => v.trim()))
  return known.filter((id) => wanted.has(id))
}

/**
 * `/compare/`: Dumont × Shio × Turing side by side (Block C / W9). The columns
 * shown (`?products=`) and the rows expanded (`?open=`) live in the query
 * string, so a comparison is shareable and back/forward restores it. Rows come
 * from `src/data/productComparison.ts`.
 */
export default function ProductComparePage() {
  const [params, setParams] = useSearchParams()
  const picked = parseList(params.get('products'), ALL)
  const shown = picked.length > 0 ? picked : ALL
  const open = new Set(parseList(params.get('open'), ROW_IDS))
  const columns = solutions.filter((s) => shown.includes(s.identifier))

  function update(next: { products?: string[]; open?: string[] }) {
    const p = new URLSearchParams(params)
    const set = (key: string, list: string[] | undefined, all: string[]) => {
      if (list === undefined) return
      if (list.length === 0 || (key === 'products' && list.length === all.length)) p.delete(key)
      else p.set(key, list.join(','))
    }
    set('products', next.products, ALL)
    set('open', next.open, ROW_IDS)
    setParams(p, { replace: true })
  }

  function toggleProduct(id: string) {
    const next = shown.includes(id) ? shown.filter((x) => x !== id) : [...shown, id]
    if (next.length === 0) return
    update({ products: ALL.filter((x) => next.includes(x)) })
  }

  function toggleRow(id: string) {
    const next = open.has(id) ? [...open].filter((x) => x !== id) : [...open, id]
    update({ open: ROW_IDS.filter((x) => next.includes(x)) })
  }

  const allOpen = open.size === ROW_IDS.length

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <Header />

      <section className="py-16 px-6 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="brand" className="mb-4">Compare</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-5">
            Dumont, Shio and Turing side by side
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            What each Viglet product reads, delivers and runs on. Each one works alone, and they connect when you use them together.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Products to compare">
              {solutions.map((s) => {
                const on = shown.includes(s.identifier)
                return (
                  <button
                    key={s.identifier}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleProduct(s.identifier)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                      on ? `product-bg-${s.identifier} text-white border-transparent` : 'border-border bg-card text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {s.shortName}
                  </button>
                )
              })}
            </div>
            <button
              type="button"
              onClick={() => update({ open: allOpen ? [] : ROW_IDS })}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              {allOpen ? 'Collapse all' : 'Expand all'}
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full border-collapse min-w-160">
              <thead>
                <tr className="border-b border-border">
                  <th className="w-1/5 p-4" />
                  {columns.map((s) => (
                    <th key={s.identifier} scope="col" className="p-4 text-left align-bottom">
                      <Link to={s.permalink} className="flex items-center gap-3 no-underline">
                        <VigletLogo identifier={s.identifier} size={36} />
                        <span>
                          <span className="block font-extrabold text-foreground">{s.fullName}</span>
                          <span className="block text-xs font-medium text-muted-foreground">{s.category}</span>
                        </span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => {
                  const expanded = open.has(row.id)
                  const hasDetail = columns.some((s) => row.cells[s.identifier]?.detail)
                  return (
                      <tr key={row.id} className="border-b border-border align-top">
                        <th scope="row" className="p-4 text-left">
                          {hasDetail ? (
                            <button
                              type="button"
                              aria-expanded={expanded}
                              onClick={() => toggleRow(row.id)}
                              className="flex items-center gap-1.5 text-sm font-bold text-foreground"
                            >
                              <IconChevronDown size={16} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
                              {row.label}
                            </button>
                          ) : (
                            <span className="text-sm font-bold text-foreground pl-5.5">{row.label}</span>
                          )}
                        </th>
                        {columns.map((s) => {
                          const cell = row.cells[s.identifier]
                          return (
                            <td key={s.identifier} className="p-4 text-sm text-foreground">
                              <p>{cell?.summary ?? 'n/a'}</p>
                              {expanded && cell?.detail && (
                                <p className="mt-2 text-muted-foreground leading-relaxed">{cell.detail}</p>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link
              to="/#which-product"
              className="flex items-center justify-between gap-3 p-5 rounded-2xl border border-border bg-card hover:bg-muted transition-colors no-underline"
            >
              <span>
                <span className="block font-bold text-foreground">Not sure which you need?</span>
                <span className="block text-sm text-muted-foreground">Answer three questions and get a recommendation.</span>
              </span>
              <IconArrowRight size={18} className="text-muted-foreground shrink-0" />
            </Link>
            <a
              href="https://docs.viglet.org"
              target="_blank"
              rel="noopener"
              className="flex items-center justify-between gap-3 p-5 rounded-2xl border border-border bg-card hover:bg-muted transition-colors no-underline"
            >
              <span>
                <span className="block font-bold text-foreground">Read the documentation</span>
                <span className="block text-sm text-muted-foreground">Install guides and references for all three products.</span>
              </span>
              <IconExternalLink size={18} className="text-muted-foreground shrink-0" />
            </a>
          </div>

          {comparisons.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-bold text-foreground mb-3">Comparing with other vendors</h2>
              <ul className="space-y-2">
                {comparisons.map((c) => (
                  <li key={c.slug}>
                    <Link to={`/compare/${c.slug}/`} className="text-sm font-semibold text-brand no-underline">
                      {c.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
