/**
 * Viglet partner ecosystem — the single source of truth for every partner shown
 * across the site (the /partner directory today; reusable elsewhere).
 *
 * Adding a partner = append an entry here. The UI (PartnerCard) renders a logo
 * when `logo` is set and falls back to the name initials otherwise, so a new
 * partner looks presentable before its logo asset is dropped in. Set
 * `featured: true` to pin an anchor partner to the top of the directory.
 *
 * Sumware is the anchor entry: a solution partner offering implementation and
 * commercial support for Viglet. It also doubles as the reference example we
 * show prospective partners of how they will appear once listed.
 */
export type PartnerTier =
  | 'Solution Partner'
  | 'Technology Partner'
  | 'Community Partner'

export interface Partner {
  /** Company / individual display name. */
  name: string
  tier: PartnerTier
  /** Public site. */
  url: string
  /** One-line positioning shown on the card. */
  summary: string
  /** What they deliver around Viglet. */
  services: string[]
  /** Path under /public, e.g. "/partners/sumware.svg". Omit to render initials. */
  logo?: string
  /** e.g. "Brazil" — optional locality signal for buyers. */
  location?: string
  /** Anchor partner: pinned first and visually highlighted. */
  featured?: boolean
}

export const partners: Partner[] = [
  {
    name: 'Sumware',
    tier: 'Solution Partner',
    url: 'https://sumware.com.br',
    summary:
      'Solution partner for Viglet — implementation, custom development and commercial support.',
    services: [
      'Viglet implementation & integration',
      'Commercial support & SLAs',
      'Custom development & extensions',
      'Enterprise search consulting',
    ],
    // Drop the real logo PNG at public/partners/sumware.png (transparent bg).
    // Until the file exists, PartnerCard falls back to the name initials.
    logo: '/partners/sumware.png',
    location: 'Brazil',
    featured: true,
  },
]
