import { CausesSummaryFieldPropsTypes } from 'types/Causes'

import {
  ASSOCIATED_CAUSES_TABLE_COLUMNS_IDS,
  CAUSES_ACTION,
  CAUSES_SUMMARY_FIELDS_ACCESSOR,
  CAUSES_SUMMARY_FIELDS_CRITICALITY_VARIANT,
  CAUSES_TABLE_COLUMNS_IDS,
  CAUSE_TYPE_ACCESSOR
} from 'enums/Causes'

import { MODAL_TYPE } from 'components/Modal'
import CausesModalContent from 'components/ModalContents/Causes'
import PersonalizedCause from 'components/ModalContents/PersonalizedCause'

const POSSIBLE_CAUSES_TABLE_COLUMNS_NAMES = {
  PRIORITIZED_PROBLEM_NAME: 'causes.posible.table.prioritized.name',
  ASSOCIATED_POSSIBLE_CAUSES: 'causes.posible.table.associated.name',
  ASSOCIATED_PRIORITIZED_CAUSES: 'causes.posible.table.prioritized.cause.name'
} as const

const ASSOCIATED_CAUSES_TABLE_COLUMNS_NAMES = {
  NAME: 'causes.posible.table.associated.name',
  STATUS: 'diagnosis.problem.table.status',
  RECENT_TREND: 'diagnosis.problem.table.recent.trend',
  AUTHOR: 'causes.associated.table.author.name'
} as const

const CAUSES_DISCLAIMER = {
  line1:
    'causes.disclaimer.line.1',
  line2:
    'causes.disclaimer.line.2'
} as const

const CAUSES_SUMMARY_FIELDS_NAME = {
  TOTAL_MAPPED_CAUSES: 'causes.summary.name.maped',
  TOTAL_RELEVANT_CAUSES: 'causes.summary.name.relevant',
  TOTAL_PRIORITIZED_CAUSES: 'planning.prioritized.causes.card'
} as const

const CAUSES_SUMMARY_FIELDS: readonly CausesSummaryFieldPropsTypes[] = [
  {
    key: CAUSES_SUMMARY_FIELDS_ACCESSOR.TOTAL_MAPPED_CAUSES,
    label: CAUSES_SUMMARY_FIELDS_NAME.TOTAL_MAPPED_CAUSES,
    type: CAUSES_SUMMARY_FIELDS_CRITICALITY_VARIANT.NORMAL
  },
  {
    key: CAUSES_SUMMARY_FIELDS_ACCESSOR.TOTAL_RELEVANT_CAUSES,
    label: CAUSES_SUMMARY_FIELDS_NAME.TOTAL_RELEVANT_CAUSES,
    type: CAUSES_SUMMARY_FIELDS_CRITICALITY_VARIANT.NORMAL
  },
  {
    key: CAUSES_SUMMARY_FIELDS_ACCESSOR.TOTAL_PRIORITIZED_CAUSES,
    label: CAUSES_SUMMARY_FIELDS_NAME.TOTAL_PRIORITIZED_CAUSES,
    type: CAUSES_SUMMARY_FIELDS_CRITICALITY_VARIANT.NORMAL
  }
] as const

const CAUSES_TABLE_WIDTH_CONFIG = {
  [CAUSES_TABLE_COLUMNS_IDS.NAME]: '45%',
  [CAUSES_TABLE_COLUMNS_IDS.ASSOCIATED_CAUSES]: '20%',
  [CAUSES_TABLE_COLUMNS_IDS.PRIORITIZED_ASSOCIATED_CAUSES]: '21.5%',
  [CAUSES_TABLE_COLUMNS_IDS.SHOW_CAUSES]: '13.5%'
} as const

const ASSOCIATED_CAUSES_TABLE_WIDTH_CONFIG = {
  [ASSOCIATED_CAUSES_TABLE_COLUMNS_IDS.SELECT]: '5%',
  [ASSOCIATED_CAUSES_TABLE_COLUMNS_IDS.NAME]: '50%',
  [ASSOCIATED_CAUSES_TABLE_COLUMNS_IDS.PRIORITIZED]: '15%',
  [ASSOCIATED_CAUSES_TABLE_COLUMNS_IDS.TREND]: '10%',
  [ASSOCIATED_CAUSES_TABLE_COLUMNS_IDS.TYPE]: '25%'
} as const

