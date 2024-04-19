import theme from 'styles/theme'
export interface IconProps {
  active?: boolean
  title?: string
  titleId?: string
  color?: 'red' | 'orange'
}

export const colors = {
  red: theme.colors.negative,
  orange: theme.colors.active2,
  gray: theme.colors.inactive
}
