import { ComponentMeta, Story } from '@storybook/react'

import Heading, { HeadingProps } from '.'

export default {
  title: 'Components/Heading',
  component: Heading,
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
  argTypes: {
    children: {
      type: 'string'
    },
    size: {
      options: [
        'xxxsmall',
        'xxsmall',
        'xsmall',
        'small',
        'regular',
        'large',
        'xlarge',
        'xxlarge',
        'xxxlarge',
        'xxxxlarge'
      ],
      description: `xxxsmall: '1.8rem', xxsmall: '2rem', xsmall: '2.2rem', small: '2.0rem', regular: '3.6rem', large: '4.0rem', xlarge: '4.8rem', xxlarge: '6rem', xxxlarge: '7.2rem', xxxxlarge: '9.6rem'`,
      control: { type: 'select' },
      defaultValue: 'regular'
    },
    level: {
      options: [1, 2, 3, 4, 5, 6],
      description:
        'Cada level equivale a uma tag de titulo. ex: level 1 = h1, level 2 = h2, etc.',
      control: { type: 'select' },
      defaultValue: 1
    },
    color: {
      control: 'color',
      defaultValue: '#fff'
    },
    fontWeight: {
      name: 'Font Weight',
      options: [400, 500, 600, 700],
      control: { type: 'select' },
      defaultValue: 600
    },
    lineHeight: {
      name: 'Line Height'
    }
  }
} as ComponentMeta<typeof Heading>

export const Default: Story<HeadingProps> = (args) => <Heading {...args} />

Default.args = {
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
}
