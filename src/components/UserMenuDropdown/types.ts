import { optionType } from 'components/Header'

export type DropdownTypes = {
  options: optionType[]
  fixedSelection?: boolean
  children?: React.ReactNode
  open: boolean
  onClick: () => void
}
