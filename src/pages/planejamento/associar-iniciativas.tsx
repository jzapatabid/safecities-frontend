import { useEffect } from 'react'

import { useInitiatives } from 'contexts/Initiatives'

import { InitiativesStateTypes } from 'types/Initiatives'

import { SORTING_TYPES } from 'enums/Global'
import { INITIATIVE } from 'enums/Plan'

import { getAPIClient } from 'services/axios'
import { getInitiatives, getInitiativesSummary } from 'services/initiatives'
import Initiatives from 'templates/Initiatives'
import { camelToSnake } from 'utils'
import { withSSRAuth } from 'utils/withSSRAuth'

type ProblemsPageProps = {
  initiativesData: InitiativesStateTypes
}

export default function ProblemsPage({ initiativesData }: ProblemsPageProps) {
  const { setInitiativesState } = useInitiatives()
  const { problems, summary, totalPages, totalItems } = initiativesData
  useEffect(() => {
    setInitiativesState((state) => ({
      ...state,
      problems,
      summary,
      totalPages,
      totalItems
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initiativesData])

  return <Initiatives />
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = getAPIClient(ctx)

  const [initiativeDetail, summary] = await Promise.all([
    getInitiatives(
      apiClient,
      1,
      10,
      camelToSnake(INITIATIVE.NAME),
      SORTING_TYPES.ASCENDING
    ),
    getInitiativesSummary(apiClient)
  ])

  return {
    props: {
      initiativesData: {
        problems: initiativeDetail.results || [],
        summary,
        totalItems: initiativeDetail.totalItems || 0,
        totalPages: initiativeDetail.totalPages || 1
      }
    }
  }
})
