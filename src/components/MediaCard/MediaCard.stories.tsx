import type { Meta, StoryObj } from '@storybook/react-vite'
import { MediaCard } from './MediaCard'

// Consistent 16:9 placeholder thumbnails via picsum
const thumb = (seed: number) =>
  `https://picsum.photos/seed/${seed}/640/360`

const meta: Meta<typeof MediaCard> = {
  title: 'Components/MediaCard',
  component: MediaCard,
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
      <div style={{ backgroundColor: 'var(--ds-color-background-body)' }} className="p-8 w-[32rem]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isLive: { control: 'boolean' },
    viewerCount: { control: 'number' },
    duration: { control: 'text' },
    thumbnailSrc: { control: 'text' },
    title: { control: 'text' },
    streamerName: { control: 'text' },
    category: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const LiveStream: Story = {
  args: {
    thumbnailSrc: thumb(10),
    title: 'ranked grind | 1000+ hrs | !discord !clips',
    streamerName: 'shroud',
    category: 'VALORANT',
    viewerCount: 32891,
    isLive: true,
  },
}

export const Offline: Story = {
  args: {
    thumbnailSrc: thumb(42),
    title: 'Minecraft survival — day 100 recap',
    streamerName: 'Ninja',
    category: 'Minecraft',
    viewerCount: undefined,
    isLive: false,
  },
}

export const VOD: Story = {
  args: {
    thumbnailSrc: thumb(77),
    title: 'Best of xQc — the most chaotic clips of 2024',
    streamerName: 'xQcOW',
    category: 'Just Chatting',
    duration: '3:42:18',
    isLive: false,
  },
}

export const NoThumbnail: Story = {
  args: {
    title: 'Stream title goes here',
    streamerName: 'Pokimane',
    category: 'Just Chatting',
    viewerCount: 8240,
    isLive: true,
  },
}

export const LongTitle: Story = {
  args: {
    thumbnailSrc: thumb(55),
    title:
      'grinding ranked until diamond | sub goal 500 | !socials !discord !setup — come hang out and vibe with us tonight',
    streamerName: 'SomeStreamer',
    category: 'League of Legends',
    viewerCount: 4200,
    isLive: true,
  },
}

export const LargeViewerCount: Story = {
  args: {
    thumbnailSrc: thumb(22),
    title: 'World Championship finals — live coverage',
    streamerName: 'riotgames',
    category: 'League of Legends',
    viewerCount: 1_240_500,
    isLive: true,
  },
}

// Sample stream data for the grid
const STREAMS = [
  {
    seed: 10,
    title: 'ranked grind | 1000+ hrs | !discord !clips',
    streamer: 'shroud',
    category: 'VALORANT',
    viewers: 32891,
    live: true,
  },
  {
    seed: 20,
    title: 'Just chatting and playing games with subs',
    streamer: 'Pokimane',
    category: 'Just Chatting',
    viewers: 18432,
    live: true,
  },
  {
    seed: 30,
    title: 'World championship coverage — LIVE',
    streamer: 'riotgames',
    category: 'League of Legends',
    viewers: 1240500,
    live: true,
  },
  {
    seed: 40,
    title: 'Minecraft hardcore — one life only #day47',
    streamer: 'Ninja',
    category: 'Minecraft',
    viewers: 9210,
    live: true,
  },
  {
    seed: 50,
    title: '!newdeck ladder climbing — Bo3 LETS GO',
    streamer: 'disguisedtoast',
    category: 'Hearthstone',
    viewers: 6743,
    live: true,
  },
  {
    seed: 60,
    title: 'variety gaming + chill music | road to 10k',
    streamer: 'xQcOW',
    category: 'Just Chatting',
    viewers: 72100,
    live: true,
  },
  {
    seed: 70,
    title: 'speedrun attempts — any% WR pace???',
    streamer: 'Wirtual',
    category: 'Trackmania',
    viewers: 3800,
    live: true,
  },
  {
    seed: 80,
    title: 'Best of 2024 highlights — VOD',
    streamer: 'summit1g',
    category: 'Escape from Tarkov',
    viewers: undefined,
    live: false,
    duration: '2:14:33',
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
      {/* Browse page header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-text-base">Live Channels</h2>
        <p className="text-sm text-text-alt">
          {STREAMS.filter((s) => s.live).length} channels live right now
        </p>
      </div>

      {/* 4-column grid */}
      <div className="grid grid-cols-4 gap-x-4 gap-y-8">
        {STREAMS.map((stream) => (
          <MediaCard
            key={stream.seed}
            thumbnailSrc={thumb(stream.seed)}
            title={stream.title}
            streamerName={stream.streamer}
            category={stream.category}
            viewerCount={stream.viewers}
            isLive={stream.live}
            duration={'duration' in stream ? (stream as { duration?: string }).duration : undefined}
          />
        ))}
      </div>

      {/* Single card callout */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-text-base">Single card — hover to see extrude</h3>
        <div className="w-[28rem]">
          <MediaCard
            thumbnailSrc={thumb(30)}
            title="World championship coverage — live reaction and analysis with pro players"
            streamerName="riotgames"
            category="League of Legends"
            viewerCount={1240500}
            isLive={true}
          />
        </div>
      </div>
    </div>
  ),
}
