import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

import { useModal } from 'contexts/Modal'

import { ProblemModel } from 'types/Problems'

import { PROBLEMS_ACTION } from 'enums/Problems'

import { useRouter } from 'next/router'
import { getAPIClient } from 'services/axios'
import { prioritizeProblems, deprioritizeProblems } from 'services/problems'

import * as S from './styles'

import Notification from 'components/Notifications'
import { FormattedMessage } from 'react-intl'

type ProblemsModalContentPropsTypes = {
  selectedProblems?: ProblemModel[]
  type?: string
}

const getRequestInfo = (type?: string, count?: number) => {
  return type === PROBLEMS_ACTION.PRIORITIZE
    ? {
        service: prioritizeProblems,
        successMsg: `${
          count === 1 ? `${count} problema` : `${count} problemas`
        } foi priorizado corretamente`,
        warningMsg: `Prioritization request for ${
          count === 1 ? `${count} problem` : `${count} problems`
        } failed. Please try again in sometime!!`
      }
    : {
        service: deprioritizeProblems,
        successMsg: `${
          count === 1 ? `${count} problema` : `${count} problemas`
        } foi despriorizado com sucesso`,
        warningMsg: `Deprioritization request for ${
          count === 1 ? `${count} problem` : `${count} problems`
        } failed. Please try again in sometime!!`
      }
}

const ProblemsModalContent: React.FC<ProblemsModalContentPropsTypes> = ({
  selectedProblems,
  type
}) => {
  const { setModalState } = useModal()
  const api = getAPIClient()
  const router = useRouter()

  const handleRequest = async (type?: string) => {
    const { service, successMsg, warningMsg } = getRequestInfo(
      type,
      selectedProblems?.length || 0
    )
    try {
      await service(
        api,
        selectedProblems?.map((problem) => problem.id)
      )
      setModalState({ open: false })
      router.replace(router.asPath)
      toast.custom((t) => (
        <Notification id={t.id} text={successMsg} variant="success" />
      ))
    } catch (e) {
      setModalState({ open: false })
      toast.custom((t) => (
        <Notification id={t.id} text={warningMsg} variant="warning" />
      ))
    }
  }

  useEffect(() => {
    setModalState((state) => ({
      ...state,
      onConfirm: () => handleRequest(type)
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <S.Wrapper>
      <S.List>
        <S.ListItem>
          <S.HeaderText><FormattedMessage id='diagnosis.problem.table.name'/></S.HeaderText>
        </S.ListItem>
        {selectedProblems?.map(({ name }, idx) => (
          <S.ListItem key={idx}>
            <S.ProblemName key={name}>{name}</S.ProblemName>
          </S.ListItem>
        ))}
      </S.List>
    </S.Wrapper>
  )
}

export default ProblemsModalContent
