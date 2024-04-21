import { GoalMeta } from 'templates/PlanStrategyMacroObjectives'

import * as S from './styles'

import PlusSignIcon from 'components/icons/PlusSignIcon'
import MacroObjectiveGoal from 'components/MacroObjectiveGoal'
import TextButton from 'components/TextButton'

type MacroObjectiveContentProps = {
  data: any
  listOptions: any[]
  onGoalDelete: (id: string) => void
  onAddNewGoal: () => void
  onGoalMetaUpdate: (id: string) => (meta: GoalMeta) => void
  onGoalInitialRateUpdate: (id: string) => (event: any) => void
  onGoalDateUpdate: (id: string) => (event: any) => void
  onGoalProblemSelect: (id: string) => (option: any) => void
  resolvedIndicatorIds: any[]
  onCustomIndicatorCreate: (id: string) => (indicator: any) => void
}

const MacroObjectiveContent = ({
  data,
  listOptions,
  resolvedIndicatorIds,
  onAddNewGoal,
  onGoalDelete,
  onGoalMetaUpdate,
  onGoalInitialRateUpdate,
  onGoalDateUpdate,
  onGoalProblemSelect,
  onCustomIndicatorCreate
}: MacroObjectiveContentProps) => {
  return (
    <>
      <S.Content>
        {data.goals.map((goal: any, idx: number) => (
          <MacroObjectiveGoal
            key={idx}
            data={goal}
            listOptions={listOptions.filter(
              (option: any) =>
                !resolvedIndicatorIds.includes(option.id.toString())
            )}
            allOptions={listOptions}
            onDelete={onGoalDelete}
            onMetaUpdate={onGoalMetaUpdate}
            onInitialRateUpdate={onGoalInitialRateUpdate}
            onDateUpdate={onGoalDateUpdate}
            onProblemUpdate={onGoalProblemSelect(goal.goalId)}
            onCustomIndicatorCreate={onCustomIndicatorCreate}
          />
        ))}
        <S.AddNewGoalBtnWrapper>
          <TextButton
            text="Adicionar novo indicador de mensuração"
            LeadingIcon={PlusSignIcon}
            onClick={onAddNewGoal}
          />
        </S.AddNewGoalBtnWrapper>
      </S.Content>
    </>
  )
}

export default MacroObjectiveContent
