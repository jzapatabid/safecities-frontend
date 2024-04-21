// import { problemDetailPageMockData } from 'contexts/Problems/initialState'

import { defaultCauseDetailWithMockData } from 'contexts/Causes/initialState'

import { getAPIClient } from 'services/axios'
import { getInitiativeDetail } from 'services/initiatives'
import InitiativeDetail from 'templates/InitiativeDetail'
import { withSSRAuth } from 'utils/withSSRAuth'

// import { getAPIClient } from 'services/axios'
// import { getProblemDetail } from 'services/problems'

type CauseDetailPageProps = {
  id: number
  detail: any
  problemId: number
  problemName: string
}

export default function CauseDetailPage({ id, detail }: CauseDetailPageProps) {
  return (
    <InitiativeDetail
      id={id}
      detail={{ ...detail, ...defaultCauseDetailWithMockData }}
    />
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = getAPIClient(ctx)

  const initiative_detail = await getInitiativeDetail(
    apiClient,
    ctx.query.id as string
  )

  return {
    props: {
      id: ctx.query.id,
      detail: initiative_detail?.data || {}
    }
  }
})
