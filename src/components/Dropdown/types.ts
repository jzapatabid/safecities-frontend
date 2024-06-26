import { Dispatch, SetStateAction } from 'react'

export type DropdownTypes = {
  singleSelect?: boolean
  options: any[]
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onOptionClick: (option: any) => void
  selectedText?: string
  placeholder?: any
  addNewLabel?: string | any
  onAdd?: () => void
}
