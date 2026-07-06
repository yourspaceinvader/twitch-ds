import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CategoryCard } from './CategoryCard'

// Portrait 3:4 placeholder images via picsum
const art = (seed: number) => `https://picsum.photos/seed/${seed}/300/400`

const meta: Meta<typeof CategoryCard> = {
  title: 'Components/CategoryCard',
  component: CategoryCard,
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
    name: { control: 'text' },
    viewerCount: { control: 'number' },
    imageSrc: { control: 'text' },
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

export const Default: Story = {
  decorators: [singleCardDecorator],
  args: {
    imageSrc: art(11),
    name: 'Just Chatting',
    viewerCount: 548200,
  },
}

export const WithTags: Story = {
  decorators: [singleCardDecorator],
  args: {
    imageSrc: art(33),
    name: 'VALORANT',
    viewerCount: 184700,
    tags: ['FPS', 'Shooter', 'Tactical'],
  },
}

export const LongName: Story = {
  decorators: [singleCardDecorator],
  args: {
    imageSrc: art(55),
    name: 'Grand Theft Auto V — Roleplay & Open World',
    viewerCount: 139400,
    tags: ['Open World', 'Action'],
  },
}

export const NoImage: Story = {
  decorators: [singleCardDecorator],
  args: {
    name: 'Unknown Category',
    viewerCount: 1240,
  },
}

export const NoViewers: Story = {
  decorators: [singleCardDecorator],
  args: {
    imageSrc: art(77),
    name: 'World of Warcraft',
    tags: ['MMORPG', 'Fantasy'],
  },
}

// Realistic Twitch "Browse Games" data
const CATEGORIES = [
  {
    seed: 11,
    name: 'Just Chatting',
    viewers: 548200,
    tags: ['IRL', 'Social'],
  },
  {
    seed: 22,
    name: 'Fortnite',
    viewers: 121600,
    tags: ['Battle Royale', 'Shooter'],
  },
  {
    seed: 33,
    name: 'VALORANT',
    viewers: 184700,
    tags: ['FPS', 'Tactical'],
  },
  {
    seed: 44,
    name: 'League of Legends',
    viewers: 198300,
    tags: ['MOBA', 'Strategy'],
  },
  {
    seed: 55,
    name: 'Grand Theft Auto V',
    viewers: 139400,
    tags: ['Open World', 'Action'],
  },
  {
    seed: 66,
    name: 'Minecraft',
    viewers: 94800,
    tags: ['Survival', 'Sandbox'],
  },
  {
    seed: 77,
    name: 'World of Warcraft',
    viewers: 44100,
    tags: ['MMORPG', 'Fantasy'],
  },
  {
    seed: 88,
    name: 'Apex Legends',
    viewers: 79600,
    tags: ['Battle Royale', 'FPS'],
  },
  {
    seed: 99,
    name: 'Escape from Tarkov',
    viewers: 31200,
    tags: ['Shooter', 'Survival'],
  },
  {
    seed: 111,
    name: 'Hearthstone',
    viewers: 22900,
    tags: ['Card Game', 'Strategy'],
  },
  {
    seed: 122,
    name: 'Overwatch 2',
    viewers: 58700,
    tags: ['FPS', 'Hero Shooter'],
  },
  {
    seed: 133,
    name: 'Trackmania',
    viewers: 14800,
    tags: ['Racing', 'Speedrun'],
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
      {/* Browse header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-text-base">Browse Categories</h2>
        <p className="text-sm text-text-alt">
          Find something new to watch
        </p>
      </div>

      {/* 6-column grid — narrower cards suit the portrait format */}
      <div className="grid grid-cols-6 gap-x-4 gap-y-8">
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.seed}
            imageSrc={art(cat.seed)}
            name={cat.name}
            viewerCount={cat.viewers}
            tags={cat.tags}
          />
        ))}
      </div>

      {/* Single card callout */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-text-base">
          Single card — hover to see extrude
        </h3>
        <div className="w-40">
          <CategoryCard
            imageSrc={art(44)}
            name="League of Legends"
            viewerCount={198300}
            tags={['MOBA', 'Strategy']}
          />
        </div>
      </div>
    </div>
  ),
}
