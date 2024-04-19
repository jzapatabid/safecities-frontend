import { AxiosInstance } from 'axios'

export const getMacroObjectives = async (api: AxiosInstance) => {
  try {
    const data = await api.get('/plan/macro-objectives/all')
    return data
  } catch (e) {
    return { data: [] }
  }
}

export const getFocusObjectives = async (api: AxiosInstance) => {
  try {
    const data = await api.get('/plan/macro-objectives/focus/all')
    return data
  } catch (e) {
    return { data: [] }
  }
}

export const updateMacroObjectiveGoals = async (
  api: AxiosInstance,
  macroId: number,
  goals: any
) => {
  try {
    const updated_goals = goals.map((goal: any) => ({
      ...goal,
      endAt: `${goal.endAt.split('/')[1]}-${goal.endAt.split('/')[0]}-10`
    }))

    const data = await api.put(
      `/plan/macro-objectives/${macroId}/goals`,
      updated_goals
    )
    return data
  } catch (e) {
    return { data: [] }
  }
}

export const updateFocusObjectiveGoals = async (
  api: AxiosInstance,
  macroId: any,
  focusId: any,
  goals: any
) => {
  try {
    const updated_goals = goals.map((goal: any) => ({
      ...goal,
      endAt: `${goal.endAt.split('/')[1]}-${goal.endAt.split('/')[0]}-10`,
      causeIndicatorId: goal.causeIndicatorId
        ? `${goal.causeIndicatorId}`
        : goal.causeIndicatorId
    }))

    delete updated_goals.focusId // todo: fix in another way

    const data = await api.put(
      `/plan/macro-objectives/${macroId}/focus/${focusId}/goals`,
      updated_goals
    )
    return data
  } catch (e) {
    return { data: [] }
  }
}

export const getPlanBasicInfo = async (api: AxiosInstance) => {
  try {
    const result = await api.get('/plan')
    return result.data.data
  } catch (e) {
    console.log(e)
  }
}

export const updatePlanBasicInfo = async (api: AxiosInstance, payload: any) => {
  try {
    const result = await api.post('/plan', payload)
    return result
  } catch (e) {
    throw e
  }
}

export const getPlanProblemDiagnosisSummary = async (api: AxiosInstance) => {
  try {
    const result = await api.get('/plan/problem-diagnoses')
    return result.data
  } catch (e) {
    return []
  }
}

export const updatePlanProbleDiagnosisRecord = async (
  api: AxiosInstance,
  payload: any
) => {
  try {
    await api.put('/plan/problem-diagnoses', payload)
  } catch (e) {
    throw e
  }
}

export const updatePlanCausesDiagnosisRecords = async (
  api: AxiosInstance,
  causeId: any,
  payload: any
) => {
  try {
    await api.put(`/plan/causes/${causeId}/cause-diagnoses`, payload)
  } catch (e) {
    throw e
  }
}

export const getPlanCausesDiagnosisSummary = async (api: AxiosInstance) => {
  try {
    const result = await api.get('/plan/cause-diagnoses')
    return result.data
  } catch (e) {
    return []
  }
}

export const getPlansSummary = async (api: AxiosInstance) => {
  try {
    const result = await api.get('/plan/status')
    return result
  } catch (e) {
    return {}
  }
}

export const getPlanTacticalDimensionData = async (api: AxiosInstance) => {
  try {
    const result = await api.get('/plan/tactical-dimension')
    return result.data
  } catch (e) {
    return []
  }
}

export const getAllMunicipalDepartments = async (api: AxiosInstance) => {
  try {
    const result = await api.get('/api/municipal-departments')
    return result
  } catch (e) {
    return { data: [] }
  }
}

export const getAllNeighborhoods = async (api: AxiosInstance) => {
  try {
    const result = await api.get('/api/neighborhoods')
    return result
  } catch (e) {
    return { data: [] }
  }
}

export const updateTacticalDimension = async (
  api: AxiosInstance,
  payload: any
) => {
  try {
    await api.put(`/plan/tactical-dimension`, payload)
  } catch (e) {
    throw e
  }
}

export const getPlanPDFData = async (api: AxiosInstance) => {
  try {
    const data = await api.get(`/plan/pdf`)
    return data.data
  } catch (e) {
    throw e
  }
}
