import { cn } from '@/lib/utils'
import { Avatar } from '@/components/Avatar/Avatar'
import { Badge } from '@/components/Badge/Badge'
import { Caption } from '@/components/Text/Text'

function formatViewerCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`
  return count.toLocaleString()
}

export interface ChannelCardProps extends React.HTMLAttributes<HTMLElement> {
  avatarSrc?: string
  displayName: string
  /** Lowercase handle — shown only if different from displayName */
  login?: string
  category?: string
  viewerCount?: number
  isLive?: boolean
  tags?: string[]
  href?: string
}

export function ChannelCard({
  avatarSrc,
  displayName,
  login,
  category,
  viewerCount,
  isLive = false,
  tags,
  href,
  className,
  ...props
}: ChannelCardProps) {
  const Tag = href ? 'a' : ('article' as React.ElementType)
  const linkProps = href ? { href } : {}
  const showLogin = login && login.toLowerCase() !== displayName.toLowerCase()

  return (
    <Tag
      className={cn(
        'group flex flex-col items-center text-center gap-3 cursor-pointer select-none',
        className,
      )}
      {...linkProps}
      {...props}
    >
      {/* ── Avatar + LIVE badge ────────────────────────── */}
      <div className="relative pb-3">
        <div className="transition-transform duration-200 ease-out group-hover:scale-105">
          <Avatar
            src={avatarSrc}
            username={displayName}
            size="xl"
            online={isLive || undefined}
          />
        </div>

        {isLive && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <Badge variant="live" size="sm">LIVE</Badge>
          </div>
        )}
      </div>

      {/* ── Info ──────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-0.5 w-full">
        <p
          className={cn(
            'text-base font-semibold text-text-base leading-tight truncate w-full',
            'transition-colors duration-150 group-hover:text-purple-8',
          )}
        >
          {displayName}
        </p>

        {showLogin && (
          <Caption color="alt" className="truncate w-full">
            @{login}
          </Caption>
        )}

        {category && (
          <Caption color="alt" className="truncate w-full">
            {category}
          </Caption>
        )}

        {isLive && viewerCount != null && (
          <Caption color="alt" className="truncate w-full">
            {formatViewerCount(viewerCount)} viewers
          </Caption>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1 mt-1.5">
            {tags.slice(0, 2).map((tag) => (
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
