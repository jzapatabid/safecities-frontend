import { Dispatch, SetStateAction } from 'react'

export type DetailCardV2PropsTypes = {
  data: {
    title: string
    percentage: string
    label: string
    indicators: { text: string; criticality: string; variant: string }[]
    footer: string
    dataKey: string
    neutral?: boolean
  }
  selected: boolean
  setData: Dispatch<SetStateAction<string>>
}
