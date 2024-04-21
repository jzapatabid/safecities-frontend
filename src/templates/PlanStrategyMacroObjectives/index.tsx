/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'

import {
  PLAN_PRINARY_NAV_LINKS,
  PLAN_STRATEGY_PRIMARY_NAV_LINKS
} from 'constants/Plan'

import { usePlans } from 'contexts/plans'

import { useRouter } from 'next/router'
import { getAPIClient } from 'services/axios'
import { updateMacroObjectiveGoals } from 'services/plans'
import { v4 } from 'uuid'

import * as S from './styles'

import MacroObjectiveContent from 'components/AccordionContents/MacroObjectiveContent'
import AccordionFooter from 'components/AccordionFooter'
import MacroObjectiveHeader from 'components/AccordionHeaders/MacroObjectivesHeader'
import MacroObjectiveSummary from 'components/AccordionSummaries/MacroObjectiveSummary'
import AccordionV2 from 'components/AccordionV3'
import Footer from 'components/Footer'
import Header from 'components/Header'
import PlusSignIcon from 'components/icons/PlusSignIcon'
import MainContainer from 'components/MainContainer'
import NavBarGeneric from 'components/NavBarGeneric'
import NavigateBack from 'components/NavigateBack'
import TextButton from 'components/TextButton'
import { FormattedMessage } from 'react-intl'
import LanguageProvider from 'contexts/LanguageSelector'

export type GoalMeta = {
  goalValue?: number
  goalJustification: string
}

const EMPTY_GOAL = {
  endAt: '',
  goalJustification: '',
  goalValue: '',
  initialRate: '',
  problemId: null,
  goalId: v4(),
  customIndicatorId: null
}

