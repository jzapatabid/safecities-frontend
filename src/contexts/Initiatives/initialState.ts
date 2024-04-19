// import { NEW_PERSONALIZED_INITIATIVE_DEFAULT_FIELDS } from 'constants/Plan'

// import { INITIATIVE_COSTS } from 'constants/Plan'

import { InitiativesStateTypes } from 'types/Initiatives'

import { CAUSE } from 'enums/Causes'
import { SORTING_TYPES } from 'enums/Global'
import { INITIATIVE } from 'enums/Plan'

import { camelToSnake } from 'utils'

// Temp constants
export const INITIATIVE_COSTS = [
  { id: 1, text: 'Baixo', checked: false },
  { id: 2, text: 'Médio', checked: false },
  { id: 3, text: 'Alto', checked: false }
] as const

export const INITIATIVE_EFFICIENCIES = [
  { id: 1, text: 'Efeito negativo', checked: false },
  { id: 2, text: 'Sem efeitos', checked: false },
  { id: 3, text: 'Evidência mista', checked: false },
  { id: 4, text: 'Promissora', checked: false },
  { id: 5, text: 'Efetiva', checked: false }
] as const

export const NEW_PERSONALIZED_INITIATIVE_DEFAULT_FIELDS = {
  name: '',
  description: '',
  evidences: '',
  references: [] as string[],
  newLink: '',
  annexes: [] as any[],
  causes: [],
  costs: INITIATIVE_COSTS,
  efficiencies: INITIATIVE_EFFICIENCIES,
  departments: [],
  evidence_references: [] as string[],
  newEvidenceLink: ''
} as const
//

const initialState: InitiativesStateTypes = {
  restore_initiative: undefined,
  new_initiative: NEW_PERSONALIZED_INITIATIVE_DEFAULT_FIELDS,
  edit_initiative: {
    costs: INITIATIVE_COSTS,
    efficiencies: INITIATIVE_EFFICIENCIES
  },
  sorting: {
    column: camelToSnake(INITIATIVE.NAME),
    type: SORTING_TYPES.ASCENDING
  },
  pageIndex: 1,
  pageSize: 10,
  summary: {
    totalPrioritizedProblems: 0,
    totalPrioritizedCauses: 0,
    totalCauses: 0,
    totalProblems: 0
  },
  totalItems: 0,
  totalPages: 1,
  selectedInitiatives: [],
  problems: [],
  associatedCausesData: {
    items: [],
    pageIndex: 1,
    pageSize: 10,
    sorting: {
      column: CAUSE.NAME,
      type: SORTING_TYPES.ASCENDING
    },
    totalItems: 0,
    totalPages: 1
  },
  viewingProblemId: null
}

export default initialState
