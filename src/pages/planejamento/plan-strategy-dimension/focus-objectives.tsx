import { useEffect } from 'react'

import { usePlans } from 'contexts/plans'

import { getAPIClient } from 'services/axios'
import { getFocusObjectives, getPlanBasicInfo } from 'services/plans'
import PlanStrategyFocusObjectives from 'templates/PlanStrategyFocusObjectives'
import { withSSRAuth } from 'utils/withSSRAuth'
import { v4 } from 'uuid'

type PlanFocusObjectivesPageProps = {
  focus_objectives: any[]
  basic_information: any
}

export default function PlanBasicInfoPage({
  basic_information,
  focus_objectives
}: PlanFocusObjectivesPageProps) {
  const { setPlansState } = usePlans()
  useEffect(() => {
    setPlansState((state) => ({ ...state, focus_objectives }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus_objectives])

  return <PlanStrategyFocusObjectives basic_information={basic_information} />
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = getAPIClient(ctx)

  const [basicInfo, focusObjectives] = await Promise.all([
    getPlanBasicInfo(apiClient),
    getFocusObjectives(apiClient)
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

  const focus_objectives = focusObjectives.data.map((item: any) => ({
    ...item,
    open: false,
    macroId: v4(),
    goals: item.goals.map((goal: any) => ({
      ...goal,
      goalId: v4(),
      endAt: `${goal.endAt.split('-')[1]}/${goal.endAt.split('-')[0]}`
    })),
    focuses: item.focuses.map((item: any) => ({
      ...item,
      open: false,
      focusId: v4(),
      goals: item.goals.map((goal: any) => ({
        ...goal,
        goalId: v4(),
        endAt: `${goal.endAt.split('-')[1]}/${goal.endAt.split('-')[0]}`
      }))
    }))
  }))

  return {
    props: {
      basic_information: basicInfo
        ? basic_information
        : {
            title: '',
            endAt: '',
            startAt: ''
          },
      focus_objectives: focus_objectives || []
    }
  }
})
