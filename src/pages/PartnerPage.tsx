import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { IconBuildingStore, IconCode, IconUsers, IconRocket, IconCheck, IconArrowRight } from '@tabler/icons-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FloatingFormulas } from '@/components/FloatingFormulas'

function CognitoPartnerForm() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = ref.current
    if (!container) return
    container.innerHTML = ''
    const script = document.createElement('script')
    script.src = 'https://www.cognitoforms.com/f/seamless.js'
    script.dataset.key = 'DvUcBbk5D0mgQ4Vka_Txww'
    script.dataset.form = '1'
    script.async = true
    container.appendChild(script)
    return () => { container.innerHTML = '' }
  }, [])
  return <div ref={ref} />
}

const BENEFITS = [
  {
    icon: <IconRocket size={24} />,
    title: 'Co-marketing & visibility',
    description: 'Get featured on viglet.com, joint case studies, and co-branded content that reaches our global developer and enterprise audience.',
  },
  {
    icon: <IconCode size={24} />,
    title: 'Early access to roadmap',
    description: 'Stay ahead with early access to new features, beta releases, and direct communication with the engineering team.',
  },
  {
    icon: <IconUsers size={24} />,
    title: 'Partner community',
    description: 'Join a network of technology integrators, consultancies, and ISVs building on top of the Viglet platform.',
  },
  {
    icon: <IconBuildingStore size={24} />,
    title: 'Dedicated support',
    description: 'Access priority technical support, dedicated partner success managers, and integration documentation.',
  },
]

const TIERS = [
  {
    name: 'Technology Partner',
    description: 'ISVs and SaaS companies that integrate their products with Dumont DEP, Shio CMS, or Turing ES.',
    perks: [
      'Listed in the partner directory',
      'Integration certification badge',
      'Access to sandbox environments',
      'Joint go-to-market opportunities',
    ],
    cta: 'Apply as Technology Partner',
  },
  {
    name: 'Solution Partner',
    description: 'Consultancies and system integrators that implement and extend Viglet solutions for end customers.',
    perks: [
      'Partner co-sell motion',
      'Sales enablement resources',
      'Training & certification paths',
      'Lead sharing program',
    ],
    cta: 'Apply as Solution Partner',
    featured: true,
  },
  {
    name: 'Community Partner',
    description: 'Open source contributors, developer advocates, and community builders who amplify the Viglet ecosystem.',
    perks: [
      'Viglet swag & recognition',
      'Speaker opportunities',
      'Early release access',
      'Community spotlight',
    ],
    cta: 'Apply as Community Partner',
  },
]

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative bg-background border-b border-border overflow-hidden py-24 px-6">
        <FloatingFormulas />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Badge variant="brand" className="mb-6">Partner Program</Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
            Build the future of enterprise intelligence — together
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            Join the Viglet partner ecosystem and help enterprises unlock the power of open source data extraction, content management, and semantic search.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg" asChild>
              <a href="#apply">
                Become a Partner
                <IconArrowRight size={16} />
              </a>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link to="/">Explore Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="brand" className="mb-4">Why partner with Viglet</Badge>
            <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
              Everything you need to grow together
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-card rounded-2xl border border-border p-6">
                <div className="w-12 h-12 rounded-xl bg-brand-bg text-brand flex items-center justify-center mb-4">
                  {b.icon}
                </div>
                <h3 className="font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIERS ===== */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="brand" className="mb-4">Partner tiers</Badge>
            <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
              Find your path in the ecosystem
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-2xl border p-8 ${
                  tier.featured
                    ? 'border-brand bg-brand-bg shadow-hover'
                    : 'border-border bg-card'
                }`}
              >
                <h3 className={`text-lg font-extrabold mb-2 ${tier.featured ? 'text-brand' : 'text-foreground'}`}>
                  {tier.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  {tier.description}
                </p>
                <ul className="space-y-2.5 mb-8">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm text-foreground">
                      <IconCheck size={16} className="text-brand mt-0.5 shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={tier.featured ? 'default' : 'outline'}
                  asChild
                  className="w-full"
                >
                  <a href="#apply">
                    {tier.cta}
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== APPLICATION FORM ===== */}
      <section id="apply" className="py-20 px-6 bg-muted">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="brand" className="mb-4">Apply now</Badge>
            <h2 className="text-4xl font-extrabold text-foreground tracking-tight mb-3">
              Ready to partner with us?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Fill out the form below and our team will get back to you within 2 business days.
            </p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-8">
            <CognitoPartnerForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
