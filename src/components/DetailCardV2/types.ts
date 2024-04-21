import { Dispatch, SetStateAction } from 'react'

export type DetailCardV2PropsTypes = {
  data: {
    title: string
    percentage: any
    label: string
    indicators: { text: string; criticality: string; variant: string }[]
    footer: string
    dataKey: string
    neutral?: boolean
  }
  selected: boolean
  polarity: {
    performance: any
    performanceValue: number | null
    trend: any
    trendValue: number | null
  }
  setData: Dispatch<SetStateAction<string>>
}
