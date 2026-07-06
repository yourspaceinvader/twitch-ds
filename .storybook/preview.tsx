import '../src/index.css'
import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0e0e10' },
        { name: 'light', value: '#f7f7f8' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story, context) => {
      const bg = context.globals?.backgrounds?.value
      const isLight = bg === '#f7f7f8'
      return (
        <div
          className={isLight ? 'light' : ''}
          style={{ fontFamily: 'var(--ds-typography-font-base)' }}
        >
          <Story />
        </div>
      )
    },
  ],
}

export default preview
