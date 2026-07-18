import { useState } from 'react'
import { IconCheck, IconArrowUpRight, IconMapPin } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
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
 * Directory card for a single partner. Renders the logo when available and
 * falls back to name initials, so a newly added partner looks presentable
 * before its logo asset lands. Featured (anchor) partners get a highlighted
 * frame. This card is the reference we point prospective partners at — "this is
 * how you'll appear once listed."
 */
export default function PartnerCard({ partner }: Readonly<{ partner: Partner }>) {
  const [logoOk, setLogoOk] = useState(Boolean(partner.logo))

  return (
    <div
      className={`flex flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-hover ${
        partner.featured ? 'border-brand bg-brand-bg' : 'border-border bg-card'
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        {/* logo or initials fallback */}
        {logoOk && partner.logo ? (
          <img
            src={partner.logo}
            alt={partner.name}
            className="h-11 max-w-[180px] object-contain"
            onError={() => setLogoOk(false)}
          />
        ) : (
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white font-extrabold text-lg shrink-0">
            {initials(partner.name)}
          </span>
        )}
        {partner.featured && (
          <Badge variant="brand" className="shrink-0">
            Anchor partner
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-extrabold text-foreground">{partner.name}</h3>
        <span className="text-xs font-semibold text-muted-foreground">
          · {partner.tier}
        </span>
      </div>

      {partner.location && (
        <p className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
          <IconMapPin size={13} className="shrink-0" />
          {partner.location}
        </p>
      )}

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {partner.summary}
      </p>

      <ul className="space-y-2 mb-6 flex-1">
        {partner.services.map((s) => (
          <li key={s} className="flex items-start gap-2 text-sm text-foreground">
            <IconCheck size={15} className="text-brand mt-0.5 shrink-0" />
            {s}
          </li>
        ))}
      </ul>

      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
      >
        Visit {partner.name}
        <IconArrowUpRight size={15} />
      </a>
    </div>
  )
}
