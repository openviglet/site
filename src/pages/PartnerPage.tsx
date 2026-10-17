import { Link } from 'react-router-dom'
import { IconArrowRight } from '@tabler/icons-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FloatingFormulasBg } from '@viglet/viglet-design-system'
import DecorativeBackdrop from '@/components/DecorativeBackdrop'
import { useIsMobileOrTablet } from '@/hooks/use-mobile-or-tablet'
import PartnerCard from '@/components/PartnerCard'
import PartnerSpotlight from '@/components/PartnerSpotlight'
import CognitoForm from '@/components/CognitoForm'
import { partners } from '@/data/partners'

/**
 * `/partner/` (W41: promise only what exists). There is no formal partner
 * program yet, so the page offers no tiers, perks or response times: it says
 * Viglet works with integrators and ISVs, shows the partners that exist
 * (`src/data/partners.ts`), and opens the conversation through the form.
 * Bring tiers back when there is something behind them.
 */
export default function PartnerPage() {
  const motionPaused = useIsMobileOrTablet()
  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative bg-background border-b border-border overflow-hidden py-24 px-6">
        <DecorativeBackdrop>
          <FloatingFormulasBg color="#C2410C" colorDark="#F97316" withLightning withExplosion extraTokens={["Turing", "Shio", "Dumont"]} motionPaused={motionPaused} />
        </DecorativeBackdrop>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Badge variant="brand" className="mb-6">Partners</Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
            Partner with Viglet
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            Viglet works with integrators, consultancies and software vendors that build on Turing, Dumont and Shio.
            There is no formal partner program yet. If you have a project or an integration in mind, tell us about it.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg" asChild>
              <a href="#apply">
                Talk to us about partnering
                <IconArrowRight size={16} />
              </a>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link to="/">Explore Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== PARTNERS (the ones that exist) ===== */}
      {partners.length > 0 && (
        <section id="directory" className="py-20 px-6 bg-muted">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="brand" className="mb-4">Who we work with</Badge>
              <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
                Partners today
              </h2>
            </div>

            <div className="space-y-6">
              {partners
                .filter((p) => p.featured)
                .map((partner) => (
                  <PartnerSpotlight key={partner.name} partner={partner} />
                ))}
            </div>

            {partners.some((p) => !p.featured) && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {partners
                  .filter((p) => !p.featured)
                  .map((partner) => (
                    <PartnerCard key={partner.name} partner={partner} />
                  ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== CONTACT FORM ===== */}
      <section id="apply" className="py-20 px-6 bg-background">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="brand" className="mb-4">Get in touch</Badge>
            <h2 className="text-4xl font-extrabold text-foreground tracking-tight mb-3">
              Tell us what you have in mind
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Who you are, what you build or deliver, and how Viglet fits in.
            </p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-8">
            <CognitoForm formId="1" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
