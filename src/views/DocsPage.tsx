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
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import ProductButton from '@/components/ProductButton'
import VigletLogo from '@/components/VigletLogo'
import { FloatingFormulasBg } from '@viglet/viglet-design-system'
import DecorativeBackdrop from '@/components/DecorativeBackdrop'
import { useIsMobileOrTablet } from '@/hooks/use-mobile-or-tablet'
import { solutions } from '@/data/solutions'

/**
 * The docs hub (/docs/). Each product publishes its documentation on its own
 * site (openviglet.github.io/<id>/docs/); this page is the one address the
 * site's generic "Get Started" and "Documentation" links point at, replacing
 * the retired shared docs.viglet.org. The paths below exist in all three docs.
 */
const GUIDES = [
  { path: 'installation-guide/', label: 'Installation guide', icon: <IconSettings size={16} /> },
  { path: 'developer-guide/', label: 'Developer guide', icon: <IconCode size={16} /> },
  { path: 'rest-api/', label: 'REST API', icon: <IconPlugConnected size={16} /> },
]

export default function DocsPage() {
  const motionPaused = useIsMobileOrTablet()
  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative bg-background border-b border-border overflow-hidden py-24 px-6">
        <DecorativeBackdrop>
          <FloatingFormulasBg color="#C2410C" colorDark="#F97316" extraTokens={["Turing", "Shio", "Dumont"]} motionPaused={motionPaused} />
        </DecorativeBackdrop>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Badge variant="brand" className="mb-6">Documentation</Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
            Get started with Viglet
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Each product has its own documentation. Pick the one you need, read its getting-started guide, then run it with Docker.
          </p>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-3">
          {solutions.map((s) => (
            <Card key={s.identifier} className={`product-card-${s.identifier}`}>
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <VigletLogo identifier={s.identifier} size={40} />
                  <div>
                    <h2 className="text-xl font-extrabold text-foreground">{s.fullName}</h2>
                    <p className={`text-xs font-semibold uppercase tracking-wider product-text-${s.identifier}`}>{s.category}</p>
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
                      All {s.shortName} docs
                      <IconExternalLink size={12} className="text-muted-foreground ml-auto" />
                    </a>
                  </li>
                </ul>

                <div className="flex flex-wrap gap-3 mt-auto">
                  <ProductButton identifier={s.identifier} size="sm" asChild>
                    <a href={s.getStarted} target="_blank" rel="noopener">
                      <IconRocket size={14} />
                      Get Started
                    </a>
                  </ProductButton>
                  {s.dockerImage && (
                    <ProductButton identifier={s.identifier} productVariant="ghost" size="sm" asChild>
                      <Link href={`${s.permalink}download/`}>
                        <IconBrandDocker size={14} />
                        Run with Docker
                      </Link>
                    </ProductButton>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-8 grid gap-4 md:grid-cols-2">
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

      <Footer />
    </div>
  )
}
