import { useState } from 'react'

import Link from 'next/link'

import * as S from './styles'

import Dropdown from 'components/Dropdown'
import DeleteIcon from 'components/icons/DeleteIcon'
import Input from 'components/Input'
import MultilineInput from 'components/MultilineInput'
import TextButton from 'components/TextButton'
import { FormattedMessage } from 'react-intl'

type ProblemDiagnosisContentProps = {
  data: any
  onAnalysisUpdate: (event: any) => void
  onKpiSelectionUpdate: (clickedOption: any) => void
  onRemoveIndicator?: () => void
  onIndicatorNameUpdate?: (event: any) => void | ((option: any) => void)
  indicatorOptions?: any[]
  detail_url?: string
}

const ProblemDiagnosisContent = ({
  data,
  detail_url,
  onAnalysisUpdate,
  onKpiSelectionUpdate,
  onRemoveIndicator,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onIndicatorNameUpdate = function () {},
  indicatorOptions = []
}: ProblemDiagnosisContentProps) => {
  const [open, setOpen] = useState(false)
  const [indicatorsOpen, setIndicatorsOpen] = useState(false)

  const handleSelectIndicatorOption = (option: any) => {
    onIndicatorNameUpdate(option)
    setIndicatorsOpen(false)
  }

  return (
    <S.Wrapper>
      <S.TitleAndDelete>
        <S.Title><FormattedMessage id='text.indicator.analisis'/></S.Title>
        {onRemoveIndicator ? (
          <TextButton
            text="Excluir"
            LeadingIcon={DeleteIcon}
            leadingIconProps={{
              height: '24',
              width: '24',
              viewBox: '0 0 13 23'
            }}
            onClick={onRemoveIndicator}
          />
        ) : null}
      </S.TitleAndDelete>
      {onRemoveIndicator ? (
        <S.DropdownWrapper>
          <Dropdown
            singleSelect
            open={indicatorsOpen}
            setOpen={setIndicatorsOpen}
            options={indicatorOptions}
            onOptionClick={handleSelectIndicatorOption}
            selectedText={
              indicatorOptions.filter(
                (option: any) =>
                  option?.cause_indicator_id === data?.cause_indicator_id
              )[0]?.text || 'Selecione um indicador*'
            }
          />
        </S.DropdownWrapper>
      ) : (
        <S.InputWrapper>
          <Input
            readOnly
            autoComplete="off"
            placeholder={<FormattedMessage id='edit.problems.form.indicator.title.label'/>}
            type="text"
            value={
              data?.problem_name?.slice(0, 1)?.toUpperCase() +
                data?.problem_name?.slice(1) || ''
            }
          />
        </S.InputWrapper>
      )}
      <S.Title><FormattedMessage id="text.kpi"/></S.Title>
      <S.FlexWrapper>
        <S.DropdownWrapper>
          <Dropdown
            options={data.kpi_graphs}
            open={open}
            setOpen={setOpen}
            onOptionClick={onKpiSelectionUpdate}
            selectedText={data.kpi_graphs
              .filter((option: any) => option.checked)
              .map((option: any) => option.text)
              .join(', ')}
            placeholder={'Selecione o KPI e gráfico a ser exibido'}
          />
        </S.DropdownWrapper>
        {detail_url ? (
          <Link href={detail_url || ''} passHref>
            <S.IndicatorText><FormattedMessage id="text.kpi.details"/></S.IndicatorText>
          </Link>
        ) : null}
      </S.FlexWrapper>
      <S.Title><FormattedMessage id="text.kpi.analisis"/></S.Title>
      <S.AnalysisInputWrapper>
        <MultilineInput
          spellCheck={false}
          autoComplete="off"
          placeholder="Forneça os detalhes da sua análise*"
          value={data.diagnosis ? data.diagnosis : ''}
          onChange={onAnalysisUpdate}
          restrictionLabel="Insira até 1000 caracteres"
        />
      </S.AnalysisInputWrapper>
    </S.Wrapper>
  )
}

export default ProblemDiagnosisContent
