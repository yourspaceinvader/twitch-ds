import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-semibold whitespace-nowrap leading-none select-none cursor-pointer',
    // All variants carry a 2px border to keep box-model identical
    'border-2 border-transparent rounded-md',
    'transition-colors',
    'focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-purple-9',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-background-body',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-background-accent text-white',
          'hover:bg-purple-8',
          'active:bg-purple-6',
        ],
        secondary: [
          'bg-transparent border-border-region text-text-base',
          'hover:bg-background-alt',
          'active:bg-background-alt-2',
        ],
        ghost: [
          'bg-transparent text-text-base',
          'hover:bg-background-alt',
          'active:bg-background-alt-2',
        ],
        destructive: [
          'bg-red text-white',
          'hover:bg-red-dark',
          'active:bg-red-dark',
        ],
      },
      size: {
        sm: 'text-sm px-6 h-[2.8rem]',
        md: 'text-base px-8 h-[3.6rem]',
        lg: 'text-lg px-10 h-[4.4rem]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-block shrink-0 rounded-full',
        'border-2 border-current border-t-transparent',
        'animate-spin',
        className,
      )}
      aria-hidden="true"
    />
  )
}

const spinnerSizeMap = {
  sm: 'size-6',
  md: 'size-7',
  lg: 'size-8',
} as const

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading = false, disabled, children, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Spinner className={spinnerSizeMap[size ?? 'md']} />}
      {children}
    </button>
  ),
)
Button.displayName = 'Button'

export { Button, buttonVariants }
