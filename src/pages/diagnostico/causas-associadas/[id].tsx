import { useEffect } from 'react'

import { useProblems } from 'contexts/Problems'
// import { problemDetailPageMockData } from 'contexts/Problems/initialState'

import { getAPIClient } from 'services/axios'
import {
  getAssociatedCausesForProblem,
  getProblemDetail
} from 'services/problems'
import AssociatedCauses from 'templates/AssociatedCauses'
import { withSSRAuth } from 'utils/withSSRAuth'

type CauseDetailPageProps = {
  problemId: any
  associatedCausesData: any
  problemDetail: any
  totalCauses: number
}

export default function ProblemDetailPage({
  problemId,
  associatedCausesData,
  problemDetail,
  totalCauses
}: CauseDetailPageProps) {
  const { setProblemsState } = useProblems()

  useEffect(() => {
    setProblemsState((state) => ({
      ...state,
      associatedCausesData: {
        ...state.associatedCausesData,
        ...associatedCausesData,
        viewingProblem: problemDetail
      }
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [associatedCausesData])

  return (
    <AssociatedCauses
      problemId={problemId}
      problem={problemDetail}
      totalCauses={totalCauses}
   />
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = getAPIClient(ctx)

  const [problemDetail, associatedCauses] = await Promise.all([
    getProblemDetail(apiClient, ctx.query.id as string),
    getAssociatedCausesForProblem(
      apiClient,
      ctx.query.id as string,
      1,
      10,
      'name',
      'asc'
    )
  ])

  return {
    props: {
      problemId: ctx.query.id,
      associatedCausesData: associatedCauses,
      problemDetail: problemDetail?.data?.problem || {},
      totalCauses: problemDetail?.data?.totalCauses || 0
    }
  }
})
