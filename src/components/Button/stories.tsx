import { Story, Meta } from '@storybook/react'

import Button, { ButtonProps } from '.'

export default {
  title: 'Form/Button',
  component: Button,
  args: {
    children: 'Entrar'
  }
} as Meta

export const Normal: Story<ButtonProps> = (args) => <Button {...args} />

export const AsLink: Story<ButtonProps> = (args) => <Button {...args} />

AsLink.args = {
  as: 'a',
  href: '/link'
}

export const Minimal: Story<ButtonProps> = (args) => <Button {...args} />

Minimal.args = {
  minimal: true,
  children: 'Esqueci minha senha'
}

export const Disabled: Story<ButtonProps> = (args) => <Button {...args} />

Disabled.args = {
  disabled: true,
  children: 'Cadastrar'
}
