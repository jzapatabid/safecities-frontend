// import { problemDetailPageMockData } from 'contexts/Problems/initialState'

// import { defaultCauseDetailWithMockData } from 'contexts/Causes/initialState'

import { getAPIClient } from 'services/axios'
import {
  getDeafultCauseIndicatorDetails,
  getDefaultCauseDetail
} from 'services/causes'
import DefaultCauseDetail from 'templates/DefaultCauseDetail'
import { withSSRAuth } from 'utils/withSSRAuth'

// import { getAPIClient } from 'services/axios'
// import { getProblemDetail } from 'services/problems'

type CauseDetailPageProps = {
  id: number
  detail: any
  problemId: number
  problemName: string
  indicators: any
}

export default function CauseDetailPage({
  id,
  problemId,
  problemName,
  detail,
  indicators
}: CauseDetailPageProps) {
  return (
    <DefaultCauseDetail
      id={id}
      problemId={problemId}
      problemName={problemName}
      detail={{ ...detail, indicators }}
   />
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const urlParam = String(ctx.query.id)
  const causeId = urlParam.split('-')[0]
  const problemId = urlParam.split('-')[1]
  const problemName = urlParam.split('-')[2]

  // const detail = await getDefaultCauseDetail(apiClient, causeId)

  const [detail, indicatorsDetail] = await Promise.all([
    getDefaultCauseDetail(apiClient, causeId),
    getDeafultCauseIndicatorDetails(apiClient, causeId)
  ])

  return {
    props: {
      id: causeId,
      problemId: problemId || '',
      problemName: problemName || '',
      detail: detail?.data || {},
      indicators: indicatorsDetail
    }
  }
})
