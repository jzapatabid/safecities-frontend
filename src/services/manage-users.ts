import { UserModel } from 'types/Admin'

import { AxiosInstance } from 'axios'

type NewInvitePararms = {
  api: AxiosInstance
  firstname: string
  lastname: string
  email: string
}

type ResendInviteParams = {
  api: AxiosInstance
  ids: number[]
}

type PaginatedUsersFetchParams = {
  api: AxiosInstance
  page: number
  pageSize: number
  search: string
  order_field: string
  sort_type: string
}

export type GetUsersResponseTypes = {
  users: UserModel[]
  totalItems: number
  totalPages: number
}

export const sendNewInvite = async ({
  api,
  firstname,
  lastname,
  email
}: NewInvitePararms): Promise<any> => {
  try {
    await api.post(`/auth/signup`, {
      name: firstname,
      lastName: lastname,
      email
    })
  } catch (error: any) {
    throw error
  }
}

export const fetchAllUsersList = async (api: AxiosInstance) => {
  try {
    const response = await api.get('/auth/users/all')

    return response.data
  } catch (err) {
    console.log(err)
    // throw err
  }
}

export const fetchPaginatedUsersList = async ({
  api,
  search,
  page,
  pageSize,
  order_field,
  sort_type
}: PaginatedUsersFetchParams) => {
  try {
    const response = await api.get(
      `/auth/users?page=${page}&search=${search}&page_size=${pageSize}&order_field=${
        order_field === 'isActive' ? 'is_active' : order_field
      }&sort_type=${sort_type}`
    )

    const data: GetUsersResponseTypes = {
      users: response.data.data.results,
      totalItems: response.data.data.totalItems,
      totalPages: response.data.data.totalPages
    }

    return data
  } catch (err) {
    return {
      users: [],
      totalItems: 0,
      totalPages: 1
      // throw err
    }
  }
}

export const resendInvite = async ({ api, ids }: ResendInviteParams) => {
  try {
    const response = await api.post('/auth/send-activation-token', {
      usersId: ids
    })
    return response.data
  } catch (err) {
    throw err
  }
}
