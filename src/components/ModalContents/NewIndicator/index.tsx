import { useEffect, useState } from 'react'

import {
  NEW_INDICATOR_DISCLAIMER,
  NEW_INDICATOR_RCSECVP_DESC_DETAILS
} from 'constants/Plan'

import { useModal } from 'contexts/Modal'

import { v4 } from 'uuid'

import * as S from './styles'

import Disclaimer from 'components/Disclaimer'
import Input from 'components/Input'
import MultilineInput from 'components/MultilineInput'

type NewIndicatorProps = {
  onConfirm: (indicator: any) => void
}

const FIELD_CHARACTER_LIMITS: { [key: string]: number } = {
  name: 100,
  formulaDescription: 320,
  unitMetric: 320,
  observation: 500
}

const NewIndicator = ({ onConfirm }: NewIndicatorProps) => {
  const { setModalState } = useModal()
  const [indicatorData, setIndicatorData] = useState<{ [key: string]: any }>({
    name: '',
    formulaDescription: '',
    unitMetric: '',
    source: '',
    frequency: '',
    baselineValue: '',
    baselineYear: '',
    observation: ''
  })

  const updateMetaData = (property: string) => (event: any) => {
    setIndicatorData((state) => ({
      ...state,
      [property]:
        event.target.value.length <=
        (FIELD_CHARACTER_LIMITS[property] || Number.MAX_VALUE)
          ? event.target.value
          : state[property]
    }))
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { observation, ...indicator } = indicatorData
    setModalState((state) => ({
      ...state,
      onConfirm: () => {
        onConfirm({ ...indicatorData, id: v4() })
        setModalState({ open: false })
      },
      disableConfirm: Object.values(indicator).some((value) => value === '')
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indicatorData])

  return (
    <S.Wrapper>
      <S.DisclaimerWrapper>
        <Disclaimer data={NEW_INDICATOR_DISCLAIMER} />
      </S.DisclaimerWrapper>
      <S.SMARTDescWrapper>
        {NEW_INDICATOR_RCSECVP_DESC_DETAILS.map(
          (detail: string, idx: number) => (
            <S.DetailText key={idx}>{detail}</S.DetailText>
          )
        )}
      </S.SMARTDescWrapper>
      <S.ValueInputWrapper>
        <MultilineInput
          spellCheck={false}
          autoComplete="off"
          placeholder="Nome do Indicador*"
          type="text"
          placeholderFixed
          secondaryPlaceholder="Novo nome do Indicador"
          value={indicatorData.name ? indicatorData.name : ''}
          onChange={updateMetaData('name')}
          restrictionLabel="Insira até 100 caracteres"
        />
      </S.ValueInputWrapper>
      <S.JustificationInputWrapper>
        <MultilineInput
          spellCheck={false}
          autoComplete="off"
          placeholder="Definição e Forma de Cálculo*"
          placeholderFixed
          secondaryPlaceholder="Inserir texto com a definição do indicador, bem como a fórmula matemática que expressa a forma específica através da qual ele deve ser calculado. (Ex.: Taxa de homicídios a cada 100.000 habitantes, calculada através da seguinte forma: Total de ocorrências de homicídios no período de referência / população residente no período de referência *100.000)"
          value={indicatorData.formulaDescription}
          onChange={updateMetaData('formulaDescription')}
          restrictionLabel="Insira até 320 caracteres"
        />
      </S.JustificationInputWrapper>
      <S.JustificationInputWrapper>
        <MultilineInput
          spellCheck={false}
          autoComplete="off"
          placeholder="Unidade de Medida*"
          placeholderFixed
          secondaryPlaceholder="Inserir a unidade de medida do indicador(Ex.: Número absoluto, Percentual, Taxa por cem mil, Nota de 0 a 10, Índice de 0 a 1, etc.)"
          value={indicatorData.unitMetric}
          onChange={updateMetaData('unitMetric')}
          restrictionLabel="Insira até 320 caracteres"
        />
      </S.JustificationInputWrapper>
      <S.JustificationInputWrapper>
        <MultilineInput
          spellCheck={false}
          autoComplete="off"
          placeholder="Fonte*"
          placeholderFixed
          secondaryPlaceholder="Inserir o órgão/entidade responsável pela aferição do indicador (Ex.: Secretaria Municipal de Segurança e Ordem Pública de Florianópolis)"
          value={indicatorData.source}
          onChange={updateMetaData('source')}
        />
      </S.JustificationInputWrapper>
      <S.JustificationInputWrapper>
        <MultilineInput
          spellCheck={false}
          autoComplete="off"
          placeholder="Periodicidade*"
          placeholderFixed
          secondaryPlaceholder="Indicar de quanto em quanto tempo será feita a aferição de indicador (Ex.: Semanal, Mensal, Bimestral, Trimestral, Semestral, Anual, Bienal, Quadrienal, Quinquenal, Decenal, etc.)"
          value={indicatorData.frequency}
          onChange={updateMetaData('frequency')}
        />
      </S.JustificationInputWrapper>
      <S.ActualSituationLabel>
        Linha de base (situação stual)
      </S.ActualSituationLabel>
      <S.DatesWrapper>
        <S.DateInputWrapper>
          <Input
            autoComplete="off"
            placeholder="Valor numérico*"
            type="text"
            placeholderFixed
            value={indicatorData.baselineValue}
            secondaryPlaceholder="00"
            onChange={updateMetaData('baselineValue')}
          />
        </S.DateInputWrapper>
        <S.DateInputWrapper>
          <Input
            autoComplete="off"
            placeholder="Ano de referência*"
            type="text"
            placeholderFixed
            value={indicatorData.baselineYear}
            secondaryPlaceholder="AAAA"
            onChange={updateMetaData('baselineYear')}
          />
        </S.DateInputWrapper>
      </S.DatesWrapper>
      <S.JustificationInputWrapper>
        <MultilineInput
          spellCheck={false}
          autoComplete="off"
          placeholder="Observação"
          placeholderFixed
          secondaryPlaceholder="Inserir texto com eventuais observações, comentários e/ou pontos de atenção a serem considerados"
          value={indicatorData.observation}
          onChange={updateMetaData('observation')}
          restrictionLabel="Insira até 500 caracteres"
        />
      </S.JustificationInputWrapper>
    </S.Wrapper>
  )
}

export default NewIndicator