const PlanStrategyMacroObjectives = ({
  basic_information
}: {
  basic_information: any
}) => {
  const { plansState, setPlansState } = usePlans()
  const api = getAPIClient()
  const router = useRouter()

  const handleGoalDelete = useCallback(
    (macroId: number) => (goalId: string) => {
      setPlansState((state) => ({
        ...state,
        macro_objectives: state.macro_objectives.reduce((acc, item) => {
          if (item.macroId === macroId) {
            const goals = item.goals.filter(
              (goal: any) => goal.goalId !== goalId
            )
            const updatedItem = { ...item, goals }
            return [...acc, updatedItem]
          }
          return [...acc, item]
        }, [])
      }))
    },
    []
  )

  const handleAddNewGoal = useCallback(
    (macroId: number) => () => {
      setPlansState((state) => ({
        ...state,
        macro_objectives: state.macro_objectives.reduce((acc, item) => {
          if (item.macroId === macroId) {
            const updatedItem = {
              ...item,
              goals: [...item.goals, { ...EMPTY_GOAL, goalId: v4() }]
            }
            return [...acc, updatedItem]
          }
          return [...acc, item]
        }, [])
      }))
    },
    []
  )

  const handleGoalMetaUpdate = useCallback(
    (macroId: number) => (goalId: string) => (meta: GoalMeta) => {
      setPlansState((state) => ({
        ...state,
        macro_objectives: state.macro_objectives.reduce((acc, item) => {
          if (item.macroId === macroId) {
            const goals = item.goals.map((goal: any) =>
              goal.goalId === goalId ? { ...goal, ...meta } : goal
            )
            const updatedItem = { ...item, goals }
            return [...acc, updatedItem]
          }
          return [...acc, item]
        }, [])
      }))
    },
    []
  )

  const handleCustomIndicatorCreate = useCallback(
    (macroId: number) => (goalId: string) => (indicator: any) => {
      setPlansState((state) => ({
        ...state,
        macro_objectives: state.macro_objectives.reduce((acc, item) => {
          if (item.macroId === macroId) {
            const customIndicators = [...item.customIndicators, indicator]
            const goals = item.goals.map((goal: any) =>
              goal.goalId === goalId
                ? {
                    ...goal,
                    customIndicatorId: indicator.id,
                    problemId: null
                  }
                : goal
            )
            const updatedItem = { ...item, goals, customIndicators }
            return [...acc, updatedItem]
          }
          return [...acc, item]
        }, [])
      }))
    },
    []
  )

  const handleGoalInitialRateUpdate = useCallback(
    (macroId: number) => (goalId: string) => (event: any) => {
      setPlansState((state) => ({
        ...state,
        macro_objectives: state.macro_objectives.reduce((acc, item) => {
          if (item.macroId === macroId) {
            const goals = item.goals.map((goal: any) =>
              goal.goalId === goalId
                ? {
                    ...goal,
                    initialRate: /^-?\d+(\.\d+)?$/.test(event.target.value)
                      ? Number(event.target.value)
                      : ''
                  }
                : goal
            )
            const updatedItem = { ...item, goals }
            return [...acc, updatedItem]
          }
          return [...acc, item]
        }, [])
      }))
    },
    []
  )

  const handleGoalDateUpdate = useCallback(
    (macroId: number) => (goalId: string) => (event: any) => {
      setPlansState((state) => ({
        ...state,
        macro_objectives: state.macro_objectives.reduce((acc, item) => {
          if (item.macroId === macroId) {
            const goals = item.goals.map((goal: any) =>
              goal.goalId === goalId
                ? {
                    ...goal,
                    endAt: event.target.value
                  }
                : goal
            )
            const updatedItem = { ...item, goals }
            return [...acc, updatedItem]
          }
          return [...acc, item]
        }, [])
      }))
    },
    []
  )

  const handleSave = useCallback(
    (macroId: number) => async () => {
      const currentMacroObjective = plansState.macro_objectives.find(
        (macro_obj) => macro_obj.macroId === macroId
      )

      try {
        await updateMacroObjectiveGoals(
          api,
          currentMacroObjective.id,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          currentMacroObjective.goals.map(({ goalId, ...goal }: any) => ({
            ...goal,
            customIndicators: currentMacroObjective.customIndicators
          }))
        )
        router.replace(router.asPath)
      } catch (e) {
        console.log('Error occurred', e)
      }
    },
    [plansState.macro_objectives]
  )

  const handleProblemSelect = useCallback(
    (macroId: number) => (goalId: string) => (option: any) => {
      const selectionProperty = option.baselineValue
        ? ['customIndicatorId', 'problemId']
        : ['problemId', 'customIndicatorId']

      setPlansState((state) => ({
        ...state,
        macro_objectives: state.macro_objectives.reduce((acc, item) => {
          if (item.macroId === macroId) {
            const goals = item.goals.map((goal: any) =>
              goal.goalId === goalId
                ? {
                    ...goal,
                    [selectionProperty[0]]: option.id,
                    [selectionProperty[1]]: null
                  }
                : goal
            )
            const updatedItem = { ...item, goals }
            return [...acc, updatedItem]
          }
          return [...acc, item]
        }, [])
      }))
    },
    []
  )

  const handleAccordionToggle = useCallback(
    (macroId: number) => () => {
      setPlansState((state: any) => ({
        ...state,
        macro_objectives: state.macro_objectives.map((item: any) => {
          if (item.macroId !== macroId) {
            return item
          }
          return { ...item, open: !item.open }
        })
      }))
    },
    []
  )

  return (
    <>
      <LanguageProvider>
        <Header/>
        <MainContainer>
        <NavigateBack
          normalText= "plan.basic.info.go.back"
          linkText="plan.basic.info.link.text"
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
              links={PLAN_STRATEGY_PRIMARY_NAV_LINKS.map((linkProps) => {
                return {
                  ...linkProps
                }
              })}
              variant="small"
           />
          </S.NavBarWrapperWithUnderline>
        </S.SectionWrapperNoBottomUnderline>
        <S.ContentSection>
          <S.TitleWrapper>
            <S.Title><FormattedMessage id="macro.objectives.description.title"/></S.Title>
            <S.AddNewMacroObjective>
              <TextButton
                text="add.new.macro"
                LeadingIcon={PlusSignIcon}
                onClick={() => null}
                disabled
             />
            </S.AddNewMacroObjective>
          </S.TitleWrapper>
          <S.Description>
            <FormattedMessage id="macro.objectives.description.2"/>
            
          </S.Description>
          <S.ListWrapper>
            {plansState.macro_objectives.map((item: any, idx: number) => (
              <AccordionV2
                key={idx}
                data={item}
                toggleAccordion={handleAccordionToggle(item.macroId)}
              >
                {{
                  header: (
                    <MacroObjectiveHeader
                      data={item}
                      hasSummary={!item.enabled && !item.open}
                   />
                  ),
                  summary:
                    !item.enabled && !item.open ? (
                      <MacroObjectiveSummary/>
                    ) : null,
                  content: (
                    <MacroObjectiveContent
                      data={item}
                      listOptions={[
                        ...item.problems,
                        ...item.customIndicators
                      ].map((option: any) => ({
                        ...option,
                        text: option.name
                      }))}
                      resolvedIndicatorIds={item.goals
                        .map(
                          (goal: any) =>
                            goal.problemId || goal.customIndicatorId || ''
                        )
                        .filter((id: string) => id)}
                      onGoalProblemSelect={handleProblemSelect(item.macroId)}
                      onGoalDelete={handleGoalDelete(item.macroId)}
                      onAddNewGoal={handleAddNewGoal(item.macroId)}
                      onGoalMetaUpdate={handleGoalMetaUpdate(item.macroId)}
                      onGoalInitialRateUpdate={handleGoalInitialRateUpdate(
                        item.macroId
                      )}
                      onGoalDateUpdate={handleGoalDateUpdate(item.macroId)}
                      onCustomIndicatorCreate={handleCustomIndicatorCreate(
                        item.macroId
                      )}
                   />
                  ),
                  footer: (
                    <AccordionFooter
                      onSave={handleSave(item.macroId)}
                      toggleAccordion={handleAccordionToggle(item.macroId)}
                   />
                  )
                }}
              </AccordionV2>
            ))}
          </S.ListWrapper>
        </S.ContentSection>
        <Footer/>
      </MainContainer>
</LanguageProvider>
    </>
  )
}

export default PlanStrategyMacroObjectives
