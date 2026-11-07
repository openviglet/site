'use client'

import Link from 'next/link'
import {
  IconArrowRight,
  IconBook,
  IconBrandDocker,
  IconCode,
  IconExternalLink,
  IconPlugConnected,
  IconRocket,
  IconSettings,
} from '@tabler/icons-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/PageHero'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import VigletLogo from '@/components/VigletLogo'
import { solutions } from '@/data/solutions'

/**
 * The docs hub (/docs/). Each product publishes its documentation on its own
 * site (<id>.viglet.org/docs/); this page is the one address the
 * site's generic "Get Started" and "Documentation" links point at, replacing
 * the retired shared docs.viglet.org. The paths below exist in all three docs.
 */
const GUIDES = [
  { path: 'installation-guide/', label: 'Installation guide', icon: <IconSettings size={16} /> },
  { path: 'developer-guide/', label: 'Developer guide', icon: <IconCode size={16} /> },
  { path: 'rest-api/', label: 'REST API', icon: <IconPlugConnected size={16} /> },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main id="main-content" className="flex-1">

      {/* ===== HERO ===== */}
      <PageHero label="Documentation" title="Get started with Viglet" description="Choose a product and follow its official setup guide, installation instructions or API reference." />

      {/* ===== PRODUCTS ===== */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
          {solutions.map((s) => (
            <Card key={s.identifier} className={`product-card-${s.identifier}`}>
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <VigletLogo identifier={s.identifier} size={40} />
                  <div>
                    <h2 className="text-xl font-extrabold text-foreground">{s.fullName}</h2>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.category}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{s.description}</p>

                <ul className="space-y-1 mb-6">
                  {GUIDES.map((g) => (
                    <li key={g.path}>
                      <a
                        href={s.docs + g.path}
                        target="_blank"
                        rel="noopener"
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted no-underline"
                      >
                        <span className="text-muted-foreground">{g.icon}</span>
                        {g.label}
                        <IconExternalLink size={12} className="text-muted-foreground ml-auto" />
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href={s.docs}
                      target="_blank"
                      rel="noopener"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted no-underline"
                    >
                      <span className="text-muted-foreground"><IconBook size={16} /></span>
                      All {s.fullName} docs
                      <IconExternalLink size={12} className="text-muted-foreground ml-auto" />
                    </a>
                  </li>
                </ul>

                <div className="flex flex-wrap gap-3 mt-auto">
                  <Button size="sm" asChild>
                    <a href={s.getStarted} target="_blank" rel="noopener">
                      <IconRocket size={14} />
                      Get Started
                    </a>
                  </Button>
                  {s.dockerImage && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`${s.permalink}download/`}>
                        <IconBrandDocker size={14} />
                        Run with Docker
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-5xl mx-auto mt-8 grid gap-4 md:grid-cols-2">
          <Link
            href="/#which-product"
            className="flex items-center justify-between gap-3 p-5 rounded-2xl border border-border bg-card hover:bg-muted transition-colors no-underline"
          >
            <span>
              <span className="block font-bold text-foreground">Not sure which you need?</span>
              <span className="block text-sm text-muted-foreground">Answer three questions and get a recommendation.</span>
            </span>
            <IconArrowRight size={18} className="text-muted-foreground shrink-0" />
          </Link>
          <Link
            href="/blog/"
            className="flex items-center justify-between gap-3 p-5 rounded-2xl border border-border bg-card hover:bg-muted transition-colors no-underline"
          >
            <span>
              <span className="block font-bold text-foreground">Guides and comparisons</span>
              <span className="block text-sm text-muted-foreground">Integration how-tos on the Viglet blog.</span>
            </span>
            <IconArrowRight size={18} className="text-muted-foreground shrink-0" />
          </Link>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  )
}
