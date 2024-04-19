import React, { createContext, useState, useContext, useEffect } from 'react'

import {
  InitiativesContextProps,
  InitiativesStateTypes
} from 'types/Initiatives'

// import { useRouter } from 'next/router'
import { getAPIClient } from 'services/axios'
import { getInitiatives } from 'services/initiatives'

import initialState from './initialState'

const InitiativesContext = createContext<InitiativesContextProps>(
  {} as InitiativesContextProps
)

const useInitiatives = () => useContext(InitiativesContext)

const InitiativesProvider: React.FC = ({ children }) => {
  // const router = useRouter()
  const api = getAPIClient()
  const [initiativesState, setInitiativesState] = useState(
    initialState as InitiativesStateTypes
  )

  const getUpdatedPaginatedInitiativesList = async () => {
    const response = await getInitiatives(
      api,
      initiativesState.pageIndex,
      initiativesState.pageSize,
      initiativesState.sorting.column,
      initiativesState.sorting.type
    )

    setInitiativesState((state) => {
      return {
        ...state,
        ...response,
        problems: response.results
      }
    })
  }

  useEffect(() => {
    // TODO: sacar la funcionalidad ya que se hace peticion siempre
    if ("expirationEpoch" in localStorage) {
      getUpdatedPaginatedInitiativesList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    initiativesState.pageSize,
    initiativesState.pageIndex,
    initiativesState.sorting
  ])

  return (
    <InitiativesContext.Provider
      value={{ initiativesState, setInitiativesState }}
    >
      {children}
    </InitiativesContext.Provider>
  )
}

export { InitiativesContext, InitiativesProvider, useInitiatives }
