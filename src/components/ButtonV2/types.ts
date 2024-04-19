import { ButtonHTMLAttributes, ComponentType, SVGProps } from 'react'

export type IconProps = SVGProps<SVGSVGElement>

export type ButtonProps = {
  text: any
  LeadingIcon?: ComponentType<IconProps>
  TrailingIcon?: ComponentType<IconProps>
  disabled?: boolean
  variant?: string
  btnType?: string
  selected?: boolean
  loading: boolean
  href?: string
  linkExternal?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>
