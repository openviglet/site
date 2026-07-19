import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getOutcomes } from '@/data/narrative'

/**
 * Outcome-led section (Block H / W22) — "what changes for you". Leads with
 * results, not feature lists, with a self-justifying subhead (turing's OUTCOMES
 * pattern). Data-driven from `narrative.ts`; every outcome is grounded in a real
 * product capability. Product accent comes from the `product-*` utility classes.
 */
export default function Outcomes() {
  const outcomes = getOutcomes()

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="brand" className="mb-4">Outcomes</Badge>
          <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
            What changes for you
          </h2>
          <p className="text-muted-foreground text-lg mt-3 max-w-xl mx-auto">
            A capability list is easy to skim past. Here's what the suite actually changes for your team and your users.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {outcomes.map((o) => (
            <Card key={o.title} className={`group hover:-translate-y-0.5 transition-all product-card-${o.solution}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <span className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-md product-bg-${o.solution}`}>
                    <o.icon size={20} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1.5">{o.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{o.body}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
