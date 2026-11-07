'use client'

import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/PageHero'
import { Button } from '@/components/ui/button'
import CognitoForm from '@/components/CognitoForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <PageHero label="Implementation & support" title="Plan your Viglet deployment" description="Tell us what you need to search, connect or publish. Discuss architecture, implementation and support options.">
          <Button size="lg" asChild><a href="#contact-form">Tell us about your project</a></Button>
          <Button size="lg" variant="outline" asChild><Link href="/docs/">Choose a setup guide</Link></Button>
        </PageHero>
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <h2 className="text-xl font-bold text-foreground mt-8">Useful details to include</h2>
            <ul className="list-disc pl-5 mt-4 space-y-3 text-muted-foreground">
              <li>Your content sources and the experience you want to build.</li>
              <li>Your hosting environment and any data-processing constraints.</li>
              <li>Whether you need integration, deployment or ongoing support.</li>
            </ul>
            <p className="mt-8 text-sm text-muted-foreground">Getting started on your own? <Link href="/docs/" className="text-brand underline underline-offset-4">Choose an installation guide</Link>.</p>
            <p className="mt-4 text-sm text-muted-foreground">Working as an integrator? <Link href="/partner/" className="text-brand underline underline-offset-4">Talk about partnering</Link>.</p>
          </div>
          <section id="contact-form" className="rounded-2xl border border-border bg-card p-5 md:p-8 scroll-mt-20" aria-label="Contact form">
            <h2 className="text-2xl font-bold text-foreground mb-5">Tell us about your project</h2>
            <CognitoForm formId="3" />
            <p className="text-sm text-muted-foreground mt-6">If the form does not load, you can also contact our implementation partner through <a href="https://sumware.com.br" className="text-brand underline underline-offset-4">the Sumware website</a>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
