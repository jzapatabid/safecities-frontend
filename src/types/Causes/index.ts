import { TableSortConfigType } from 'types/AppGlobal'
import { ModalStateTypes } from 'types/Modal'
import { ProblemModel } from 'types/Problems'

import {
  CAUSE,
  CAUSES_ACTION,
  CAUSES_SUMMARY_FIELDS_ACCESSOR,
  CAUSES_SUMMARY_FIELDS_CRITICALITY_VARIANT,
  CAUSE_TYPE_ACCESSOR
} from 'enums/Causes'

export type CausesContextProps = {
  causesState: CausesStateTypes
  setCausesState: React.Dispatch<React.SetStateAction<CausesStateTypes>>
}

export type CausesStateTypes = {
  summary: CausesSummaryFieldStatTypes
  selectedCauses?: AssociatedCausesModel[]
  totalItems?: number
  totalPages?: number
  sorting: TableSortConfigType
  pageIndex: number
  pageSize: number
  new_cause: PersonalizedCauseModel
  edit_cause: PersonalizedCauseModel
  // problemsWithCausesDetail: PossibleCausesModel[]

  //temp
  problemsWithCausesDetail: ProblemModel[]
}

export type PersonalizedCauseModel = {
  id?: string
  name: string
  justification: string
  evidences: string
  references: string[]
  newLink: string
  problems: any[]
  annexes: any[]
  editing?: boolean
  annexesToAdd?: any[]
  annexesToRemove?: any[]
}

export type PossibleCausesModel = {
  [CAUSE.ID]: number
  [CAUSE.NAME]: string
  [CAUSE.ASSOCIATED_CAUSES]: number
  [CAUSE.PRIORITIZED_ASSOCIATED_CAUSES]: number
}

export type CauseTypeModel =
  | CAUSE_TYPE_ACCESSOR.DEFAULT
  | CAUSE_TYPE_ACCESSOR.PERSONALIZED

export type AssociatedCausesModel = {
  [CAUSE.ID]: number
  [CAUSE.NAME]: string
  [CAUSE.TREND]: string
  [CAUSE.TYPE]: CauseTypeModel
  [CAUSE.PRIORITIZED]: string
}

export type CausesSummaryFieldPropsTypes = {
  key: typeof CAUSES_SUMMARY_FIELDS_ACCESSOR[keyof typeof CAUSES_SUMMARY_FIELDS_ACCESSOR]
  label: string
  type?: CAUSES_SUMMARY_FIELDS_CRITICALITY_VARIANT.NORMAL
}

export type CausesSummaryFieldStatTypes = {
  [CAUSES_SUMMARY_FIELDS_ACCESSOR.TOTAL_RELEVANT_CAUSES]: number
  [CAUSES_SUMMARY_FIELDS_ACCESSOR.TOTAL_MAPPED_CAUSES]: number
  [CAUSES_SUMMARY_FIELDS_ACCESSOR.TOTAL_PRIORITIZED_CAUSES]: number
}

export type CausesActionTypes = {
  actionType: CAUSES_ACTION.PRIORITIZE | CAUSES_ACTION.DEPRIORITIZE
}

export type CausesActionModalPropsTypes = ModalStateTypes & CausesActionTypes
