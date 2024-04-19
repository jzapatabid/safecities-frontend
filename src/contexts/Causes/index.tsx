import React, { createContext, useState, useContext, useEffect } from 'react'

import { CausesContextProps, CausesStateTypes } from 'types/Causes'

import { getAPIClient } from 'services/axios'
import { getPrioritizedProblemsWithCauseData } from 'services/causes'

import initialState from './initialState'

const CausesContext = createContext<CausesContextProps>(
  {} as CausesContextProps
)

const useCauses = () => useContext(CausesContext)

const CausesProvider: React.FC = ({ children }) => {
  const api = getAPIClient()
  const [causesState, setCausesState] = useState(
    initialState as CausesStateTypes
  )

  useEffect(() => {
    // TODO: sacar la funcionalidad ya que se hace peticion siempre
    if ("expirationEpoch" in localStorage) {
      const getUpdatedPaginatedProblemsList = async () => {
        const response = await getPrioritizedProblemsWithCauseData(
          api,
          causesState.pageIndex,
          causesState.pageSize,
          causesState.sorting.column,
          causesState.sorting.type
        )
  
        setCausesState((state) => ({
          ...state,
          ...response
        }))
      }
      getUpdatedPaginatedProblemsList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [causesState.pageSize, causesState.pageIndex, causesState.sorting])

  return (
    <CausesContext.Provider value={{ causesState, setCausesState }}>
      {children}
    </CausesContext.Provider>
  )
}

export { CausesContext, CausesProvider, useCauses }
