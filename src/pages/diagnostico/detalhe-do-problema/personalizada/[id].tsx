import { useEffect } from 'react'

import { useProblems } from 'contexts/Problems'

import { getAPIClient } from 'services/axios'
import { getPersonalizedProblemDetail } from 'services/problems'
import PersonalizedProblemDetail from 'templates/PersonalizedProblemDetail'
import { withSSRAuth } from 'utils/withSSRAuth'

type PersonalizedProblemDetailPageProps = {
  id: any
  detail: any
}

export default function PersonalizedProblemDetailPage({
  id,
  detail
}: PersonalizedProblemDetailPageProps) {
  const { setProblemsState } = useProblems()

  useEffect(() => {
    setProblemsState((state) => ({ ...state, viewingProblem: detail.problem }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <PersonalizedProblemDetail id={id} detail={detail} />
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = getAPIClient(ctx)

  const detail = await getPersonalizedProblemDetail(
    apiClient,
    ctx.query.id as string
  )

  return {
    props: {
      id: ctx.query.id,
      detail: detail.data
    }
  }
})
