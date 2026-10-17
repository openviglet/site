import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IconArrowRight, IconBook, IconRefresh } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import VigletLogo from '@/components/VigletLogo'
import { getSolution } from '@/data/solutions'
import { recommend, wizardQuestions } from '@/data/wizard'

/**
 * "Which Viglet product?" wizard (Block C / W8). Three questions as button
 * groups; the recommendation appears once the first two are answered and the
 * third adds how it runs. Data and rules live in `src/data/wizard.ts`.
 */
export default function ProductWizard() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const ready = Boolean(answers.have && answers.want)
  const result = ready ? recommend(answers) : null
  const { hash } = useLocation()
  const ref = useRef<HTMLElement>(null)

  // `/#which-product` (linked from /compare/): the SPA does not scroll to a hash
  // on its own, and ScrollToTop has just sent the page to the top.
  useEffect(() => {
    if (hash === '#which-product') ref.current?.scrollIntoView()
  }, [hash])

  return (
    <section ref={ref} id="which-product" className="py-20 px-6 bg-background border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="brand" className="mb-4">Find your fit</Badge>
          <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
            Which Viglet product do you need?
          </h2>
          <p className="text-muted-foreground text-lg mt-3 max-w-xl mx-auto">
            Answer three questions and get the product, or the combination, that fits.
            Or{' '}
            <Link to="/compare/" className="font-semibold text-brand no-underline">
              compare all three side by side
            </Link>
            .
          </p>
        </div>

        <div className="space-y-8">
          {wizardQuestions.map((q, n) => (
            <fieldset key={q.id}>
              <legend className="text-sm font-bold text-foreground mb-3">
                <span className="text-muted-foreground mr-2">{n + 1}.</span>
                {q.question}
              </legend>
              <div className="flex flex-wrap gap-2">
                {q.options.map((o) => {
                  const selected = answers[q.id] === o.id
                  return (
                    <button
                      key={o.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.id }))}
                      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
                        selected
                          ? 'border-brand bg-brand text-white'
                          : 'border-border bg-card text-foreground hover:bg-muted'
                      }`}
                    >
                      {o.label}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="mt-10" aria-live="polite">
          {result && (
            <Card className="border-border">
              <CardContent className="p-6 md:p-8">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                  {result.picks.length > 1 ? 'Your combination' : 'Your product'}
                </p>
                <div className={`grid gap-5 ${result.picks.length > 1 ? 'md:grid-cols-2' : ''}`}>
                  {result.picks.map((pick) => {
                    const product = getSolution(pick.solution)
                    if (!product) return null
                    return (
                      <div key={pick.solution} className={`flex flex-col rounded-2xl border border-border bg-muted/40 p-5 product-card-${pick.solution}`}>
                        <div className="flex items-center gap-3 mb-3">
                          <VigletLogo identifier={pick.solution} size={40} />
                          <div>
                            <p className="font-bold text-foreground">{product.fullName}</p>
                            <p className="text-xs text-muted-foreground">{product.category}</p>
                          </div>
                        </div>
                        <ul className="space-y-1.5 text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                          {pick.reasons.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-4">
                          <Link
                            to={product.permalink}
                            className={`flex items-center gap-1.5 text-sm font-semibold no-underline product-text-${pick.solution}`}
                          >
                            About {product.shortName}
                            <IconArrowRight size={14} />
                          </Link>
                          <a
                            href={product.getStarted}
                            target="_blank"
                            rel="noopener"
                            className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground no-underline"
                          >
                            <IconBook size={14} />
                            Docs
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {result.links.length > 0 && (
                  <p className="mt-5 text-sm text-foreground leading-relaxed">{result.links.join(' ')}</p>
                )}
                {result.note && (
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {result.note.note}
                    {result.note.noteLink && (
                      <>
                        {' '}
                        {/^https?:\/\//.test(result.note.noteLink.to) ? (
                          <a href={result.note.noteLink.to} target="_blank" rel="noopener" className="font-semibold text-brand no-underline">
                            {result.note.noteLink.label}
                          </a>
                        ) : (
                          <Link to={result.note.noteLink.to} className="font-semibold text-brand no-underline">
                            {result.note.noteLink.label}
                          </Link>
                        )}
                        .
                      </>
                    )}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setAnswers({})}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  <IconRefresh size={14} />
                  Start over
                </button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