const NEW_PERSONALIZED_CAUSE_DEFAULT_FIELDS = {
  name: '',
  justification: '',
  evidences: '',
  references: [] as string[],
  newLink: '',
  annexes: [] as any[],
  problems: []
}

const NEW_PERSONALIZED_CAUSE_MODAL_PROPS = {
  type: MODAL_TYPE.SIDESHEET,
  open: true,
  title: 'causes.title.add',
  cancelBtn: 'button.cancel',
  confirmBtn: 'button.save',
  Content: PersonalizedCause
}

const EDIT_PERSONALIZED_CAUSE_MODAL_PROPS = {
  type: MODAL_TYPE.SIDESHEET,
  open: true,
  title: 'causes.title.edit',
  cancelBtn: 'button.cancel',
  confirmBtn: 'button.save',
  dangerBtn: 'causes.title.exclude',
  Content: PersonalizedCause
}

const CAUSES_ACTION_MODAL_PROPS = {
  [CAUSES_ACTION.PRIORITIZE]: {
    open: true,
    title: 'causes.modal.prioritize.title',
    desc: 'causes.modal.prioritize.desc',
    cancelBtn: 'button.cancel',
    confirmBtn: 'button.diagnosis.prioritize.cause',
    actionType: CAUSES_ACTION.PRIORITIZE,
    Content: CausesModalContent,
    type: MODAL_TYPE.SIDESHEET
  },
  [CAUSES_ACTION.DEPRIORITIZE]: {
    open: true,
    title: 'causes.modal.deprioritize.title',
    desc: 'causes.modal.deprioritize.desc',
    cancelBtn: 'button.cancel',
    confirmBtn: 'button.diagnosis.deprioritize.cause',
    actionType: CAUSES_ACTION.DEPRIORITIZE,
    Content: CausesModalContent,
    type: MODAL_TYPE.SIDESHEET
  }
} as const

const CAUSE_TYPE_LABELS = {
  [CAUSE_TYPE_ACCESSOR.DEFAULT]: 'causes.table.literature',
  [CAUSE_TYPE_ACCESSOR.PERSONALIZED]: 'causes.table.personalized'
}
// const DEFAULT_CAUSE_DETAIL_ACTUAL_SITUATION_FIELDS = [
//   {
//     dataKey: 'causes.detail.actual.situation.data.1',
//     label: 'causes.detail.actual.situation.label.1'
//   },
//   {
//     dataKey: 'causes.detail.actual.situation.data.2',
//     label: 'causes.detail.actual.situation.label.2'
//   }
// ] as const
const DEFAULT_CAUSE_DETAIL_ACTUAL_SITUATION_FIELDS = [
  {
    dataKey: 'totalCityIncidents',
    label: 'occurrences.text'
  },
  {
    dataKey: 'cityRate',
    label: 'problem.detail.actual.situation.label.2'
  }
]

const CAUSES_PRIORITIZATION_DISCLAIMER = {
  line1:
    'causes.modal.deprioritize.disclaimer'
} as const

export {
  CAUSES_DISCLAIMER,
  CAUSES_SUMMARY_FIELDS,
  POSSIBLE_CAUSES_TABLE_COLUMNS_NAMES,
  CAUSES_TABLE_WIDTH_CONFIG,
  CAUSES_ACTION_MODAL_PROPS,
  ASSOCIATED_CAUSES_TABLE_COLUMNS_NAMES,
  ASSOCIATED_CAUSES_TABLE_WIDTH_CONFIG,
  CAUSE_TYPE_LABELS,
  NEW_PERSONALIZED_CAUSE_MODAL_PROPS,
  NEW_PERSONALIZED_CAUSE_DEFAULT_FIELDS,
  EDIT_PERSONALIZED_CAUSE_MODAL_PROPS,
  DEFAULT_CAUSE_DETAIL_ACTUAL_SITUATION_FIELDS,
  CAUSES_PRIORITIZATION_DISCLAIMER
}
