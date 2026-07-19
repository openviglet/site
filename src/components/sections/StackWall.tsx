import { Badge } from '@/components/ui/badge'
import { getProviderGroups } from '@/data/narrative'

/**
 * "Works with your stack" pill wall (Block H / W25) — a providers/tech grid
 * grouped by role (sources, search engines, AI/LLMs, delivery), derived from
 * `modules.ts` / `features.ts` via `narrative.ts`. Answers "does it fit *my*
 * environment?" at a glance. Objective names only; each pill's dot uses the
 * provider's own brand colour (data-driven, not a design-system token — these
 * are third-party marks, so an inline colour is correct here).
 */
export default function StackWall() {
  const groups = getProviderGroups()

  return (
    <section className="py-20 px-6 bg-muted border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="brand" className="mb-4">Ecosystem</Badge>
          <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
            Works with your stack
          </h2>
          <p className="text-muted-foreground text-lg mt-3 max-w-xl mx-auto">
            Connect the sources you already run, index into the engine you already operate, and answer with the LLM you already trust.
          </p>
        </div>

        <div className="space-y-8">
          {groups.map((group) => (
            <div key={group.label} className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground sm:w-32 sm:pt-2 shrink-0">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {group.providers.map((p) => (
                  <span
                    key={p.name}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
