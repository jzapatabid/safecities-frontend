import { ProblemModel } from 'types/Problems'

import { AxiosInstance } from 'axios'

export type CityProblemMetricModel = {
  title: string
  metric_name: string
  score: number
  text: string[]
}

export type CityProblemAnalysisModel = {
  id: number
  problem_id: number
  analysis_link: string
  analysis: number
}

export type CityProblemGroupItemModel = {
  item_name: string
  priority: number
  problem_id: number
  is_total: boolean
  is_prioritized: boolean
  metrics: CityProblemMetricModel[]
  problem_analysis: CityProblemAnalysisModel
}

export type CityProblemGroupsModel = {
  group_name: string
  priority: number
  metrics: CityProblemMetricModel[]
  group_items: CityProblemGroupItemModel[]
}

export type CityProblemModel = {
  problems: ProblemModel[]
  totalItems: number
  totalPages: number
}

export const getProblems = async (
  api: AxiosInstance,
  page: number,
  page_size: number,
  sortColumn: string,
  sort_type: string
): Promise<CityProblemModel | Record<string, never>> => {
  try {
    const response = await api.get(
      `/problems?page_size=${page_size}&sort_type=${sort_type}&page=${page}&order_field=${sortColumn}`
    )

    const data: CityProblemModel = {
      problems: response.data.data.results,
      totalItems: response.data.data.totalItems,
      totalPages: response.data.data.totalPages
    }
    return data
  } catch (e) {
    return {}
  }
}

export const getProblemsSummary = async (api: AxiosInstance) => {
  try {
    const response = await api.get('/problems/summary')
    return response.data.data
  } catch (e) {
    return {}
  }
}

export const prioritizeProblems = async (
  api: AxiosInstance,
  problemsId?: number[]
): Promise<CityProblemModel[] | []> => {
  try {
    const response = await api.put('/problems/prioritize', {
      problemsId
    })
    return response.data.problems
  } catch (e) {
    throw e
  }
}

export const deprioritizeProblems = async (
  api: AxiosInstance,
  problemsId?: number[]
): Promise<CityProblemModel[] | []> => {
  try {
    const response = await api.delete('/problems/prioritize', {
      data: {
        problemsId
      }
    })
    return response.data.problems
  } catch (e) {
    throw e
  }
}

export const getProblemDetail = async (
  api: AxiosInstance,
  problemId?: string
) => {
  try {
    const response = await api.get(`/problems/${problemId}`)
    return response.data
  } catch (e: any) {
    return { data: {} }
  }
}

export const getPersonalizedProblemDetail = async (
  api: AxiosInstance,
  problemId?: string
) => {
  try {
    const response = await api.get(`/problems/custom-problem/${problemId}`)
    return response.data
  } catch (e: any) {
    return { data: {} }
  }
}

export const getAssociatedCausesForProblem = async (
  api: AxiosInstance,
  problem_id: string,
  page: number,
  page_size: number,
  order_field: string,
  sort_type: string
) => {
  try {
    const response = await api.get(
      `/problems/${problem_id}/causes?order_field=${order_field}&page_size=${page_size}&page=${page}&sort_type=${sort_type}`
    )

    const data = {
      items: response.data.data.results,
      totalItems: response.data.data.totalItems,
      totalPages: response.data.data.totalPages
    }

    return data
  } catch (e: any) {
    return {
      items: 0,
      totalItems: 0,
      totalPages: 1
    }
  }
}

export const getAllProblems = async (api: AxiosInstance) => {
  try {
    const result = await api.get('/problems/options/all')
    return result
  } catch (e) {
    throw e
  }
}

export const createPersonalizedProblem = async (
  api: AxiosInstance,
  cause: any
) => {
  const formData = new FormData()
  formData.append('name', cause.name)
  formData.append('description', cause.description)
  cause.annexes.map((file: any) => formData.append('annexes', file))
  cause.references.map((link: string) => formData.append('references', link))

  try {
    const response = await api.post('/problems/custom-problem', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  } catch (e) {
    throw e
  }
}

export const updatePersonalizedProblem = async (
  api: AxiosInstance,
  cause: any
) => {
  const formData = new FormData()
  formData.append('name', cause.name)
  formData.append('description', cause.description)

  cause.annexesToRemove?.map((id: string) =>
    formData.append('annexesToRemove', id)
  )

  cause.annexesToAdd?.map((file: any) => formData.append('annexesToAdd', file))
  cause.references.map((link: string) => formData.append('references', link))

  try {
    const response = await api.put(
      `/problems/custom-problem/${cause.id}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const deletePersonalizedProblem = async (
  api: AxiosInstance,
  problemId: string
) => {
  try {
    await api.delete(`/problems/custom-problem/${problemId}`)
  } catch (e) {
    throw e
  }
}
