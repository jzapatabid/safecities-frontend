import { useEffect } from 'react'

import { useAdminData } from 'contexts/Admin'

import { UserModel } from 'types/Admin'

import { SORTING_TYPES } from 'enums/Global'
import { PROBLEM } from 'enums/Problems'

import { parseCookies } from 'nookies'
import { getAPIClient } from 'services/axios'
import {
  GetUsersResponseTypes,
  fetchPaginatedUsersList
} from 'services/manage-users'
import ManageUsers from 'templates/ManageUsers'
import { withSSRAuth } from 'utils/withSSRAuth'

type ManageUsersPageProps = {
  users: UserModel[]
  totalItems: number
  totalPages: number
}

const initial_request_params = {
  page: 1,
  pageSize: 10,
  search: '',
  order_field: PROBLEM.NAME,
  sort_type: SORTING_TYPES.ASCENDING
}

export default function ManageUsersPage({
  users,
  totalItems,
  totalPages
}: ManageUsersPageProps) {
  const { setAdminState } = useAdminData()

  useEffect(() => {
    setAdminState((state) => ({
      ...state,
      paginatedUsers: users,
      totalItems,
      totalPages
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, totalItems, totalPages])

  return <ManageUsers />
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const { isAdmin } = parseCookies(ctx)

  if (isAdmin === 'false') {
    return {
      redirect: {
        destination: '/home',
        permanent: false
      }
    }
  }

  const api = getAPIClient(ctx)

  // const usersList = await fetchAllUsersList(api)

  const { users, totalPages, totalItems }: GetUsersResponseTypes =
    await fetchPaginatedUsersList({
      api,
      ...initial_request_params
    })

  return {
    props: {
      users: users,
      totalPages: totalPages,
      totalItems: totalItems
    }
  }
})
