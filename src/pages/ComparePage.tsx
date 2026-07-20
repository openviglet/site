import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import {
  IconArrowRight,
  IconBook,
  IconBrandDocker,
  IconBrandOpenSource,
  IconCheck,
  IconExternalLink,
  IconRocket,
  IconScale,
} from '@tabler/icons-react'
import { FloatingFormulasBg } from '@viglet/viglet-design-system'
import { useIsMobileOrTablet } from '@/hooks/use-mobile-or-tablet'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent } from '@/components/ui/card'
import ProductBadge from '@/components/ProductBadge'
import ProductButton from '@/components/ProductButton'
import VigletLogo from '@/components/VigletLogo'
import { getComparison } from '@/data/comparisons'
import { getSolution, productColors } from '@/data/solutions'
import { useGuides, getGuidesBySlugs } from '@/data/guides'

export default function ComparePage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const comparison = getComparison(slug)
  const guides = useGuides()
  const motionPaused = useIsMobileOrTablet()

  // FAQPage structured data for this comparison — helps search engines and LLM
  // assistants answer the high-intent queries these pages target (GEO). Injected
  // client-side (the SPA has no SSR); removed on unmount so it never leaks onto
  // another route. Mirrors the visible FAQ below.
  useEffect(() => {
    if (!comparison) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.comparisonFaq = comparison.slug
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: comparison.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [comparison])

  if (!comparison) return <Navigate to="/" replace />

  const accent = comparison.accent
  const accentColor = productColors[accent] ?? '#4169e1'
  const relatedGuides = getGuidesBySlugs(guides, comparison.guideSlugs)
  const products = comparison.products
    .map((id) => getSolution(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden py-20 px-6 border-b border-border">
        <FloatingFormulasBg color={accentColor} colorDark={accentColor} withLightning extraTokens={['Algolia', 'Coveo', 'AEM', 'RAG']} motionPaused={motionPaused} />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <ProductBadge identifier={accent} className="mb-4">
            {comparison.eyebrow}
          </ProductBadge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-5">
            {comparison.h1}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
            {comparison.intro}
          </p>

          <div className="flex flex-wrap gap-3 items-center justify-center">
            <ProductButton identifier={accent} size="lg" asChild>
              <Link to="/turing/">
                <IconRocket size={18} />
                Explore Turing ES
              </Link>
            </ProductButton>
            <ProductButton identifier={accent} productVariant="ghost" size="lg" asChild>
              <a href="https://docs.viglet.org/turing/" target="_blank" rel="noopener">
                <IconBook size={18} />
                Get Started
              </a>
            </ProductButton>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm text-muted-foreground justify-center">
            <span className="flex items-center gap-1.5">
              <IconBrandOpenSource size={14} />
              Open Source
            </span>
            <span className="flex items-center gap-1.5">
              <IconScale size={14} />
              Apache 2.0
            </span>
            <span className="flex items-center gap-1.5">
              <IconBrandDocker size={14} />
              Self-hosted with Docker
            </span>
          </div>
        </div>
      </section>

      {/* ===== COMPARISON TABLE ===== */}
      <section className="py-20 px-6 bg-background border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <ProductBadge identifier={accent} className="mb-4">Side by side</ProductBadge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
              How they compare
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Objective differences on the dimensions that decide a search platform.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-bold text-muted-foreground w-1/4"></th>
                  <th className={`text-left p-4 text-base font-extrabold rounded-t-xl product-bg-${accent} text-white`}>
                    {comparison.table.vigletHeader}
                  </th>
                  <th className="text-left p-4 text-base font-bold text-foreground">
                    {comparison.table.otherHeader}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.table.rows.map((row) => (
                  <tr key={row.label} className="border-b border-border align-top">
                    <td className="p-4 text-sm font-bold text-foreground">
                      <span className="flex items-center gap-2">
                        <row.icon size={16} className={`product-text-${accent}`} />
                        {row.label}
                      </span>
                    </td>
                    <td className={`p-4 text-sm text-foreground bg-muted/40`}>
                      <span className="flex items-start gap-2">
                        <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 product-bg-${accent} text-white`}>
                          <IconCheck size={12} />
                        </span>
                        {row.viglet}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Comparison column describes hosted SaaS search in general terms; capabilities and pricing vary by vendor and plan.
            See the guides below for detailed, vendor-by-vendor breakdowns.
          </p>
        </div>
      </section>

      {/* ===== APPROACH ===== */}
      <section className="py-20 px-6 bg-muted border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <ProductBadge identifier={accent} className="mb-4">How it works</ProductBadge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
              The Viglet approach
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {comparison.approach.map((step, i) => (
              <div
                key={step.step}
                className={`flex flex-col bg-card border border-border rounded-2xl p-6 product-card-${accent}`}
              >
                <span className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md mb-4 product-bg-${accent}`}>
                  <span className="font-extrabold">{i + 1}</span>
                </span>
                <span className={`text-xs font-bold uppercase tracking-wider mb-1 product-text-${accent}`}>
                  {step.step}
                </span>
                <h3 className="font-bold text-foreground mb-1.5">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>

          {/* Products involved */}
          {products.length > 0 && (
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {products.map((p) => (
                <Link
                  key={p.identifier}
                  to={p.permalink}
                  className={`flex items-center gap-3 p-4 pr-6 rounded-2xl border border-border bg-card hover:-translate-y-0.5 transition-all no-underline product-card-${p.identifier}`}
                >
                  <VigletLogo identifier={p.identifier} size={40} />
                  <div>
                    <p className="font-bold text-foreground text-sm">{p.shortName}</p>
                    <p className="text-xs text-muted-foreground">{p.memo}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== GUIDES (cross-link into docs blog) ===== */}
      {relatedGuides.length > 0 && (
        <section className="py-20 px-6 bg-background border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <ProductBadge identifier={accent} className="mb-4">Go deeper</ProductBadge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
                Guides &amp; comparisons
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Step-by-step how-tos and honest, vendor-by-vendor comparisons on the Viglet blog.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {relatedGuides.map((g) => (
                <a
                  key={g.slug}
                  href={g.url}
                  target="_blank"
                  rel="noopener"
                  className={`group flex flex-col bg-card border border-border rounded-2xl p-6 hover:-translate-y-0.5 transition-all no-underline product-card-${accent}`}
                >
                  <p className="font-bold text-foreground mb-1.5 flex items-start gap-2">
                    {g.title}
                    <IconExternalLink size={14} className="text-muted-foreground shrink-0 mt-1" />
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{g.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FAQ ===== */}
      {comparison.faq.length > 0 && (
        <section className="py-20 px-6 bg-muted border-b border-border">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <ProductBadge identifier={accent} className="mb-4">FAQ</ProductBadge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                Common questions
              </h2>
            </div>
            <div className="space-y-4">
              {comparison.faq.map((f) => (
                <Card key={f.q} className="border-border">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-foreground mb-2">{f.q}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section className={`relative overflow-hidden product-hero-${accent}`}>
        <div className="absolute inset-0 download-hero-highlight" />
        <div className="max-w-4xl mx-auto py-16 px-6 text-center relative">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Own your search — open source, self-hosted
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
            Free, Apache 2.0, and ready to deploy from a single Docker image.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://turing.viglet.org"
              rel="noopener"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors text-sm no-underline"
            >
              <IconRocket size={16} />
              Explore Turing ES
            </a>
            <Link
              to="/turing/download/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-sm no-underline"
            >
              <IconBrandDocker size={16} />
              Run with Docker
              <IconArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
