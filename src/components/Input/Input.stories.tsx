import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Eye, EyeOff, Search, X } from 'lucide-react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
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
  decorators: [
    (Story) => (
      <div className="w-[32rem]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Search for channels, categories…',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your Twitch username',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Channel name',
    placeholder: 'youruniquechannel',
    helperText: 'Your channel URL will be twitch.tv/youruniquechannel',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    defaultValue: 'not-an-email',
    error: 'Please enter a valid email address.',
  },
}

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <Search size={16} strokeWidth={1.75} />,
    placeholder: 'Search',
  },
}

export const WithTrailingIcon: Story = {
  args: {
    placeholder: 'Search',
    trailingIcon: <X size={16} strokeWidth={1.75} />,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    defaultValue: 'user@twitch.tv',
    helperText: 'Contact support to change your email.',
    disabled: true,
  },
}

export const SmallSize: Story = {
  args: {
    size: 'sm',
    leadingIcon: <Search size={14} strokeWidth={1.75} />,
    placeholder: 'Search',
  },
}

export const LargeSize: Story = {
  args: {
    size: 'lg',
    label: 'Stream title',
    placeholder: 'Give your stream a title',
  },
}

/** Password input with show/hide toggle — interactive example */
export const Password: Story = {
  render: () => {
    const [show, setShow] = useState(false)
    return (
      <Input
        label="Password"
        type={show ? 'text' : 'password'}
        placeholder="••••••••"
        helperText="At least 8 characters, 1 uppercase, 1 number."
        trailingIcon={
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="p-0.5 rounded text-text-alt hover:text-text-base transition-colors"
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? (
              <EyeOff size={16} strokeWidth={1.75} />
            ) : (
              <Eye size={16} strokeWidth={1.75} />
            )}
          </button>
        }
      />
    )
  },
}

/** Search with clearable trailing button */
export const SearchWithClear: Story = {
  render: () => {
    const [value, setValue] = useState('Fortnite')
    return (
      <Input
        leadingIcon={<Search size={16} strokeWidth={1.75} />}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        trailingIcon={
          value ? (
            <button
              type="button"
              onClick={() => setValue('')}
              className="p-0.5 rounded text-text-alt hover:text-text-base transition-colors"
              aria-label="Clear search"
            >
              <X size={14} strokeWidth={1.75} />
            </button>
          ) : null
        }
      />
    )
  },
}

const Row = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => (
  <div className="flex flex-col gap-4">
    <p className="text-text-alt text-xs uppercase tracking-widest">{label}</p>
    <div className="flex flex-col gap-4">{children}</div>
  </div>
)

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  decorators: [],
  render: () => (
    <div
      style={{ backgroundColor: 'var(--ds-color-background-body)' }}
      className="p-10 flex flex-col gap-12 w-[48rem]"
    >
      {/* States */}
      <Row label="States">
        <Input placeholder="Default — no value" />
        <Input placeholder="With placeholder" defaultValue="" />
        <Input defaultValue="Filled value" />
        <Input
          defaultValue="Error state"
          error="This field is required."
        />
        <Input
          defaultValue="user@twitch.tv"
          disabled
          helperText="Disabled inputs cannot be edited."
        />
      </Row>

      {/* With labels and helper text */}
      <Row label="Labels + helper text">
        <Input
          label="Channel name"
          placeholder="youruniquechannel"
          helperText="Your URL: twitch.tv/youruniquechannel"
        />
        <Input
          label="Display name"
          placeholder="Your display name"
          error="Display name is already taken."
        />
      </Row>

      {/* With icons */}
      <Row label="With icons">
        <Input
          leadingIcon={<Search size={16} strokeWidth={1.75} />}
          placeholder="Search channels, categories…"
        />
        <Input
          leadingIcon={<Search size={16} strokeWidth={1.75} />}
          placeholder="Search"
          trailingIcon={
            <button
              type="button"
              className="p-0.5 rounded text-text-alt hover:text-text-base transition-colors"
              aria-label="Clear"
            >
              <X size={14} strokeWidth={1.75} />
            </button>
          }
          defaultValue="Fortnite"
        />
      </Row>

      {/* Sizes */}
      <Row label="Sizes">
        <div className="flex flex-col gap-3">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <div key={size} className="flex items-center gap-4">
              <span className="text-xs text-text-alt w-5 shrink-0">{size}</span>
              <Input
                size={size}
                leadingIcon={
                  <Search
                    size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
                    strokeWidth={1.75}
                  />
                }
                placeholder="Search"
              />
            </div>
          ))}
        </div>
      </Row>

      {/* Common form pattern */}
      <Row label="Form pattern">
        <div className="flex flex-col gap-5 p-6 rounded-xl bg-background-base border border-border-base">
          <p className="text-lg font-bold text-text-base">Create account</p>
          <Input label="Username" placeholder="Choose a username" />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            helperText="We'll never share your email."
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            helperText="At least 8 characters."
          />
        </div>
      </Row>
    </div>
  ),
}
