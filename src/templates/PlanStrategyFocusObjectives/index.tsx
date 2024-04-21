import { useCallback } from 'react'

import {
  PLAN_PRINARY_NAV_LINKS,
  PLAN_STRATEGY_PRIMARY_NAV_LINKS
} from 'constants/Plan'

import { usePlans } from 'contexts/plans'

import { useRouter } from 'next/router'
import { getAPIClient } from 'services/axios'
import { updateFocusObjectiveGoals } from 'services/plans'
import { GoalMeta } from 'templates/PlanStrategyMacroObjectives'
import { v4 } from 'uuid'

import * as S from './styles'

import FocusObjectiveContent from 'components/AccordionContents/FocusObjectiveContent'
import MacroObjectiveHeader from 'components/AccordionHeaders/MacroObjectivesHeader'
import FocusObjectiveSummary from 'components/AccordionSummaries/FocusObjectiveSummary'
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

const EMPTY_GOAL = {
  endAt: '',
  goalJustification: '',
  goalValue: '',
  initialRate: '',
  causeIndicatorId: null,
  goalId: v4(),
  customIndicatorId: null
}

type PlanStrategyFocusObjectivesProps = {
  basic_information: any
}

const PlanStrategyFocusObjectives = ({
  basic_information
}: PlanStrategyFocusObjectivesProps) => {
  const { plansState, setPlansState } = usePlans()
  const router = useRouter()
  const api = getAPIClient()

  const handleFocusAddNewGoal = useCallback(
    (macroId: number) => (focusId: any) => () => {
      setPlansState((state) => ({
        ...state,
        focus_objectives: state.focus_objectives.reduce((acc, item) => {
          if (item.macroId === macroId) {
            const reducedFocuses = item.focuses.reduce(
              (acc: any, item: any) => {
                if (item.focusId === focusId) {
                  const updatedItem = {
                    ...item,
                    goals: [...item.goals, { ...EMPTY_GOAL, goalId: v4() }]
                  }
                  return [...acc, updatedItem]
                }
                return [...acc, item]
              },
              []
            )
            const updatedItem = {
              ...item,
              focuses: reducedFocuses
            }
            return [...acc, updatedItem]
          }
          return [...acc, item]
        }, [])
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleFocusIndicatorSelect = useCallback(
    (macroId: any) => (focusId: any) => (goalId: string) => (option: any) => {
      const selectionProperty = option.baselineValue
        ? ['customIndicatorId', 'causeIndicatorId']
        : ['causeIndicatorId', 'customIndicatorId']

      setPlansState((state) => ({
        ...state,
        focus_objectives: state.focus_objectives.reduce((acc, item) => {
          if (item.macroId === macroId) {
            const reducedFocuses = item.focuses.reduce(
              (acc: any, item: any) => {
                if (item.focusId === focusId) {
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
              },
              []
            )
            const updatedItem = {
              ...item,
              focuses: reducedFocuses
            }
            return [...acc, updatedItem]
          }
          return [...acc, item]
        }, [])
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleFocusGoalDelete = useCallback(
    (macroId: number) => (focusId: any) => (goalId: string) => {
      setPlansState((state) => ({
        ...state,
        focus_objectives: state.focus_objectives.reduce((acc, item) => {
          if (item.macroId === macroId) {
            const reducedFocuses = item.focuses.reduce(
              (acc: any, item: any) => {
                if (item.focusId === focusId) {
                  const goals = item.goals.filter(
                    (goal: any) => goal.goalId !== goalId
                  )
                  const updatedItem = { ...item, goals }
                  return [...acc, updatedItem]
                }
                return [...acc, item]
              },
              []
            )
            const updatedItem = {
              ...item,
              focuses: reducedFocuses
            }
            return [...acc, updatedItem]
          }
          return [...acc, item]
        }, [])
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleMacroAccordionToggle = useCallback(
    (macroId: any) => () => {
      setPlansState((state: any) => ({
        ...state,
        focus_objectives: state.focus_objectives.map((item: any) => {
          if (item.macroId !== macroId) {
            return item
          }
          return { ...item, open: !item.open }
        })
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleFocusAccordionToggle = useCallback(
    (macroId: number) => (focusId: any) => () => {
      setPlansState((state: any) => ({
        ...state,
        focus_objectives: state.focus_objectives.reduce(
          (acc: any, item: any) => {
            if (item.macroId === macroId) {
              const focuses = item.focuses.map((item: any) =>
                item.focusId === focusId ? { ...item, open: !item.open } : item
              )
              const updatedItem = { ...item, focuses }
              return [...acc, updatedItem]
            }
            return [...acc, item]
          },
          []
        )
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleFocusGoalInitialRateUpdate = useCallback(
    (macroId: number) => (focusId: any) => (goalId: string) => (event: any) => {
      setPlansState((state) => ({
        ...state,
        focus_objectives: state.focus_objectives.reduce((acc, item) => {
          if (item.macroId === macroId) {
            const reducedFocuses = item.focuses.reduce(
              (acc: any, item: any) => {
                if (item.focusId === focusId) {
                  const goals = item.goals.map((goal: any) =>
                    goal.goalId === goalId
                      ? {
                          ...goal,
                          initialRate: /^-?\d+(\.\d+)?$/.test(
                            event.target.value
                          )
                            ? Number(event.target.value)
                            : ''
                        }
                      : goal
                  )
                  const updatedItem = { ...item, goals }
                  return [...acc, updatedItem]
                }
                return [...acc, item]
              },
              []
            )
            const updatedItem = {
              ...item,
              focuses: reducedFocuses
            }
            return [...acc, updatedItem]
          }
          return [...acc, item]
        }, [])
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleFocusGoalDateUpdate = useCallback(
    (macroId: number) => (focusId: any) => (goalId: string) => (event: any) => {
      setPlansState((state) => ({
        ...state,
        focus_objectives: state.focus_objectives.reduce((acc, item) => {
          if (item.macroId === macroId) {
            const reducedFocuses = item.focuses.reduce(
              (acc: any, item: any) => {
                if (item.focusId === focusId) {
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
              },
              []
            )
            const updatedItem = {
              ...item,
              focuses: reducedFocuses
            }
            return [...acc, updatedItem]
          }
          return [...acc, item]
        }, [])
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleFocusGoalMetaUpdate = useCallback(
    (macroId: number) =>
      (focusId: any) =>
      (goalId: string) =>
      (meta: GoalMeta) => {
        setPlansState((state) => ({
          ...state,
          focus_objectives: state.focus_objectives.reduce((acc, item) => {
            if (item.macroId === macroId) {
              const reducedFocuses = item.focuses.reduce(
                (acc: any, item: any) => {
                  if (item.focusId === focusId) {
                    const goals = item.goals.map((goal: any) =>
                      goal.goalId === goalId ? { ...goal, ...meta } : goal
                    )
                    const updatedItem = { ...item, goals }
                    return [...acc, updatedItem]
                  }
                  return [...acc, item]
                },
                []
              )
              const updatedItem = {
                ...item,
                focuses: reducedFocuses
              }
              return [...acc, updatedItem]
            }
            return [...acc, item]
          }, [])
        }))
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleFocusGoalCustomIndicatorsCreateUpdate = useCallback(
    (macroId: number) =>
      (focusId: any) =>
      (goalId: string) =>
      (indicator: any) => {
        setPlansState((state) => ({
          ...state,
          focus_objectives: state.focus_objectives.reduce((acc, item) => {
            if (item.macroId === macroId) {
              const reducedFocuses = item.focuses.reduce(
                (acc: any, item: any) => {
                  if (item.focusId === focusId) {
                    const customIndicators = [
                      ...item.customIndicators,
                      indicator
                    ]
                    const goals = item.goals.map((goal: any) =>
                      goal.goalId === goalId
                        ? {
                            ...goal,
                            customIndicatorId: indicator.id,
                            causeIndicatorId: null
                          }
                        : goal
                    )
                    const updatedItem = { ...item, goals, customIndicators }
                    return [...acc, updatedItem]
                  }
                  return [...acc, item]
                },
                []
              )
              const updatedItem = {
                ...item,
                focuses: reducedFocuses
              }
              return [...acc, updatedItem]
            }
            return [...acc, item]
          }, [])
        }))
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleFocusSave = useCallback(
    (macroId: any) => (focusId: number) => async () => {
      const currentMacro = plansState.focus_objectives.find(
        (macro_obj) => macro_obj.macroId === macroId
      )
      const currentFocus = currentMacro.focuses.find(
        (focus_obj: any) => focus_obj.focusId === focusId
      )

      try {
        await updateFocusObjectiveGoals(
          api,
          currentMacro.id,
          currentFocus.id,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          currentFocus.goals.map(({ goalId, ...goal }: any) => ({
            ...goal,
            customIndicators: currentFocus.customIndicators
          }))
        )
        router.replace(router.asPath)
      } catch (e) {
        console.log('Error occurred', e)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [plansState.focus_objectives]
  )

  return (
    <>
      <LanguageProvider>
        <Header />
        <MainContainer>
        <NavigateBack
          normalText="plan.basic.info.go.back"
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
            <S.Title><FormattedMessage id="macro.objectives.description.title" /></S.Title>
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
            <FormattedMessage  id = "macro.objectives.description.2"/>
          </S.Description>
          <S.ListWrapper>
            {plansState.focus_objectives.map((item: any, idx: number) => (
              <AccordionV2
                key={idx}
                data={item}
                toggleAccordion={handleMacroAccordionToggle(item.macroId)}
              >
                {{
                  header: (
                    <MacroObjectiveHeader
                      data={item}
                      hasSummary={Boolean(item.goals.length) && !item.open}
                    />
                  ),
                  summary: item.goals.length ? (
                    <FocusObjectiveSummary goals={item.goals} />
                  ) : null,
                  content: (
                    <FocusObjectiveContent
                      focuses={item.focuses}
                      toggleFocusAccordion={handleFocusAccordionToggle(
                        item.macroId
                      )}
                      onFocusSave={handleFocusSave(item.macroId)}
                      onAddNewGoal={handleFocusAddNewGoal(item.macroId)}
                      onIndicatorSelect={handleFocusIndicatorSelect(
                        item.macroId
                      )}
                      onFocusGoalDelete={handleFocusGoalDelete(item.macroId)}
                      onFocusGoalIRUpdate={handleFocusGoalInitialRateUpdate(
                        item.macroId
                      )}
                      onFocusGoalDateUpdate={handleFocusGoalDateUpdate(
                        item.macroId
                      )}
                      onFocusGoalMetaUpdated={handleFocusGoalMetaUpdate(
                        item.macroId
                      )}
                      onFocusCustomIndicatorCreate={handleFocusGoalCustomIndicatorsCreateUpdate(
                        item.macroId
                      )}
                    />
                  )
                }}
              </AccordionV2>
            ))}
          </S.ListWrapper>
        </S.ContentSection>
        <Footer />
      </MainContainer>
</LanguageProvider>
    </>
  )
}

export default PlanStrategyFocusObjectives
