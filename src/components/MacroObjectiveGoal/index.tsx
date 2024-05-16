import { useState } from 'react'

import {
  ADD_NEW_INDICATOR_MODAL_PROPS,
  ADD_NEW_PLAN_META_MODAL_PROPS
} from 'constants/Plan'

import { useModal } from 'contexts/Modal'

import { GoalMeta } from 'templates/PlanStrategyMacroObjectives'

import * as S from './styles'

import Dropdown from 'components/Dropdown'
import BarChartIcon from 'components/icons/BarChartIcon'
import DeleteIcon from 'components/icons/DeleteIcon'
import Input from 'components/Input'
import TextButton from 'components/TextButton'
import { FormattedMessage } from 'react-intl'

type MacroObjectiveGoalPropsTypes = {
  data: any
  listOptions: any[]
  onDelete: (id: string) => void
  onMetaUpdate: (id: string) => (meta: GoalMeta) => void
  onInitialRateUpdate: (event: any) => any
  onDateUpdate: (event: any) => any
  onProblemUpdate: (option: any) => void
  allOptions: any[]
  onCustomIndicatorCreate: (id: string) => (indicator: any) => void
}

const MacroObjectiveGoal = ({
  data,
  listOptions,
  onDelete,
  onMetaUpdate,
  onInitialRateUpdate,
  onDateUpdate,
  onProblemUpdate,
  allOptions,
  onCustomIndicatorCreate
}: MacroObjectiveGoalPropsTypes) => {
  const selectedOption =
    data?.problemId || data?.customIndicatorId
      ? allOptions.filter(
          (option: any) =>
            option.id === data.problemId || option.id === data.customIndicatorId
        )[0]
      : null
  const { setModalState } = useModal()
  const [open, setOpen] = useState(false)

  const handleSelectDDOption = (option: any) => {
    onProblemUpdate(option)
    setOpen(false)
  }

  return (
    <S.Goal>
      <S.ParameterGroup>
        <S.ParamterText><FormattedMessage id="goal.reduce"/></S.ParamterText>
        <S.DropdownWrapper>
          <Dropdown
            addNewLabel={<FormattedMessage id='button.add.new.indicator'/>}
            onAdd={() =>
              setModalState({
                ...ADD_NEW_INDICATOR_MODAL_PROPS,
                contentProps: {
                  onConfirm: onCustomIndicatorCreate(data.goalId)
                }
              })
            }
            singleSelect
            open={open}
            setOpen={setOpen}
            options={[
              ...listOptions,
              ...(selectedOption ? [selectedOption] : [])
            ]}
            onOptionClick={handleSelectDDOption}
            selectedText={
              allOptions.filter(
                (option: any) =>
                  option.id === data.problemId ||
                  option.id === data.customIndicatorId ||
                  option.id === data.causeIndicatorId
              )[0]?.text
            }
            placeholder={<FormattedMessage id='plan.build.dimension.placeholder'/>}
          />
          <S.LinkTextBtnWrapper>
            <TextButton
              text="current.situation"
              LeadingIcon={BarChartIcon}
              disabled={!data.problemId}
              link
              href={`/diagnostico/detalhe-do-problema/${data.problemId}`}
            />
          </S.LinkTextBtnWrapper>
        </S.DropdownWrapper>
      </S.ParameterGroup>
      <S.ParameterGroup>
        <S.ParamterText>{<FormattedMessage id='table.pager.of'/>}</S.ParamterText>
        <S.TaxaInputWrapper>
          <Input
            autoComplete="off"
            placeholder={<FormattedMessage id='chart.tasa'/>}
            type="text"
            value={data.initialRate}
            placeholderFixed
            secondaryPlaceholder="-"
            onChange={onInitialRateUpdate(data.goalId)}
          />
        </S.TaxaInputWrapper>
      </S.ParameterGroup>
      <S.ParameterGroup>
        <S.ParamterText>{<FormattedMessage id='text.for'/>}</S.ParamterText>
        <S.MetaInputWrapper>
          <Input
            autoComplete="off"
            placeholder={<FormattedMessage id='text.goal'/>}
            type="text"
            value={typeof data.goalValue === 'number' ? data.goalValue : ''}
            placeholderFixed
            secondaryPlaceholder="Selecionar"
            endIconAction={() =>
              setModalState({
                ...ADD_NEW_PLAN_META_MODAL_PROPS,
                contentProps: {
                  currentMeta: {
                    goalValue: data.goalValue,
                    goalJustification: data.goalJustification
                  },
                  onConfirm: onMetaUpdate(data.goalId)
                }
              })
            }
            readOnly
          />
        </S.MetaInputWrapper>
      </S.ParameterGroup>
      <S.ParameterGroup>
        <S.ParamterText>{<FormattedMessage id='text.until'/>}</S.ParamterText>
        <S.DeleteWrapper>
          <S.DeleteBtnWrapper>
            <TextButton
              text="Excluir"
              LeadingIcon={DeleteIcon}
              leadingIconProps={{
                height: '24',
                width: '24',
                viewBox: '0 0 13 23'
              }}
              onClick={() => onDelete(data.goalId)}
            />
          </S.DeleteBtnWrapper>
          <S.MetaInputWrapper>
            <Input
              autoComplete="off"
              placeholder={<FormattedMessage id='text.data'/>}
              type="text"
              placeholderFixed
              value={
                data.endAt
                // ? `${data.endAt.split('-')[1]}/${data.endAt.split('-')[0]}`
                // : ''
              }
              secondaryPlaceholder="MM/AAAA"
              onChange={onDateUpdate(data.goalId)}
            />
          </S.MetaInputWrapper>
        </S.DeleteWrapper>
      </S.ParameterGroup>
    </S.Goal>
  )
}

export default MacroObjectiveGoal
