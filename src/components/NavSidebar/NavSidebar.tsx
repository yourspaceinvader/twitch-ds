import { useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/Avatar/Avatar'

function formatViewerCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`
  return count.toLocaleString()
}

export interface NavChannel {
  id: string
  avatarSrc?: string
  displayName: string
  category?: string
  viewerCount?: number
  isLive?: boolean
  href?: string
}

export interface NavSection {
  id: string
  title: string
  channels: NavChannel[]
  /** Fold anything beyond this count behind "Show more" */
  maxVisible?: number
}

export interface NavSidebarProps {
  sections: NavSection[]
  /** Controls collapse externally; omit to let the sidebar manage its own state */
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
  activeChannelId?: string
  className?: string
}

// ── Nav item (single channel row) ─────────────────────────────────────────

interface NavItemProps {
  channel: NavChannel
  collapsed: boolean
  active: boolean
}

function NavItem({ channel, collapsed, active }: NavItemProps) {
  const { avatarSrc, displayName, category, viewerCount, isLive, href } = channel
  const Tag = href ? 'a' : ('div' as React.ElementType)
  const linkProps = href ? { href } : {}

  return (
    <li title={collapsed ? displayName : undefined}>
      <Tag
        className={cn(
          'flex items-center gap-2.5 rounded-md cursor-pointer select-none',
          'transition-colors duration-100',
          collapsed ? 'justify-center px-2 py-2' : 'px-3 py-1.5',
          active
            ? 'bg-background-alt-2 text-text-base'
            : 'text-text-alt hover:bg-background-alt hover:text-text-base',
        )}
        {...linkProps}
      >
        <Avatar
          src={avatarSrc}
          username={displayName}
          size="sm"
          online={isLive || undefined}
          className="shrink-0"
        />

        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-tight truncate">
              {displayName}
            </p>
            {isLive ? (
              <>
                {category && (
                  <p className="text-xs text-text-alt leading-tight truncate mt-0.5">
                    {category}
                  </p>
                )}
                {viewerCount != null && (
                  <p className="text-xs text-text-alt leading-tight truncate">
                    {formatViewerCount(viewerCount)} viewers
                  </p>
                )}
              </>
            ) : (
              <p className="text-xs text-text-alt leading-tight truncate mt-0.5">
                Offline
              </p>
            )}
          </div>
        )}
      </Tag>
    </li>
  )
}

// ── Section (header + items + show more) ──────────────────────────────────

interface NavSectionGroupProps {
  section: NavSection
  collapsed: boolean
  activeChannelId?: string
}

function NavSectionGroup({ section, collapsed, activeChannelId }: NavSectionGroupProps) {
  const [showAll, setShowAll] = useState(false)
  const { title, channels, maxVisible } = section

  const visible =
    maxVisible && !showAll ? channels.slice(0, maxVisible) : channels
  const hiddenCount = maxVisible ? channels.length - maxVisible : 0

  return (
    <div className="mb-2">
      {!collapsed && (
        <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-text-alt-2">
          {title}
        </p>
      )}

      <ul className={cn('flex flex-col gap-0.5', collapsed ? 'px-2' : 'px-2')}>
        {visible.map((ch) => (
          <NavItem
            key={ch.id}
            channel={ch}
            collapsed={collapsed}
            active={ch.id === activeChannelId}
          />
        ))}
      </ul>

      {!collapsed && hiddenCount > 0 && (
        <button
          onClick={() => setShowAll((v) => !v)}
          className={cn(
            'w-full flex items-center gap-2 px-5 py-1.5 mt-0.5 rounded-md',
            'text-xs font-medium text-text-alt',
            'hover:bg-background-alt hover:text-text-base',
            'transition-colors duration-100 cursor-pointer',
          )}
        >
          {showAll ? (
            <>
              <ChevronUp size={14} />
              Show less
            </>
          ) : (
            <>
              <ChevronDown size={14} />
              Show {hiddenCount} more
            </>
          )}
        </button>
      )}
    </div>
  )
}

// ── NavSidebar ─────────────────────────────────────────────────────────────

export function NavSidebar({
  sections,
  collapsed: collapsedProp,
  onCollapse,
  activeChannelId,
  className,
}: NavSidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const collapsed = collapsedProp ?? internalCollapsed

  function toggle() {
    const next = !collapsed
    setInternalCollapsed(next)
    onCollapse?.(next)
  }

  return (
    <nav
      className={cn(
        'flex flex-col h-full bg-background-base border-r border-border-base',
        'transition-[width] duration-200 ease-out overflow-hidden shrink-0',
        collapsed ? 'w-[5rem]' : 'w-[24rem]',
        className,
      )}
    >
      {/* Header / toggle */}
      <div
        className={cn(
          'flex items-center border-b border-border-base px-3 py-3',
          collapsed ? 'justify-center' : 'justify-between',
        )}
      >
        {!collapsed && (
          <span className="text-sm font-bold text-text-base">For You</span>
        )}
        <button
          onClick={toggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={cn(
            'flex items-center justify-center size-8 rounded-md',
            'text-text-alt hover:text-text-base hover:bg-background-alt',
            'transition-colors duration-100 cursor-pointer',
          )}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Scrollable channel list */}
      <div className="flex-1 overflow-y-auto py-1">
        {sections.map((section) => (
          <NavSectionGroup
            key={section.id}
            section={section}
            collapsed={collapsed}
            activeChannelId={activeChannelId}
          />
        ))}
      </div>
    </nav>
  )
}
