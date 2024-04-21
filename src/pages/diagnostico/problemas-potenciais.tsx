import { useEffect } from 'react'

import { useProblems } from 'contexts/Problems'

import { ProblemsStateTypes } from 'types/Problems'

import { getAPIClient } from 'services/axios'
import { getProblems, getProblemsSummary } from 'services/problems'
import CityProblems from 'templates/Problems'
import { withSSRAuth } from 'utils/withSSRAuth'

type ProblemsPageProps = {
  problemsData: ProblemsStateTypes
}

export default function ProblemsPage({ problemsData }: ProblemsPageProps) {
  const { setProblemsState } = useProblems()
  const { problems, summary, totalPages, totalItems } = problemsData
  useEffect(() => {
    setProblemsState((state) => ({
      ...state,
      problems,
      summary,
      totalPages,
      totalItems
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemsData])

  return <CityProblems/>
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = getAPIClient(ctx)

  const { problems, totalItems, totalPages } = await getProblems(
    apiClient,
    1,
    10,
    'name',
    'asc'
  )
  const summary = await getProblemsSummary(apiClient)

  return {
    props: {
      problemsData: {
        problems: problems || [],
        summary,
        totalItems: totalItems || 0,
        totalPages: totalPages || 1
      }
    }
  }
})
