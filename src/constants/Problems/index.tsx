import {
  ProblemsSummaryFieldPropsTypes,
  ProblemsTableWidthConfigTypes
} from 'types/Problems'

import {
  PROBLEMS_ACTION,
  PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT,
  PROBLEMS_TABLE_COLUMNS_IDS,
  PROBLEM_SUMMARY_FIELDS_ACCESSOR
} from 'enums/Problems'

import LocationIcon from 'components/icons/LocationIcon'
import ModalityIcon from 'components/icons/ModalityIcon'
import MomentsIcon from 'components/icons/MomentsIcon'
import PeopleIcon from 'components/icons/PeopleIcon'
import { MODAL_TYPE } from 'components/Modal'
import PersonalizedProblem from 'components/ModalContents/PersonalizedProblem'
import ProblemsModalContent from 'components/ModalContents/Problems'
import { FormattedMessage } from 'react-intl'

const PROBLEM_STATUS = {
  PRIORITIZED: 'Priorizado',
  NOT_PRIORITIZED: ''
} as const
const PROBLEMS_TABLE_COLUMNS_NAMES = {
  NAME: 'diagnosis.problem.table.name',
  STATUS: 'diagnosis.problem.table.status',
  PERFORMANCE: 'diagnosis.problem.table.performance',
  RECENT_TREND: 'diagnosis.problem.table.recent.trend',
  RELATIVE_FREQUENCY: 'diagnosis.problem.table.relative.frequency',
  POTENTIAL_DAMAGE: 'diagnosis.problem.table.potencial.damage',
  CRITITCALITY_LEVEL: 'diagnosis.problem.table.crititcality.level'
} as const

const INITIATIVES_TABLE_COLUMNS_NAMES = {
  NAME: 'initiatives.table.title',
  STATUS: 'initiatives.table.status',
  PROBLEMS: 'initiatives.table.problems',
  ESTIMATED: 'inititatives.table.estimated',
  EFFECTYIVENESS: 'initiatives.effectiveness.level'
} as const


export const PROBLEMS_SUMMARY_FIELDS_NAME = {
  TOTAL_PROBLEMS: 'diagnosis.problem.total.potenial',
  TOTAL_CRITICAL_PROBLEMS: 'diagnosis.problem.total.critical',
  TOTAL_PRIORITIZED_PROBLEMS: 'diagnosis.problem.total.prioritized'
} as const

const PROBLEMS_TABLE_WIDTH_CONFIG: {
  [key in keyof ProblemsTableWidthConfigTypes]: string
} = {
  [PROBLEMS_TABLE_COLUMNS_IDS.SELECT]: '5%',
  [PROBLEMS_TABLE_COLUMNS_IDS.NAME]: '27%',
  [PROBLEMS_TABLE_COLUMNS_IDS.STATUS]: '13%',
  [PROBLEMS_TABLE_COLUMNS_IDS.PERFORMANCE]: '11%',
  [PROBLEMS_TABLE_COLUMNS_IDS.RECENT_TREND]: '11%',
  [PROBLEMS_TABLE_COLUMNS_IDS.RELATIVE_FREQUENCY]: '11%',
  [PROBLEMS_TABLE_COLUMNS_IDS.POTENTIAL_DAMAGE]: '11%',
  [PROBLEMS_TABLE_COLUMNS_IDS.CRITITCALITY_LEVEL]: '11%'
} as const

const PROBLEMS_DISCLAIMER = {
  line1:
    'diagnosis.info.section.line1',
  line2:
    'diagnosis.info.section.line2'
} as const

const PROBLEMS_ACTION_MODAL_PROPS = {
  [PROBLEMS_ACTION.PRIORITIZE]: {
    open: true,
    title: 'Priorizar los problemas',
    desc: '¿Está seguro de que desea Priorizar el siguiente problema?',
    cancelBtn: 'Cancelar',
    confirmBtn: 'Priorizar Problema',
    actionType: PROBLEMS_ACTION.PRIORITIZE,
    Content: ProblemsModalContent
  },
  [PROBLEMS_ACTION.DEPRIORITIZE]: {
    open: true,
    title: 'Despriorizar los problemas',
    desc: '¿Está seguro de que desea despriorizar el siguiente problema?',
    cancelBtn: 'Cancelar',
    confirmBtn: 'Despriorizar problema',
    actionType: PROBLEMS_ACTION.DEPRIORITIZE,
    Content: ProblemsModalContent
  }
} as const

