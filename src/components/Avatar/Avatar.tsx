import { User } from 'lucide-react'
import { cn } from '@/lib/utils'

// Avatar uses a 2px transparent border in every variant so the online dot's
// ring-offset always has a reference colour to match.

const sizeMap = {
  sm: 'size-12',  // 2.4rem = 24px
  md: 'size-20',  // 4.0rem = 40px
  lg: 'size-28',  // 5.6rem = 56px
  xl: 'size-40',  // 8.0rem = 80px
} as const

const dotSizeMap = {
  sm: 'size-[0.8rem]',
  md: 'size-[1.0rem]',
  lg: 'size-[1.2rem]',
  xl: 'size-[1.6rem]',
} as const

const textSizeMap = {
  sm: 'text-xs',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-2xl',
} as const

const iconSizeMap = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 36,
} as const

function getInitial(username: string) {
  return username.trim().charAt(0).toUpperCase()
}

export interface AvatarProps {
  /** Image URL. Falls back to initials → icon when absent. */
  src?: string
  alt?: string
  /** Drives the initials fallback. */
  username?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** undefined = no indicator, true = online (green), false = offline (grey) */
  online?: boolean
  className?: string
}

export function Avatar({
  src,
  alt,
  username,
  size = 'md',
  online,
  className,
}: AvatarProps) {
  const showDot = online !== undefined

  return (
    <div className={cn('relative inline-flex shrink-0', sizeMap[size], className)}>
      {/* Avatar image / fallback */}
      <div className="size-full rounded-full overflow-hidden bg-background-alt-2">
        {src ? (
          <img
            src={src}
            alt={alt ?? username ?? 'Avatar'}
            className="size-full object-cover"
            draggable={false}
          />
        ) : username ? (
          <div
            role="img"
            aria-label={username}
            className={cn(
              'size-full flex items-center justify-center',
              'bg-background-accent text-white font-bold select-none',
              textSizeMap[size],
            )}
          >
            {getInitial(username)}
          </div>
        ) : (
          <div
            role="img"
            aria-label="Avatar"
            className="size-full flex items-center justify-center bg-background-alt-2 text-text-alt"
          >
            <User size={iconSizeMap[size]} strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* Online indicator dot */}
      {showDot && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full',
            // ring creates the gap between dot and avatar edge
            'ring-2 ring-background-body',
            dotSizeMap[size],
            online ? 'bg-green' : 'bg-grey-7',
          )}
          aria-label={online ? 'Online' : 'Offline'}
          role="status"
        />
      )}
    </div>
  )
}
