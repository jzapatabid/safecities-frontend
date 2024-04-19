import { useEffect } from 'react'

import { usePlans } from 'contexts/plans'

import { getAPIClient } from 'services/axios'
import { getMacroObjectives, getPlanBasicInfo } from 'services/plans'
import PlanStrategyMacroObjectives from 'templates/PlanStrategyMacroObjectives'
import { withSSRAuth } from 'utils/withSSRAuth'
import { v4 } from 'uuid'

type PlanMacroObjectivesPageProps = {
  macro_objectives: any[]
  basic_information: any
}

export default function PlanBasicInfoPage({
  macro_objectives,
  basic_information
}: PlanMacroObjectivesPageProps) {
  const { setPlansState } = usePlans()
  useEffect(() => {
    setPlansState((state) => ({ ...state, macro_objectives }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [macro_objectives])

  return <PlanStrategyMacroObjectives basic_information={basic_information} />
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = getAPIClient(ctx)

  const [basicInfo, macroObjectives] = await Promise.all([
    getPlanBasicInfo(apiClient),
    getMacroObjectives(apiClient)
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

  const macro_objectives = macroObjectives.data.map((item: any) => ({
    ...item,
    open: false,
    macroId: v4(),
    goals: item.goals.map((goal: any) => ({
      ...goal,
      goalId: v4(),
      endAt: `${goal.endAt.split('-')[1]}/${goal.endAt.split('-')[0]}`
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
      macro_objectives: macro_objectives || []
    }
  }
})
