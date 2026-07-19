import { IconArrowRight } from '@tabler/icons-react'
import { getPipeline } from '@/data/narrative'

/**
 * "Built with Viglet" pipeline diagram (Block H / W2) — the platform story
 * Dumont → Turing → Shio as a connected process flow.
 *
 * Deliberately distinct from the product-card grid: equal-height "process
 * cards" with a product-coloured top accent, a numbered step badge and a step
 * label (no product logo), joined by arrows — so it reads as a pipeline, not
 * "the products again". Data-driven from `narrative.ts`; product colours come
 * from the `product-*` utility classes (never inline). Consumed by the home
 * "how the three connect" band (W21) and reusable by any showcase (Block A).
 */
export default function PipelineDiagram() {
  const stages = getPipeline()

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
      {stages.map((stage, i) => (
        <div key={stage.solution} className="contents">
          <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:-translate-y-1 transition-all">
            {/* Product-coloured top accent — the pipeline's visual signature */}
            <div className={`h-1.5 product-bg-${stage.solution}`} />
            <div className="flex flex-col flex-1 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-base font-extrabold shrink-0 product-bg-${stage.solution}`}
                >
                  {i + 1}
                </span>
                <span className={`text-xs font-bold uppercase tracking-widest product-text-${stage.solution}`}>
                  {stage.step}
                </span>
              </div>
              <h3 className="font-bold text-foreground mb-2">{stage.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stage.description}
              </p>
            </div>
          </div>

          {/* Connector arrow between stages */}
          {i < stages.length - 1 && (
            <div className="flex items-center justify-center text-muted-foreground/40">
              <IconArrowRight size={24} className="hidden md:block" />
              <IconArrowRight size={22} className="md:hidden rotate-90 mx-auto" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
