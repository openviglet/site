import { useParams, Link, Navigate } from 'react-router-dom'
import { Download, ArrowRight, Settings } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SolutionMenu from '@/components/SolutionMenu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getSolution } from '@/data/solutions'
import { getFeaturesBySolution } from '@/data/features'
import { getModulesBySolution } from '@/data/modules'

export default function SolutionPage() {
  const { identifier = '' } = useParams<{ identifier: string }>()
  const solution = getSolution(identifier)

  if (!solution) return <Navigate to="/" replace />

  const features = getFeaturesBySolution(identifier)
  const modules = getModulesBySolution(identifier)


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <SolutionMenu solution={solution} />

      {/* ===== PRODUCT HERO ===== */}
      <section className="relative bg-white border-b border-slate-100 overflow-hidden py-16 px-6">
        <div className={`absolute top-[-80px] right-[-80px] w-[480px] h-[480px] rounded-full pointer-events-none product-blob-${identifier}`} />
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span
              className={`w-14 h-14 rounded-2xl flex items-center justify-content text-white text-xl font-extrabold shrink-0 product-bg-${identifier}`}
            >
              <span className="w-full text-center">{solution.logoAcronym}</span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
              {solution.logoSection}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {solution.fullName}
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl">
            {solution.description}
          </p>

          <div className="flex flex-wrap gap-3 items-center">
            {solution.getStarted && (
              <Button size="lg" asChild>
                <a href={solution.getStarted} target="_blank" rel="noopener">
                  Get Started
                </a>
              </Button>
            )}
            {solution.release && (
              <>
                <Button variant="ghost" size="lg" asChild>
                  <Link to={`${solution.permalink}download/`}>
                    <Download size={16} />
                    Download {solution.release}
                  </Link>
                </Button>
                <Button variant="ghost" size="lg" asChild>
                  <Link to={`${solution.permalink}release-notes/`}>
                    Release Notes
                  </Link>
                </Button>
              </>
            )}
          </div>

          {solution.githubCiImage && solution.githubCiUrl && (
            <div className="mt-6">
              <a href={solution.githubCiUrl} target="_blank" rel="noopener">
                <img src={solution.githubCiImage} alt={`${solution.shortName} CI status`} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ===== FEATURES + GITHUB FEED ===== */}
      {features.length > 0 && (
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">
              {/* Features grid */}
              <div>
                <Badge variant="brand" className="mb-6">Features</Badge>
                <div className="grid sm:grid-cols-2 gap-5">
                  {features.map((feat) => (
                    <Card key={feat.title} className="hover:shadow-hover hover:-translate-y-1 transition-all">
                      <CardContent className="p-6">
                        <h3 className={`font-bold text-base mb-2 product-text-${identifier}`}>
                          {feat.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{feat.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* GitHub feed sidebar */}
              <aside className="lg:sticky lg:top-[128px] bg-white border border-slate-200 rounded-2xl p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                  Track {solution.shortName} development
                </p>
                {solution.githubCiImage && solution.githubCiUrl && (
                  <div className="mb-4">
                    <a href={solution.githubCiUrl} target="_blank" rel="noopener">
                      <img src={solution.githubCiImage} alt="CI status" />
                    </a>
                  </div>
                )}
                {solution.github && (
                  <a
                    href={solution.github}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center justify-between text-sm font-semibold text-slate-700 hover:text-brand transition-colors no-underline"
                  >
                    View on GitHub <ArrowRight size={14} />
                  </a>
                )}
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* ===== INTEGRATION MODULES ===== */}
      {modules.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <Badge variant="brand" className="mb-4">Integration</Badge>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Connect to your ecosystem
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {modules.map((mod) => {
                const inner = (
                  <div className="flex items-start gap-4">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-content text-white shrink-0 product-bg-${identifier}`}>
                      <Settings size={16} className="mx-auto" />
                    </span>
                    <div>
                      <p className="font-bold text-slate-900 text-sm mb-1">{mod.title}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{mod.description}</p>
                    </div>
                  </div>
                )
                return mod.githubUrl ? (
                  <a
                    key={mod.title}
                    href={mod.githubUrl}
                    target="_blank"
                    rel="noopener"
                    className="block bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-hover hover:-translate-y-1 hover:border-brand-border transition-all no-underline"
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
