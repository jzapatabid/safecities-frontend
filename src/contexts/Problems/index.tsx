import React, { createContext, useState, useContext, useEffect } from 'react'

import { ProblemsContextProps, ProblemsStateTypes } from 'types/Problems'

import { useRouter } from 'next/router'
import { getAPIClient } from 'services/axios'
import { getAssociatedCausesForProblem, getProblems } from 'services/problems'

import initialState from './initialState'

const ProblemsContext = createContext<ProblemsContextProps>(
  {} as ProblemsContextProps
)

const useProblems = () => useContext(ProblemsContext)

const ProblemsProvider: React.FC = ({ children }) => {
  const router = useRouter()
  const api = getAPIClient()
  const [problemsState, setProblemsState] = useState(
    initialState as ProblemsStateTypes
  )

  const getUpdatedPaginatedProblemsList = async () => {
    const response = await getProblems(
      api,
      problemsState.pageIndex,
      problemsState.pageSize,
      problemsState.sorting.column,
      problemsState.sorting.type
    )
    setProblemsState((state) => ({
      ...state,
      ...response
    }))
  }

  const getUpdatedAssociatedCausesData = async () => {
    const response = await getAssociatedCausesForProblem(
      api,
      problemsState.associatedCausesData?.viewingProblem?.id || router.query.id,
      problemsState.associatedCausesData.pageIndex,
      problemsState.associatedCausesData.pageSize,
      problemsState.associatedCausesData.sorting.column,
      problemsState.associatedCausesData.sorting.type
    )

    setProblemsState((state) => ({
      ...state,
      associatedCausesData: { ...state.associatedCausesData, ...response }
    }))
  }

  useEffect(() => {
    // TODO: sacar la funcionalidad ya que se hace peticion siempre
    if ("expirationEpoch" in localStorage) {
      getUpdatedPaginatedProblemsList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemsState.pageSize, problemsState.pageIndex, problemsState.sorting])

  useEffect(() => {
    // TODO: sacar la funcionalidad ya que se hace peticion siempre
    if ("expirationEpoch" in localStorage) {
      getUpdatedAssociatedCausesData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    problemsState.associatedCausesData.pageSize,
    problemsState.associatedCausesData.pageIndex,
    problemsState.associatedCausesData.sorting
  ])

  return (
    <ProblemsContext.Provider value={{ problemsState, setProblemsState }}>
      {children}
    </ProblemsContext.Provider>
  )
}

export { ProblemsContext, ProblemsProvider, useProblems }
