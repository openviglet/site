import { IconChevronDown } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { getFaq } from '@/data/narrative'

/**
 * Home FAQ (Block H / W26) — honest, objection-pre-empting Q&A rendered from the
 * `narrative.ts` `faq[]`. Uses native <details>/<summary> so it works without JS
 * and is accessible by default.
 *
 * The matching FAQPage JSON-LD is NOT emitted here — it ships in `index.html`'s
 * static <head> (kept on the home route by the prerender plugin) so crawlers see
 * it in the prerendered HTML. `narrative.ts` `faq[]` is the single source of
 * truth; index.html mirrors it verbatim.
 */
export default function HomeFaq() {
  const faq = getFaq()

  return (
    <section className="py-20 px-6 bg-background border-t border-border">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="brand" className="mb-4">FAQ</Badge>
          <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
            Questions, answered honestly
          </h2>
          <p className="text-muted-foreground text-lg mt-3 max-w-xl mx-auto">
            No hype — the answers first.
          </p>
        </div>

        <div className="space-y-3">
          {faq.map((item) => (
            <details
              key={item.q}
              className="group bg-card border border-border rounded-2xl px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold text-foreground">
                {item.q}
                <IconChevronDown
                  size={20}
                  className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
