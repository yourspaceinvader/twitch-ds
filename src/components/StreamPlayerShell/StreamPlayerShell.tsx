import { useState } from 'react'
import {
  Play, Pause, Volume2, VolumeX,
  Maximize2, MonitorPlay, Settings, Bell, Heart,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/Avatar/Avatar'
import { Badge } from '@/components/Badge/Badge'
import { Button } from '@/components/Button/Button'

function formatViewerCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toLocaleString()
}

function formatTime(secs: number): string {
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = Math.floor(secs % 60)
  return h > 0
    ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    : `${m}:${String(s).padStart(2, '0')}`
}

export interface StreamPlayerShellProps {
  title: string
  streamerName: string
  streamerAvatarSrc?: string
  category?: string
  viewerCount?: number
  /** true = live stream (no scrubber); false = VOD */
  isLive?: boolean
  tags?: string[]
  thumbnailSrc?: string
  /** VOD total duration in seconds. Omit for live. */
  duration?: number
  initialTime?: number
  /** Subscribe label override (e.g. "Subscribe for $4.99/mo") */
  subscribeLabel?: string
  onFollow?: (following: boolean) => void
  onSubscribe?: () => void
  className?: string
}

// ── Icon button ─────────────────────────────────────────────────────────────

function ControlBtn({
  label, onClick, children,
}: {
  label: string
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="flex items-center justify-center p-1.5 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
    >
      {children}
    </button>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export function StreamPlayerShell({
  title,
  streamerName,
  streamerAvatarSrc,
  category,
  viewerCount,
  isLive = true,
  tags,
  thumbnailSrc,
  duration,
  initialTime = 0,
  subscribeLabel = 'Subscribe',
  onFollow,
  onSubscribe,
  className,
}: StreamPlayerShellProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(75)
  const [currentTime, setCurrentTime] = useState(initialTime)
  const [isFollowing, setIsFollowing] = useState(false)
  const isVOD = duration !== undefined

  function togglePlay() { setIsPlaying((p) => !p) }
  function toggleMute() { setIsMuted((m) => !m) }
  function toggleFollow() {
    setIsFollowing((f) => {
      onFollow?.(!f)
      return !f
    })
  }

  return (
    <div className={cn('flex flex-col', className)}>

      {/* ── Video player ─────────────────────────────────────── */}
      <div className="group relative aspect-stream bg-black overflow-hidden">

        {/* Thumbnail / placeholder */}
        {thumbnailSrc ? (
          <img
            src={thumbnailSrc}
            alt={title}
            className={cn(
              'absolute inset-0 w-full h-full object-cover select-none',
              'transition-opacity duration-300',
              isPlaying ? 'opacity-20' : 'opacity-100',
            )}
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-alt-2 text-sm">
            No preview available
          </div>
        )}

        {/* Click-to-play/pause */}
        <div className="absolute inset-0 cursor-pointer" onClick={togglePlay} />

        {/* ── Top-left: LIVE + viewer count ── */}
        <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
          {isLive && <Badge variant="live" size="sm">LIVE</Badge>}
          {viewerCount != null && (
            <span className="inline-flex items-center px-2 py-[0.2rem] rounded-sm text-xs font-semibold text-white bg-black/60 leading-none">
              {formatViewerCount(viewerCount)}
            </span>
          )}
        </div>

        {/* ── Control bar (reveals on hover) ── */}
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 pt-16 px-3 pb-2',
            'bg-gradient-to-t from-black/90 via-black/40 to-transparent',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
          )}
        >
          {/* VOD scrubber */}
          {isVOD && (
            <div className="mb-2 flex flex-col gap-0.5">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={(e) => setCurrentTime(Number(e.target.value))}
                className="w-full h-1 accent-purple-9 cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex justify-between">
                <span className="text-xs text-white/70">{formatTime(currentTime)}</span>
                <span className="text-xs text-white/70">{formatTime(duration)}</span>
              </div>
            </div>
          )}

          {/* Controls row */}
          <div className="flex items-center gap-1">
            {/* Play / Pause */}
            <ControlBtn label={isPlaying ? 'Pause' : 'Play'} onClick={togglePlay}>
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </ControlBtn>

            {/* Mute + Volume */}
            <ControlBtn label={isMuted ? 'Unmute' : 'Mute'} onClick={toggleMute}>
              {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </ControlBtn>
            <input
              type="range"
              min={0}
              max={100}
              value={isMuted ? 0 : volume}
              onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false) }}
              onClick={(e) => e.stopPropagation()}
              className="w-20 h-1 accent-purple-9 cursor-pointer"
              aria-label="Volume"
            />

            {/* Live indicator pill */}
            {isLive && (
              <div className="flex items-center gap-1.5 ml-3 px-2 py-0.5 rounded-sm bg-red/90">
                <span className="size-[0.5rem] rounded-full bg-white" />
                <span className="text-xs font-bold text-white uppercase tracking-wide">Live</span>
              </div>
            )}

            <div className="flex-1" />

            {/* Quality */}
            <ControlBtn label="Quality">
              <Settings size={16} />
            </ControlBtn>

            {/* Theater mode */}
            <ControlBtn label="Theater mode">
              <MonitorPlay size={16} />
            </ControlBtn>

            {/* Fullscreen */}
            <ControlBtn label="Fullscreen">
              <Maximize2 size={16} />
            </ControlBtn>
          </div>
        </div>
      </div>

      {/* ── Stream info ──────────────────────────────────────── */}
      <div className="bg-background-base border-b border-border-base px-5 py-4 flex flex-col gap-3">

        {/* Row 1: title + CTA buttons */}
        <div className="flex items-start gap-4">
          <p className="flex-1 min-w-0 text-base font-bold text-text-base leading-snug line-clamp-2">
            {title}
          </p>
          <div className="flex items-center gap-2 shrink-0 pt-0.5">
            <Button
              variant={isFollowing ? 'secondary' : 'primary'}
              size="sm"
              onClick={toggleFollow}
            >
              <Heart
                size={13}
                className={cn('mr-1', isFollowing && 'fill-current')}
              />
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
            <Button variant="primary" size="sm" onClick={onSubscribe}>
              {subscribeLabel}
            </Button>
            <Button variant="ghost" size="sm" aria-label="Notifications">
              <Bell size={15} />
            </Button>
          </div>
        </div>

        {/* Row 2: avatar + name + category + viewers */}
        <div className="flex items-center gap-3">
          <Avatar
            src={streamerAvatarSrc}
            username={streamerName}
            size="md"
            online={isLive || undefined}
            className="shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-text-base truncate hover:text-purple-8 transition-colors cursor-pointer">
              {streamerName}
            </p>
            {category && (
              <p className="text-sm text-text-link hover:text-purple-8 transition-colors cursor-pointer truncate">
                {category}
              </p>
            )}
          </div>
          {viewerCount != null && (
            <div className="shrink-0 text-right">
              <p className="text-sm font-bold text-text-base tabular-nums">
                {formatViewerCount(viewerCount)}
              </p>
              <p className="text-xs text-text-alt">viewers</p>
            </div>
          )}
        </div>

        {/* Row 3: tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="category" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
