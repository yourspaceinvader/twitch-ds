import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChannelCard } from './ChannelCard'

const avatar = (seed: number) => `https://picsum.photos/seed/${seed}/80/80`

const meta: Meta<typeof ChannelCard> = {
  title: 'Components/ChannelCard',
  component: ChannelCard,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0e0e10' },
        { name: 'light', value: '#f7f7f8' },
      ],
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--ds-color-background-body)' }} className="p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    displayName: { control: 'text' },
    login: { control: 'text' },
    category: { control: 'text' },
    viewerCount: { control: 'number' },
    isLive: { control: 'boolean' },
    avatarSrc: { control: 'text' },
    tags: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const singleCardDecorator = (Story: React.ComponentType) => (
  <div className="w-40">
    <Story />
  </div>
)

export const Live: Story = {
  decorators: [singleCardDecorator],
  args: {
    avatarSrc: avatar(10),
    displayName: 'shroud',
    category: 'VALORANT',
    viewerCount: 32891,
    isLive: true,
    tags: ['FPS', 'English'],
  },
}

export const Offline: Story = {
  decorators: [singleCardDecorator],
  args: {
    avatarSrc: avatar(20),
    displayName: 'Pokimane',
    category: 'Just Chatting',
    isLive: false,
  },
}

export const LargeViewerCount: Story = {
  decorators: [singleCardDecorator],
  args: {
    avatarSrc: avatar(30),
    displayName: 'riotgames',
    category: 'League of Legends',
    viewerCount: 1_240_500,
    isLive: true,
    tags: ['Esports'],
  },
}

export const WithLoginHandle: Story = {
  decorators: [singleCardDecorator],
  args: {
    avatarSrc: avatar(40),
    displayName: 'DisguisedToast',
    login: 'disguisedtoast',
    category: 'Hearthstone',
    viewerCount: 6743,
    isLive: true,
  },
}

export const NoAvatar: Story = {
  decorators: [singleCardDecorator],
  args: {
    displayName: 'Ninja',
    category: 'Minecraft',
    viewerCount: 9210,
    isLive: true,
  },
}

export const OfflineNoCategory: Story = {
  decorators: [singleCardDecorator],
  args: {
    avatarSrc: avatar(50),
    displayName: 'summit1g',
    isLive: false,
  },
}

// Realistic Twitch channel data
const CHANNELS = [
  {
    seed: 10,
    displayName: 'shroud',
    category: 'VALORANT',
    viewers: 32891,
    live: true,
    tags: ['FPS', 'English'],
  },
  {
    seed: 20,
    displayName: 'Pokimane',
    category: 'Just Chatting',
    viewers: 18432,
    live: true,
    tags: ['IRL'],
  },
  {
    seed: 30,
    displayName: 'riotgames',
    category: 'League of Legends',
    viewers: 1240500,
    live: true,
    tags: ['Esports'],
  },
  {
    seed: 40,
    displayName: 'Ninja',
    category: 'Fortnite',
    viewers: 9210,
    live: true,
    tags: ['Battle Royale'],
  },
  {
    seed: 50,
    displayName: 'summit1g',
    category: 'Escape from Tarkov',
    viewers: 21400,
    live: true,
    tags: ['Shooter'],
  },
  {
    seed: 60,
    displayName: 'xQcOW',
    category: 'Just Chatting',
    viewers: 72100,
    live: true,
    tags: ['IRL', 'French'],
  },
  {
    seed: 70,
    displayName: 'Wirtual',
    category: 'Trackmania',
    viewers: 3800,
    live: true,
    tags: ['Racing'],
  },
  {
    seed: 80,
    displayName: 'DisguisedToast',
    login: 'disguisedtoast',
    category: 'Hearthstone',
    viewers: undefined,
    live: false,
  },
  {
    seed: 90,
    displayName: 'TimTheTatman',
    login: 'timthetatman',
    category: 'Call of Duty',
    viewers: 14300,
    live: true,
    tags: ['FPS'],
  },
  {
    seed: 100,
    displayName: 'NICKMERCS',
    login: 'nickmercs',
    category: 'Warzone',
    viewers: 19800,
    live: true,
    tags: ['FPS'],
  },
  {
    seed: 110,
    displayName: 'HasanAbi',
    login: 'hasanabi',
    category: 'Just Chatting',
    viewers: 38200,
    live: true,
    tags: ['Politics'],
  },
  {
    seed: 120,
    displayName: 'Ludwig',
    category: 'Chess',
    viewers: undefined,
    live: false,
  },
]

export const AllVariants: Story = {
  decorators: [],
  parameters: { layout: 'padded' },
  render: () => (
    <div
      style={{ backgroundColor: 'var(--ds-color-background-body)' }}
      className="p-8 flex flex-col gap-8"
    >
      {/* Section header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-text-base">Recommended Channels</h2>
        <p className="text-sm text-text-alt">
          {CHANNELS.filter((c) => c.live).length} channels live right now
        </p>
      </div>

      {/* 6-column grid */}
      <div className="grid grid-cols-6 gap-x-4 gap-y-8">
        {CHANNELS.map((ch) => (
          <ChannelCard
            key={ch.seed}
            avatarSrc={avatar(ch.seed)}
            displayName={ch.displayName}
            login={'login' in ch ? (ch as { login?: string }).login : undefined}
            category={ch.category}
            viewerCount={ch.viewers}
            isLive={ch.live}
            tags={'tags' in ch ? (ch as { tags?: string[] }).tags : undefined}
          />
        ))}
      </div>
    </div>
  ),
}
