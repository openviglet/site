import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRight, IconPackage, IconCode } from '@tabler/icons-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { solutions, type Solution } from '@/data/solutions'
import VigletLogo from '@/components/VigletLogo'

const stableSolutions = [...solutions].sort((a, b) => a.order - b.order)

const CARD = 'bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-hover transition-all duration-200 no-underline'

// ── Inline brand SVGs (Github/Linkedin removed from lucide as deprecated) ────
function GitHubSvg({ size = 20, className = '' }: Readonly<{ size?: number; className?: string }>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.52 11.52 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function RedditSvg({ size = 20, className = '' }: Readonly<{ size?: number; className?: string }>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  )
}

function LinkedInSvg({ size = 20, className = '' }: Readonly<{ size?: number; className?: string }>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// ── Layout 1: Row with alternating tilts ────────────────────────────────────
function LayoutRow({ sols }: Readonly<{ sols: Solution[] }>) {
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
          <VigletLogo identifier={sol.identifier} size={44} />
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
function LayoutAsymmetric({ sols }: Readonly<{ sols: Solution[] }>) {
  return (
    <div className="flex gap-3 h-[236px]">
      <Link
        to={sols[0].permalink}
        className={`${CARD} flex flex-col justify-between w-[42%] p-5 -rotate-1 hover:rotate-0`}
      >
        <VigletLogo identifier={sols[0].identifier} size={48} />
        <div>
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
            <VigletLogo identifier={sol.identifier} size={36} />
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
function LayoutPodium({ sols }: Readonly<{ sols: Solution[] }>) {
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
          <VigletLogo identifier={sol.identifier} size={44} />
          <div>
            <p className="font-bold text-slate-900 text-sm">{sol.shortName}</p>
            <p className="text-xs text-slate-500 line-clamp-2 mt-1">{sol.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

// ── Layout 4: Cascade — diagonal staircase, hover lifts to front ────────────
function LayoutCascade({ sols }: Readonly<{ sols: Solution[] }>) {
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
          <VigletLogo identifier={sol.identifier} size={40} />
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
function LayoutBento({ sols }: Readonly<{ sols: Solution[] }>) {
  return (
    <div className="grid grid-cols-5 grid-rows-2 gap-3 h-[228px]">
      <Link
        to={sols[0].permalink}
        className={`${CARD} flex flex-col justify-between col-span-2 row-span-2 p-5`}
      >
        <VigletLogo identifier={sols[0].identifier} size={48} />
        <div>
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
          <VigletLogo identifier={sol.identifier} size={40} />
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

function HeroCards({ sols }: Readonly<{ sols: Solution[] }>) {
  const layout = useMemo<Layout>(
    () => LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)],
    [],
  )
  if (layout === 'row') return <LayoutRow sols={sols} />
  if (layout === 'asymmetric') return <LayoutAsymmetric sols={sols} />
  if (layout === 'podium') return <LayoutPodium sols={sols} />
  if (layout === 'cascade') return <LayoutCascade sols={sols} />
  return <LayoutBento sols={sols} />
}

// ── Trust-bar items (stable keys, no array index) ───────────────────────────
const TRUST_ITEMS = [
  { key: 'projects', icon: <IconPackage size={20} className="text-brand" />, value: '3', label: 'Open Source Projects', bg: 'bg-brand-bg' },
  { key: 'oss', icon: <IconCode size={20} className="text-brand" />, value: '100%', label: 'Open Source', bg: 'bg-brand-bg' },
  { key: 'license', icon: <GitHubSvg size={20} className="text-emerald-600" />, value: 'Apache 2.0', label: 'License', bg: 'bg-emerald-50' },
  { key: 'stack', icon: <span className="text-orange-500 font-extrabold text-sm">Java</span>, value: 'Spring Boot', label: 'Backend Stack', bg: 'bg-orange-50' },
] as const

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
              <span>Open Source Platform</span>
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
                  <IconArrowRight size={16} />
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
            {TRUST_ITEMS.map((item) => (
              <div key={item.key} className="flex items-center gap-4 flex-1 px-8 py-6 min-w-[180px]">
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
                    <VigletLogo identifier={sol.identifier} size={48} />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {sol.memo}
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
                      <IconArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
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

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a
              href="https://github.com/openviglet"
              target="_blank"
              rel="noopener"
              className="flex flex-col bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-hover hover:-translate-y-1 transition-all no-underline"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center">
                  <GitHubSvg size={20} className="text-white" />
                </span>
                <div>
                  <p className="font-bold text-slate-900">GitHub</p>
                  <p className="text-xs text-slate-500">openviglet</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">
                Explore the source, open issues, submit pull requests, and shape the roadmap.
              </p>
              <span className="text-sm font-semibold text-slate-900">Star on GitHub →</span>
            </a>
            <a
              href="https://www.reddit.com/r/TuringES/"
              target="_blank"
              rel="noopener"
              className="flex flex-col bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-hover hover:-translate-y-1 transition-all no-underline"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-12 rounded-xl bg-[#FF4500] flex items-center justify-center">
                  <RedditSvg size={20} className="text-white" />
                </span>
                <div>
                  <p className="font-bold text-slate-900">Reddit</p>
                  <p className="text-xs text-slate-500">r/TuringES</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">
                Join the r/TuringES community — ask questions, share integrations, and discuss search engineering with fellow users.
              </p>
              <span className="text-sm font-semibold text-[#FF4500]">Join on Reddit →</span>
            </a>
            <a
              href="https://www.linkedin.com/company/viglet.com"
              target="_blank"
              rel="noopener"
              className="flex flex-col bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-hover hover:-translate-y-1 transition-all no-underline"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-12 rounded-xl bg-[#0A66C2] flex items-center justify-center">
                  <LinkedInSvg size={20} className="text-white" />
                </span>
                <div>
                  <p className="font-bold text-slate-900">LinkedIn</p>
                  <p className="text-xs text-slate-500">@viglet.com</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">
                Follow us for product updates, engineering insights, and community news.
              </p>
              <span className="text-sm font-semibold text-[#0A66C2]">Follow on LinkedIn →</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
