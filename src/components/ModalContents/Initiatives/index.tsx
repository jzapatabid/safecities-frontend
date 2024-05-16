import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { INITIATIVES_PRIORITIZATION_DISCLAIMER } from 'constants/Plan'

import { useModal } from 'contexts/Modal'

import { INITIATIVES_ACTION } from 'enums/Plan'

import { useRouter } from 'next/router'
import { getAPIClient } from 'services/axios'
import { prioritizeInitiative } from 'services/initiatives'

import * as S from './styles'

import ControlledTabs from 'components/ControlledTabs'
import Disclaimer from 'components/Disclaimer'
import Notification from 'components/Notifications'
import OneToManyTree from 'components/OneToManyTree'

type CausesContentPropsTypes = {
  initiatives: any[]
  type: any
}

const getRequestFeedbackMessages = (count: number, type: string) => {
  if (type === INITIATIVES_ACTION.PRIORITIZE) {
    return {
      successMsg: `${count} iniciativas fueron priorizadas con exito para algunas causas y problemas`,
      warningMsg: `Ocurrio un error en el proceso de priorización de ${count} iniciativas. Por favor intente de nuevo más tarde.`
    }
  } else if (type === INITIATIVES_ACTION.DEPRIORITIZE) {
    return {
      successMsg: `${count} iniciativas fueron despriorizadas con exito para algunas causas y problemas`,
      warningMsg: `Ocurrio un error en el proceso de priorización de ${count} iniciativas. Por favor intente de nuevo más tarde.`
    }
  }
}

