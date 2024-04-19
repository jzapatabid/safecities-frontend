import { InputHTMLAttributes } from 'react'

export type CheckboxProps = {
  onCheck?: (status: boolean) => void
  isChecked?: boolean
  label?: string
  labelFor?: string
} & InputHTMLAttributes<HTMLInputElement>
