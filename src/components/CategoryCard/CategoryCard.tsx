import { Gamepad2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/Badge/Badge'
import { Caption } from '@/components/Text/Text'

function formatViewerCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`
  return count.toLocaleString()
}

export interface CategoryCardProps extends React.HTMLAttributes<HTMLElement> {
  imageSrc?: string
  imageAlt?: string
  name: string
  viewerCount?: number
  /** Up to 3 tag labels shown below the viewer count */
  tags?: string[]
  href?: string
}

export function CategoryCard({
  imageSrc,
  imageAlt,
  name,
  viewerCount,
  tags,
  href,
  className,
  ...props
}: CategoryCardProps) {
  const Tag = href ? 'a' : ('article' as React.ElementType)
  const linkProps = href ? { href } : {}

  return (
    <Tag
      className={cn('group block cursor-pointer select-none', className)}
      {...linkProps}
      {...props}
    >
      {/* ── Box art — 3:4 portrait ─────────────────────────── */}
      <div
        className={cn(
          'relative overflow-hidden rounded-md',
          'aspect-category bg-background-alt-2',
          'transition-[transform,box-shadow] duration-200 ease-out will-change-transform',
          'shadow-sm',
          'group-hover:-translate-y-3 group-hover:shadow-lg',
        )}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt ?? name}
            className={cn(
              'absolute inset-0 w-full h-full object-cover',
              'transition-transform duration-200 ease-out',
              'group-hover:scale-[1.04]',
            )}
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-alt-2">
            <Gamepad2 size={40} strokeWidth={1} />
          </div>
        )}
      </div>

      {/* ── Info below box art ────────────────────────────── */}
      <div className="mt-3 flex flex-col gap-1">
        <p className="text-base font-semibold text-text-base leading-tight truncate">
          {name}
        </p>
        {viewerCount != null && (
          <Caption>{formatViewerCount(viewerCount)} viewers</Caption>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="category" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Tag>
  )
}