const PROBLEMS_SUMMARY_FIELDS: readonly ProblemsSummaryFieldPropsTypes[] = [
  {
    key: PROBLEM_SUMMARY_FIELDS_ACCESSOR.TOTAL_PROBLEMS,
    label: PROBLEMS_SUMMARY_FIELDS_NAME.TOTAL_PROBLEMS,
    type: PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT.NORMAL
  },
  {
    key: PROBLEM_SUMMARY_FIELDS_ACCESSOR.TOTAL_CRITICAL_PROBLEMS,
    label: PROBLEMS_SUMMARY_FIELDS_NAME.TOTAL_CRITICAL_PROBLEMS,
    type: PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT.CRITICAL
  },
  {
    key: PROBLEM_SUMMARY_FIELDS_ACCESSOR.TOTAL_PRIORITIZED_PROBLEMS,
    label: PROBLEMS_SUMMARY_FIELDS_NAME.TOTAL_PRIORITIZED_PROBLEMS,
    type: PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT.NORMAL
  }
] as const
// const PROBLEM_DETAIL_ACTUAL_SITUATION_FIELDS = [
//   {
//     dataKey: 'problem.detail.actual.situation.data.1',
//     label: 'problem.detail.actual.situation.label.1'
//   },
//   {
//     dataKey: 'problem.detail.actual.situation.data.2',
//     label: 'problem.detail.actual.situation.label.2'
//   }
// ] as const
const PROBLEM_DETAIL_ACTUAL_SITUATION_FIELDS = [
  {
    dataKey: 'totalIncidences',
    label: 'occurrences.text'
  },
  {
    dataKey: 'ratePerPopulation',
    label: "population.rate"
  }
]

const SAMPLE_ALL_PROBLEMS: { text: string; checked?: boolean; id: string }[] = [
  { text: 'Homicidio', id: 'pe0001' },
  { text: 'Latrocínio', id: 'pe0003' },
  { text: 'Option 3', id: 'something' },
  { text: 'Option 4', id: 'something' },
  { text: 'Option 5', id: 'something' },
  { text: 'Option 6', id: 'something' },
  { text: 'Option 10', id: 'something' },
  { text: 'Option 15', id: 'something' },
  { text: 'Option 20', id: 'something' },
  { text: 'Option 23', id: 'something' },
  { text: 'Option 45', id: 'something' },
  { text: 'Option 90', id: 'something' },
  { text: 'Option 56', id: 'something' },
  { text: 'Option 34', id: 'something' },
  { text: 'Option 01', id: 'something' }
]

const PROBLEM_DETAIL_CHARACTERISTICS_FIELDS = [
  {
    name: 'Pessoas',
    icon: PeopleIcon
  },
  {
    name: 'Momentos',
    icon: MomentsIcon
  },
  {
    name: 'Lugares',
    icon: LocationIcon
  },
  {
    name: 'Modalidade',
    icon: ModalityIcon
  }
] as const

const NEW_PERSONALIZED_PROBLEM_MODAL_PROPS = {
  type: MODAL_TYPE.SIDESHEET,
  open: true,
  title:"button.diagnosis.add.problem",
  cancelBtn:"button.cancel",
  confirmBtn:"button.save",
  Content: PersonalizedProblem
}

const NEW_PERSONALIZED_PROBLEMS_INITIAL_FIELDS = {
  name: '',
  description: '',
  references: [],
  annexes: [],
  newLink: ''
}

const PERSONALIZED_PROBLEM_TYPE_LABEL = 'Problema personalizada'

const EDIT_PERSONALIZED_PROBLEM_MODAL_PROPS = {
  type: MODAL_TYPE.SIDESHEET,
  open: true,
  title: 'Editar problema',
  cancelBtn: 'Cancelar',
  confirmBtn: 'Salvar',
  dangerBtn: 'Excluir problema',
  Content: PersonalizedProblem
}

export {
  PROBLEMS_TABLE_COLUMNS_NAMES,
  PROBLEMS_TABLE_WIDTH_CONFIG,
  PROBLEM_STATUS,
  PROBLEMS_DISCLAIMER,
  PROBLEMS_ACTION_MODAL_PROPS,
  PROBLEMS_SUMMARY_FIELDS,
  PROBLEM_DETAIL_ACTUAL_SITUATION_FIELDS,
  PROBLEM_DETAIL_CHARACTERISTICS_FIELDS,
  NEW_PERSONALIZED_PROBLEM_MODAL_PROPS,
  SAMPLE_ALL_PROBLEMS,
  NEW_PERSONALIZED_PROBLEMS_INITIAL_FIELDS,
  PERSONALIZED_PROBLEM_TYPE_LABEL,
  EDIT_PERSONALIZED_PROBLEM_MODAL_PROPS,
  INITIATIVES_TABLE_COLUMNS_NAMES
}
