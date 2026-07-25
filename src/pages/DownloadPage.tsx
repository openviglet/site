import { useParams, Navigate } from 'react-router-dom'
import {
  IconSettings,
  IconBook,
  IconTerminal2,
  IconWorld,
  IconLock,
  IconBrandDocker,
  IconCheck,
  IconArrowRight,
  IconScale,
  IconPackage,
  IconDownload,
} from '@tabler/icons-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SolutionMenu from '@/components/SolutionMenu'
import { Card, CardContent } from '@/components/ui/card'
import { getSolution } from '@/data/solutions'
import VigletLogo from '@/components/VigletLogo'
import ProductBadge from '@/components/ProductBadge'
import ProductButton from '@/components/ProductButton'
import { FloatingFormulasBg } from '@viglet/viglet-design-system'
import { useIsMobileOrTablet } from '@/hooks/use-mobile-or-tablet'
import { getDownloadModulesBySolution } from '@/data/modules'
import { getFeaturesBySolution } from '@/data/features'
import { CommandBlock } from '@/components/Terminal'

export default function DownloadPage() {
  const { identifier = '' } = useParams<{ identifier: string }>()
  const solution = getSolution(identifier)
  const motionPaused = useIsMobileOrTablet()

  if (!solution) return <Navigate to="/" replace />

  const dlModules = getDownloadModulesBySolution(identifier)
  const solutionFeatures = getFeaturesBySolution(identifier)

  // Products are distributed exclusively as Docker images on the GitHub
  // Container Registry (ghcr.io). Everything below is derived from `dockerImage`.
  const image = solution.dockerImage
  // Tag is omitted — Docker defaults to `:latest`, and this keeps the shown
  // commands consistent with the bare image name in the info bar below.
  const port = solution.runPort
  const pullCmd = image ? `docker pull ${image}` : ''
  const runCmd = image && port
    ? `docker run -d -p ${port}:${port} --name ${identifier} ${image}`
    : ''
  // GHCR container package page (org-level packages URL).
  const packagesUrl = solution.githubOrg
    ? `https://github.com/orgs/${solution.githubOrg}/packages/container/package/${identifier}-ce`
    : undefined

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <Header />
      <SolutionMenu solution={solution} />

      {/* ===== DOWNLOAD HERO ===== */}
      <section className="relative overflow-hidden py-20 px-6 border-b border-border">
        <FloatingFormulasBg color="#C2410C" colorDark="#F97316" withLightning withExplosion extraTokens={["Turing", "Shio", "Dumont"]} motionPaused={motionPaused} />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

            <div className="shrink-0">
              <VigletLogo identifier={identifier} size={180} glow />
            </div>

            <div className="flex-1 min-w-0 text-center md:text-left">
              <ProductBadge identifier={identifier} className="mb-4">
                v{solution.release} &mdash; Stable
              </ProductBadge>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-4">
                Run {solution.shortName}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-3 max-w-2xl">
                {solution.description}
              </p>
              {solution.downloadMessage && (
                <p className="text-base text-muted-foreground mb-6 max-w-2xl">{solution.downloadMessage}</p>
              )}

              {/* One command to run it — no download, no install. */}
              {runCmd && (
                <div className="max-w-2xl mb-6">
                  <CommandBlock command={runCmd} />
                </div>
              )}

              <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
                {packagesUrl && (
                  <ProductButton identifier={identifier} size="lg" asChild>
                    <a href={packagesUrl} target="_blank" rel="noopener">
                      <IconPackage size={18} />
                      View on GHCR
                    </a>
                  </ProductButton>
                )}
              </div>

              {/* Info bar */}
              {image && (
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm text-muted-foreground justify-center md:justify-start">
                  <span className="flex items-center gap-1.5">
                    <IconBrandDocker size={14} />
                    {image}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <IconScale size={14} />
                    Apache 2.0 License
                  </span>
                  <span className="flex items-center gap-1.5">
                    <IconCheck size={14} />
                    No install &mdash; runtime bundled
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PREREQUISITES ===== */}
      <section className="py-14 px-6 bg-background border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <ProductBadge identifier={identifier} className="mb-4">Prerequisites</ProductBadge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              The only requirement is Docker
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            <div className="flex items-start gap-3">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 product-bg-${identifier} text-white`}>
                <IconBrandDocker size={18} />
              </span>
              <div>
                <p className="font-bold text-foreground text-sm">Docker</p>
                <p className="text-xs text-muted-foreground">Docker Engine 20+ or Docker Desktop</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 product-bg-${identifier} text-white`}>
                <IconTerminal2 size={18} />
              </span>
              <div>
                <p className="font-bold text-foreground text-sm">Any OS</p>
                <p className="text-xs text-muted-foreground">Linux, Windows &amp; macOS</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 product-bg-${identifier} text-white`}>
                <IconWorld size={18} />
              </span>
              <div>
                <p className="font-bold text-foreground text-sm">One free port</p>
                <p className="text-xs text-muted-foreground">Port {port} available on the host</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GETTING STARTED STEPS ===== */}
      {solution.installationSteps && image && (
        <section className="py-20 px-6 bg-muted">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <ProductBadge identifier={identifier} className="mb-4">Quick Start</ProductBadge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
                Up and running in minutes
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Three simple steps to get {solution.shortName} running with Docker.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              {/* Step 1: Pull */}
              <Card>
                <CardContent className="p-5 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-extrabold text-sm sm:text-base product-bg-${identifier} shrink-0 shadow-lg`}>1</div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                      <IconBrandDocker size={18} className={`product-text-${identifier}`} />
                      Pull the image
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Pull the latest {solution.shortName} image from the GitHub Container Registry. The container ships with everything bundled — no Java, no manual setup.
                  </p>
                  <CommandBlock command={pullCmd} />
                </CardContent>
              </Card>

              {/* Step 2: Run */}
              <Card>
                <CardContent className="p-5 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-extrabold text-sm sm:text-base product-bg-${identifier} shrink-0 shadow-lg`}>2</div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                      <IconTerminal2 size={18} className={`product-text-${identifier}`} />
                      Run the container
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Start {solution.shortName} in the background, mapping the container port to your host:
                  </p>
                  <CommandBlock command={runCmd} />
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <IconWorld size={14} className={`product-text-${identifier}`} />
                      Open{' '}
                      <a
                        href={`http://localhost:${port}`}
                        target="_blank"
                        rel="noopener"
                        className={`product-text-${identifier} hover:underline font-medium`}
                      >
                        localhost:{port}
                      </a>
                    </span>
                    {solution.appLogin && (
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <IconLock size={14} className={`product-text-${identifier}`} />
                        Login: <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">{solution.appLogin}</code> / <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">{solution.appPassword}</code>
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Step 3: Explore */}
              <Card>
                <CardContent className="p-5 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-extrabold text-sm sm:text-base product-bg-${identifier} shrink-0 shadow-lg`}>3</div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                      <IconBook size={18} className={`product-text-${identifier}`} />
                      Explore the docs
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Dive into the official documentation to discover all {solution.shortName} features, environment variables, and production deployment with Docker Compose.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {solution.getStarted && (
                      <ProductButton identifier={identifier} size="sm" asChild>
                        <a href={solution.getStarted} target="_blank" rel="noopener">
                          <IconBook size={14} />
                          Read the Docs
                        </a>
                      </ProductButton>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* ===== WHAT'S INCLUDED (features) ===== */}
      {solutionFeatures.length > 0 && (
        <section className="py-20 px-6 bg-background border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <ProductBadge identifier={identifier} className="mb-4">Features</ProductBadge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
                What's included
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Everything you get out of the box with {solution.shortName}.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {solutionFeatures.map((feat) => (
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
      {dlModules.length > 0 && (
        <section className="py-20 px-6 bg-muted">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <ProductBadge identifier={identifier} className="mb-4">Integration</ProductBadge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
                Connect to your ecosystem
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                {solution.shortName} ships with ready-to-use integration modules, all bundled in the image.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {dlModules.map((mod) => {
                const inner = (
                  <div className="flex items-start gap-4">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 product-bg-${identifier}`}>
                      <IconSettings size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-foreground text-sm mb-1 flex items-center gap-2">
                        {mod.title}
                        {mod.downloadUrl && (
                          <span className={`inline-flex items-center gap-1 text-xs font-medium product-text-${identifier}`}>
                            <IconDownload size={12} />
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{mod.description}</p>
                    </div>
                  </div>
                )
                return mod.downloadUrl ? (
                  <a
                    key={mod.title}
                    href={mod.downloadUrl}
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

      {/* ===== CTA BANNER ===== */}
      <section className={`relative overflow-hidden product-hero-${identifier}`}>
        <div className="absolute inset-0 download-hero-highlight" />
        <div className="max-w-4xl mx-auto py-16 px-6 text-center relative">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
            {solution.shortName} is open source and free to use. Pull the image and start building today.
          </p>
          {runCmd && (
            <div className="max-w-xl mx-auto mb-8 text-left">
              <CommandBlock command={runCmd} />
            </div>
          )}
          <div className="flex flex-wrap gap-3 justify-center">
            {packagesUrl && (
              <a
                href={packagesUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors text-sm no-underline"
              >
                <IconPackage size={16} />
                View on GHCR
              </a>
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
