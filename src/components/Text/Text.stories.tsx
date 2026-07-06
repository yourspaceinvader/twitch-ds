import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text, Title, Header, Body, Caption, Label } from './Text'

const meta: Meta<typeof Text> = {
  title: 'Primitives/Text',
  component: Text,
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
      options: ['title', 'header', 'body', 'caption', 'label'],
    },
    color: {
      control: 'select',
      options: ['base', 'alt', 'alt-2', 'link'],
    },
    as: { control: 'text' },
    truncate: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const TitleVariant: Story = {
  name: 'Title',
  args: { variant: 'title', children: 'For the Love of the Game' },
}

export const HeaderVariant: Story = {
  name: 'Header',
  args: { variant: 'header', children: 'Recommended Channels' },
}

export const BodyVariant: Story = {
  name: 'Body',
  args: {
    variant: 'body',
    children:
      'Watch live streams and gaming videos from the games you love — or try something new.',
  },
}

export const CaptionVariant: Story = {
  name: 'Caption',
  args: { variant: 'caption', color: 'alt', children: '12,456 viewers' },
}

export const LabelVariant: Story = {
  name: 'Label',
  args: { variant: 'label', children: 'Just Chatting' },
}

export const Truncated: Story = {
  decorators: [(Story) => <div style={{ width: '24rem' }}><Story /></div>],
  args: {
    variant: 'body',
    truncate: true,
    children:
      'This is a very long stream title that should be truncated when it exceeds the container width.',
  },
}

export const ColorVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div
      style={{ backgroundColor: 'var(--ds-color-background-body)' }}
      className="p-10 flex flex-col gap-4 min-w-[36rem]"
    >
      <Text variant="body" color="base">Base — primary content text</Text>
      <Text variant="body" color="alt">Alt — secondary / muted text</Text>
      <Text variant="body" color="alt-2">Alt-2 — tertiary / disabled text</Text>
      <Text variant="body" color="link">Link — interactive text</Text>
    </div>
  ),
}

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-baseline gap-6 border-b border-border-base pb-6">
    <span className="w-20 shrink-0 text-xs text-text-alt-2 font-mono tabular-nums">
      {label}
    </span>
    {children}
  </div>
)

export const Scale: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div
      style={{ backgroundColor: 'var(--ds-color-background-body)' }}
      className="p-10 flex flex-col gap-6 min-w-[56rem]"
    >
      <Row label="title / 32">
        <Title>For the Love of the Game</Title>
      </Row>
      <Row label="header / 20">
        <Header>Recommended Channels</Header>
      </Row>
      <Row label="body / 13">
        <Body as="span">Watch live streams from games you love.</Body>
      </Row>
      <Row label="caption / 12">
        <Caption>12,456 viewers · Just Chatting</Caption>
      </Row>
      <Row label="label / 12↑">
        <Label>Category</Label>
      </Row>
    </div>
  ),
}

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div
      style={{ backgroundColor: 'var(--ds-color-background-body)' }}
      className="p-10 flex flex-col gap-12 min-w-[56rem]"
    >

      {/* Typography scale */}
      <section className="flex flex-col gap-6">
        <Label color="alt">Typography scale</Label>
        <div className="flex flex-col gap-5">
          <Row label="title / 32">
            <Title>For the Love of the Game</Title>
          </Row>
          <Row label="header / 20">
            <Header>Recommended Channels</Header>
          </Row>
          <Row label="body / 13">
            <Body as="span">Watch live streams from games you love.</Body>
          </Row>
          <Row label="caption / 12">
            <Caption>12,456 viewers · Just Chatting</Caption>
          </Row>
          <Row label="label / 12↑">
            <Label>Category</Label>
          </Row>
        </div>
      </section>

      {/* Color roles */}
      <section className="flex flex-col gap-4">
        <Label color="alt">Color roles</Label>
        <div className="flex flex-col gap-3 pl-26">
          <Text variant="body" color="base">Base — primary reading text</Text>
          <Text variant="body" color="alt">Alt — secondary / metadata</Text>
          <Text variant="body" color="alt-2">Alt-2 — tertiary / disabled</Text>
          <Text variant="body" color="link">Link — interactive / accent</Text>
        </div>
      </section>

      {/* Polymorphism */}
      <section className="flex flex-col gap-4">
        <Label color="alt">Polymorphism via <code className="text-text-alt bg-background-alt-2 px-1 rounded text-xs">as</code></Label>
        <div className="flex flex-col gap-3 pl-26">
          <Text variant="header" as="h3">h3 element, header style</Text>
          <Text variant="body" as="li">li element, body style</Text>
          <Text variant="caption" as="time" color="alt">time element, caption style</Text>
        </div>
      </section>

      {/* Truncation */}
      <section className="flex flex-col gap-4">
        <Label color="alt">Truncation</Label>
        <div className="w-[32rem] flex flex-col gap-3 pl-26">
          <Body truncate>
            This is a very long stream title that will be truncated at the container edge.
          </Body>
          <Caption truncate>
            Some streamer · Just Chatting · 12,456 viewers · English · 4h 22m
          </Caption>
        </div>
      </section>

      {/* In context: channel page header */}
      <section className="flex flex-col gap-4">
        <Label color="alt">In context — channel page</Label>
        <div className="p-6 rounded-xl bg-background-base border border-border-base flex flex-col gap-4">
          <Title>shroud</Title>
          <div className="flex flex-col gap-1">
            <Body>Playing VALORANT</Body>
            <Caption>32,891 viewers</Caption>
          </div>
          <div className="flex gap-6">
            <div>
              <Label color="alt">Category</Label>
              <Body as="span" className="ml-2">VALORANT</Body>
            </div>
            <div>
              <Label color="alt">Language</Label>
              <Body as="span" className="ml-2">English</Body>
            </div>
          </div>
          <Caption>Streaming for 6h 14m · Partner</Caption>
        </div>
      </section>

      {/* In context: stream card */}
      <section className="flex flex-col gap-4">
        <Label color="alt">In context — stream card metadata</Label>
        <div className="flex flex-col gap-1 w-[28rem]">
          <Body className="font-semibold" truncate>
            ranked grind | 1000+ hours | !discord !clips
          </Body>
          <Caption truncate>shroud</Caption>
          <Caption>VALORANT · 32,891 viewers</Caption>
        </div>
      </section>

    </div>
  ),
}
