import { useEffect } from 'react'

import { PROBLEM_KPI_OPTIONS } from 'constants/Plan'

import { usePlans } from 'contexts/plans'

import { getAPIClient } from 'services/axios'
import {
  getPlanBasicInfo,
  getPlanProblemDiagnosisSummary
} from 'services/plans'
import PlanProblemsDiagnosticSummary from 'templates/PlanProblemsDiagnosticSummary'
import { withSSRAuth } from 'utils/withSSRAuth'
import { v4 } from 'uuid'

type PlanDiagnosticSummaryPageProps = {
  basic_information: any
  problem_diagnosis: any
}

export default function PlanDiagnosticSummaryPage({
  basic_information,
  problem_diagnosis
}: PlanDiagnosticSummaryPageProps) {
  const { setPlansState } = usePlans()

  useEffect(() => {
    setPlansState((state) => ({ ...state, problem_diagnosis }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem_diagnosis])
  return <PlanProblemsDiagnosticSummary basic_information={basic_information} />
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = getAPIClient(ctx)

  const [basicInfo, problemDiagnosis] = await Promise.all([
    getPlanBasicInfo(apiClient),
    getPlanProblemDiagnosisSummary(apiClient)
  ])

  const problem_diagnosis = problemDiagnosis.map((item: any) => ({
    ...item,
    fulfilled: item.problem_name && item.diagnosis,
    open: false,
    problemId: v4(),
    enabled: true,
    kpi_graphs: PROBLEM_KPI_OPTIONS.reduce((acc: any, kpi: any) => {
      if (item.kpi_graphs.includes(kpi.dataKey)) {
        return [...acc, { ...kpi, checked: true }]
      }
      return [...acc, { ...kpi, checked: false }]
    }, [])
  }))

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

  return {
    props: {
      basic_information: basicInfo
        ? basic_information
        : {
            title: '',
            endAt: '',
            startAt: ''
          },
      problem_diagnosis
    }
  }
})
