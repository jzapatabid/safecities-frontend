import { useEffect } from 'react'

import { useCauses } from 'contexts/Causes'

import { CausesStateTypes } from 'types/Causes'

import { getAPIClient } from 'services/axios'
import {
  getCausesSummary,
  getPrioritizedProblemsWithCauseData
} from 'services/causes'
import Causes from 'templates/Causes'
import { withSSRAuth } from 'utils/withSSRAuth'

type ProblemsPageProps = {
  problemsData: CausesStateTypes
}

export default function ProblemsPage({ problemsData }: ProblemsPageProps) {
  const { setCausesState } = useCauses()
  const { problemsWithCausesDetail, summary, totalPages, totalItems } =
    problemsData

  useEffect(() => {
    setCausesState((state) => ({
      ...state,
      problemsWithCausesDetail,
      summary,
      totalPages,
      totalItems
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemsData])

  return <Causes />
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = getAPIClient(ctx)

  const [problemDetail, causesSummary] = await Promise.all([
    getPrioritizedProblemsWithCauseData(apiClient, 1, 10, 'name', 'asc'),
    getCausesSummary(apiClient)
  ])

  return {
    props: {
      problemsData: {
        problemsWithCausesDetail: problemDetail?.problemsWithCausesDetail || [],
        summary: causesSummary,
        totalItems: problemDetail?.totalItems || 0,
        totalPages: problemDetail?.totalPages || 1
      }
    }
  }
})
