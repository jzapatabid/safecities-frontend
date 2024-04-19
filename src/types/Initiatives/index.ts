import { TableSortConfigType } from 'types/AppGlobal'
import { ModalStateTypes } from 'types/Modal'
import { ProblemModel } from 'types/Problems'

import { INITIATIVE, INITIATIVES_SUMMARY_FIELDS_ACCESSOR } from 'enums/Plan'
import {
  PROBLEM,
  PROBLEMS_ACTION,
  PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT
} from 'enums/Problems'

import { OmitMultiple } from 'utils/ts-utils'

export type InitiativesModel = {
  [INITIATIVE.ID]: number
  [INITIATIVE.NAME]: string
  [INITIATIVE.COST]: number
  [INITIATIVE.EFFICIENCY]: number
  [INITIATIVE.STATUS]: boolean
  [INITIATIVE.TOTAL_CAUSES]: number
  [INITIATIVE.TOTAL_PROBLEMS]: number
  [INITIATIVE.JUSTIFICATION]: string
  [INITIATIVE.EVIDENCES]: string
}

export type InitiativesContextProps = {
  initiativesState: InitiativesStateTypes
  setInitiativesState: React.Dispatch<
    React.SetStateAction<InitiativesStateTypes>
  >
}

export type InitiativesSummaryFieldStatTypes = {
  [INITIATIVES_SUMMARY_FIELDS_ACCESSOR.TOTAL_PRIORITIZED_CAUSES]: number
  [INITIATIVES_SUMMARY_FIELDS_ACCESSOR.TOTAL_PRIORITIZED_PROBLEMS]: number
  [INITIATIVES_SUMMARY_FIELDS_ACCESSOR.TOTAL_ASSOCIATED_CAUSES]: number
  [INITIATIVES_SUMMARY_FIELDS_ACCESSOR.TOTAL_ASSOCIATED_PROBLEMS]: number
}

export type InitiativesStateTypes = {
  summary: InitiativesSummaryFieldStatTypes
  problems: InitiativesModel[]
  selectedInitiatives?: InitiativesModel[]

  //temp
  selectedCauses?: any[]
  totalItems?: number
  totalPages?: number
  sorting: TableSortConfigType
  pageIndex: number
  pageSize: number
  viewingProblemId?: number | null
  associatedCausesData: any

  //temp
  new_initiative?: any
  edit_initiative?: any
  restore_initiative?: any
}

export type InitiativesSummaryFieldPropsTypes = {
  key1: typeof INITIATIVES_SUMMARY_FIELDS_ACCESSOR[keyof typeof INITIATIVES_SUMMARY_FIELDS_ACCESSOR]
  label1: any
  key2: typeof INITIATIVES_SUMMARY_FIELDS_ACCESSOR[keyof typeof INITIATIVES_SUMMARY_FIELDS_ACCESSOR]
  label2: any
  type?:
    | PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT.CRITICAL
    | PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT.NORMAL
}

type ProblemsTableWidthConfigExcludeKeys = [PROBLEM.ID, PROBLEM.DESCRIPTION]

export type ProblemsTableWidthConfigTypes = OmitMultiple<
  ProblemModel,
  ProblemsTableWidthConfigExcludeKeys[number]
> & {
  select: string
}

export type ProblemsActionTypes = {
  actionType: PROBLEMS_ACTION.PRIORITIZE | PROBLEMS_ACTION.DEPRIORITIZE
}

export type ProblemsActionModalPropsTypes = ModalStateTypes &
  ProblemsActionTypes
