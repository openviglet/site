/**
 * VigletLogo — generic product logo component.
 *
 * Faithfully reproduces the original Viglet logo design:
 * - Coloured square with rounded corners
 * - Top-right: product section (DEP / CMS / ES), light weight
 * - Bottom-left: product acronym (Du / Sh / Tu), ultra-bold
 * - Navajowhite (#FFDEAD) text and border — the Viglet brand identity
 * - Drop shadow as in the original HTML spec
 *
 * Size modes
 * ──────────
 * size < 64   → "badge"  — centred acronym only (for nav / header chips)
 * size ≥ 64   → "full"   — section label + acronym (for heroes, cards, etc.)
 */

export const PRODUCT_COLORS: Record<string, string> = {
  dumont: '#006400',  // darkgreen
  shio:   '#FF6347',  // tomato
  turing: '#4169E1',  // royalblue
}

const PRODUCT_META: Record<string, { acronym: string; section: string }> = {
  dumont: { acronym: 'Du', section: 'DEP' },
  shio:   { acronym: 'Sh', section: 'CMS' },
  turing: { acronym: 'Tu', section: 'ES'  },
}

const TEXT_COLOR = '#FFDEAD' // navajowhite — matches original spec

interface VigletLogoProps {
  readonly identifier: string
  readonly size?: number
  readonly className?: string
}

export default function VigletLogo({ identifier, size = 48, className }: VigletLogoProps) {
  const meta  = PRODUCT_META[identifier]
  const color = PRODUCT_COLORS[identifier] ?? '#555555'
  if (!meta) return null

  // Proportional helpers (all relative to the reference 280 px design)
  const r = (ratio: number) => Math.round(size * ratio)
  const borderRadius  = Math.max(6, r(0.107))   // 30/280 — min 6 px for legibility
  const borderWidth   = Math.max(1, r(0.029))   // 8/280
  const shadow        = `0 ${r(0.014)}px ${r(0.029)}px rgba(0,0,0,0.22), 0 ${r(0.021)}px ${r(0.071)}px rgba(0,0,0,0.19)`

  const isSmall = size < 56

  if (isSmall) {
    // ── Badge mode — no section label, acronym centred and nudged left ──────
    const padLeft = Math.max(4, r(0.13))   // slightly more left than centre
    return (
      <div
        className={className}
        aria-label={meta.acronym}
        style={{
          display:         'inline-flex',
          alignItems:      'center',          // vertically centred (slightly higher than bottom)
          justifyContent:  'flex-start',
          width:           size,
          height:          size,
          flexShrink:      0,
          backgroundColor: color,
          color:           TEXT_COLOR,
          paddingLeft:     padLeft,
          borderRadius,
          borderWidth,
          borderStyle:     'solid',
          borderColor:     TEXT_COLOR,
          boxShadow:       shadow,
          boxSizing:       'border-box',
          overflow:        'hidden',
          userSelect:      'none',
        }}
      >
        <span
          style={{
            fontSize:   Math.max(10, r(0.46)),
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          {meta.acronym}
        </span>
      </div>
    )
  }

  // ── Periodic-table layout — full size ───────────────────────────────────
  // Section (DEP/CMS/ES) pinned top-right  ←→  Acronym (Du/Sh/Tu) bottom-left
  const pad = r(0.089)  // 25/280 — uniform padding from all edges
  return (
    <div
      className={className}
      aria-label={`${meta.acronym} ${meta.section}`}
      style={{
        display:         'inline-flex',
        flexDirection:   'column',
        justifyContent:  'space-between',   // section ↑ top, acronym ↓ bottom
        width:           size,
        height:          size,
        flexShrink:      0,
        backgroundColor: color,
        color:           TEXT_COLOR,
        padding:         `${pad}px`,
        borderRadius,
        borderWidth,
        borderStyle:     'solid',
        borderColor:     TEXT_COLOR,
        boxShadow:       shadow,
        boxSizing:       'border-box',
        overflow:        'hidden',
        userSelect:      'none',
      }}
    >
      {/* Section label — top-right, light weight */}
      <div
        style={{
          fontSize:      Math.max(6, r(0.125)),   // min 6 px at small sizes
          fontWeight:    300,
          textAlign:     'right',
          lineHeight:    1,
          opacity:       0.85,
          letterSpacing: '0.04em',
          alignSelf:     'flex-end',
        }}
      >
        {meta.section}
      </div>
      {/* Acronym — bottom-left, ultra-bold */}
      <div
        style={{
          fontSize:   r(0.46),
          fontWeight: 900,
          lineHeight: 1,
          alignSelf:  'flex-start',
        }}
      >
        {meta.acronym}
      </div>
    </div>
  )
}
