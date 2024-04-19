import { useCallback, useEffect, useState } from 'react'

import { PLAN_PRINARY_NAV_LINKS } from 'constants/Plan'

import { usePlans } from 'contexts/plans'

import { useRouter } from 'next/router'
import { getAPIClient } from 'services/axios'
import {
  getAllMunicipalDepartments,
  getAllNeighborhoods,
  updateTacticalDimension
} from 'services/plans'
import { v4 } from 'uuid'

import * as S from './styles'

import TacticalDimensionContent from 'components/AccordionContents/TacticalDimensionContent'
import AccordionFooter from 'components/AccordionFooter'
import DiagnosisSummaryHeader from 'components/AccordionHeaders/DiagnosisSummaryHeader'
import AccordionV2 from 'components/AccordionV3'
import Footer from 'components/Footer'
import Header from 'components/Header'
import MainContainer from 'components/MainContainer'
import NavBarGeneric from 'components/NavBarGeneric'
import NavigateBack from 'components/NavigateBack'
import MutliDirectionArrow from 'components/TableColumnSortBtn'
import { FormattedMessage } from 'react-intl'
import LanguageProvider from 'contexts/LanguageSelector'

const FIELD_CHARACTER_LIMITS: { [key: string]: number } = {
  sociodemographic_targeting: 1000,
  diagnosis: 1000,
  start_at: 10,
  end_at: 10,
  total_cost: Number.MAX_VALUE
}

const getYYYYMMDD = (date: string) => {
  const [day, month, year] = date.split('/')

  // Rearrange the components to the 'YYYY-MM-DD' format
  const formattedDateString = `${year}-${month}-${day ? day : ''}`

  return formattedDateString
}

const getYYYYMM = (date: string) => {
  const [month, year] = date.split('/')

  // Rearrange the components to the 'YYYY-MM-DD' format
  const formattedDateString = `${year}-${month}`

  return formattedDateString
}

