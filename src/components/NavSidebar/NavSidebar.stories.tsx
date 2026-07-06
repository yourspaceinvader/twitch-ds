import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavSidebar, type NavSection } from './NavSidebar'

const avatar = (seed: number) => `https://picsum.photos/seed/${seed}/40/40`

const meta: Meta<typeof NavSidebar> = {
  title: 'Components/NavSidebar',
  component: NavSidebar,
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
}

export default meta
type Story = StoryObj<typeof meta>

// ── Shared data ────────────────────────────────────────────────────────────

const FOLLOWED: NavSection = {
  id: 'followed',
  title: 'Followed Channels',
  maxVisible: 7,
  channels: [
    {
      id: 'shroud',
      avatarSrc: avatar(10),
      displayName: 'shroud',
      category: 'VALORANT',
      viewerCount: 32891,
      isLive: true,
    },
    {
      id: 'pokimane',
      avatarSrc: avatar(20),
      displayName: 'Pokimane',
      category: 'Just Chatting',
      viewerCount: 18432,
      isLive: true,
    },
    {
      id: 'riotgames',
      avatarSrc: avatar(30),
      displayName: 'riotgames',
      category: 'League of Legends',
      viewerCount: 1240500,
      isLive: true,
    },
    {
      id: 'ninja',
      avatarSrc: avatar(40),
      displayName: 'Ninja',
      category: 'Fortnite',
      viewerCount: 9210,
      isLive: true,
    },
    {
      id: 'xqcow',
      avatarSrc: avatar(60),
      displayName: 'xQcOW',
      category: 'Just Chatting',
      viewerCount: 72100,
      isLive: true,
    },
    {
      id: 'wirtual',
      avatarSrc: avatar(70),
      displayName: 'Wirtual',
      category: 'Trackmania',
      viewerCount: 3800,
      isLive: true,
    },
    {
      id: 'summit1g',
      avatarSrc: avatar(50),
      displayName: 'summit1g',
      isLive: false,
    },
    {
      id: 'disguisedtoast',
      avatarSrc: avatar(80),
      displayName: 'DisguisedToast',
      isLive: false,
    },
    {
      id: 'ludwig',
      avatarSrc: avatar(120),
      displayName: 'Ludwig',
      isLive: false,
    },
  ],
}

const RECOMMENDED: NavSection = {
  id: 'recommended',
  title: 'Recommended',
  channels: [
    {
      id: 'timthetatman',
      avatarSrc: avatar(90),
      displayName: 'TimTheTatman',
      category: 'Call of Duty',
      viewerCount: 14300,
      isLive: true,
    },
    {
      id: 'nickmercs',
      avatarSrc: avatar(100),
      displayName: 'NICKMERCS',
      category: 'Warzone',
      viewerCount: 19800,
      isLive: true,
    },
    {
      id: 'hasanabi',
      avatarSrc: avatar(110),
      displayName: 'HasanAbi',
      category: 'Just Chatting',
      viewerCount: 38200,
      isLive: true,
    },
  ],
}

// ── Shell wrapper — mimics a page layout ──────────────────────────────────

function Shell({
  sidebar,
  channelName,
}: {
  sidebar: React.ReactNode
  channelName?: string
}) {
  return (
    <div
      style={{ backgroundColor: 'var(--ds-color-background-body)' }}
      className="flex h-screen"
    >
      {sidebar}
      {/* Main content placeholder */}
      <div className="flex-1 flex flex-col items-center justify-center gap-3 text-text-alt">
        <p className="text-sm">
          {channelName ? `Watching ${channelName}` : 'Select a channel'}
        </p>
      </div>
    </div>
  )
}

// ── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <Shell
      sidebar={
        <NavSidebar
          sections={[FOLLOWED, RECOMMENDED]}
          activeChannelId="shroud"
        />
      }
      channelName="shroud"
    />
  ),
}

export const Collapsed: Story = {
  render: () => (
    <Shell
      sidebar={
        <NavSidebar
          sections={[FOLLOWED, RECOMMENDED]}
          collapsed={true}
          activeChannelId="pokimane"
        />
      }
    />
  ),
}

export const ShowMoreExpanded: Story = {
  name: 'Show More / Less',
  render: () => (
    <Shell
      sidebar={
        <NavSidebar
          sections={[FOLLOWED]}
        />
      }
    />
  ),
}

export const Interactive: Story = {
  name: 'Interactive — toggle collapse',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [collapsed, setCollapsed] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeId, setActiveId] = useState('shroud')

    const sectionsWithHref = [
      {
        ...FOLLOWED,
        channels: FOLLOWED.channels.map((ch) => ({
          ...ch,
          href: '#',
        })),
      },
      {
        ...RECOMMENDED,
        channels: RECOMMENDED.channels.map((ch) => ({
          ...ch,
          href: '#',
        })),
      },
    ]

    return (
      <Shell
        sidebar={
          <NavSidebar
            sections={sectionsWithHref}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            activeChannelId={activeId}
          />
        }
        channelName={
          [...FOLLOWED.channels, ...RECOMMENDED.channels].find(
            (ch) => ch.id === activeId,
          )?.displayName
        }
      />
    )
  },
}
