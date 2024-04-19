import * as S from './styles'

import ProblemDiagnosisContent from '../ProblemDiagnosisContent'

import PlusSignIcon from 'components/icons/PlusSignIcon'
import TextButton from 'components/TextButton'

type CauseDiagnosisContentProps = {
  data: any
  detail_url: string
  onAddNewIndicator: () => void
  onIndicatorSelect: (diagnosisId: any) => (event: any) => void
  onDiagnosisAnalysisUpdate: (diagnosisId: any) => (event: any) => void
  onRemoveIndicator: (diagnosisId: any) => () => void
  onDiagnosisKpiSelectionUpdate: (
    diagnosisId: any
  ) => (clickedOption: any) => void
}

const CauseDiagnosisContent = ({
  data,
  onDiagnosisAnalysisUpdate,
  onDiagnosisKpiSelectionUpdate,
  onAddNewIndicator,
  onRemoveIndicator,
  onIndicatorSelect,
  detail_url
}: CauseDiagnosisContentProps) => {
  const assignedIndicatorIds = data.diagnoses
    .filter((item: any) => item.cause_indicator_id)
    .map((item: any) => item.cause_indicator_id)

  const indicatorOptions = data?.cause_indicators
    ? data?.cause_indicators?.map((item: any) => ({
        ...item,
        text: item.cause_indicator_name
      }))
    : []

  return (
    <>
      {data.diagnoses.map((item: any) => (
        <ProblemDiagnosisContent
          key={item.diagnosisId}
          data={item}
          detail_url={detail_url}
          onAnalysisUpdate={onDiagnosisAnalysisUpdate(item.diagnosisId)}
          onKpiSelectionUpdate={onDiagnosisKpiSelectionUpdate(item.diagnosisId)}
          onRemoveIndicator={onRemoveIndicator(item.diagnosisId)}
          onIndicatorNameUpdate={onIndicatorSelect(item.diagnosisId)}
          indicatorOptions={[
            ...(item.cause_indicator_id
              ? [
                  indicatorOptions.find(
                    (indicator: any) =>
                      item.cause_indicator_id === indicator.cause_indicator_id
                  )
                ]
              : []),
            ...indicatorOptions.filter(
              (item: any) =>
                !assignedIndicatorIds.includes(item.cause_indicator_id)
            )
          ]}
        />
      ))}
      <S.AddNewGoalBtnWrapper>
        <TextButton
          disabled={data.cause_indicators?.length === data.diagnoses?.length}
          text="Adicionar novo indicador de mensuração"
          LeadingIcon={PlusSignIcon}
          onClick={onAddNewIndicator}
        />
      </S.AddNewGoalBtnWrapper>
    </>
  )
}

export default CauseDiagnosisContent
