import { useEffect } from 'react'

import { usePlans } from 'contexts/plans'

import { getAPIClient } from 'services/axios'
import { getPlansSummary } from 'services/plans'
import Plans from 'templates/Plan'
import { withSSRAuth } from 'utils/withSSRAuth'

type PlansPageProps = {
  plansData: any
}

export default function ProblemsPage({ plansData }: PlansPageProps) {
  const { setPlansState } = usePlans()
  const { summary } = plansData

  useEffect(() => {
    setPlansState((state) => ({
      ...state,
      basicInformationStatus: summary.basicInformation || {},
      diagnosisStatus: summary.diagnostic || {},
      strategicDimensionStatus: summary.strategic_dimension || {},
      tacticalDimensionStatus: summary.tactical_dimension || {},
      summary: {
        prioritizedCauses: summary.prioritizedCauses,
        prioritizedInitiatives: summary.prioritizedInitiatives,
        prioritizedProblems: summary.prioritizedProblems
      }
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plansData])

  return <Plans/>
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = getAPIClient(ctx)

  const planSummary: any = await getPlansSummary(apiClient)

  return {
    props: {
      plansData: {
        summary: planSummary?.data || {}
      }
    }
  }
})
