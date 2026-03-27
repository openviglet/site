import { Link } from 'react-router-dom'
import {
  IconBrandGithub,
  IconArrowRight,
  IconHeart,
  IconLock,
  IconUsers,
  IconRocket,
  IconCode,
  IconWorld,
} from '@tabler/icons-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FloatingFormulas } from '@/components/FloatingFormulas'
import { solutions } from '@/data/solutions'
import VigletLogo from '@/components/VigletLogo'

const VALUES = [
  {
    icon: <IconCode size={22} />,
    title: 'Open by default',
    description:
      'Every line of code is public. We believe great enterprise software should be auditable, forkable, and ownable — not locked behind a paywall.',
  },
  {
    icon: <IconLock size={22} />,
    title: 'Enterprise-grade reliability',
    description:
      'Open source does not mean amateur. Viglet products are built with production-readiness in mind: stable APIs, documented releases, and clear upgrade paths.',
  },
  {
    icon: <IconUsers size={22} />,
    title: 'Community-first',
    description:
      'We ship in the open, discuss in the open, and roadmap in the open. Contributors, integrators, and end users all have a voice.',
  },
  {
    icon: <IconHeart size={22} />,
    title: 'Developer happiness',
    description:
      'Viglet tools are designed so that a single developer can get from zero to running in minutes, without ops overhead or vendor onboarding calls.',
  },
]

const MILESTONES = [
  {
    year: '2017',
    title: 'Viglet founded',
    description:
      'Viglet started as a personal project to bring enterprise-class search and content tooling to teams that couldn\'t afford proprietary stacks.',
  },
  {
    year: '2018',
    title: 'Turing ES born',
    description:
      'The first public release of Turing ES brought semantic search, faceted navigation, and NLP-assisted queries to the open source world.',
  },
  {
    year: '2020',
    title: 'Shio CMS launched',
    description:
      'Shio CMS added headless content management with GraphQL APIs, native caching, and deep integration with Turing\'s search layer.',
  },
  {
    year: '2023',
    title: 'Dumont DEP ships',
    description:
      'Dumont completed the trinity — a data extraction platform that feeds structured data into the rest of the Viglet ecosystem.',
  },
  {
    year: '2025',
    title: 'Generative AI era',
    description:
      'Turing ES 2025 ships built-in Generative AI support: RAG pipelines, LLM connectors, and a conversational search interface out of the box.',
  },
]

const STACK_ITEMS = [
  { label: 'Java + Spring Boot', detail: 'Core runtime for all products' },
  { label: 'Apache Solr / OpenSearch', detail: 'Search & indexing backends' },
  { label: 'GraphQL', detail: 'Shio CMS content API' },
  { label: 'React + Vite', detail: 'Frontend & admin UIs' },
  { label: 'Apache 2.0', detail: 'License for all repositories' },
  { label: 'GitHub Actions', detail: 'CI/CD and release automation' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative bg-background border-b border-border overflow-hidden py-24 px-6">
        <FloatingFormulas />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Badge variant="brand" className="mb-6">About Viglet</Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
            Open source tools for{' '}
            <span className="vg-gradient-text">enterprise intelligence</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            Viglet was built on a simple belief: every team deserves world-class data extraction,
            content management, and enterprise search — without vendor lock-in or enterprise pricing.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg" asChild>
              <a href="https://github.com/openviglet" target="_blank" rel="noopener">
                <IconBrandGithub size={16} />
                View on GitHub
              </a>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link to="/">Explore Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="brand" className="mb-4">Our mission</Badge>
            <h2 className="text-4xl font-extrabold text-foreground tracking-tight mb-6">
              Democratize enterprise-grade software
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Large enterprises spend millions of dollars on proprietary platforms for search,
              content, and data pipelines. Viglet exists to level the playing field — giving
              any team, regardless of budget, the same capabilities with full control over
              their infrastructure and data.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We maintain everything under the Apache 2.0 license, so you can deploy on-premise,
              in the cloud, or in air-gapped environments without asking permission.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '2017', label: 'Founded' },
              { value: '3', label: 'Open source products' },
              { value: '100%', label: 'Open source' },
              { value: 'Apache 2.0', label: 'License' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-2xl border border-border p-6 text-center"
              >
                <p className="text-3xl font-extrabold text-brand mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="brand" className="mb-4">The platform</Badge>
            <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
              Three products, one ecosystem
            </h2>
            <p className="text-muted-foreground text-lg mt-3 max-w-xl mx-auto">
              Each product solves a distinct problem and integrates seamlessly with the others.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map((sol) => (
              <Link
                key={sol.identifier}
                to={sol.permalink}
                className="flex flex-col bg-card rounded-2xl border border-border p-6 hover:shadow-hover hover:-translate-y-1 transition-all no-underline group"
              >
                <VigletLogo identifier={sol.identifier} size={52} className="mb-4" />
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  {sol.memo}
                </p>
                <p className="font-extrabold text-foreground mb-2 group-hover:text-brand transition-colors">
                  {sol.shortName}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                  {sol.description}
                </p>
                <span className="flex items-center gap-1 text-sm font-semibold text-brand">
                  Learn more <IconArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="brand" className="mb-4">History</Badge>
            <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
              How we got here
            </h2>
          </div>

          <div className="relative pl-8">
            <span className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-brand/20" />
            <div className="space-y-10">
              {MILESTONES.map((m) => (
                <div key={m.year} className="relative flex gap-6">
                  <div className="absolute -left-8 top-0.5 w-6 h-6 rounded-full bg-brand flex items-center justify-center shrink-0 z-10">
                    <span className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div>
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand mb-1">
                      {m.year}
                    </span>
                    <h3 className="font-extrabold text-foreground mb-1">{m.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="brand" className="mb-4">Values</Badge>
            <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
              What we stand for
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-muted rounded-2xl border border-border p-6">
                <div className="w-12 h-12 rounded-xl bg-brand-bg text-brand flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECH STACK ===== */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="brand" className="mb-4">Tech stack</Badge>
            <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
              Built on proven open source
            </h2>
            <p className="text-muted-foreground text-lg mt-3 max-w-xl mx-auto">
              Viglet stands on the shoulders of giants — battle-tested open source projects used by millions.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STACK_ITEMS.map((item) => (
              <div
                key={item.label}
                className="bg-card rounded-xl border border-border px-5 py-4 flex items-center gap-4"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-brand shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-bg text-brand flex items-center justify-center mx-auto mb-6">
            <IconRocket size={28} />
          </div>
          <h2 className="text-4xl font-extrabold text-foreground tracking-tight mb-4">
            Get involved
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
            Viglet is shaped by its community. Whether you file a bug, improve documentation,
            build an integration, or just star a repo — every contribution matters.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg" asChild>
              <a href="https://github.com/openviglet" target="_blank" rel="noopener">
                <IconBrandGithub size={16} />
                Contribute on GitHub
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/partner/">
                <IconWorld size={16} />
                Become a Partner
              </Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <a href="https://docs.viglet.org" target="_blank" rel="noopener">
                Read the Docs
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