const InitiativesModalContent: React.FC<CausesContentPropsTypes> = ({
  initiatives,
  type
}) => {
  const router = useRouter()
  const { setModalState } = useModal()
  const api = getAPIClient()
  const [formState, setFormState] = useState({
    initiatives: initiatives.map((obj: any, idx: number) => ({
      ...obj,
      name: obj.initiativeName,
      selected: idx === 0 ? true : false
    }))
  })
  const selectedInitiative = formState.initiatives.find(
    (item: any) => item.selected
  )

  const handleRequest = async () => {
    const count = initiatives.length
    setModalState({ open: false })
    let messages: any = {}
    const payload: any = { prioritize: [], deprioritize: [] }

    const data = formState.initiatives.map((initiative: any) => {
      const initiativeId = initiative.initiativeId
      const data = [].concat(
        ...initiative.causes.map((cause: any) =>
          cause.problems.map((problem: any) =>
            problem.prioritized
              ? {
                  causeId: cause.causeId,
                  problemId: `${problem.problemId}`,
                  prioritized: true
                }
              : {
                  causeId: cause.causeId,
                  problemId: `${problem.problemId}`,
                  prioritized: false
                }
          )
        )
      )
      const prioritize = data
        .filter(({ prioritized }: { prioritized: boolean }) => prioritized)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ prioritized, ...rest }: { prioritized: boolean }) => ({
          ...rest,
          initiativeId
        }))
      const deprioritize = data
        .filter(({ prioritized }: { prioritized: boolean }) => !prioritized)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ prioritized, ...rest }: { prioritized: boolean }) => ({
          ...rest,
          initiativeId
        }))
      return { prioritize, deprioritize }
    })

    data.forEach((item) => {
      if (item.prioritize) {
        payload.deprioritize.push(...item.deprioritize)
      }
      if (item.deprioritize) {
        payload.prioritize.push(...item.prioritize)
      }
    })

    messages = getRequestFeedbackMessages(count, type)

    try {
      await prioritizeInitiative(api, payload)
      router.push(router.asPath)
      toast.custom((t) => (
        <Notification id={t.id} text={messages.successMsg} variant="success" />
      ))
    } catch (e) {
      toast.custom((t) => (
        <Notification id={t.id} text={messages.warningMsg} variant="warning" />
      ))
    }
  }

  const handleProblemsCheck = useCallback(
    (cause: any) => (currentproblem: any, target: any) => {
      setFormState((state: any) => ({
        ...state,
        initiatives: state.initiatives.map((item: any) => {
          const currentInitiative = state.initiatives.find(
            (item: any) => item.selected
          )
          return item.initiativeId === currentInitiative.initiativeId
            ? {
                ...item,
                causes: item.causes.map((obj: any) => {
                  if (obj.causeId !== cause.causeId) {
                    return obj
                  } else {
                    const updatedProblems = obj.problems.map((problem: any) =>
                      problem.problemId === currentproblem.problemId
                        ? { ...problem, prioritized: target.checked }
                        : problem
                    )
                    return {
                      ...obj,
                      ...(!target.checked &&
                      updatedProblems.filter(
                        (problem: any) => problem.prioritized
                      ).length === 0
                        ? { ...obj, prioritized: false }
                        : {}),
                      ...(target.checked && !obj.prioritized
                        ? { ...obj, prioritized: true }
                        : {}),
                      problems: updatedProblems
                    }
                  }
                })
              }
            : item
        })
      }))
    },
    []
  )

  const handleCauseCheck = useCallback((currentCause: any, target: any) => {
    setFormState((state: any) => ({
      ...state,
      initiatives: state.initiatives.map((item: any) => {
        const currentInitiative = state.initiatives.find(
          (item: any) => item.selected
        )
        return item.initiativeId === currentInitiative.initiativeId
          ? {
              ...item,
              causes: item.causes.map((cause: any) =>
                currentCause.id === cause.causeId
                  ? {
                      ...cause,
                      prioritized: target.checked,
                      ...(!target.checked
                        ? {
                            problems: cause.problems.map((problem: any) => ({
                              ...problem,
                              prioritized: false
                            }))
                          }
                        : {})
                    }
                  : cause
              )
            }
          : item
      })
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTabClick = (index: number, item: any) => {
    const selectionId = item.initiativeId
    setFormState((state: any) => ({
      ...state,
      initiatives: state.initiatives.map((item: any) =>
        item.initiativeId === selectionId
          ? { ...item, selected: true }
          : { ...item, selected: false }
      )
    }))
  }

  useEffect(() => {
    setModalState((state) => ({
      ...state,
      onConfirm: type ? handleRequest : () => setModalState({ open: false })
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState])

  return (
    <S.Wrapper>
      {formState.initiatives.length > 1 && (
        <S.TabsWrapper>
          <ControlledTabs
            tabs={formState.initiatives}
            selectId={selectedInitiative.initiativeId}
            onTabClick={handleTabClick}
            linkText={true}
            noBottomBorder
          />
        </S.TabsWrapper>
      )}
      {type ? (
        <S.DisclaimerWrapper>
          <Disclaimer data={INITIATIVES_PRIORITIZATION_DISCLAIMER} />
        </S.DisclaimerWrapper>
      ) : null}
      <S.MapWrapper>
        <S.InitiativeInfo>
          <S.CheckboxAndTitleWrapper>
            <S.Title>Iniciativa</S.Title>
          </S.CheckboxAndTitleWrapper>
          <S.Name withCheckbox={false}>
            {selectedInitiative?.initiativeName}
          </S.Name>
        </S.InitiativeInfo>
        <S.CauseTreeWrapper>
          {selectedInitiative?.causes?.map((cause: any, idx: any) => (
            <OneToManyTree
              readOnly={type ? false : true}
              showCauseConnectors
              key={idx}
              data={{
                root: {
                  id: cause.causeId,
                  name: cause.causeName,
                  selectable: true,
                  prioritized:
                    cause.prioritized ||
                    Boolean(
                      cause.problems.filter(
                        (problem: any) => problem.prioritized
                      ).length
                    )
                },
                children: cause.problems ? cause.problems : []
              }}
              onCausesCheck={handleCauseCheck}
              onProblemsCheck={handleProblemsCheck(cause)}
            />
          ))}
        </S.CauseTreeWrapper>
      </S.MapWrapper>
    </S.Wrapper>
  )
}

export default InitiativesModalContent
