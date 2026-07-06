import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textVariants = cva('', {
  variants: {
    variant: {
      title:   'text-5xl font-bold leading-tight',
      header:  'text-2xl font-bold leading-tight',
      body:    'text-base font-normal leading-normal',
      caption: 'text-sm font-normal leading-normal',
      label:   'text-sm font-semibold leading-none',
    },
    color: {
      base:    'text-text-base',
      alt:     'text-text-alt',
      'alt-2': 'text-text-alt-2',
      link:    'text-text-link',
    },
  },
  defaultVariants: {
    variant: 'body',
    color:   'base',
  },
})

const defaultElements: Record<string, React.ElementType> = {
  title:   'h1',
  header:  'h2',
  body:    'p',
  caption: 'span',
  label:   'span',
}

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: React.ElementType
  truncate?: boolean
}

export function Text({
  variant = 'body',
  color = 'base',
  as,
  truncate,
  className,
  ...props
}: TextProps) {
  const Tag = as ?? defaultElements[variant ?? 'body']
  return (
    <Tag
      className={cn(
        textVariants({ variant, color }),
        truncate && 'truncate',
        className,
      )}
      {...props}
    />
  )
}

/** 32px / 700 — page-level heading */
export function Title(props: Omit<TextProps, 'variant'>) {
  return <Text variant="title" as="h1" {...props} />
}

/** 20px / 700 — section heading */
export function Header(props: Omit<TextProps, 'variant'>) {
  return <Text variant="header" as="h2" {...props} />
}

/** 13px / 400 — default reading text */
export function Body(props: Omit<TextProps, 'variant'>) {
  return <Text variant="body" as="p" {...props} />
}

/** 12px / 400 — secondary / muted annotation */
export function Caption(props: Omit<TextProps, 'variant'>) {
  return <Text variant="caption" as="span" color="alt" {...props} />
}

/** 12px / 600 — compact metadata label */
export function Label(props: Omit<TextProps, 'variant'>) {
  return <Text variant="label" as="span" {...props} />
}
