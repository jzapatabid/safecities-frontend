import { useEffect } from 'react'

import { usePlans } from 'contexts/plans'

import { getAPIClient } from 'services/axios'
import { getPlanBasicInfo, getPlanTacticalDimensionData } from 'services/plans'
import PlanTacticalDimension from 'templates/PlanTacticalDimension'
import { formatNumberToLatinAmerican } from 'utils'
import { withSSRAuth } from 'utils/withSSRAuth'
import { v4 } from 'uuid'

type PlanTacticalDimensionProps = {
  data: any
  basic_information: any
}

const getFormattedDateType1 = (date: any) =>
  new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    year: 'numeric'
  }).format(date)

const getFormattedDateType3 = (date: any) =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)

export default function PlanBasicInfoPage({
  basic_information,
  data
}: PlanTacticalDimensionProps) {
  const { setPlansState } = usePlans()
  useEffect(() => {
    setPlansState((state) => ({
      ...state,
      tactical_dimension: data?.tactical_dimension || [],
      td_total_cost: formatNumberToLatinAmerican(data?.total_cost || 0)
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return <PlanTacticalDimension basic_information={basic_information}/>
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = getAPIClient(ctx)
  let total_cost = 0

  const [basicInfo, tacticalDimension] = await Promise.all([
    getPlanBasicInfo(apiClient),
    getPlanTacticalDimensionData(apiClient)
  ])

  const basic_information = basicInfo
    ? {
        ...basicInfo,
        startAt: `${basicInfo.startAt.split('-')[2]}/${
          basicInfo.startAt.split('-')[1]
        }/${basicInfo.startAt.split('-')[0]}`,
        endAt: `${basicInfo.endAt.split('-')[2]}/${
          basicInfo.endAt.split('-')[1]
        }/${basicInfo.endAt.split('-')[0]}`
      }
    : {}

  const tactical_dimension = tacticalDimension?.map((item: any) => {
    total_cost =
      total_cost +
      (typeof Number(item.tactical_dimension?.total_cost) === 'number'
        ? item.tactical_dimension?.total_cost
        : 0)

    return {
      ...item,
      open: false,
      enabled: true,
      initiativeId: v4(),
      fulfilled: Boolean(
        item.tactical_dimension.start_at && item.tactical_dimension.end_at
      ),
      tactical_dimension: {
        ...item.tactical_dimension,
        start_at: getFormattedDateType3(
          new Date(item.tactical_dimension.start_at)
        ),
        end_at: getFormattedDateType3(new Date(item.tactical_dimension.end_at)),
        department_roles:
          item.tactical_dimension?.department_roles.map((dept: any) => ({
            ...dept,
            departmentId: v4()
          })) || [],
        goals:
          item.tactical_dimension?.goals.map((goal: any) => ({
            ...goal,
            goalId: v4(),
            date: getFormattedDateType1(new Date(goal.date))
          })) || []
      }
    }
  })

  return {
    props: {
      basic_information: basicInfo
        ? basic_information
        : {
            title: '',
            endAt: '',
            startAt: ''
          },
      data:
        {
          total_cost,
          tactical_dimension
        } || {}
    }
  }
})
