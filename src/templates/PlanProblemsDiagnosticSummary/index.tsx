import { useCallback } from 'react'

import {
  PLAN_DISGNOSIS_SUMMARY_NAV_LINKS,
  PLAN_PRINARY_NAV_LINKS
} from 'constants/Plan'

import { usePlans } from 'contexts/plans'

import { useRouter } from 'next/router'
import { getAPIClient } from 'services/axios'
import { updatePlanProbleDiagnosisRecord } from 'services/plans'

import * as S from './styles'

import ProblemDiagnosisContent from 'components/AccordionContents/ProblemDiagnosisContent'
import AccordionFooter from 'components/AccordionFooter'
import DiagnosisSummaryHeader from 'components/AccordionHeaders/DiagnosisSummaryHeader'
import AccordionV2 from 'components/AccordionV3'
import Header from 'components/Header'
import MainContainer from 'components/MainContainer'
import NavBarGeneric from 'components/NavBarGeneric'
import NavigateBack from 'components/NavigateBack'
import LanguageProvider from 'contexts/LanguageSelector'
import { FormattedMessage } from 'react-intl'

type PlanProblemsDiagnosticSummaryPageProps = {
  basic_information: any
}

const PlanProblemsDiagnosticSummary = ({
  basic_information
}: PlanProblemsDiagnosticSummaryPageProps) => {
  const { plansState, setPlansState } = usePlans()
  const apiClient = getAPIClient()
  const router = useRouter()

  const handleAnalysisUpdate = useCallback(
    (problemId: any) => (event: any) => {
      setPlansState((state) => ({
        ...state,
        problem_diagnosis: state.problem_diagnosis.map((item) =>
          item.problemId === problemId
            ? { ...item, diagnosis: event?.target.value }
            : item
        )
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleAccordionToggle = useCallback(
    (problemId: any) => () => {
      setPlansState((state: any) => ({
        ...state,
        problem_diagnosis: state.problem_diagnosis.map((item: any) => {
          if (item.problemId !== problemId) {
            return item
          }
          return { ...item, open: !item.open }
        })
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleKPISelectionsUpdate = useCallback(
    (problemId: any) => (clickedOption: any) => {
      setPlansState((state: any) => ({
        ...state,
        problem_diagnosis: state.problem_diagnosis.map((item: any) => {
          if (item.problemId !== problemId) {
            return item
          }
          const updatedKpis = item.kpi_graphs.map((item: any) =>
            item.dataKey === clickedOption.dataKey
              ? { ...item, checked: !item.checked }
              : item
          )
          return { ...item, kpi_graphs: updatedKpis }
        })
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleSave = (problemId: any) => async () => {
    const selectedProblem = plansState.problem_diagnosis.find(
      (problem: any) => problem.problemId === problemId
    )

    if (selectedProblem) {
      const payload = [
        {
          diagnosis: selectedProblem.diagnosis,
          diagnosis_graphs: selectedProblem.kpi_graphs
            .filter((kpi: any) => kpi.checked)
            .map((kpi: any) => kpi.dataKey),
          problem_id: selectedProblem.problem_id
        }
      ]
      try {
        await updatePlanProbleDiagnosisRecord(apiClient, payload)
        router.replace(router.asPath)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <>
      <LanguageProvider>
        <Header />
        <MainContainer>
        <NavigateBack
          normalText= "plan.basic.info.go.back"
          linkText="plan.basic.info.link.text"
          url="/planejamento/construir-plano"
        />
        <S.SectionWrapper>
          <S.PlanName>
            {basic_information?.title || "[Nombre del Plan]"}
          </S.PlanName>
          <S.PlanDates>{`De ${
            basic_information?.startAt || '[Data de inicio]'
          } a ${basic_information?.endAt || '[Data de término]'}`}</S.PlanDates>
        </S.SectionWrapper>
        <S.SectionWrapper>
          <S.NavBarWrapper>
            <NavBarGeneric
              links={PLAN_PRINARY_NAV_LINKS.map((linkProps) => {
                return {
                  ...linkProps
                }
              })}
              variant="small"
            />
          </S.NavBarWrapper>
        </S.SectionWrapper>
        <S.SectionWrapperNoBottomUnderline>
          <S.NavBarWrapperWithUnderline>
            <NavBarGeneric
              links={PLAN_DISGNOSIS_SUMMARY_NAV_LINKS.map((linkProps) => {
                return {
                  ...linkProps
                }
              })}
              variant="small"
            />
          </S.NavBarWrapperWithUnderline>
        </S.SectionWrapperNoBottomUnderline>
        <S.ContentSection>
          <S.ListWrapper>
            {plansState.problem_diagnosis.map((item: any, idx: number) => (
              <AccordionV2
                key={idx}
                data={item}
                toggleAccordion={handleAccordionToggle(item.problemId)}
              >
                {{
                  header: (
                    <DiagnosisSummaryHeader
                      data={item}
                      fulfilled={item.fulfilled}
                    />
                  ),
                  summary: null,
                  content: (
                    <ProblemDiagnosisContent
                      data={item}
                      onAnalysisUpdate={handleAnalysisUpdate(item.problemId)}
                      onKpiSelectionUpdate={handleKPISelectionsUpdate(
                        item.problemId
                      )}
                      detail_url={
                        item.problem_is_default
                          ? `/diagnostico/detalhe-do-problema/${item.problem_id}-bktplan`
                          : ''
                      }
                    />
                  ),
                  footer: (
                    <AccordionFooter
                      disableSave={!item.diagnosis}
                      onSave={handleSave(item.problemId)}
                      toggleAccordion={handleAccordionToggle(item.problemId)}
                    />
                  )
                }}
              </AccordionV2>
            ))}
          </S.ListWrapper>
        </S.ContentSection>
      </MainContainer>
</LanguageProvider>
    </>
  )
}

export default PlanProblemsDiagnosticSummary
