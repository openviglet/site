import { useParams, Navigate } from 'react-router-dom'
import {
  IconDownload,
  IconSettings,
  IconBrandGithub,
  IconBook,
  IconTerminal2,
  IconWorld,
  IconLock,
  IconBrandDocker,
  IconFileZip,
  IconCheck,
  IconArrowRight,
  IconBrandWindows,
  IconCoffee,
  IconScale,
  IconCopy,
} from '@tabler/icons-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SolutionMenu from '@/components/SolutionMenu'
import { Card, CardContent } from '@/components/ui/card'
import { getSolution } from '@/data/solutions'
import VigletLogo from '@/components/VigletLogo'
import ProductBadge from '@/components/ProductBadge'
import ProductButton from '@/components/ProductButton'
import { getDownloadModulesBySolution } from '@/data/modules'
import { getFeaturesBySolution } from '@/data/features'
import { useState } from 'react'

function CopyableCommand({ command }: Readonly<{ command: string }>) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="bg-slate-900 rounded-xl px-4 py-3 flex items-center justify-between gap-3 group">
      <code className="text-sky-300 text-sm font-mono whitespace-nowrap overflow-x-auto">
        {command}
      </code>
      <button
        type="button"
        onClick={() => { navigator.clipboard.writeText(command); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
        className="text-slate-500 hover:text-white transition-colors shrink-0"
        aria-label="Copy command"
      >
        {copied ? <IconCheck size={16} className="text-green-400" /> : <IconCopy size={16} />}
      </button>
    </div>
  )
}

