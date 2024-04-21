import { useEffect } from 'react'

import { CAUSE_KPI_OPTIONS } from 'constants/Plan'

import { usePlans } from 'contexts/plans'

import { getAPIClient } from 'services/axios'
import { getPlanBasicInfo, getPlanCausesDiagnosisSummary } from 'services/plans'
import PlanCausesDiagnosticSummary from 'templates/PlanCausesDiagnosticSummary'
import { withSSRAuth } from 'utils/withSSRAuth'
import { v4 } from 'uuid'

type PlanDiagnosticSummaryPageProps = {
  basic_information: any
  cause_diagnosis: any
  causeDiagnosis: any
}

export default function PlanDiagnosticSummaryPage({
  basic_information,
  cause_diagnosis
}: PlanDiagnosticSummaryPageProps) {
  const { setPlansState } = usePlans()

  useEffect(() => {
    setPlansState((state) => ({ ...state, cause_diagnosis }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cause_diagnosis])
  return <PlanCausesDiagnosticSummary basic_information={basic_information}/>
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = getAPIClient(ctx)

  const [basicInfo, causeDiagnosis] = await Promise.all([
    getPlanBasicInfo(apiClient),
    getPlanCausesDiagnosisSummary(apiClient)
  ])

  const cause_diagnosis = causeDiagnosis.map((item: any) => {
    return {
      ...item,
      causeId: v4(),
      open: false,
      enabled: true,
      fulfilled: item.diagnoses?.length === item.cause_indicators?.length,
      diagnoses: item.diagnoses.map((item: any) => ({
        ...item,
        diagnosisId: v4(),
        kpi_graphs: CAUSE_KPI_OPTIONS.reduce((acc: any, kpi: any) => {
          if (item.kpi_graphs.includes(kpi.dataKey)) {
            return [...acc, { ...kpi, checked: true }]
          }
          return [...acc, { ...kpi, checked: false }]
        }, [])
      }))
    }
  })

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
      cause_diagnosis
    }
  }
})
