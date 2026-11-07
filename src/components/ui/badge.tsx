import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center text-xs font-semibold',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        secondary: 'text-muted-foreground',
        destructive: 'text-destructive',
        outline: 'text-muted-foreground',
        brand: 'text-muted-foreground uppercase tracking-wider',
        new: 'text-foreground',
        added: 'text-foreground',
        improved: 'text-foreground',
        fixed: 'text-foreground',
        removed: 'text-muted-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
