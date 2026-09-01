import type { ReactNode } from 'react'

interface DecorativeBackdropProps {
  readonly children: ReactNode
  readonly className?: string
}

/**
 * Wrapper for the purely decorative hero backdrops (FloatingFormulasBg and
 * friends).
 *
 * The site is a client-rendered SPA, so Googlebot executes the bundle and sees
 * the floating chemical formulas as real text. With little pre-rendered copy to
 * compete with, it was building the search snippet out of them — /shio/ ranked
 * with "C₆H₁₂O₆NaClHNO₃Br₂…" instead of the product description.
 *
 * `data-nosnippet` tells Google to exclude this subtree from snippets (it is
 * honoured on div/span/section). The backdrop components already set
 * `aria-hidden`, which keeps the formulas out of the accessibility tree but has
 * no effect on snippet selection — hence both.
 *
 * The wrapper mirrors the backdrop's own `absolute inset-0` box so nesting does
 * not change the layout.
 */
export default function DecorativeBackdrop({ children, className = '' }: DecorativeBackdropProps) {
  return (
    <div
      data-nosnippet
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {children}
    </div>
  )
}
