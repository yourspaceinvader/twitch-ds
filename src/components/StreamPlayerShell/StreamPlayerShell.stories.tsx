import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { StreamPlayerShell } from './StreamPlayerShell'
import { NavSidebar, type NavSection } from '@/components/NavSidebar/NavSidebar'

const thumb = (seed: number, w = 1280, h = 720) =>
  `https://picsum.photos/seed/${seed}/1280/720`
const avatar = (seed: number) => `https://picsum.photos/seed/${seed}/80/80`

const meta: Meta<typeof StreamPlayerShell> = {
  title: 'Components/StreamPlayerShell',
  component: StreamPlayerShell,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0e0e10' },
        { name: 'light', value: '#f7f7f8' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isLive: { control: 'boolean' },
    viewerCount: { control: 'number' },
    title: { control: 'text' },
    streamerName: { control: 'text' },
    category: { control: 'text' },
    tags: { control: 'object' },
    duration: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ── Sidebar data (for full-page stories) ─────────────────────────────────

const SIDEBAR_SECTIONS: NavSection[] = [
  {
    id: 'followed',
    title: 'Followed Channels',
    maxVisible: 6,
    channels: [
      { id: 'shroud', avatarSrc: avatar(10), displayName: 'shroud', category: 'VALORANT', viewerCount: 32891, isLive: true },
      { id: 'pokimane', avatarSrc: avatar(20), displayName: 'Pokimane', category: 'Just Chatting', viewerCount: 18432, isLive: true },
      { id: 'riotgames', avatarSrc: avatar(30), displayName: 'riotgames', category: 'League of Legends', viewerCount: 1240500, isLive: true },
      { id: 'ninja', avatarSrc: avatar(40), displayName: 'Ninja', category: 'Fortnite', viewerCount: 9210, isLive: true },
      { id: 'xqcow', avatarSrc: avatar(60), displayName: 'xQcOW', category: 'Just Chatting', viewerCount: 72100, isLive: true },
      { id: 'wirtual', avatarSrc: avatar(70), displayName: 'Wirtual', category: 'Trackmania', viewerCount: 3800, isLive: true },
      { id: 'summit1g', avatarSrc: avatar(50), displayName: 'summit1g', isLive: false },
      { id: 'ludwig', avatarSrc: avatar(120), displayName: 'Ludwig', isLive: false },
    ],
  },
  {
    id: 'recommended',
    title: 'Recommended',
    channels: [
      { id: 'timthetatman', avatarSrc: avatar(90), displayName: 'TimTheTatman', category: 'Call of Duty', viewerCount: 14300, isLive: true },
      { id: 'nickmercs', avatarSrc: avatar(100), displayName: 'NICKMERCS', category: 'Warzone', viewerCount: 19800, isLive: true },
    ],
  },
]

// ── Full-page layout wrapper ──────────────────────────────────────────────

function PageShell({
  player,
  activeChannelId,
}: {
  player: React.ReactNode
  activeChannelId?: string
}) {
  return (
    <div
      style={{ backgroundColor: 'var(--ds-color-background-body)' }}
      className="flex h-screen overflow-hidden"
    >
      <NavSidebar sections={SIDEBAR_SECTIONS} activeChannelId={activeChannelId} />
      <main className="flex-1 overflow-y-auto">
        {player}
      </main>
    </div>
  )
}

// ── Stories ───────────────────────────────────────────────────────────────

export const LiveStream: Story = {
  render: () => (
    <PageShell
      activeChannelId="shroud"
      player={
        <StreamPlayerShell
          thumbnailSrc={thumb(10)}
          title="ranked grind | 1000+ hrs | !discord !clips — VALORANT ranked climb | @shroud"
          streamerName="shroud"
          streamerAvatarSrc={avatar(10)}
          category="VALORANT"
          viewerCount={32891}
          isLive={true}
          tags={['FPS', 'Shooter', 'English']}
        />
      }
    />
  ),
}

export const VOD: Story = {
  name: 'VOD (recorded stream)',
  render: () => (
    <PageShell
      player={
        <StreamPlayerShell
          thumbnailSrc={thumb(77)}
          title="Best of xQc — the most chaotic clips of 2024 (3hr compilation)"
          streamerName="xQcOW"
          streamerAvatarSrc={avatar(60)}
          category="Just Chatting"
          isLive={false}
          duration={13338}
          initialTime={2210}
          tags={['IRL', 'French', 'Variety']}
          subscribeLabel="Subscribe"
        />
      }
    />
  ),
}

export const LargeViewerCount: Story = {
  name: 'Esports broadcast',
  render: () => (
    <PageShell
      activeChannelId="riotgames"
      player={
        <StreamPlayerShell
          thumbnailSrc={thumb(30)}
          title="VALORANT Champions 2024 — Grand Finals | Day 3 | Live from São Paulo"
          streamerName="riotgames"
          streamerAvatarSrc={avatar(30)}
          category="VALORANT"
          viewerCount={1240500}
          isLive={true}
          tags={['Esports', 'Tournament', 'English', 'FPS']}
          subscribeLabel="Subscribe · Free with Prime"
        />
      }
    />
  ),
}

export const NoThumbnail: Story = {
  render: () => (
    <PageShell
      player={
        <StreamPlayerShell
          title="Just Chatting and vibing with chat tonight | !socials !discord"
          streamerName="Pokimane"
          streamerAvatarSrc={avatar(20)}
          category="Just Chatting"
          viewerCount={18432}
          isLive={true}
          tags={['IRL', 'English']}
        />
      }
    />
  ),
}

export const CollapsedSidebar: Story = {
  name: 'Collapsed sidebar',
  render: () => (
    <div
      style={{ backgroundColor: 'var(--ds-color-background-body)' }}
      className="flex h-screen overflow-hidden"
    >
      <NavSidebar
        sections={SIDEBAR_SECTIONS}
        collapsed={true}
        activeChannelId="shroud"
      />
      <main className="flex-1 overflow-y-auto">
        <StreamPlayerShell
          thumbnailSrc={thumb(10)}
          title="ranked grind | 1000+ hrs | !discord !clips"
          streamerName="shroud"
          streamerAvatarSrc={avatar(10)}
          category="VALORANT"
          viewerCount={32891}
          isLive={true}
          tags={['FPS', 'English']}
        />
      </main>
    </div>
  ),
}
