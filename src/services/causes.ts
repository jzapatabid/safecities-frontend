import { ProblemModel } from 'types/Problems'

import { AxiosInstance } from 'axios'

export type ProblemsWithCausesDetailResponseModel = {
  problemsWithCausesDetail: ProblemModel[]
  totalItems: number
  totalPages: number
}

export const getDefaultCauseDetail = async (
  api: AxiosInstance,
  causeId: string
) => {
  try {
    const response = await api.get(`/causes/default-causes/${causeId}`)
    return response.data
  } catch {
    return {}
  }
}

export const getDeafultCauseIndicatorDetails = async (
  api: AxiosInstance,
  causeId: string
) => {
  try {
    const response = await api.get(`/causes/${causeId}/indicators/all`)
    return response.data.data
  } catch {
    return {}
  }
}

export const getPersonalizedCauseDetail = async (
  api: AxiosInstance,
  causeId: string
) => {
  try {
    const response = await api.get(`/causes/custom-causes/${causeId}`)
    return response.data
  } catch {
    return {}
  }
}

export const getCausesSummary = async (api: AxiosInstance) => {
  try {
    const response = await api.get('/causes/summary')
    return response.data.data
  } catch (e) {
    return {}
  }
}

export const getPrioritizedProblemsWithCauseData = async (
  api: AxiosInstance,
  page: number,
  page_size: number,
  sortColumn: string,
  sort_type: string
): Promise<ProblemsWithCausesDetailResponseModel> => {
  try {
    const response = await api.get(
      `/problems?page_size=${page_size}&sort_type=${sort_type}&page=${page}&order_field=${sortColumn}&prioritized=true`
    )

    const data: ProblemsWithCausesDetailResponseModel = {
      problemsWithCausesDetail: response.data.data.results,
      totalItems: response.data.data.totalItems,
      totalPages: response.data.data.totalPages
    }
    return data
  } catch (e) {
    return {} as ProblemsWithCausesDetailResponseModel
  }
}

export const createPersonalizedCause = async (
  api: AxiosInstance,
  cause: any
) => {
  const formData = new FormData()
  formData.append('evidences', cause.evidences)
  formData.append('justification', cause.justification)
  formData.append('name', cause.name)
  cause.annexes.map((file: any) => formData.append('annexes', file))
  cause.references.map((link: string) => formData.append('references', link))
  cause.problems.map(({ id }: { id: string }) =>
    formData.append('problems', id)
  )
  try {
    const response = await api.post('/causes/custom-causes', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  } catch (e) {
    throw e
  }
}

export const updatePersonalizedCause = async (
  api: AxiosInstance,
  cause: any
) => {
  const formData = new FormData()
  formData.append('evidences', cause.evidences)
  formData.append('justification', cause.justification)
  formData.append('name', cause.name)
  cause.annexesToAdd
    ? cause.annexesToAdd.map((file: any) =>
        formData.append('annexesToAdd', file)
      )
    : null
  cause.annexesToRemove
    ? cause.annexesToRemove.map((fileId: string) =>
        formData.append('annexesToRemove', fileId)
      )
    : null
  cause.references.map((link: string) => formData.append('references', link))
  cause.problems.map(({ id }: { id: string }) =>
    formData.append('problems', id)
  )

  try {
    const response = await api.put(
      `/causes/custom-causes/${cause.id}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )
    return response.data
  } catch (e) {
    throw e
  }
}

export const deleteCause = async (api: AxiosInstance, causeId: string) => {
  try {
    await api.delete(`/causes/custom-causes/${causeId}`)
  } catch (e) {
    throw e
  }
}

export const getProblemsAssociated = async (
  api: AxiosInstance,
  causeId: string
) => {
  try {
    const data = await api.get(`/causes/${causeId}/problems/all`)
    return data.data.data
  } catch (e) {
    throw e
  }
}

function createCauseProblemsMap(data: any[]) {
  const idObjectMap = new Map()

  // Iterate through the array of objects
  for (const obj of data) {
    const { causeId } = obj

    // Check if the 'id' property exists in the map
    if (!idObjectMap.has(causeId)) {
      // If not, initialize it with an empty array
      idObjectMap.set(causeId, [])
    }

    // Push the object to the array corresponding to its 'id'
    idObjectMap.get(causeId).push(obj)
  }

  return idObjectMap
}

export const getProblemsAssociatedForMultipleCauses = async (
  api: AxiosInstance,
  causeIds: string[]
) => {
  try {
    const queryParams = causeIds.map((str: string) => `cause_ids=${str}`)
    const data = await api.get(
      `/causes/prioritization/all?${queryParams.join('&')}`
    )
    return createCauseProblemsMap(data.data.data)
  } catch (e) {
    throw e
  }
}

export const prioritizeCauseProblems = async (
  api: AxiosInstance,
  payload: any[]
) => {
  try {
    const data = await api.put(`/causes/prioritization`, payload)
    return data
  } catch (e) {
    throw e
  }
}
