'use client'

import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/PageHero'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main id="main-content" className="flex-1">

      {/* ===== HERO ===== */}
      <PageHero label="Partners" title="Partner with Viglet" description="Viglet works with integrators, consultancies and software vendors. There is no formal partner program yet; tell us about your project or integration.">
        <Button size="lg" asChild><a href="#apply">Talk about partnering</a></Button>
        <Button size="lg" variant="outline" asChild><Link href="/#products">Explore products</Link></Button>
      </PageHero>

      {/* ===== PARTNERS (the ones that exist) ===== */}
      {partners.length > 0 && (
        <section id="directory" className="py-12 md:py-16 px-6 bg-muted">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="brand" className="mb-4">Who we work with</Badge>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">
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
      <section id="apply" className="py-12 md:py-16 px-6 bg-background">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="brand" className="mb-4">Get in touch</Badge>
            <h2 className="text-3xl font-bold text-foreground tracking-tight mb-3">
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

      </main>
      <Footer />
    </div>
  )
}
