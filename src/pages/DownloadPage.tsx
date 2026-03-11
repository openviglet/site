import { useParams, Navigate } from 'react-router-dom'
import { IconDownload, IconSettings } from '@tabler/icons-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SolutionMenu from '@/components/SolutionMenu'
import { Card, CardContent } from '@/components/ui/card'
import { getSolution } from '@/data/solutions'
import VigletLogo from '@/components/VigletLogo'
import ProductBadge from '@/components/ProductBadge'
import ProductButton from '@/components/ProductButton'
import { getDownloadModulesBySolution } from '@/data/modules'

export default function DownloadPage() {
  const { identifier = '' } = useParams<{ identifier: string }>()
  const solution = getSolution(identifier)

  if (!solution) return <Navigate to="/" replace />

  const dlModules = getDownloadModulesBySolution(identifier)


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <SolutionMenu solution={solution} />

      {/* ===== DOWNLOAD HERO ===== */}
      <section className="relative bg-white border-b border-slate-100 overflow-hidden py-16 px-6">
        <div className={`absolute top-[-80px] right-[-80px] w-[560px] h-[560px] rounded-full pointer-events-none product-blob-${identifier}`} />
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">

            <div className="shrink-0">
              <VigletLogo identifier={identifier} size={160} glow />
            </div>

            <div className="flex-1 min-w-0">
              <ProductBadge identifier={identifier} className="mb-4">Download</ProductBadge>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                Get {solution.shortName}
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl">
                {solution.description}
              </p>

              {solution.downloadUrl && solution.release && (
                <div className="flex flex-wrap gap-3 items-center">
                  <ProductButton identifier={identifier} size="lg" asChild>
                    <a href={solution.downloadUrl} target="_blank" rel="noopener">
                      <IconDownload size={16} />
                      Download {solution.release}
                    </a>
                  </ProductButton>
                  <span className="text-sm text-slate-400">
                    {solution.fileType} &mdash; {solution.downloadSize}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== DOWNLOAD CARD ===== */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-lg mx-auto">
          <Card className={`border-slate-200 product-card-${identifier}`}>
            <CardContent className="p-10 text-center">
              <span
                className={`inline-flex items-center px-3.5 py-1 rounded-full text-sm font-bold text-white mb-6 product-bg-${identifier}`}
              >
                v{solution.release}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
                {solution.shortName} {solution.release}
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">{solution.downloadMessage}</p>
              {solution.downloadUrl && (
                <ProductButton identifier={identifier} size="lg" className="w-full mb-4" asChild>
                  <a href={solution.downloadUrl} target="_blank" rel="noopener">
                    <IconDownload size={18} />
                    Download {solution.shortName} {solution.release}
                  </a>
                </ProductButton>
              )}
              <p className="text-xs text-slate-400">
                {solution.fileType} &mdash; {solution.downloadSize}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ===== GETTING STARTED STEPS ===== */}
      {solution.installationSteps && (
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <ProductBadge identifier={identifier} className="mb-4">Quick Start</ProductBadge>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Up and running in minutes
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-8">
                  <p className={`text-3xl font-extrabold mb-4 product-text-${identifier}`}>1</p>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Requirements</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {solution.shortName} is built on Java. You need{' '}
                    <strong>Java 14+</strong> installed. Runs on Linux and Windows.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <p className={`text-3xl font-extrabold mb-4 product-text-${identifier}`}>2</p>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Run</h3>
                  <p className="text-sm text-slate-500 mb-3">From your terminal, execute:</p>
                  <div className="bg-slate-900 rounded-xl px-4 py-3 mb-3">
                    <code className="text-sky-300 text-sm font-mono whitespace-nowrap">
                      java -jar {solution.runJar}
                    </code>
                  </div>
                  <p className="text-xs text-slate-400">
                    Open{' '}
                    <a
                      href={`http://localhost:${solution.runPort}`}
                      target="_blank"
                      rel="noopener"
                      className={`product-text-${identifier} hover:underline`}
                    >
                      localhost:{solution.runPort}
                    </a>{' '}
                    in your browser.
                    {solution.appLogin && (
                      <> Login: <code>{solution.appLogin}</code> / <code>{solution.appPassword}</code></>
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <p className={`text-3xl font-extrabold mb-4 product-text-${identifier}`}>3</p>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Documentation</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">
                    Explore everything {solution.shortName} can do in the official docs.
                  </p>
                  {solution.getStarted && (
                    <ProductButton identifier={identifier} size="sm" asChild>
                      <a href={solution.getStarted} target="_blank" rel="noopener">
                        Read the Docs
                      </a>
                    </ProductButton>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* ===== INTEGRATION MODULES ===== */}
      {dlModules.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <ProductBadge identifier={identifier} className="mb-4">Integration</ProductBadge>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Connect to your ecosystem
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {dlModules.map((mod) => {
                const inner = (
                  <div className="flex items-start gap-4">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-content text-white shrink-0 product-bg-${identifier}`}>
                      <IconSettings size={16} className="mx-auto" />
                    </span>
                    <div>
                      <p className="font-bold text-slate-900 text-sm mb-1">{mod.title}</p>
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

      <Footer />
    </div>
  )
}
