import { PlansStateTypes } from 'types/Plans'

const initialState: PlansStateTypes = {
  macro_objectives: [],
  basic_information: {},
  focus_objectives: [],
  problem_diagnosis: [],
  cause_diagnosis: [],
  basicInformationStatus: {},
  diagnosisStatus: {},
  strategicDimensionStatus: {},
  tacticalDimensionStatus: {},
  summary: {},
  tactical_dimension: [],
  td_total_cost: 0,
  departments: [],
  neighborhoods: []
}

export default initialState
