import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Package, Code2, Github, Linkedin } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { solutions, type Solution } from '@/data/solutions'

const stableSolutions = [...solutions].sort((a, b) => a.order - b.order)

const CARD = 'bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-hover transition-all duration-200 no-underline'

// ── Layout 1: Row with alternating tilts ────────────────────────────────────
function LayoutRow({ sols }: { sols: Solution[] }) {
  const tilts = [
    '-rotate-2 -translate-y-1 hover:rotate-0 hover:translate-y-0',
    'translate-y-3 hover:translate-y-0',
    'rotate-2 -translate-y-1 hover:rotate-0 hover:translate-y-0',
  ]
  return (
    <div className="flex items-start gap-3">
      {sols.map((sol, i) => (
        <Link
          key={sol.identifier}
          to={sol.permalink}
          className={`${CARD} flex flex-col justify-between flex-1 min-h-[164px] p-5 ${tilts[i]}`}
        >
          <span className={`w-11 h-11 rounded-xl flex items-center justify-center text-white text-base font-extrabold product-bg-${sol.identifier}`}>
            {sol.logoAcronym}
          </span>
          <div>
            <p className="font-bold text-slate-900 text-sm">{sol.shortName}</p>
            <p className="text-xs text-slate-500 line-clamp-2 mt-1">{sol.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

// ── Layout 2: Asymmetric — tall card left, two stacked right ────────────────
function LayoutAsymmetric({ sols }: { sols: Solution[] }) {
  return (
    <div className="flex gap-3 h-[236px]">
      <Link
        to={sols[0].permalink}
        className={`${CARD} flex flex-col justify-between w-[42%] p-5 -rotate-1 hover:rotate-0`}
      >
        <span className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-extrabold product-bg-${sols[0].identifier}`}>
          {sols[0].logoAcronym}
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{sols[0].logoSection}</p>
          <p className="font-bold text-slate-900">{sols[0].shortName}</p>
          <p className="text-xs text-slate-500 line-clamp-3 mt-1">{sols[0].description}</p>
        </div>
      </Link>
      <div className="flex flex-col gap-3 flex-1">
        {sols.slice(1).map((sol, i) => (
          <Link
            key={sol.identifier}
            to={sol.permalink}
            className={`${CARD} flex flex-col justify-between flex-1 p-4 ${i === 0 ? 'translate-x-1 hover:translate-x-0' : '-translate-x-1 hover:translate-x-0'}`}
          >
            <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-extrabold product-bg-${sol.identifier}`}>
              {sol.logoAcronym}
            </span>
            <div>
              <p className="font-bold text-slate-900 text-sm">{sol.shortName}</p>
              <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{sol.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ── Layout 3: Podium — centre card is featured ──────────────────────────────
function LayoutPodium({ sols }: { sols: Solution[] }) {
  const configs = [
    'scale-95 translate-y-5 opacity-80 hover:scale-100 hover:translate-y-0 hover:opacity-100',
    'scale-100 -translate-y-1 z-10 ring-1 ring-brand/10 shadow-hover hover:-translate-y-3',
    'scale-95 translate-y-5 opacity-80 hover:scale-100 hover:translate-y-0 hover:opacity-100',
  ]
  return (
    <div className="flex items-start gap-3">
      {sols.map((sol, i) => (
        <Link
          key={sol.identifier}
          to={sol.permalink}
          className={`${CARD} flex flex-col justify-between flex-1 min-h-[164px] p-5 ${configs[i]}`}
        >
          <span className={`w-11 h-11 rounded-xl flex items-center justify-center text-white text-base font-extrabold product-bg-${sol.identifier}`}>
            {sol.logoAcronym}
          </span>
          <div>
            {i === 1 && (
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{sol.logoSection}</p>
            )}
            <p className="font-bold text-slate-900 text-sm">{sol.shortName}</p>
            <p className="text-xs text-slate-500 line-clamp-2 mt-1">{sol.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

// ── Layout 4: Cascade — diagonal staircase, hover lifts to front ────────────
function LayoutCascade({ sols }: { sols: Solution[] }) {
  const positions = [
    'top-0 left-0 w-[65%] z-[1] hover:z-30 -rotate-1 hover:rotate-0',
    'top-[26%] left-[17.5%] w-[65%] z-[2] hover:z-30',
    'bottom-0 right-0 w-[65%] z-[3] hover:z-30 rotate-1 hover:rotate-0',
  ]
  return (
    <div className="relative h-[228px]">
      {sols.map((sol, i) => (
        <Link
          key={sol.identifier}
          to={sol.permalink}
          className={`absolute ${CARD} flex flex-col justify-between p-5 ${positions[i]}`}
          style={{ minHeight: 108 }}
        >
          <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-extrabold product-bg-${sol.identifier}`}>
            {sol.logoAcronym}
          </span>
          <div>
            <p className="font-bold text-slate-900 text-sm">{sol.shortName}</p>
            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{sol.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

// ── Layout 5: Bento grid ────────────────────────────────────────────────────
function LayoutBento({ sols }: { sols: Solution[] }) {
  return (
    <div className="grid grid-cols-5 grid-rows-2 gap-3 h-[228px]">
      <Link
        to={sols[0].permalink}
        className={`${CARD} flex flex-col justify-between col-span-2 row-span-2 p-5`}
      >
        <span className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-extrabold product-bg-${sols[0].identifier}`}>
          {sols[0].logoAcronym}
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{sols[0].logoSection}</p>
          <p className="font-bold text-slate-900">{sols[0].shortName}</p>
          <p className="text-xs text-slate-500 line-clamp-3 mt-1">{sols[0].description}</p>
        </div>
      </Link>
      {sols.slice(1).map((sol) => (
        <Link
          key={sol.identifier}
          to={sol.permalink}
          className={`${CARD} flex flex-row items-center gap-3 col-span-3 row-span-1 p-4`}
        >
          <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-extrabold product-bg-${sol.identifier} shrink-0`}>
            {sol.logoAcronym}
          </span>
          <div className="min-w-0">
            <p className="font-bold text-slate-900 text-sm">{sol.shortName}</p>
            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{sol.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

// ── Dispatcher ──────────────────────────────────────────────────────────────
const LAYOUTS = ['row', 'asymmetric', 'podium', 'cascade', 'bento'] as const
type Layout = (typeof LAYOUTS)[number]

function HeroCards({ sols }: { sols: Solution[] }) {
  const layout = useMemo<Layout>(
    () => LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)],
    [],
  )
  if (layout === 'row')        return <LayoutRow        sols={sols} />
  if (layout === 'asymmetric') return <LayoutAsymmetric sols={sols} />
  if (layout === 'podium')     return <LayoutPodium     sols={sols} />
  if (layout === 'cascade')    return <LayoutCascade    sols={sols} />
  return                              <LayoutBento      sols={sols} />
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-white pt-20 pb-24 px-6">
        <div className="absolute top-[-80px] right-[-80px] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(194,65,12,0.09),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-40px] w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3.5 py-1.5 text-sm font-semibold text-brand shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-gradient-to-br from-brand to-brand-light" />
              Open Source Platform
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Open Source Tools for{' '}
              <span className="vg-gradient-text">Enterprise Intelligence</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-lg">
              Data extraction, content management, and semantic search — built for developers, trusted by enterprises.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#products">
                  Explore Products
                  <ArrowRight size={16} />
                </a>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <a href="https://docs.viglet.com" target="_blank" rel="noopener">
                  Read the Docs
                </a>
              </Button>
            </div>
          </div>

          {/* Random product card layout */}
          <div className="hidden md:block">
            <HeroCards sols={stableSolutions} />
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap divide-x divide-slate-200">
            {[
              { icon: <Package size={20} className="text-brand" />, value: '3', label: 'Open Source Projects', bg: 'bg-brand-bg' },
              { icon: <Code2 size={20} className="text-brand" />, value: '100%', label: 'Open Source', bg: 'bg-brand-bg' },
              { icon: <Github size={20} className="text-emerald-600" />, value: 'Apache 2.0', label: 'License', bg: 'bg-emerald-50' },
              { icon: <span className="text-orange-500 font-extrabold text-sm">Java</span>, value: 'Spring Boot', label: 'Backend Stack', bg: 'bg-orange-50' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 flex-1 px-8 py-6 min-w-[180px]">
                <span className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center shrink-0`}>
                  {item.icon}
                </span>
                <div>
                  <p className="text-xl font-extrabold text-slate-900 leading-none">{item.value}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section id="products" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="brand" className="mb-4">Products</Badge>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              The Viglet Suite
            </h2>
            <p className="text-slate-500 text-lg mt-3 max-w-xl mx-auto">
              Three complementary tools that work independently or together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stableSolutions.map((sol) => (
              <Card
                key={sol.identifier}
                className="flex flex-col hover:shadow-hover hover:-translate-y-1 transition-all"
              >
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-extrabold shrink-0 product-bg-${sol.identifier}`}
                    >
                      {sol.logoAcronym}
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {sol.logoSection}
                      </p>
                      <p className="font-bold text-slate-900">{sol.shortName}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-6">
                    {sol.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link
                      to={sol.permalink}
                      className="flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark transition-colors no-underline group"
                    >
                      Learn More
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    {sol.release && (
                      <span className="text-xs text-slate-400 font-medium">v{sol.release}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMMUNITY ===== */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="brand" className="mb-4">Community</Badge>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Join the conversation
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a
              href="https://www.linkedin.com/company/viglet"
              target="_blank"
              rel="noopener"
              className="block bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-hover hover:-translate-y-1 transition-all no-underline"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-12 rounded-xl bg-[#0A66C2] flex items-center justify-center">
                  <Linkedin size={20} className="text-white" />
                </span>
                <div>
                  <p className="font-bold text-slate-900">LinkedIn</p>
                  <p className="text-xs text-slate-500">@viglet</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Follow us for product updates, engineering insights, and community news.
              </p>
              <span className="text-sm font-semibold text-[#0A66C2]">Follow on LinkedIn →</span>
            </a>

            <a
              href="https://github.com/openviglet"
              target="_blank"
              rel="noopener"
              className="block bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-hover hover:-translate-y-1 transition-all no-underline"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center">
                  <Github size={20} className="text-white" />
                </span>
                <div>
                  <p className="font-bold text-slate-900">GitHub</p>
                  <p className="text-xs text-slate-500">openviglet</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Explore the source, open issues, submit pull requests, and shape the roadmap.
              </p>
              <span className="text-sm font-semibold text-slate-900">Star on GitHub →</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
