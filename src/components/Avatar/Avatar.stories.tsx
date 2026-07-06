import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './Avatar'

const SAMPLE_SRC = 'https://i.pravatar.cc/150?img=12'

const meta: Meta<typeof Avatar> = {
  title: 'Primitives/Avatar',
  component: Avatar,
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
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    online: {
      control: 'select',
      options: [undefined, true, false],
      description: 'undefined = no indicator',
    },
    src: { control: 'text' },
    username: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const WithImage: Story = {
  args: {
    src: SAMPLE_SRC,
    username: 'shroud',
    size: 'md',
  },
}

export const WithInitials: Story = {
  args: {
    username: 'shroud',
    size: 'md',
  },
}

export const WithIcon: Story = {
  args: {
    size: 'md',
  },
}

export const Online: Story = {
  args: {
    src: SAMPLE_SRC,
    username: 'shroud',
    size: 'md',
    online: true,
  },
}

export const Offline: Story = {
  args: {
    src: SAMPLE_SRC,
    username: 'shroud',
    size: 'md',
    online: false,
  },
}

export const SmallSize: Story = { args: { src: SAMPLE_SRC, size: 'sm', online: true } }
export const LargeSize: Story = { args: { src: SAMPLE_SRC, size: 'lg', online: true } }
export const XLargeSize: Story = { args: { src: SAMPLE_SRC, size: 'xl', online: true } }

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3">
    <p className="text-text-alt text-sm uppercase tracking-widest">{label}</p>
    <div className="flex items-end gap-6">{children}</div>
  </div>
)

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div
      style={{ backgroundColor: 'var(--ds-color-background-body)' }}
      className="p-10 flex flex-col gap-10"
    >
      <Row label="Sizes — with image">
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <Avatar src={SAMPLE_SRC} username="shroud" size={size} />
            <span className="text-text-alt text-xs">{size}</span>
          </div>
        ))}
      </Row>

      <Row label="Fallback — initials">
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <Avatar key={size} username="Ninja" size={size} />
        ))}
      </Row>

      <Row label="Fallback — icon">
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <Avatar key={size} size={size} />
        ))}
      </Row>

      <Row label="Online indicator">
        <div className="flex flex-col items-center gap-2">
          <Avatar src={SAMPLE_SRC} size="md" online={true} />
          <span className="text-text-alt text-xs">online</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Avatar src={SAMPLE_SRC} size="md" online={false} />
          <span className="text-text-alt text-xs">offline</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Avatar src={SAMPLE_SRC} size="md" />
          <span className="text-text-alt text-xs">no indicator</span>
        </div>
      </Row>

      <Row label="Indicator across sizes">
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <Avatar key={size} src={`https://i.pravatar.cc/150?img=${size === 'sm' ? 3 : size === 'md' ? 12 : size === 'lg' ? 22 : 33}`} size={size} online={true} />
        ))}
      </Row>

      <Row label="Initials + indicator">
        {(['Ninja', 'xQc', 'Pokimane', 'Shroud'].map((name, i) => (
          <Avatar key={name} username={name} size="md" online={i % 2 === 0} />
        )))}
      </Row>
    </div>
  ),
}
