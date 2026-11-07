import type { ReactNode } from 'react'
import type { Solution } from '@/data/solutions'
import VigletLogo from '@/components/VigletLogo'
import { Badge } from '@/components/ui/badge'

/** One hero layout for product overview, installation and release history. */
export default function ProductPageHero({ solution, label, title, description, children }: Readonly<{
  solution: Solution
  label: string
  title: string
  description: string
  children: ReactNode
}>) {
  return (
    <section className="px-6 py-12 md:py-16 border-b border-border bg-background" data-product-hero>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <VigletLogo identifier={solution.identifier} size={48} />
          <div><Badge variant="brand" className="mb-2">{label}</Badge><p className="text-sm text-muted-foreground">{solution.category}</p></div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">{title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mt-5 max-w-3xl">{description}</p>
        <div className="flex flex-wrap gap-3 mt-7">{children}</div>
      </div>
    </section>
  )
}
