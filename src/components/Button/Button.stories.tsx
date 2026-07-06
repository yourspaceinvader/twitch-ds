import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
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
      options: ['primary', 'secondary', 'ghost', 'destructive'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Height and padding scale',
    },
    loading: {
      control: 'boolean',
      description: 'Shows spinner and disables interaction',
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Follow',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    children: 'Subscribe',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    children: 'Browse',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    size: 'md',
    children: 'Unfollow',
  },
}

export const Loading: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    loading: true,
    children: 'Loading…',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: true,
    children: 'Unavailable',
  },
}

export const SmallSize: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Follow',
  },
}

export const LargeSize: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Follow',
  },
}

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div
      style={{ backgroundColor: 'var(--ds-color-background-body)' }}
      className="p-10 flex flex-col gap-8"
    >
      {/* Sizes */}
      <section className="flex flex-col gap-4">
        <p className="text-text-alt text-sm uppercase tracking-widest">Sizes</p>
        <div className="flex items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* Variants */}
      <section className="flex flex-col gap-4">
        <p className="text-text-alt text-sm uppercase tracking-widest">Variants</p>
        <div className="flex items-center gap-4">
          <Button variant="primary">Follow</Button>
          <Button variant="secondary">Subscribe</Button>
          <Button variant="ghost">Browse</Button>
          <Button variant="destructive">Unfollow</Button>
        </div>
      </section>

      {/* States */}
      <section className="flex flex-col gap-4">
        <p className="text-text-alt text-sm uppercase tracking-widest">States</p>
        <div className="flex items-center gap-4">
          <Button variant="primary" loading>Loading</Button>
          <Button variant="secondary" loading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </div>
      </section>

      {/* Full matrix */}
      <section className="flex flex-col gap-4">
        <p className="text-text-alt text-sm uppercase tracking-widest">Full matrix</p>
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(3, auto)', justifyContent: 'start' }}>
          {(['primary', 'secondary', 'ghost', 'destructive'] as const).flatMap((variant) =>
            (['sm', 'md', 'lg'] as const).map((size) => (
              <Button key={`${variant}-${size}`} variant={variant} size={size}>
                {variant}
              </Button>
            )),
          )}
        </div>
      </section>
    </div>
  ),
}
