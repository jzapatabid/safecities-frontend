const TABLE_COLUMN_VARIANT = {
  SORTING: 'sorting',
  NORMAL: 'normal'
} as const

const MONTH_MAPPING = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec'
} as const

const PORTUGESE_MONTH_MAPPING: { [key: number]: string } = {
  1: 'janeiro',
  2: 'fevereiro',
  3: 'março',
  4: 'abril',
  5: 'maio',
  6: 'junho',
  7: 'julho',
  8: 'agosto',
  9: 'setembro',
  10: 'outubro',
  11: 'novembro',
  12: 'dezembro'
} as const

export { TABLE_COLUMN_VARIANT, MONTH_MAPPING, PORTUGESE_MONTH_MAPPING }
