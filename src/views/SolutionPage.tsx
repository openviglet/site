'use client'

import Link from 'next/link'
import { IconArrowRight, IconBrandDocker } from '@tabler/icons-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SolutionMenu from '@/components/SolutionMenu'
import VigletLogo from '@/components/VigletLogo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getSolution } from '@/data/solutions'
import { productPaths } from '@/data/hub'
import { productOverviews } from '@/data/productOverviews'

export default function SolutionPage({ identifier }: Readonly<{ identifier: string }>) {
  const solution = getSolution(identifier)
  const path = productPaths.find((item) => item.product === identifier)
  if (!solution || !path) return null
  const overview = productOverviews[path.product]
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <SolutionMenu solution={solution} />
      <main id="main-content" className="flex-1">
        <section className="px-6 py-12 md:py-16 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <VigletLogo identifier={identifier} size={64} />
              <div><Badge variant="brand" className="mb-2">Product overview</Badge><p className="text-sm text-muted-foreground">{solution.category}</p></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">{solution.fullName}</h1>
            <p className="text-xl text-foreground font-semibold mt-5">{path.job}</p>
            <p className="text-muted-foreground leading-relaxed mt-3 max-w-3xl">{solution.description}</p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Button size="lg" asChild><a href={path.href} data-viglet-action={identifier === 'turing' ? 'demo_open' : 'product_open'} data-viglet-product={identifier} data-viglet-placement="overview">{path.action}<IconArrowRight size={16} /></a></Button>
              <Button size="lg" variant="outline" asChild><Link href={`${solution.permalink}download/`} data-viglet-action="setup_guide_open" data-viglet-product={identifier} data-viglet-placement="overview"><IconBrandDocker size={18} /> Install {solution.shortName}</Link></Button>
            </div>
          </div>
        </section>
        <section className="px-6 py-10">
          <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-foreground">When to choose {solution.shortName}</h2>
              <ul className="mt-5 pl-5 space-y-3 list-disc text-muted-foreground leading-relaxed">{overview.chooseWhen.map((reason) => <li key={reason}>{reason}</li>)}</ul>
              <h2 className="text-2xl font-bold text-foreground mt-8">Before you start</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{overview.startingPoint}</p>
              <a href={solution.getStarted} className="inline-block mt-4 text-brand underline underline-offset-4" data-viglet-action="setup_guide_open" data-viglet-product={identifier} data-viglet-placement="overview">Read the {solution.shortName} setup guide</a>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">How it fits the portfolio</h2>
              <div className="mt-5 space-y-4">{overview.relationships.map((relationship) => {
                const related = getSolution(relationship.product)!
                return <article key={related.identifier} className="rounded-xl border border-border bg-card p-5"><Link href={related.permalink} className="font-bold text-brand underline underline-offset-4">{related.fullName}</Link><p className="mt-3 text-sm text-muted-foreground leading-relaxed">{relationship.description}</p></article>
              })}</div>
              <p className="mt-5 text-sm text-muted-foreground">Each product can be adopted independently. <Link href="/compare/" className="text-brand underline underline-offset-4">Compare their roles</Link>.</p>
            </div>
          </div>
        </section>
        <section className="px-6 py-8 bg-muted border-t border-border">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-foreground">Continue with {solution.shortName}</h2>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-4 text-sm font-semibold text-brand">
              <a href={solution.site} className="underline underline-offset-4">Full product site</a>
              <Link href={overview.guide.href} className="underline underline-offset-4">{overview.guide.label}</Link>
              <Link href={`${solution.permalink}release-notes/`} className="underline underline-offset-4">Release notes</Link>
              <Link href="/contact/" className="underline underline-offset-4" data-viglet-action="contact_intent" data-viglet-product={identifier} data-viglet-placement="overview">Discuss implementation</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
