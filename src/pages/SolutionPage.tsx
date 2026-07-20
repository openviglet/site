import { useParams, Link, Navigate } from 'react-router-dom'
import {
  IconBrandDocker,
  IconSettings,
  IconBrandGithub,
  IconBook,
  IconArrowRight,
  IconCheck,
  IconScale,
  IconBrandOpenSource,
  IconFileDescription,
  IconExternalLink,
  IconRocket,
} from '@tabler/icons-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SolutionMenu from '@/components/SolutionMenu'
import { Card, CardContent } from '@/components/ui/card'
import { getSolution } from '@/data/solutions'
import VigletLogo from '@/components/VigletLogo'
import ProductBadge from '@/components/ProductBadge'
import ProductButton from '@/components/ProductButton'
import Terminal from '@/components/Terminal'
import { FloatingFormulasBg } from '@viglet/viglet-design-system'
import { useIsMobileOrTablet } from '@/hooks/use-mobile-or-tablet'
import { getFeaturesBySolution } from '@/data/features'
import { getModulesBySolution } from '@/data/modules'
import { getEssence } from '@/data/narrative'
import { useGuides, getGuidesBySolution } from '@/data/guides'

export default function SolutionPage() {
  const { identifier = '' } = useParams<{ identifier: string }>()
  const solution = getSolution(identifier)
  // W15 — cross-links into the docs blog integration/comparison guides for this
  // product. Dynamic: fetched from the docs endpoint (see data/guides.ts), with
  // a baked snapshot fallback. Products with no published guide render nothing.
  // Called before the early return to satisfy the Rules of Hooks.
  const allGuides = useGuides()
  const motionPaused = useIsMobileOrTablet()

  if (!solution) return <Navigate to="/" replace />

  const features = getFeaturesBySolution(identifier)
  const modules = getModulesBySolution(identifier)
  const essence = getEssence(identifier)
  const guides = getGuidesBySolution(allGuides, identifier)

  // Reusable terminal (W23): the one-command quick start for this product.
  const image = solution.dockerImage
  const port = solution.runPort
  const terminalLines = image && port
    ? [
        { cmd: `docker pull ${image}`, comment: 'get the image' },
        { cmd: `docker run -d -p ${port}:${port} --name ${identifier} ${image}`, comment: `then open localhost:${port}` },
      ]
    : []

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <Header />
      <SolutionMenu solution={solution} />

      {/* ===== PRODUCT HERO ===== */}
      <section className="relative overflow-hidden py-20 px-6 border-b border-border">
        <FloatingFormulasBg color="#C2410C" colorDark="#F97316" withLightning withExplosion extraTokens={["Turing", "Shio", "Dumont"]} motionPaused={motionPaused} />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

            <div className="shrink-0">
              <VigletLogo identifier={identifier} size={180} glow />
            </div>

            <div className="flex-1 min-w-0 text-center md:text-left">
              {solution.release && (
                <ProductBadge identifier={identifier} className="mb-4">
                  v{solution.release} &mdash; Stable
                </ProductBadge>
              )}
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-4">
                {solution.fullName}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                {essence?.tagline ?? solution.description}
              </p>

              <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
                {/* When a dedicated product site exists, it's the primary CTA —
                    this page is a portfolio teaser that funnels there. */}
                {solution.site && (
                  <ProductButton identifier={identifier} size="lg" asChild>
                    <a href={solution.site} rel="noopener">
                      <IconRocket size={18} />
                      Explore {solution.shortName}
                    </a>
                  </ProductButton>
                )}
                {solution.getStarted && (
                  <ProductButton
                    identifier={identifier}
                    productVariant={solution.site ? 'ghost' : 'primary'}
                    size="lg"
                    asChild
                  >
                    <a href={solution.getStarted} target="_blank" rel="noopener">
                      <IconBook size={18} />
                      Get Started
                    </a>
                  </ProductButton>
                )}
                {solution.release && (
                  <ProductButton identifier={identifier} productVariant="ghost" size="lg" asChild>
                    <Link to={`${solution.permalink}download/`}>
                      <IconBrandDocker size={18} />
                      Run with Docker
                    </Link>
                  </ProductButton>
                )}
              </div>

              {/* Info bar */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm text-muted-foreground justify-center md:justify-start">
                <span className="flex items-center gap-1.5">
                  <IconBrandOpenSource size={14} />
                  Open Source
                </span>
                <span className="flex items-center gap-1.5">
                  <IconScale size={14} />
                  Apache 2.0
                </span>
                <a
                  href="https://github.com/openviglet"
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors no-underline"
                >
                  <IconBrandGithub size={14} />
                  GitHub
                  <IconExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUICK LINKS BAR ===== */}
      <section className="py-10 px-6 bg-background border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4">
            {solution.release && (
              <Link
                to={`${solution.permalink}download/`}
                className={`flex items-center gap-4 p-4 rounded-2xl border border-border hover:-translate-y-0.5 transition-all no-underline product-card-${identifier}`}
              >
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 product-bg-${identifier}`}>
                  <IconBrandDocker size={18} />
                </span>
                <div>
                  <p className="font-bold text-foreground text-base">Run with Docker</p>
                  <p className="text-xs text-muted-foreground">v{solution.release} &mdash; ghcr.io image</p>
                </div>
              </Link>
            )}
            {solution.release && (
              <Link
                to={`${solution.permalink}release-notes/`}
                className={`flex items-center gap-4 p-4 rounded-2xl border border-border hover:-translate-y-0.5 transition-all no-underline product-card-${identifier}`}
              >
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 product-bg-${identifier}`}>
                  <IconFileDescription size={18} />
                </span>
                <div>
                  <p className="font-bold text-foreground text-base">Release Notes</p>
                  <p className="text-xs text-muted-foreground">Changelog & updates</p>
                </div>
              </Link>
            )}
            {solution.getStarted && (
              <a
                href={solution.getStarted}
                target="_blank"
                rel="noopener"
                className={`flex items-center gap-4 p-4 rounded-2xl border border-border hover:-translate-y-0.5 transition-all no-underline product-card-${identifier}`}
              >
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 product-bg-${identifier}`}>
                  <IconBook size={18} />
                </span>
                <div>
                  <p className="font-bold text-foreground text-base">Documentation</p>
                  <p className="text-xs text-muted-foreground">Guides & API reference</p>
                </div>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ===== ESSENCE — per-product pillars (W24) ===== */}
      {essence && (
        <section className="py-20 px-6 bg-muted border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <ProductBadge identifier={identifier} className="mb-4">What it does</ProductBadge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
                {solution.shortName}, in {essence.pillars.length} moves
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                The capabilities that define {solution.shortName} — not just a list of features.
              </p>
            </div>

            <div className={`grid gap-5 ${essence.pillars.length >= 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
              {essence.pillars.map((pillar) => (
                <div
                  key={pillar.step}
                  className={`flex flex-col bg-card border border-border rounded-2xl p-6 hover:-translate-y-0.5 transition-all product-card-${identifier}`}
                >
                  <span className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md mb-4 product-bg-${identifier}`}>
                    <pillar.icon size={20} />
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-wider mb-1 product-text-${identifier}`}>
                    {pillar.step}
                  </span>
                  <h3 className="font-bold text-foreground mb-1.5">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>

            {/* Reusable terminal (W23): one-command quick start */}
            {terminalLines.length > 0 && (
              <div className="max-w-2xl mx-auto mt-12">
                <Terminal title={`bash — ${identifier}`} lines={terminalLines} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== FEATURES ===== */}
      {features.length > 0 && (
        <section className="py-20 px-6 bg-background border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <ProductBadge identifier={identifier} className="mb-4">Features</ProductBadge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
                Built for enterprise
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Everything you need to power your {solution.shortName} deployment.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((feat) => (
                <Card key={feat.title} className={`group hover:-translate-y-0.5 transition-all product-card-${identifier}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <span className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 product-bg-${identifier} text-white`}>
                        <IconCheck size={14} />
                      </span>
                      <div>
                        <h3 className="font-bold text-foreground mb-1">{feat.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{feat.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== INTEGRATION MODULES ===== */}
      {modules.length > 0 && (
        <section className="py-20 px-6 bg-muted border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <ProductBadge identifier={identifier} className="mb-4">Integration</ProductBadge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
                Connect to your ecosystem
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Extend {solution.shortName} with ready-to-use integration modules.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {modules.map((mod) => {
                const inner = (
                  <div className="flex items-start gap-4">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 product-bg-${identifier}`}>
                      <IconSettings size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-foreground text-sm mb-1 flex items-center gap-2">
                        {mod.title}
                        {mod.githubUrl && (
                          <IconExternalLink size={12} className="text-muted-foreground" />
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{mod.description}</p>
                    </div>
                  </div>
                )
                return mod.githubUrl ? (
                  <a
                    key={mod.title}
                    href={mod.githubUrl}
                    target="_blank"
                    rel="noopener"
                    className={`block bg-card border border-border rounded-2xl p-5 hover:-translate-y-1 transition-all no-underline product-card-${identifier}`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={mod.title} className="bg-card border border-border rounded-2xl p-5">
                    {inner}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== GUIDES — cross-links into docs blog (W15) ===== */}
      {guides.length > 0 && (
        <section className="py-20 px-6 bg-background border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <ProductBadge identifier={identifier} className="mb-4">Guides</ProductBadge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
                How-tos &amp; comparisons
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Step-by-step integration guides and honest comparisons on the Viglet blog.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {guides.map((g) => (
                <a
                  key={g.slug}
                  href={g.url}
                  target="_blank"
                  rel="noopener"
                  className={`group flex flex-col bg-card border border-border rounded-2xl p-6 hover:-translate-y-0.5 transition-all no-underline product-card-${identifier}`}
                >
                  <p className="font-bold text-foreground mb-1.5 flex items-start gap-2">
                    {g.title}
                    <IconExternalLink size={14} className="text-muted-foreground shrink-0 mt-1" />
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{g.description}</p>
                </a>
              ))}
            </div>
            <div className="text-center mt-8">
              <a
                href="https://docs.viglet.org/blog"
                target="_blank"
                rel="noopener"
                className={`inline-flex items-center gap-1.5 text-sm font-bold no-underline product-text-${identifier}`}
              >
                All guides on the blog
                <IconArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA BANNER ===== */}
      <section className={`relative overflow-hidden product-hero-${identifier}`}>
        <div className="absolute inset-0 download-hero-highlight" />
        <div className="max-w-4xl mx-auto py-16 px-6 text-center relative">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Ready to try {solution.shortName}?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
            Free, open source, and ready to deploy. Get started in minutes.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {solution.site && (
              <a
                href={solution.site}
                rel="noopener"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors text-sm no-underline"
              >
                <IconRocket size={16} />
                Explore {solution.shortName}
              </a>
            )}
            {solution.release && (
              <Link
                to={`${solution.permalink}download/`}
                className={`inline-flex items-center gap-2 px-6 py-3 font-bold rounded-xl transition-colors text-sm no-underline ${
                  solution.site
                    ? 'border border-white/30 text-white hover:bg-white/10'
                    : 'bg-white text-slate-900 hover:bg-slate-100'
                }`}
              >
                <IconBrandDocker size={16} />
                Run {solution.shortName} with Docker
              </Link>
            )}
            {solution.getStarted && (
              <a
                href={solution.getStarted}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-sm no-underline"
              >
                Documentation
                <IconArrowRight size={16} />
              </a>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
