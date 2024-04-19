import { TableSortConfigType } from 'types/AppGlobal'
import { ModalStateTypes } from 'types/Modal'

import {
  PROBLEM,
  PROBLEMS_ACTION,
  PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT,
  PROBLEM_SUMMARY_FIELDS_ACCESSOR
} from 'enums/Problems'

import { OmitMultiple } from 'utils/ts-utils'

export type ProblemModel = {
  [PROBLEM.ID]: number
  [PROBLEM.NAME]: string
  [PROBLEM.DESCRIPTION]: string
  [PROBLEM.STATUS]: boolean
  [PROBLEM.PERFORMANCE]: number
  [PROBLEM.RECENT_TREND]: number
  [PROBLEM.RELATIVE_FREQUENCY]: number
  [PROBLEM.POTENTIAL_DAMAGE]: number
  [PROBLEM.CRITITCALITY_LEVEL]: number
  [PROBLEM.IS_DEFAULT]: boolean
}

export type ProblemsContextProps = {
  problemsState: ProblemsStateTypes
  setProblemsState: React.Dispatch<React.SetStateAction<ProblemsStateTypes>>
}

export type ProblemsSummaryFieldStatTypes = {
  [PROBLEM_SUMMARY_FIELDS_ACCESSOR.TOTAL_PROBLEMS]: number
  [PROBLEM_SUMMARY_FIELDS_ACCESSOR.TOTAL_CRITICAL_PROBLEMS]: number
  [PROBLEM_SUMMARY_FIELDS_ACCESSOR.TOTAL_PRIORITIZED_PROBLEMS]: number
}

export type ProblemsStateTypes = {
  summary: ProblemsSummaryFieldStatTypes
  problems: ProblemModel[]
  selectedProblems?: ProblemModel[]

  //temp
  selectedCauses?: any[]
  totalItems?: number
  totalPages?: number
  sorting: TableSortConfigType
  pageIndex: number
  pageSize: number
  viewingProblemId?: number | null
  associatedCausesData: any
  new_problem: any //Define PersonalizedProblemModel
  edit_problem: any

  //temp
  problemsWithAssociatedCauses: any
}

export type ProblemsSummaryFieldPropsTypes = {
  key: typeof PROBLEM_SUMMARY_FIELDS_ACCESSOR[keyof typeof PROBLEM_SUMMARY_FIELDS_ACCESSOR]
  label: string
  type?:
    | PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT.CRITICAL
    | PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT.NORMAL
}

type ProblemsTableWidthConfigExcludeKeys = [
  PROBLEM.ID,
  PROBLEM.DESCRIPTION,
  PROBLEM.IS_DEFAULT
]

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
