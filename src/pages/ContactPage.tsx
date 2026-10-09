import { Link } from 'react-router-dom'
import { IconArrowRight, IconBook, IconMessageCircle, IconRocket, IconUsers } from '@tabler/icons-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FloatingFormulasBg } from '@viglet/viglet-design-system'
import DecorativeBackdrop from '@/components/DecorativeBackdrop'
import { useIsMobileOrTablet } from '@/hooks/use-mobile-or-tablet'
import CognitoForm from '@/components/CognitoForm'

const TOPICS = [
  {
    icon: <IconRocket size={24} />,
    title: 'Evaluating a product',
    description: 'Tell us what you need to solve and we will help you pick between Dumont DEP, Shio CMS and Turing ES.',
  },
  {
    icon: <IconMessageCircle size={24} />,
    title: 'Planning a deployment',
    description: 'Questions about architecture, integrations, connectors or running Viglet in production.',
  },
  {
    icon: <IconUsers size={24} />,
    title: 'Implementation & support',
    description: 'Need help adopting Viglet? We can put you in touch with a solution partner for implementation or an SLA.',
  },
]

export default function ContactPage() {
  const motionPaused = useIsMobileOrTablet()
  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative bg-background border-b border-border overflow-hidden py-24 px-6">
        <DecorativeBackdrop>
          <FloatingFormulasBg color="#C2410C" colorDark="#F97316" extraTokens={["Turing", "Shio", "Dumont"]} motionPaused={motionPaused} />
        </DecorativeBackdrop>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Badge variant="brand" className="mb-6">Contact</Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
            Want to use Viglet in your organization?
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            Tell us about your project. We will answer questions about Dumont DEP, Shio CMS and Turing ES and help you get started.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg" asChild>
              <a href="#contact-form">
                Talk to us
                <IconArrowRight size={16} />
              </a>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <a href="https://docs.viglet.org" target="_blank" rel="noopener">
                <IconBook size={16} />
                Read the docs
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== TOPICS ===== */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="brand" className="mb-4">How we can help</Badge>
            <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
              What you can ask us about
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TOPICS.map((t) => (
              <div key={t.title} className="bg-card rounded-2xl border border-border p-6">
                <div className="w-12 h-12 rounded-xl bg-brand-bg text-brand flex items-center justify-center mb-4">
                  {t.icon}
                </div>
                <h3 className="font-bold text-foreground mb-2">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <section id="contact-form" className="py-20 px-6 bg-background">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="brand" className="mb-4">Get in touch</Badge>
            <h2 className="text-4xl font-extrabold text-foreground tracking-tight mb-3">
              Tell us about your project
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Fill out the form below and our team will get back to you.
              Building on Viglet as a company?{' '}
              <Link to="/partner/" className="text-brand font-semibold">See the partner program</Link>.
            </p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-8">
            <CognitoForm formId="3" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
