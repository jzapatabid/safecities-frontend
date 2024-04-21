import { GoalMeta } from 'templates/PlanStrategyMacroObjectives'

import * as S from './styles'

import MacroObjectiveContent from '../MacroObjectiveContent'

import AccordionFooter from 'components/AccordionFooter'
import FocusObjectiveHeader from 'components/AccordionHeaders/FocusObjectiveHeader'
import AccordionV2 from 'components/AccordionV3'

type FocusObjectiveContentProps = {
  focuses: any[]
  toggleFocusAccordion: (focusId: any) => () => void
  onFocusSave: (focusId: any) => () => void
  onAddNewGoal: (focusId: any) => () => void
  onIndicatorSelect: (focusId: any) => (goalId: any) => (option: any) => void
  onFocusGoalDelete: (focusId: any) => (goalId: any) => void
  onFocusGoalIRUpdate: (focusId: any) => (goalId: any) => (event: any) => void
  onFocusGoalDateUpdate: (focusId: any) => (goalId: any) => (event: any) => void
  onFocusGoalMetaUpdated: (
    focusId: any
  ) => (goalId: any) => (meta: GoalMeta) => void
  onFocusCustomIndicatorCreate: (
    focusId: any
  ) => (goalId: any) => (indicator: any) => void
}

const FocusObjectiveContent = ({
  focuses,
  toggleFocusAccordion,
  onFocusSave,
  onAddNewGoal,
  onIndicatorSelect,
  onFocusGoalDelete,
  onFocusGoalIRUpdate,
  onFocusGoalDateUpdate,
  onFocusGoalMetaUpdated,
  onFocusCustomIndicatorCreate
}: FocusObjectiveContentProps) => {
  return (
    <S.Wrapper>
      <S.ListWrapper>
        {focuses.map((item: any, idx: number) => (
          <AccordionV2
            key={idx}
            data={item}
            toggleAccordion={toggleFocusAccordion(item.focusId)}
            dark
          >
            {{
              header: <FocusObjectiveHeader data={item} index={idx}/>,
              summary: null,
              content: (
                <MacroObjectiveContent
                  data={item}
                  listOptions={[
                    ...item.causeIndicators,
                    ...item.customIndicators
                  ].map((option: any) => ({
                    ...option,
                    text: option.name
                  }))}
                  resolvedIndicatorIds={item.goals
                    .map(
                      (goal: any) =>
                        goal.problemId ||
                        goal.customIndicatorId ||
                        goal.causeIndicatorId ||
                        ''
                    )
                    .filter((id: string) => id)}
                  onAddNewGoal={onAddNewGoal(item.focusId)}
                  onGoalProblemSelect={onIndicatorSelect(item.focusId)}
                  onGoalDelete={onFocusGoalDelete(item.focusId)}
                  onGoalInitialRateUpdate={onFocusGoalIRUpdate(item.focusId)}
                  onGoalDateUpdate={onFocusGoalDateUpdate(item.focusId)}
                  onGoalMetaUpdate={onFocusGoalMetaUpdated(item.focusId)}
                  onCustomIndicatorCreate={onFocusCustomIndicatorCreate(
                    item.focusId
                  )}
               />
              ),
              footer: (
                <AccordionFooter
                  onSave={onFocusSave(item.focusId)}
                  toggleAccordion={toggleFocusAccordion(item.focusId)}
               />
              )
            }}
          </AccordionV2>
        ))}
      </S.ListWrapper>
    </S.Wrapper>
  )
}

export default FocusObjectiveContent
