import { useState } from 'react'
import { IconCheck, IconArrowUpRight, IconMapPin } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Partner } from '@/data/partners'

/** Uppercase initials from the partner name (max 2) for the logo fallback. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

/**
 * Full-width horizontal feature block for an anchor partner. Fills the row on
 * its own (a single 1/3 grid card leaves the directory looking empty), and
 * gives the flagship partner room for logo, positioning and services.
 */
export default function PartnerSpotlight({ partner }: Readonly<{ partner: Partner }>) {
  const [logoOk, setLogoOk] = useState(Boolean(partner.logo))

  return (
    <div className="rounded-3xl border border-brand bg-brand-bg p-8 md:p-10 grid md:grid-cols-[300px_1fr] gap-8 md:gap-12 items-center">
      {/* identity */}
      <div className="flex flex-col items-start gap-5">
        {logoOk && partner.logo ? (
          <img
            src={partner.logo}
            alt={partner.name}
            className="h-20 max-w-[200px] object-contain"
            onError={() => setLogoOk(false)}
          />
        ) : (
          <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand text-white font-extrabold text-3xl">
            {initials(partner.name)}
          </span>
        )}
        <div>
          <Badge variant="brand" className="mb-3">Anchor partner</Badge>
          <h3 className="text-2xl font-extrabold text-foreground">{partner.name}</h3>
          <p className="text-sm font-semibold text-muted-foreground mt-0.5">
            {partner.tier}
          </p>
          {partner.location && (
            <p className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
              <IconMapPin size={13} className="shrink-0" />
              {partner.location}
            </p>
          )}
        </div>
        <Button asChild>
          <a href={partner.url} target="_blank" rel="noopener noreferrer">
            Visit {partner.name}
            <IconArrowUpRight size={16} />
          </a>
        </Button>
      </div>

      {/* positioning + services */}
      <div>
        <p className="text-lg text-foreground leading-relaxed mb-6">
          {partner.summary}
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
          {partner.services.map((s) => (
            <li key={s} className="flex items-start gap-2 text-sm text-foreground">
              <IconCheck size={16} className="text-brand mt-0.5 shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
