import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
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
    variant: {
      control: 'select',
      options: ['live', 'category', 'subscriber', 'default'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Live: Story = {
  args: { variant: 'live', children: 'Live' },
}

export const Category: Story = {
  args: { variant: 'category', children: 'Just Chatting' },
}

export const Subscriber: Story = {
  args: { variant: 'subscriber', children: 'Subscriber' },
}

export const Default: Story = {
  args: { variant: 'default', children: 'Tag' },
}

export const SmallSize: Story = {
  args: { variant: 'live', size: 'sm', children: 'Live' },
}

const Row = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => (
  <div className="flex flex-col gap-3">
    <p className="text-text-alt text-xs uppercase tracking-widest">{label}</p>
    <div className="flex items-center flex-wrap gap-2">{children}</div>
  </div>
)

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div
      style={{ backgroundColor: 'var(--ds-color-background-body)' }}
      className="p-10 flex flex-col gap-10 min-w-[480px]"
    >
      {/* Variants */}
      <Row label="Variants">
        <Badge variant="live">Live</Badge>
        <Badge variant="category">Just Chatting</Badge>
        <Badge variant="subscriber">Subscriber</Badge>
        <Badge variant="default">Tag</Badge>
      </Row>

      {/* Sizes */}
      <Row label="Sizes">
        <Badge variant="live" size="sm">Live</Badge>
        <Badge variant="live" size="md">Live</Badge>
        <Badge variant="category" size="sm">Just Chatting</Badge>
        <Badge variant="category" size="md">Just Chatting</Badge>
      </Row>

      {/* Live — as seen on stream thumbnails */}
      <Row label="Live badge">
        <Badge variant="live">Live</Badge>
        <Badge variant="live" size="sm">Live</Badge>
      </Row>

      {/* Category tags — game/content labels */}
      <Row label="Category tags">
        {[
          'Just Chatting',
          'Fortnite',
          'League of Legends',
          'Minecraft',
          'Art',
          'Music',
          'IRL',
          'Sports',
        ].map((tag) => (
          <Badge key={tag} variant="category">
            {tag}
          </Badge>
        ))}
      </Row>

      {/* Subscriber tiers */}
      <Row label="Subscriber">
        <Badge variant="subscriber">Subscriber</Badge>
        <Badge variant="subscriber">Tier 1</Badge>
        <Badge variant="subscriber">Tier 2</Badge>
        <Badge variant="subscriber">Tier 3</Badge>
      </Row>

      {/* Generic / default */}
      <Row label="Default">
        <Badge>Partner</Badge>
        <Badge>Affiliate</Badge>
        <Badge>Verified</Badge>
        <Badge size="sm">New</Badge>
      </Row>

      {/* Composing badges together — stream card context */}
      <Row label="Stream card context">
        <div
          className="relative rounded-md overflow-hidden"
          style={{
            width: '24rem',
            aspectRatio: '16/9',
            backgroundColor: 'var(--ds-color-background-alt-2)',
          }}
        >
          {/* Thumbnail placeholder */}
          <div className="absolute inset-0 flex items-center justify-center text-text-alt-2 text-sm">
            stream thumbnail
          </div>
          {/* Overlay badges */}
          <div className="absolute top-2 left-2 flex gap-1">
            <Badge variant="live" size="sm">Live</Badge>
            <Badge
              size="sm"
              className="bg-black/70 text-white"
            >
              12.4K viewers
            </Badge>
          </div>
          <div className="absolute bottom-2 left-2">
            <Badge variant="category" size="sm">Just Chatting</Badge>
          </div>
        </div>
      </Row>
    </div>
  ),
}
