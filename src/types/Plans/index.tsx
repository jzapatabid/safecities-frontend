export type PlansContextProps = {
  plansState: PlansStateTypes
  setPlansState: React.Dispatch<React.SetStateAction<PlansStateTypes>>
}

export type PlansStateTypes = {
  macro_objectives: any[]
  basic_information: any
  focus_objectives: any[]
  cause_diagnosis: any[]
  problem_diagnosis: any[]
  basicInformationStatus: any
  diagnosisStatus: any
  strategicDimensionStatus: any
  tacticalDimensionStatus: any
  summary: any
  tactical_dimension: any[]
  td_total_cost: number | string
  departments: any[]
  neighborhoods: any[]
}
