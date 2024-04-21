import { useEffect } from 'react'

import { usePlans } from 'contexts/plans'

import { getAPIClient } from 'services/axios'
import { getPlanBasicInfo } from 'services/plans'
import PlanBasicInfo from 'templates/PlanBasicInfo'
import { withSSRAuth } from 'utils/withSSRAuth'

type PlanBasicInfoPageProps = {
  basic_information: any
}

export default function PlanBasicInfoPage({
  basic_information
}: PlanBasicInfoPageProps) {
  const { setPlansState } = usePlans()
  const startAt = basic_information?.startAt
    ? `${basic_information?.startAt?.split('-')[2]}/${
        basic_information?.startAt?.split('-')[1]
      }/${basic_information?.startAt?.split('-')[0]}`
    : ''
  const endAt = basic_information?.endAt
    ? `${basic_information?.endAt?.split('-')[2]}/${
        basic_information?.endAt?.split('-')[1]
      }/${basic_information?.endAt?.split('-')[0]}`
    : ''

  useEffect(() => {
    setPlansState((state) => ({
      ...state,
      basic_information: {
        ...basic_information,
        startAt,
        endAt
      }
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basic_information])

  return (
    <PlanBasicInfo
      data={{
        ...basic_information,
        startAt,
        endAt
      }}
   />
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = getAPIClient(ctx)

  const data = await getPlanBasicInfo(apiClient)

  return {
    props: { basic_information: data || {} }
  }
})
