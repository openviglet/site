import { useEffect, useMemo, useRef, useState } from 'react'
import { IconSearch, IconSparkles } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import VigletLogo from '@/components/VigletLogo'

/**
 * Scripted product demo (Block H / W28) — "the product IS the hero visual"
 * (turing's strongest pattern), ported dependency-light. It runs a DETERMINISTIC
 * scripted search-and-answer interaction over Viglet's own content: no backend,
 * no LLM call, and it never shows a broken or never-resolving state — every
 * scenario always resolves to a complete, grounded answer.
 *
 * When Block B (embedded Turing) or the Cloud migration lands, this can be
 * swapped for a real Turing-backed demo behind the same fallback discipline.
 *
 * Accessibility: honours `prefers-reduced-motion` — no typing animation and a
 * slower, calmer auto-advance; the answer is always fully present.
 */

interface Source {
  solution: string
  label: string
}

interface Scenario {
  query: string
  answer: string
  sources: Source[]
}

// Grounded in real product capabilities (features.ts / modules.ts) — no invented
// claims. These are demonstrations of the kind of answer Turing ES returns.
const SCENARIOS: Scenario[] = [
  {
    query: 'How do I index Adobe AEM content?',
    answer:
      'Use the Dumont DEP AEM source to extract pages, fragments and assets, then deliver them to Turing ES (or your own Solr / Elasticsearch index) for search.',
    sources: [
      { solution: 'dumont', label: 'Dumont · AEM Source' },
      { solution: 'turing', label: 'Turing · Semantic Navigation' },
    ],
  },
  {
    query: 'Which LLMs can the chatbot use?',
    answer:
      'Turing ES supports OpenAI/ChatGPT, Ollama, Anthropic and Google Gemini, with Retrieval-Augmented Generation grounded in your indexed content.',
    sources: [{ solution: 'turing', label: 'Turing · Generative AI' }],
  },
  {
    query: 'Can I build a site with search built in?',
    answer:
      'Shio CMS models your content, serves it over GraphQL, and indexes it automatically — so embedded search ships with the site.',
    sources: [
      { solution: 'shio', label: 'Shio · Search Ready' },
      { solution: 'shio', label: 'Shio · GraphQL' },
    ],
  },
]

type Phase = 'typing' | 'thinking' | 'answered'

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export default function ScriptedDemo() {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')
  const [typed, setTyped] = useState('')
  const timers = useRef<number[]>([])

  const scenario = SCENARIOS[index]
  const after = (ms: number, fn: () => void) => {
    const id = window.setTimeout(fn, ms)
    timers.current.push(id)
  }
  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  // Drive the state machine. Re-runs whenever the scenario changes; each phase
  // schedules the next, always terminating in a complete answer before advancing.
  useEffect(() => {
    clearTimers()

    if (reduced) {
      // No animation: show the full query + answer, advance slowly.
      setTyped(scenario.query)
      setPhase('answered')
      after(6500, () => setIndex((i) => (i + 1) % SCENARIOS.length))
      return clearTimers
    }

    setTyped('')
    setPhase('typing')

    // Type the query character by character.
    const chars = [...scenario.query]
    chars.forEach((_, i) => {
      after(60 * (i + 1), () => setTyped(scenario.query.slice(0, i + 1)))
    })
    const typeDone = 60 * (chars.length + 1)
    after(typeDone, () => setPhase('thinking'))
    after(typeDone + 750, () => setPhase('answered'))
    after(typeDone + 750 + 3600, () => setIndex((i) => (i + 1) % SCENARIOS.length))

    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, reduced])

  const dotList = useMemo(() => [0, 1, 2], [])

  return (
    <section className="py-20 px-6 bg-muted border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="brand" className="mb-4">See it work</Badge>
          <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
            Ask a question, get an answer
          </h2>
          <p className="text-muted-foreground text-lg mt-3 max-w-xl mx-auto">
            A glimpse of Turing ES answering over indexed content — grounded, with the sources it used.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          {/* Search input row */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <IconSearch size={20} className="text-brand shrink-0" />
            <div className="flex-1 min-w-0 font-medium text-foreground">
              {typed}
              {phase === 'typing' && !reduced && (
                <span className="inline-block w-0.5 h-5 align-middle bg-brand ml-0.5 animate-pulse" />
              )}
            </div>
          </div>

          {/* Answer area — fixed min-height so the layout never jumps or shows an
              empty/never-resolving state */}
          <div className="px-5 py-5 min-h-[168px]">
            {phase === 'thinking' && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground" aria-live="polite">
                <IconSparkles size={16} className="text-brand" />
                <span>Searching your content</span>
                <span className="flex gap-1">
                  {dotList.map((d) => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 rounded-full bg-brand/60 animate-bounce"
                      style={{ animationDelay: `${d * 150}ms` }}
                    />
                  ))}
                </span>
              </div>
            )}

            {phase === 'answered' && (
              <div className="hero-fade-in">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-brand-bg flex items-center justify-center shrink-0">
                    <IconSparkles size={16} className="text-brand" />
                  </span>
                  <p className="text-foreground leading-relaxed">{scenario.answer}</p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground w-full mb-0.5">
                    Sources
                  </span>
                  {scenario.sources.map((s) => (
                    <span
                      key={s.label}
                      className={`inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground product-card-${s.solution}`}
                    >
                      <VigletLogo identifier={s.solution} size={16} />
                      {s.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Scenario progress dots */}
          <div className="flex items-center justify-center gap-2 pb-4">
            {SCENARIOS.map((s, i) => (
              <button
                key={s.query}
                type="button"
                aria-label={`Show demo question ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-brand' : 'w-1.5 bg-border hover:bg-muted-foreground/40'}`}
              />
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Scripted preview · a live Turing-backed demo is on the roadmap.
        </p>
      </div>
    </section>
  )
}
