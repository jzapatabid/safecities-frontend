import React, { createContext, useState, useContext, useEffect } from 'react'

import { AdminContextProps, AdminStateProps } from 'types/Admin'

import { getAPIClient } from 'services/axios'
import { fetchPaginatedUsersList } from 'services/manage-users'

import { initialState } from './initialState'

const AdminContext = createContext<AdminContextProps>({} as AdminContextProps)

const useAdminData = () => useContext(AdminContext)

const AdminProvider: React.FC = ({ children }) => {
  const api = getAPIClient()
  const [adminState, setAdminState] = useState(initialState as AdminStateProps)

  useEffect(() => {
    // TODO: sacar la funcionalidad ya que se hace peticion siempre
    if ("expirationEpoch" in localStorage) {
      const getUpdatedPaginatedUsersList = async () => {
        const { users, totalItems, totalPages } = await fetchPaginatedUsersList({
          api,
          page: adminState.pageIndex,
          pageSize: adminState.pageSize,
          search: adminState.search,
          order_field: adminState.sorting.column,
          sort_type: adminState.sorting.type
        })
        setAdminState((state) => ({
          ...state,
          paginatedUsers: users,
          totalItems,
          totalPages
        }))
      }
      getUpdatedPaginatedUsersList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    adminState.pageSize,
    adminState.pageIndex,
    adminState.search,
    adminState.sorting
  ])

  return (
    <AdminContext.Provider
      value={{
        adminState,
        setAdminState
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export { AdminProvider, useAdminData }
