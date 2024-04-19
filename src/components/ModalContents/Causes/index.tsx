import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { CAUSES_PRIORITIZATION_DISCLAIMER } from 'constants/Causes'

import { useModal } from 'contexts/Modal'

import { CAUSES_ACTION } from 'enums/Causes'

import { useRouter } from 'next/router'
import { getAPIClient } from 'services/axios'
import { prioritizeCauseProblems } from 'services/causes'

import * as S from './styles'

import Disclaimer from 'components/Disclaimer'
import Notification from 'components/Notifications'
import OneToManyTree from 'components/OneToManyTree'

type CausesContentPropsTypes = {
  associatedProblems: any[]
  cause: any
  type?: string
}

const getRequestFeedbackMessages = (type?: string, cause?: any) => {
  if (cause) {
    if (type === CAUSES_ACTION.PRIORITIZE) {
      return {
        successMsg: `A causa foi priorizada para o(s) problema(s) selecionado(s) com sucesso.`,
        warningMsg: `Erro ao priorizar a causa para o(s) problema(s) selecionado(s), tente novamente em alguns minutos.`
      }
    } else if (type === CAUSES_ACTION.DEPRIORITIZE) {
      return {
        successMsg: `A causa foi despriorizada para o(s) problema(s) selecionado(s) com sucesso.`,
        warningMsg: `Erro ao despriorizar a causa para o(s) problema(s) selecionado(s), tente novamente em alguns minutos.`
      }
    }
  } else {
    if (type === CAUSES_ACTION.PRIORITIZE) {
      return {
        successMsg: `As causas foram priorizadas para o(s) problema(s) selecionado(s) com sucesso.`,
        warningMsg: `Erro ao priorizar as causas para o(s) problema(s) selecionado(s), tente novamente em alguns minutos.`
      }
    } else if (type === CAUSES_ACTION.DEPRIORITIZE) {
      return {
        successMsg: `As causas foram despriorizadas para o(s) problema(s) selecionado(s) com sucesso.`,
        warningMsg: `Erro ao despriorizar as causas para o(s) problema(s) selecionado(s), tente novamente em alguns minutos.`
      }
    }
  }
}

const CausesModalContent: React.FC<CausesContentPropsTypes> = ({
  associatedProblems,
  cause,
  type
}) => {
  const router = useRouter()
  const { setModalState } = useModal()
  const api = getAPIClient()
  const [formState, setFormState] = useState({
    problems: cause ? associatedProblems[0][1] : null,
    cause,
    type,
    causes: !cause
      ? associatedProblems.map(([cause, problems]) => ({
          cause: { ...cause, prioritized: cause.causePrioritized },
          problems
        }))
      : null
  })

  const handleRequest = async () => {
    setModalState({ open: false })
    let payload: any = {}
    let messages: any = {}
    if (cause) {
      const problemIdsToDeprioritize = formState.problems
        .filter((problem: any) => !problem.prioritized)
        .map((problem: any) => problem.problemId)
      const problemIdsToPrioritize = formState.problems
        .filter((problem: any) => problem.prioritized)
        .map((problem: any) => problem.problemId)
      messages = getRequestFeedbackMessages(type, cause)
      payload = {
        items: [
          {
            causeId: cause.id,
            problemIdsToDeprioritize,
            problemIdsToPrioritize
          }
        ]
      }
    } else {
      messages = getRequestFeedbackMessages(type, cause)
      payload = {
        items: formState.causes?.map((obj: any) => ({
          causeId: obj.cause.causeId,
          problemIdsToPrioritize: obj.problems
            .filter((problem: any) => problem.prioritized)
            .map((problem: any) => problem.problemId),
          problemIdsToDeprioritize: obj.problems
            .filter((problem: any) => !problem.prioritized)
            .map((problem: any) => problem.problemId)
        }))
      }
    }
    try {
      await prioritizeCauseProblems(api, payload)
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
    (cause?: any) => (currentproblem: any, target: any) => {
      if (cause) {
        setFormState((state: any) => ({
          ...state,
          causes: state.causes.map((obj: any) => {
            if (obj.cause.causeId !== cause.causeId) {
              return obj
            } else {
              const updatedProblems = obj.problems.map((problem: any) =>
                problem.problemId === currentproblem.problemId
                  ? { ...problem, prioritized: target.checked }
                  : problem
              )
              return {
                ...obj,
                problems: updatedProblems,
                ...(!target.checked &&
                updatedProblems.filter((problem: any) => problem.prioritized)
                  .length === 0
                  ? { cause: { ...obj.cause, prioritized: false } }
                  : {}),
                ...(target.checked && !obj.cause.prioritized
                  ? { cause: { ...obj.cause, prioritized: true } }
                  : {})
              }
            }
          })
        }))
      } else {
        setFormState((state) => ({
          ...state,
          problems: state.problems.map((problem: any) =>
            problem.problemId === currentproblem.problemId
              ? { ...problem, prioritized: target.checked }
              : problem
          )
        }))
      }
    },
    []
  )

  const handleCauseCheck = useCallback((currentCause: any, target: any) => {
    setFormState((state: any) => ({
      ...state,
      causes: state.causes?.map((obj: any) =>
        obj.cause.causeId === currentCause.causeId
          ? {
              ...obj,
              cause: {
                ...obj.cause,
                prioritized: target.checked
              },
              ...(!target.checked
                ? {
                    problems: obj.problems.map((problem: any) => ({
                      ...problem,
                      prioritized: false
                    }))
                  }
                : {})
            }
          : obj
      )
    }))
  }, [])

  useEffect(() => {
    setModalState((state) => ({
      ...state,
      disableConfirm:
        cause && type === CAUSES_ACTION.PRIORITIZE
          ? formState.problems.filter((problem: any) => problem.prioritized)
              .length === 0
          : false,
      onConfirm: handleRequest
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState])

  return (
    <S.Wrapper>
      <S.DisclaimerWrapper>
        <Disclaimer data={CAUSES_PRIORITIZATION_DISCLAIMER} />
      </S.DisclaimerWrapper>
      <S.MapWrapper>
        {cause ? (
          <OneToManyTree
            data={{
              root: { ...formState.cause, selectable: false },
              children: formState.problems
            }}
            onProblemsCheck={handleProblemsCheck()}
          />
        ) : (
          <S.CauseTreeWrapper>
            {formState.causes?.map(({ cause, problems }, idx: any) => (
              <OneToManyTree
                key={idx}
                data={{
                  root: {
                    ...cause,
                    selectable: true,
                    prioritized: cause.prioritized
                  },
                  children: problems ? problems : []
                }}
                onCausesCheck={handleCauseCheck}
                onProblemsCheck={handleProblemsCheck(cause)}
              />
            ))}
          </S.CauseTreeWrapper>
        )}
      </S.MapWrapper>
    </S.Wrapper>
  )
}

export default CausesModalContent
