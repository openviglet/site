import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'

/** Shared page identity: one title scale, gutter, mark and action rhythm. */
export default function PageHero({ label, title, description, context = 'Viglet', mark, children }: Readonly<{
  label: string
  title: string
  description: string
  context?: string
  mark?: ReactNode
  children?: ReactNode
}>) {
  return (
    <section className="px-6 py-12 md:py-16 border-b border-border bg-background" data-page-hero>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          {mark ?? <img src="/logos/viglet.svg" alt="" width={48} height={48} className="w-12 h-12 shrink-0" />}
          <div><Badge variant="brand" className="mb-2">{label}</Badge><p className="text-sm text-muted-foreground">{context}</p></div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">{title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mt-5 max-w-3xl">{description}</p>
        {children && <div className="flex flex-wrap gap-3 mt-7">{children}</div>}
      </div>
    </section>
  )
}
