import { NEW_PERSONALIZED_CAUSE_DEFAULT_FIELDS } from 'constants/Causes'

import { CausesStateTypes, PersonalizedCauseModel } from 'types/Causes'
import { ProblemModel } from 'types/Problems'

import { SORTING_TYPES } from 'enums/Global'
import { PROBLEM } from 'enums/Problems'

import { data_recent_trend } from 'components/StackedBarChart/data'

const initialState: CausesStateTypes = {
  new_cause: NEW_PERSONALIZED_CAUSE_DEFAULT_FIELDS,
  edit_cause: {} as PersonalizedCauseModel,
  sorting: {
    column: PROBLEM.NAME,
    type: SORTING_TYPES.ASCENDING
  },
  pageIndex: 1,
  pageSize: 10,
  summary: {
    totalCauses: 0,
    totalRelevantCauses: 0,
    totalPrioritizedCauses: 0
  },
  totalItems: 0,
  totalPages: 1,
  selectedCauses: [],
  //   problemsWithCausesDetail: [] as PossibleCausesModel[],

  //temp
  problemsWithCausesDetail: [] as ProblemModel[]
}

export const defaultCauseDetailWithMockData = {
  indicators: [
    { label: 'Indicator1', href: '#1' },
    { label: 'Indicator2', href: '#2' },
    { label: 'Indicator3', href: '#3' },
    { label: 'Indicator4', href: '#4' },
    { label: 'Indicator5', href: '#5' }
  ],
  tendenciaMap: data_recent_trend
}

export default initialState
