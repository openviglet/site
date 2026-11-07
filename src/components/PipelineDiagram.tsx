import { IconArrowRight } from '@tabler/icons-react'
import { productConnections } from '@/data/narrative'

/** Each row is an independent integration path; arrows describe payloads. */
export default function PipelineDiagram() {
  return (
    <ul className="space-y-4" aria-label="Product integration paths">
      {productConnections.map((connection) => (
        <li key={connection.id} className={`rounded-2xl border border-border bg-card p-6 product-card-${connection.solution}`}>
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{connection.source}</p>
              <h3 className={`font-bold product-text-${connection.solution}`}>{connection.action}</h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground md:flex-col md:text-center md:max-w-48">
              <span>{connection.payload}</span>
              <IconArrowRight size={20} aria-hidden="true" className="rotate-90 md:rotate-0" />
            </div>
            <p className="font-semibold text-foreground">{connection.destination}</p>
          </div>
          <p className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground leading-relaxed">{connection.description}</p>
        </li>
      ))}
    </ul>
  )
}