const PlanTacticalDimension = ({
  basic_information
}: {
  basic_information: any
}) => {
  const [sorting, setSorting] = useState<string | boolean>('unsorted')
  const router = useRouter()
  const { plansState, setPlansState } = usePlans()
  const apiClient = getAPIClient()
  const fetchMunicipalDepartments = useCallback(async () => {
    const all_departments: any = await getAllMunicipalDepartments(apiClient)
    setPlansState((state: any) => ({
      ...state,
      departments: all_departments.data.map((item: any) => ({
        ...item,
        text: item.name
      }))
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSortUpdate = () => {
    let sortedData: any[]
    if (sorting) {
      sortedData = plansState.tactical_dimension.sort((a, b) =>
        b.initiative_name.localeCompare(a.initiative_name)
      )
      // set data in desc
    } else {
      sortedData = plansState.tactical_dimension.sort((a, b) =>
        a.initiative_name.localeCompare(b.initiative_name)
      )
      // set data in asc
    }
    setPlansState((state: any) => ({
      ...state,
      tactical_dimension: sortedData
    }))
    setSorting((state: any) => !state)
  }

  const fetchNeighborhoods = useCallback(async () => {
    const all_neighborhoods: any = await getAllNeighborhoods(apiClient)
    setPlansState((state: any) => ({
      ...state,
      neighborhoods: all_neighborhoods.data.map((item: any) => ({
        ...item,
        text: item.name,
        selected: item?.id === state.data?.neighborhood_id
      }))
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAccordionToggle = useCallback(
    (initiativeId: any) => () => {
      setPlansState((state: any) => ({
        ...state,
        tactical_dimension: state.tactical_dimension.map((item: any) => {
          if (item.initiativeId !== initiativeId) {
            return item
          }
          return { ...item, open: !item.open }
        })
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const updateTacticalInputData = useCallback(
    (initiativeId: any) => (field: string) => (event: any) => {
      setPlansState((state: any) => ({
        ...state,
        tactical_dimension: state.tactical_dimension.map((initiative: any) =>
          initiative.initiativeId === initiativeId
            ? {
                ...initiative,
                tactical_dimension: {
                  ...initiative.tactical_dimension,
                  [field]: event.target.value.slice(
                    0,
                    FIELD_CHARACTER_LIMITS[field]
                  )
                }
              }
            : initiative
        )
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleNeighborhoodOptionClick = useCallback(
    (initiativeId: any) => (clickedOption: any) => {
      setPlansState((state: any) => ({
        ...state,
        tactical_dimension: state.tactical_dimension.map((initiative: any) =>
          initiative.initiativeId === initiativeId
            ? {
                ...initiative,
                tactical_dimension: {
                  ...initiative.tactical_dimension,
                  neighborhood_id: clickedOption.id
                }
              }
            : initiative
        )
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleDeptOptionClick = useCallback(
    (initiativeId: any) => (departmentId: any) => (clickedOption: any) => {
      setPlansState((state: any) => ({
        ...state,
        tactical_dimension: state.tactical_dimension.map((initiative: any) =>
          initiative.initiativeId === initiativeId
            ? {
                ...initiative,
                tactical_dimension: {
                  ...initiative.tactical_dimension,
                  department_roles:
                    initiative.tactical_dimension.department_roles.map(
                      (dept: any) =>
                        dept.departmentId === departmentId
                          ? { ...dept, department_id: clickedOption.id }
                          : dept
                    )
                }
              }
            : initiative
        )
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleGoalOptionClick = useCallback(
    (initiativeId: any) => (goalId: any) => (clickedOption: any) => {
      setPlansState((state: any) => ({
        ...state,
        tactical_dimension: state.tactical_dimension.map((initiative: any) =>
          initiative.initiativeId === initiativeId
            ? {
                ...initiative,
                tactical_dimension: {
                  ...initiative.tactical_dimension,
                  goals: initiative.tactical_dimension.goals.map((goal: any) =>
                    goal.goalId === goalId
                      ? { ...goal, initiative_outcome_id: clickedOption.id }
                      : goal
                  )
                }
              }
            : initiative
        )
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleGoalValueUpdate = useCallback(
    (initiativeId: any) => (goalId: any) => (event: any) => {
      setPlansState((state: any) => ({
        ...state,
        tactical_dimension: state.tactical_dimension.map((initiative: any) =>
          initiative.initiativeId === initiativeId
            ? {
                ...initiative,
                tactical_dimension: {
                  ...initiative.tactical_dimension,
                  goals: initiative.tactical_dimension.goals.map((goal: any) =>
                    goal.goalId === goalId
                      ? { ...goal, goal: event.target.value }
                      : goal
                  )
                }
              }
            : initiative
        )
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleGoalDateUpdate = useCallback(
    (initiativeId: any) => (goalId: any) => (event: any) => {
      setPlansState((state: any) => ({
        ...state,
        tactical_dimension: state.tactical_dimension.map((initiative: any) =>
          initiative.initiativeId === initiativeId
            ? {
                ...initiative,
                tactical_dimension: {
                  ...initiative.tactical_dimension,
                  goals: initiative.tactical_dimension.goals.map((goal: any) =>
                    goal.goalId === goalId
                      ? { ...goal, date: event.target.value }
                      : goal
                  )
                }
              }
            : initiative
        )
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleDeptRoleUpdate = useCallback(
    (initiativeId: any) => (departmentId: any) => (event: any) => {
      setPlansState((state: any) => ({
        ...state,
        tactical_dimension: state.tactical_dimension.map((initiative: any) =>
          initiative.initiativeId === initiativeId
            ? {
                ...initiative,
                tactical_dimension: {
                  ...initiative.tactical_dimension,
                  department_roles:
                    initiative.tactical_dimension.department_roles.map(
                      (dept: any) =>
                        dept.departmentId === departmentId
                          ? { ...dept, role: event.target.value }
                          : dept
                    )
                }
              }
            : initiative
        )
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleAddNewGoal = useCallback(
    (initiativeId: any) => () => {
      setPlansState((state: any) => ({
        ...state,
        tactical_dimension: state.tactical_dimension.map((initiative: any) =>
          initiative.initiativeId === initiativeId
            ? {
                ...initiative,
                tactical_dimension: {
                  ...initiative.tactical_dimension,
                  goals: [
                    {
                      date: '',
                      initiative_outcome_id: null,
                      goal: '',
                      goalId: v4()
                    },
                    ...initiative.tactical_dimension.goals
                  ]
                }
              }
            : initiative
        )
      }))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleAddNewDeptInvolvement = useCallback(
    (initiativeId: any) => () => {
      setPlansState((state: any) => ({
        ...state,
        tactical_dimension: state.tactical_dimension.map((initiative: any) =>
          initiative.initiativeId === initiativeId
            ? {
                ...initiative,
                tactical_dimension: {
                  ...initiative.tactical_dimension,
                  department_roles: [
                    { role: '', department_id: null, departmentId: v4() },
                    ...initiative.tactical_dimension.department_roles
                  ]
                }
              }
            : initiative
        )
      }))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleSave = (initiativeId: any) => async () => {
    const initiative = plansState.tactical_dimension.find(
      (td: any) => td.initiativeId === initiativeId
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...savedTd } = initiative.tactical_dimension
    let payload
    if (savedTd) {
      try {
        payload = {
          ...savedTd,
          initiative_id: initiative.initiative_id,
          department_roles: savedTd.department_roles.map((dept: any) => ({
            department_id: dept.department_id,
            role: dept.role
          })),
          goals: savedTd.goals.map((goal: any) => ({
            initiative_outcome_id: goal.initiative_outcome_id,
            date: getYYYYMM(goal.date),
            goal: Number(goal?.goal)
          })),
          end_at: getYYYYMMDD(savedTd.end_at),
          start_at: getYYYYMMDD(savedTd.start_at)
        }
        await updateTacticalDimension(apiClient, payload)
        router.replace(router.asPath)
      } catch (e) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    fetchMunicipalDepartments()
    fetchNeighborhoods()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <S.SectionWrapper>
          <S.ListWrapper>
            <S.Header>
              <S.ColumnText><FormattedMessage id = 'prioritized.initiatives'/></S.ColumnText>
              <MutliDirectionArrow
                direction={
                  typeof sorting === 'string' && sorting === 'unsorted'
                    ? 'unsorted'
                    : sorting
                    ? 'up'
                    : 'down'
                }
                onClick={handleSortUpdate}
              />
            </S.Header>
            {plansState.tactical_dimension.map((item: any, idx: number) => {
              return (
                <AccordionV2
                  key={idx}
                  data={item}
                  toggleAccordion={handleAccordionToggle(item.initiativeId)}
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
                      <TacticalDimensionContent
                        data={item}
                        onInputUpdate={updateTacticalInputData(
                          item.initiativeId
                        )}
                        onNeighborhoodSelect={handleNeighborhoodOptionClick(
                          item.initiativeId
                        )}
                        onAddNewDeptInvolvement={handleAddNewDeptInvolvement(
                          item.initiativeId
                        )}
                        onDeptSelect={handleDeptOptionClick(item.initiativeId)}
                        onDeptRoleUpdate={handleDeptRoleUpdate(
                          item.initiativeId
                        )}
                        onGoalSelect={handleGoalOptionClick(item.initiativeId)}
                        onGoalValueUpdate={handleGoalValueUpdate(
                          item.initiativeId
                        )}
                        onGoalDateUpdate={handleGoalDateUpdate(
                          item.initiativeId
                        )}
                        onAddNewGoal={handleAddNewGoal(item.initiativeId)}
                      />
                    ),
                    footer: (
                      <AccordionFooter
                        disableSave={
                          !item.tactical_dimension.start_at ||
                          !item.tactical_dimension.end_at ||
                          !item.tactical_dimension.sociodemographic_targeting ||
                          !item.tactical_dimension.total_cost ||
                          !item.tactical_dimension.diagnosis ||
                          !item.tactical_dimension.neighborhood_id
                        }
                        onSave={handleSave(item.initiativeId)}
                        toggleAccordion={handleAccordionToggle(
                          item.initiativeId
                        )}
                      />
                    )
                  }}
                </AccordionV2>
              )
            })}
          </S.ListWrapper>
        </S.SectionWrapper>
        <S.SectionWrapper>
          <S.TotalCostWrapper>
            <S.TotalCostTitle><FormattedMessage id = "total.estimated.cost" /></S.TotalCostTitle>
            <S.TotalCostValue>
              R$ - {plansState.td_total_cost || ''}
            </S.TotalCostValue>
            <S.TotalCostForecast>
              <FormattedMessage id = "total.estimated.cost.description" />
            </S.TotalCostForecast>
          </S.TotalCostWrapper>
        </S.SectionWrapper>
        <Footer />
      </MainContainer>
</LanguageProvider>
    </>
  )
}

export default PlanTacticalDimension
