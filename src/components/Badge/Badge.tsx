import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1.5 shrink-0',
    'rounded-full font-semibold whitespace-nowrap leading-none select-none',
  ],
  {
    variants: {
      variant: {
        /** Red pill — signals a channel is currently live */
        live: 'bg-background-live text-white uppercase tracking-wider',
        /** Neutral dark pill — content category / game name */
        category: 'bg-background-alt-2 text-text-base',
        /** Brand-purple pill — subscriber status / tier */
        subscriber: 'bg-background-accent text-white',
        /** Muted default — generic labels */
        default: 'bg-background-alt text-text-alt',
      },
      size: {
        sm: 'text-xs px-2 py-[0.2rem]',
        md: 'text-sm px-3 py-[0.3rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
