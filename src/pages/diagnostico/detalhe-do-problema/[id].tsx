import { useEffect } from 'react'

import { useProblems } from 'contexts/Problems'
// import { problemDetailPageMockData } from 'contexts/Problems/initialState'

import { getAPIClient } from 'services/axios'
import { getProblemDetail } from 'services/problems'
import ProblemDetail from 'templates/ProblemDetail'
import { withSSRAuth } from 'utils/withSSRAuth'

type ProblemDetailPageProps = {
  id: any
  detail: any
  backTo: string
}

export default function ProblemDetailPage({
  id,
  detail,
  backTo
}: ProblemDetailPageProps) {
  const { setProblemsState } = useProblems()

  useEffect(() => {
    setProblemsState((state) => ({ ...state, viewingProblem: detail.problem }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <ProblemDetail id={id} detail={detail} backTo={backTo}/>
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const urlParam = String(ctx.query.id)
  const problemId = urlParam.split('-')[0]
  const backTo = urlParam.split('-')[1]

  const detail = await getProblemDetail(apiClient, problemId as string)

  return {
    props: {
      id: ctx.query.id,
      detail: detail.data,
      backTo: backTo || ''
    }
  }
})
