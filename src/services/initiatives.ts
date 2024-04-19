import { AxiosInstance } from 'axios'

export const getInitiatives = async (
  api: AxiosInstance,
  page: number,
  totalPages: number,
  sort_column?: string,
  sort_type?: string
) => {
  try {
    const data = await api.get(
      `/initiatives?order_field=${sort_column}&page_size=${totalPages}&page=${page}&sort_type=${
        sort_type || 'asc'
      }`
    )
    return data.data.data
  } catch (e) {
    throw e
  }
}

export const getInitiativeDetail = async (
  api: AxiosInstance,
  initiative_id: string
) => {
  try {
    const response = await api.get(`/initiatives/${initiative_id}`)
    return response.data
  } catch {
    return {}
  }
}

export const getAllPrioritizedCauses = async (api: AxiosInstance) => {
  try {
    const result = await api.get('/initiatives/options/causes')
    return result
  } catch (e) {
    throw e
  }
}

export const getAllDepartments = async (api: AxiosInstance) => {
  try {
    const result = await api.get('/initiatives/options/municipal-departments')
    return result
  } catch (e) {
    throw e
  }
}

export const updatePersonalizedInitiative = async (
  api: AxiosInstance,
  cause: any
) => {
  const causesSelected = cause.causes.filter((cause: any) => cause.checked)
  const departments = cause.departments.filter((cause: any) => cause.checked)
  const efficiencyLevel = cause.efficiencies.filter(
    (cause: any) => cause.checked
  )[0].id
  const costLevel = cause.costs.filter((cause: any) => cause.checked)[0].id

  const formData = new FormData()
  formData.append('efficiencyLevel', efficiencyLevel)
  formData.append('costLevel', costLevel)
  formData.append('evidences', cause.evidences)
  formData.append('name', cause.name)
  formData.append('justification', cause.justification)
  departments.map(({ id }: { id: string }) =>
    formData.append('municipalDepartmentIds', id)
  )
  causesSelected.map(({ id }: { id: string }) =>
    formData.append('causeIds', id)
  )

  cause.annexesToRemove?.map((id: string) =>
    formData.append('annexFilesToDeleteIds', id)
  )

  cause.annexesToAdd?.map((file: any) => formData.append('annexFiles', file))
  cause.references.map((link: string) => formData.append('referenceUrls', link))

  try {
    const response = await api.put(`/initiatives/${cause.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const createPersonalizedInitiative = async (
  api: AxiosInstance,
  cause: any
) => {
  const causesSelected = cause.causes.filter((cause: any) => cause.checked)
  const departments = cause.departments.filter((cause: any) => cause.checked)
  const efficiencyLevel = cause.efficiencies.filter(
    (cause: any) => cause.checked
  )[0].id
  const costLevel = cause.costs.filter((cause: any) => cause.checked)[0].id

  const formData = new FormData()
  formData.append('efficiencyLevel', efficiencyLevel)
  formData.append('costLevel', costLevel)
  formData.append('evidences', cause.evidences)
  formData.append('name', cause.name)
  formData.append('justification', cause.justification)
  departments.map(({ id }: { id: string }) =>
    formData.append('municipalDepartmentIds', id)
  )
  causesSelected.map(({ id }: { id: string }) =>
    formData.append('causeIds', id)
  )

  cause.annexes.map((file: any) => formData.append('annexFiles', file))
  cause.references.map((link: string) => formData.append('referenceUrls', link))
  cause.evidence_references.map((link: string) =>
    formData.append('evidenceUrls', link)
  )
  // cause.problems.map(({ id }: { id: string }) =>
  //   formData.append('problems', id)
  // )
  try {
    const response = await api.post('/initiatives', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  } catch (e) {
    throw e
  }
}

export const deleteInitiative = async (
  api: AxiosInstance,
  initiativeId: string
) => {
  try {
    await api.delete(`/initiatives/${initiativeId}`)
  } catch (e) {
    throw e
  }
}

export const getInitiativesSummary = async (api: AxiosInstance) => {
  try {
    const response = await api.get('/initiatives/summary')
    return response.data.data
  } catch (e) {
    return {}
  }
}

export const getInitiativesAssociations = async (
  api: AxiosInstance,
  initiativeIds: string[]
) => {
  const queryParams = initiativeIds.map(
    (str: string) => `initiative_ids=${str}`
  )
  try {
    const response = await api.get(
      `/initiatives/prioritization/all?${queryParams.join('&')}`
    )
    return response.data.data
  } catch (e) {
    return {}
  }
}

export const prioritizeInitiative = async (
  api: AxiosInstance,
  payload: any
) => {
  try {
    const response = await api.put(`/initiatives/prioritization`, payload)
    return response.data.data
  } catch (e) {
    throw e
  }
}

export const getAllInitiativeOutcomes = async (
  api: AxiosInstance,
  initiativeId: any
) => {
  try {
    const result = await api.get(
      `/initiatives/${initiativeId}/initiative-outcomes`
    )
    return result
  } catch (e) {
    return { data: [] }
  }
}