export default function DownloadPage() {
  const { identifier = '' } = useParams<{ identifier: string }>()
  const solution = getSolution(identifier)

  if (!solution) return <Navigate to="/" replace />

  const dlModules = getDownloadModulesBySolution(identifier)
  const solutionFeatures = getFeaturesBySolution(identifier)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <SolutionMenu solution={solution} />

      {/* ===== DOWNLOAD HERO ===== */}
      <section className="relative overflow-hidden py-20 px-6 border-b border-slate-100">
        <div className={`absolute inset-0 product-hero-${identifier} opacity-[0.03]`} />
        <div className={`absolute top-[-120px] right-[-120px] w-[700px] h-[700px] rounded-full pointer-events-none product-blob-${identifier}`} />
        <div className={`absolute bottom-[-200px] left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none product-blob-${identifier} opacity-50`} />

        <div className="max-w-5xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

            <div className="shrink-0">
              <VigletLogo identifier={identifier} size={180} glow />
            </div>

            <div className="flex-1 min-w-0 text-center md:text-left">
              <ProductBadge identifier={identifier} className="mb-4">
                v{solution.release} &mdash; Stable
              </ProductBadge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                Get {solution.shortName}
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed mb-3 max-w-2xl">
                {solution.description}
              </p>
              {solution.downloadMessage && (
                <p className="text-base text-slate-400 mb-8 max-w-2xl">{solution.downloadMessage}</p>
              )}

              {solution.downloadUrl && solution.release && (
                <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
                  <ProductButton identifier={identifier} size="lg" asChild>
                    <a href={solution.downloadUrl} target="_blank" rel="noopener">
                      <IconDownload size={18} />
                      Download {solution.release}
                    </a>
                  </ProductButton>
                  {solution.github && (
                    <ProductButton identifier={identifier} productVariant="ghost" size="lg" asChild>
                      <a href={`${solution.github}/releases`} target="_blank" rel="noopener">
                        <IconBrandGithub size={18} />
                        View on GitHub
                      </a>
                    </ProductButton>
                  )}
                </div>
              )}

              {/* File info bar */}
              {solution.downloadUrl && (
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm text-slate-400 justify-center md:justify-start">
                  <span className="flex items-center gap-1.5">
                    <IconFileZip size={14} />
                    {solution.fileType} &mdash; {solution.downloadSize}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <IconScale size={14} />
                    Apache 2.0 License
                  </span>
                  <span className="flex items-center gap-1.5">
                    <IconCoffee size={14} />
                    Java 21+
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SYSTEM REQUIREMENTS ===== */}
      <section className="py-14 px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="flex items-start gap-3">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 product-bg-${identifier} text-white`}>
                <IconCoffee size={18} />
              </span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Java 21+</p>
                <p className="text-xs text-slate-500">OpenJDK or Oracle JDK</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 product-bg-${identifier} text-white`}>
                <IconTerminal2 size={18} />
              </span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Linux</p>
                <p className="text-xs text-slate-500">Ubuntu, CentOS, Debian</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 product-bg-${identifier} text-white`}>
                <IconBrandWindows size={18} />
              </span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Windows</p>
                <p className="text-xs text-slate-500">Windows 10+ / Server 2019+</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 product-bg-${identifier} text-white`}>
                <IconBrandDocker size={18} />
              </span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Docker</p>
                <p className="text-xs text-slate-500">Container-ready deployment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GETTING STARTED STEPS ===== */}
      {solution.installationSteps && (
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <ProductBadge identifier={identifier} className="mb-4">Quick Start</ProductBadge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                Up and running in minutes
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                Three simple steps to get {solution.shortName} running on your machine.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              {/* Step 1: Download */}
              <Card>
                <CardContent className="p-5 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-extrabold text-sm sm:text-base product-bg-${identifier} shrink-0 shadow-lg`}>1</div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                      <IconDownload size={18} className={`product-text-${identifier}`} />
                      Download the JAR
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    Download the latest release of {solution.shortName}. The application is packaged as a single executable JAR file — no installation required.
                  </p>
                  {solution.downloadUrl && (
                    <ProductButton identifier={identifier} size="sm" asChild>
                      <a href={solution.downloadUrl} target="_blank" rel="noopener" className="truncate">
                        <IconDownload size={14} className="shrink-0" />
                        <span className="truncate">Download ({solution.downloadSize})</span>
                      </a>
                    </ProductButton>
                  )}
                </CardContent>
              </Card>

              {/* Step 2: Run */}
              <Card>
                <CardContent className="p-5 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-extrabold text-sm sm:text-base product-bg-${identifier} shrink-0 shadow-lg`}>2</div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                      <IconTerminal2 size={18} className={`product-text-${identifier}`} />
                      Run from terminal
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    Open your terminal, navigate to the download folder, and execute:
                  </p>
                  <CopyableCommand command={`java -jar ${solution.runJar}`} />
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <IconWorld size={14} className={`product-text-${identifier}`} />
                      Open{' '}
                      <a
                        href={`http://localhost:${solution.runPort}`}
                        target="_blank"
                        rel="noopener"
                        className={`product-text-${identifier} hover:underline font-medium`}
                      >
                        localhost:{solution.runPort}
                      </a>
                    </span>
                    {solution.appLogin && (
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <IconLock size={14} className={`product-text-${identifier}`} />
                        Login: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">{solution.appLogin}</code> / <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">{solution.appPassword}</code>
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
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                      <IconBook size={18} className={`product-text-${identifier}`} />
                      Explore the docs
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    Dive into the official documentation to discover all {solution.shortName} features, configuration options, and best practices.
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
                    {solution.github && (
                      <ProductButton identifier={identifier} productVariant="ghost" size="sm" asChild>
                        <a href={solution.github} target="_blank" rel="noopener">
                          <IconBrandGithub size={14} />
                          Source Code
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
        <section className="py-20 px-6 bg-white border-t border-slate-100">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <ProductBadge identifier={identifier} className="mb-4">Features</ProductBadge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                What's included
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
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
                        <h3 className="font-bold text-slate-900 mb-1">{feat.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{feat.content}</p>
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
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <ProductBadge identifier={identifier} className="mb-4">Integration</ProductBadge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                Connect to your ecosystem
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                Extend {solution.shortName} with ready-to-use integration modules.
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
                      <p className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                        {mod.title}
                        {mod.downloadUrl && (
                          <span className={`inline-flex items-center gap-1 text-xs font-medium product-text-${identifier}`}>
                            <IconDownload size={12} />
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-slate-500 leading-relaxed">{mod.description}</p>
                    </div>
                  </div>
                )
                return mod.downloadUrl ? (
                  <a
                    key={mod.title}
                    href={mod.downloadUrl}
                    target="_blank"
                    rel="noopener"
                    className={`block bg-white border border-slate-200 rounded-2xl p-5 hover:-translate-y-1 transition-all no-underline product-card-${identifier}`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={mod.title} className="bg-white border border-slate-200 rounded-2xl p-5">
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
            {solution.shortName} is open source and free to use. Join the community and start building today.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {solution.downloadUrl && (
              <a
                href={solution.downloadUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors text-sm no-underline"
              >
                <IconDownload size={16} />
                Download {solution.shortName}
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
