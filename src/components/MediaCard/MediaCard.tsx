import { Tv2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/Badge/Badge'
import { Caption } from '@/components/Text/Text'

function formatViewerCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`
  return count.toLocaleString()
}

export interface MediaCardProps extends React.HTMLAttributes<HTMLElement> {
  thumbnailSrc?: string
  thumbnailAlt?: string
  title: string
  streamerName: string
  category?: string
  viewerCount?: number
  /** true = show LIVE badge + viewer count overlay */
  isLive?: boolean
  /** VOD/clip duration string, e.g. "1:23:45" */
  duration?: string
  href?: string
}

export function MediaCard({
  thumbnailSrc,
  thumbnailAlt,
  title,
  streamerName,
  category,
  viewerCount,
  isLive = false,
  duration,
  href,
  className,
  ...props
}: MediaCardProps) {
  const Tag = href ? 'a' : ('article' as React.ElementType)
  const linkProps = href ? { href } : {}

  return (
    <Tag
      className={cn('group block cursor-pointer select-none', className)}
      {...linkProps}
      {...props}
    >
      {/* ── Thumbnail ─────────────────────────────────────────── */}
      <div
        className={cn(
          'relative overflow-hidden rounded-md',
          'aspect-stream bg-background-alt-2',
          // Extrude: float up + deepen shadow on hover
          'transition-[transform,box-shadow] duration-200 ease-out will-change-transform',
          'shadow-sm',
          'group-hover:-translate-y-3 group-hover:shadow-lg',
        )}
      >
        {thumbnailSrc ? (
          <img
            src={thumbnailSrc}
            alt={thumbnailAlt ?? title}
            className={cn(
              'absolute inset-0 w-full h-full object-cover',
              // Subtle zoom-in on the image while container floats up
              'transition-transform duration-200 ease-out',
              'group-hover:scale-[1.04]',
            )}
            draggable={false}
          />
        ) : (
          // Placeholder when no thumbnail
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-text-alt-2">
            <Tv2 size={36} strokeWidth={1} />
            <Caption color="alt-2">No preview available</Caption>
          </div>
        )}

        {/* Top-left overlay: LIVE badge + viewer count */}
        {(isLive || viewerCount != null) && (
          <div className="absolute top-2 left-2 flex items-center gap-1">
            {isLive && <Badge variant="live" size="sm">LIVE</Badge>}
            {viewerCount != null && (
              <span className="inline-flex items-center px-[0.5rem] py-[0.2rem] rounded-sm text-xs font-semibold text-white bg-black/60 leading-none">
                {formatViewerCount(viewerCount)}
              </span>
            )}
          </div>
        )}

        {/* Bottom-right overlay: duration (VODs / clips) */}
        {duration && (
          <div className="absolute bottom-2 right-2">
            <span className="inline-flex items-center px-[0.5rem] py-[0.2rem] rounded-sm text-xs font-semibold text-white bg-black/60 leading-none">
              {duration}
            </span>
          </div>
        )}
      </div>

      {/* ── Card info ─────────────────────────────────────────── */}
      <div className="mt-3 flex flex-col gap-1">
        {/* Title: allow up to 2 lines, then clip */}
        <p className="text-base font-semibold text-text-base leading-tight line-clamp-2">
          {title}
        </p>
        <Caption>{streamerName}</Caption>
        {category && <Caption>{category}</Caption>}
      </div>
    </Tag>
  )
}
