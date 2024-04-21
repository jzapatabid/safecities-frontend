import { useEffect, useState } from 'react'

import {
  NEW_PLAN_META_DISCLAIMER,
  PLAN_META_SMART_DESC_DETAILS
} from 'constants/Plan'

import { useModal } from 'contexts/Modal'

import { GoalMeta } from 'templates/PlanStrategyMacroObjectives'

import * as S from './styles'

import Disclaimer from 'components/Disclaimer'
import Input from 'components/Input'
import MultilineInput from 'components/MultilineInput'

type NewPlanMetaProps = {
  currentMeta: GoalMeta
  onConfirm: (meta: GoalMeta) => void
}

const getNumericGoalValue = (value: string) =>
  /^-?\d+(\.\d+)?$/.test(value) ? Number(value) : undefined

const NewPlanMeta = ({ currentMeta, onConfirm }: NewPlanMetaProps) => {
  const { setModalState } = useModal()
  const [metaData, setMetaData] = useState(
    currentMeta ? currentMeta : { goalValue: undefined, goalJustification: '' }
  )

  const updateMetaData = (property: string) => (event: any) => {
    setMetaData((state) => ({
      ...state,
      [property]:
        property === 'goalValue'
          ? getNumericGoalValue(event.target.value)
          : event.target.value.length <= 320
          ? event.target.value
          : state['goalJustification'] || ''
    }))
  }

  useEffect(() => {
    setModalState((state) => ({
      ...state,
      onConfirm: () => {
        onConfirm(metaData)
        setModalState({ open: false })
      },
      disableConfirm: !metaData.goalValue || !metaData.goalJustification
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaData])

  return (
    <S.Wrapper>
      <S.DisclaimerWrapper>
        <Disclaimer data={NEW_PLAN_META_DISCLAIMER}/>
      </S.DisclaimerWrapper>
      <S.SMARTDescWrapper>
        {PLAN_META_SMART_DESC_DETAILS.map((detail: string, idx: number) => (
          <S.DetailText key={idx}>{detail}</S.DetailText>
        ))}
      </S.SMARTDescWrapper>
      <S.ValueInputWrapper>
        <Input
          autoComplete="off"
          placeholder="Adicione, no campo abaixo, o valor da meta*"
          type="text"
          placeholderFixed
          secondaryPlaceholder="-"
          value={metaData.goalValue ? metaData.goalValue : ''}
          onChange={updateMetaData('goalValue')}
       />
      </S.ValueInputWrapper>
      <S.JustificationInputWrapper>
        <MultilineInput
          spellCheck={false}
          autoComplete="off"
          placeholder="Justificativa*"
          placeholderFixed
          secondaryPlaceholder="-"
          value={metaData.goalJustification}
          onChange={updateMetaData('goalJustification')}
          restrictionLabel="Insira até 320 caracteres"
       />
      </S.JustificationInputWrapper>
    </S.Wrapper>
  )
}

export default NewPlanMeta
