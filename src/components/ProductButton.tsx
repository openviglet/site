import { Button } from '@/components/ui/button'
import type { ComponentPropsWithoutRef } from 'react'

type BaseButtonProps = Omit<ComponentPropsWithoutRef<typeof Button>, 'variant'>

interface ProductButtonProps extends BaseButtonProps {
  readonly identifier: string
  /** 'primary' → filled gradient (default). 'ghost' → outlined text-coloured. */
  readonly productVariant?: 'primary' | 'ghost'
}

/**
 * Button styled with the product colour.
 * - productVariant="primary" (default) → filled gradient, product-coloured shadow
 * - productVariant="ghost"            → outlined, product-coloured text & border
 */
export default function ProductButton({
  identifier,
  productVariant = 'primary',
  className = '',
  ...props
}: ProductButtonProps) {
  const productClass =
    productVariant === 'ghost'
      ? `product-btn-ghost-${identifier}`
      : `product-btn-${identifier}`

  return (
    <Button
      variant={productVariant === 'ghost' ? 'ghost' : 'default'}
      className={`${productClass} ${className}`.trim()}
      {...props}
    />
  )
}
