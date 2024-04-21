import { useCallback } from 'react'

import {
  CAUSE_KPI_OPTIONS,
  PLAN_DISGNOSIS_SUMMARY_NAV_LINKS,
  PLAN_PRINARY_NAV_LINKS
} from 'constants/Plan'

import { usePlans } from 'contexts/plans'

import { useRouter } from 'next/router'
import { getAPIClient } from 'services/axios'
import { updatePlanCausesDiagnosisRecords } from 'services/plans'
import { v4 } from 'uuid'

import * as S from './styles'

import CauseDiagnosisContent from 'components/AccordionContents/CauseDiagnosisContent'
import AccordionFooter from 'components/AccordionFooter'
import DiagnosisSummaryHeader from 'components/AccordionHeaders/DiagnosisSummaryHeader'
import AccordionV2 from 'components/AccordionV3'
import Header from 'components/Header'
import MainContainer from 'components/MainContainer'
import NavBarGeneric from 'components/NavBarGeneric'
import NavigateBack from 'components/NavigateBack'
import LanguageProvider from 'contexts/LanguageSelector'

type PlanCausesDiagnosticSummaryPageProps = {
  basic_information: any
}

const PlanCausesDiagnosticSummary = ({
  basic_information
}: PlanCausesDiagnosticSummaryPageProps) => {
  const { plansState, setPlansState } = usePlans()
  const apiClient = getAPIClient()
  const router = useRouter()

  const handleIndicatorSelect = useCallback(
    (causeId: any) => (diagnosisId: any) => (option: any) => {
      setPlansState((state) => ({
        ...state,
        cause_diagnosis: state.cause_diagnosis.map((item) =>
          item.causeId === causeId
            ? {
                ...item,
                diagnoses: item.diagnoses.map((diagnosisItem: any) =>
                  diagnosisItem.diagnosisId === diagnosisId
                    ? {
                        ...diagnosisItem,
                        cause_indicator_id: option.cause_indicator_id
                      }
                    : diagnosisItem
                )
              }
            : item
        )
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleAnalysisUpdate = useCallback(
    (causeId: any) => (diagnosisId: any) => (event: any) => {
      setPlansState((state) => ({
        ...state,
        cause_diagnosis: state.cause_diagnosis.map((item) =>
          item.causeId === causeId
            ? {
                ...item,
                diagnoses: item.diagnoses.map((diagnosisItem: any) =>
                  diagnosisItem.diagnosisId === diagnosisId
                    ? {
                        ...diagnosisItem,
                        diagnosis:
                          event?.target.value.length <= 1000
                            ? event.target.value
                            : diagnosisItem.diagnosis
                      }
                    : diagnosisItem
                )
              }
            : item
        )
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleAccordionToggle = useCallback(
    (causeId: any) => () => {
      setPlansState((state: any) => ({
        ...state,
        cause_diagnosis: state.cause_diagnosis.map((item: any) => {
          if (item.causeId !== causeId) {
            return item
          }
          return { ...item, open: !item.open }
        })
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleRemoveIndicator = useCallback(
    (causeId: any) => (diagnosisId: any) => () => {
      setPlansState((state: any) => ({
        ...state,
        cause_diagnosis: state.cause_diagnosis.map((item: any) => {
          if (item.causeId !== causeId) {
            return item
          }
          return {
            ...item,
            diagnoses: item.diagnoses.filter(
              (diagnosisItem: any) => diagnosisItem.diagnosisId !== diagnosisId
            )
          }
        })
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleAddNewIndicator = useCallback(
    (causeId: any) => () => {
      setPlansState((state: any) => ({
        ...state,
        cause_diagnosis: state.cause_diagnosis.map((item: any) => {
          if (item.causeId !== causeId) {
            return item
          }
          return {
            ...item,
            diagnoses: [
              ...item.diagnoses,
              {
                kpi_graphs: CAUSE_KPI_OPTIONS,
                diagnosis: null,
                cause_indicator_id: null,
                diagnosisId: v4()
              }
            ]
          }
        })
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleKPISelectionsUpdate = useCallback(
    (causeId: any) => (diagnosisId: any) => (clickedOption: any) => {
      setPlansState((state: any) => ({
        ...state,
        cause_diagnosis: state.cause_diagnosis.map((item: any) =>
          item.causeId === causeId
            ? {
                ...item,
                diagnoses: item.diagnoses.map((diagnosisItem: any) =>
                  diagnosisItem.diagnosisId === diagnosisId
                    ? {
                        ...diagnosisItem,
                        kpi_graphs: diagnosisItem.kpi_graphs.map(
                          (kpi_item: any) =>
                            kpi_item.dataKey === clickedOption.dataKey
                              ? { ...kpi_item, checked: !kpi_item.checked }
                              : kpi_item
                        )
                      }
                    : diagnosisItem
                )
              }
            : item
        )
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleSave = (causeId: any) => async () => {
    const selectedCause = plansState.cause_diagnosis.find(
      (cause: any) => cause.causeId === causeId
    )
    const diagnoses = selectedCause.diagnoses.map((diagnosisItem: any) => ({
      cause_indicator_id: diagnosisItem.cause_indicator_id,
      diagnosis: diagnosisItem.diagnosis,
      kpi_graphs: diagnosisItem.kpi_graphs
        .filter((item: any) => item.checked)
        .map((item: any) => item.dataKey)
    }))

    try {
      await updatePlanCausesDiagnosisRecords(
        apiClient,
        selectedCause.cause_id,
        diagnoses
      )
      router.replace(router.asPath)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <LanguageProvider>
        <Header />
        <MainContainer>
        <NavigateBack
          normalText="Volte à"
          linkText="Construir plano"
          url="/planejamento/construir-plano"
        />
        <S.SectionWrapper>
          <S.PlanName>
            {basic_information?.title || `[Título do plano]`}
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
            {plansState.cause_diagnosis.map((item: any, idx: number) => (
              <AccordionV2
                key={idx}
                data={item}
                toggleAccordion={handleAccordionToggle(item.causeId)}
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
                    <CauseDiagnosisContent
                      data={item}
                      onDiagnosisAnalysisUpdate={handleAnalysisUpdate(
                        item.causeId
                      )}
                      onDiagnosisKpiSelectionUpdate={handleKPISelectionsUpdate(
                        item.causeId
                      )}
                      onAddNewIndicator={handleAddNewIndicator(item.causeId)}
                      onRemoveIndicator={handleRemoveIndicator(item.causeId)}
                      onIndicatorSelect={handleIndicatorSelect(item.causeId)}
                      detail_url={`/diagnostico/detalhe-do-causa/default/${item.cause_id}`}
                    />
                  ),
                  footer: (
                    <AccordionFooter
                      disableSave={
                        item.diagnoses.filter(
                          (diagnosisItem: any) =>
                            !diagnosisItem.cause_indicator_id ||
                            !diagnosisItem.diagnosis
                        ).length !== 0
                      }
                      onSave={handleSave(item.causeId)}
                      toggleAccordion={handleAccordionToggle(item.causeId)}
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

export default PlanCausesDiagnosticSummary
