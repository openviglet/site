'use client'

import Link from 'next/link'
import { IconArrowRight, IconBrandDocker } from '@tabler/icons-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import VigletLogo from '@/components/VigletLogo'
import PipelineDiagram from '@/components/PipelineDiagram'
import ScriptedDemo from '@/components/sections/ScriptedDemo'
import StackWall from '@/components/sections/StackWall'
import HomeFaq from '@/components/sections/HomeFaq'
import ProductWizard from '@/components/sections/ProductWizard'
import CloudCallout from '@/components/sections/CloudCallout'
import { hubMessage, productPaths, evaluationPaths } from '@/data/hub'
import { getSolution } from '@/data/solutions'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main id="main-content">
        <section className="px-6 py-14 md:py-20 border-b border-border">
          <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
            <div>
              <Badge variant="brand" className="mb-6">Viglet / Apache 2.0</Badge>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.08] text-foreground max-w-3xl">{hubMessage.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mt-6 max-w-xl">{hubMessage.description}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Button size="lg" asChild><a href="https://turing.viglet.org/#playground" data-viglet-action="demo_open" data-viglet-product="turing" data-viglet-placement="home_hero" data-viglet-journey="general">Try Turing live <IconArrowRight size={18} /></a></Button>
                <Button size="lg" variant="outline" asChild><Link href="/turing/download/" data-viglet-action="setup_guide_open" data-viglet-product="turing" data-viglet-placement="home_hero"><IconBrandDocker size={18} /> Run Turing with Docker</Link></Button>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">Choosing a CMS or connector? <a href="#products" className="text-brand underline underline-offset-4">Find your product</a>.</p>
            </div>
            <ScriptedDemo />
          </div>
        </section>

        <section id="products" className="px-6 py-16 scroll-mt-20 bg-muted">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Start with the job you need done</h2>
            <p className="text-muted-foreground mt-3 mb-8">Three independent products. Add an integration when your project needs it.</p>
            <div className="grid gap-5 md:grid-cols-3">
              {productPaths.map((path) => {
                const product = getSolution(path.product)!
                return (
                  <article key={path.product} className={`rounded-2xl border border-border bg-card p-6 flex flex-col product-card-${path.product}`}>
                    <div className="flex items-center gap-3 mb-5"><VigletLogo identifier={path.product} size={40} /><p className={`font-semibold product-text-${path.product}`}>{product.fullName}</p></div>
                    <h3 className="text-xl font-bold text-foreground">{path.job}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3 mb-6 flex-1">{path.description}</p>
                    <a href={path.href} data-viglet-action={path.product === 'turing' ? 'demo_open' : 'product_open'} data-viglet-product={path.product} data-viglet-placement="home_products" className="inline-flex items-center gap-2 text-brand font-semibold text-sm">{path.action}<IconArrowRight size={16} /></a>
                    <a href={product.getStarted} data-viglet-action="setup_guide_open" data-viglet-product={path.product} data-viglet-placement="home_products" className="mt-4 text-sm text-muted-foreground underline underline-offset-4">Install {product.shortName}</a>
                  </article>
                )
              })}
            </div>
            <details className="mt-8 rounded-2xl border border-border bg-background scroll-mt-20">
              <summary className="cursor-pointer p-5 font-semibold text-foreground">Need help choosing? Answer a few questions</summary>
              <ProductWizard />
            </details>
          </div>
        </section>

        <section className="px-6 py-16 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <Badge variant="brand" className="mb-4">Try it in context</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Start from your environment</h2>
            <div className="grid gap-8 md:grid-cols-3 mt-8">
              {evaluationPaths.map((path) => (
                <article key={path.id} className="border-t-2 border-brand pt-5 flex flex-col">
                  <h3 className="font-bold text-xl text-foreground">{path.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3 mb-5 flex-1">{path.description}</p>
                  <Link href={path.href} data-viglet-action={path.id === 'aem' ? 'demo_open' : 'setup_guide_open'} data-viglet-journey={path.id} data-viglet-product={path.id === 'shio' ? 'shio' : 'turing'} data-viglet-placement="home_context" className="font-semibold text-brand text-sm">{path.action} &rarr;</Link>
                  <Link href={path.guide} data-viglet-action="setup_guide_open" data-viglet-journey={path.id} data-viglet-product={path.id === 'shio' ? 'shio' : 'turing'} data-viglet-placement="home_context" className="text-sm text-muted-foreground underline underline-offset-4 mt-3">{path.guideLabel}</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Connect the tools your project needs</h2>
            <p className="text-muted-foreground mt-3 mb-8">Each path is optional. You do not need all three products to get started.</p>
            <PipelineDiagram />
          </div>
        </section>
        <StackWall />
        <HomeFaq />
        <CloudCallout />
        <section className="px-6 py-16 bg-muted border-t border-border">
          <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2 items-center">
            <div><h2 className="text-3xl font-bold tracking-tight text-foreground">Plan your first deployment</h2><p className="mt-3 text-muted-foreground leading-relaxed">Start with the setup guide, or talk with us about sources, architecture and implementation support.</p></div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button size="lg" asChild><Link href="/docs/" data-viglet-action="setup_guide_open" data-viglet-product="suite" data-viglet-placement="home_support">Choose a setup guide <IconArrowRight size={16} /></Link></Button>
              <Button size="lg" variant="outline" asChild><Link href="/contact/" data-viglet-action="contact_intent" data-viglet-product="suite" data-viglet-placement="home_support">Discuss your deployment</Link></Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
