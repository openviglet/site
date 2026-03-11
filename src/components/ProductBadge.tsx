import { Badge } from '@/components/ui/badge'
import type { ReactNode } from 'react'

interface ProductBadgeProps {
  readonly identifier: string
  readonly children: ReactNode
  readonly className?: string
}

/**
 * Badge styled with the product colour — matches the home-page brand badge size
 * (solid fill, white text, uppercase, bold, letter-spaced).
 */
export default function ProductBadge({ identifier, children, className = '' }: ProductBadgeProps) {
  return (
    <Badge
      className={`product-bg-${identifier} text-white border-transparent font-bold uppercase tracking-wider ${className}`}
    >
      {children}
    </Badge>
  )
}
