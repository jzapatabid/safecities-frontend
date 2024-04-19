import { useState } from 'react'

import { CAUSES_ACTION_MODAL_PROPS } from 'constants/Causes'
import { DETAIL_PAGE_NAV_LINKS } from 'constants/Diagnosis'
import { PROBLEMS_ACTION_MODAL_PROPS } from 'constants/Problems'

import { useModal } from 'contexts/Modal'
import { useProblems } from 'contexts/Problems'

import { CausesActionModalPropsTypes } from 'types/Causes'
import { ProblemModel, ProblemsActionModalPropsTypes } from 'types/Problems'

import { CAUSES_ACTION } from 'enums/Causes'
import { PROBLEMS_ACTION } from 'enums/Problems'

import { useRouter } from 'next/router'
import { getAPIClient } from 'services/axios'
import { getProblemsAssociatedForMultipleCauses } from 'services/causes'

import * as S from './styles'
import theme from 'styles/theme'

import AssociatedCausesTable from 'components/AssociatedCausesTable'
import ButtonV2 from 'components/ButtonV2'
import Footer from 'components/Footer'
import Header from 'components/Header'
import FlagFilledIcon from 'components/icons/FlagFilledIcon'
import FlagIcon from 'components/icons/FlagOutlineIcon'
import LeftArrow from 'components/icons/LeftArrow'
import MainContainer from 'components/MainContainer'
import NavBar from 'components/NavBar'
import { FormattedMessage } from 'react-intl'
import LanguageProvider from 'contexts/LanguageSelector'

type ProblemDetailPropTypes = {
  problemId: number
  problem: ProblemModel & { isDefault: boolean }
  totalCauses: number
}

const AssociatedCauses: React.FC<ProblemDetailPropTypes> = ({
  problemId,
  problem,
  totalCauses
}) => {
  const router = useRouter()
  const { problemsState } = useProblems()
  const { setModalState } = useModal()
  const [btn1Loading, setBtn1Loading] = useState(false)
  const [btn2Loading, setBtn2Loading] = useState(false)
  const apiClient = getAPIClient()
  const disablePrioritize =
    !problemsState.associatedCausesData.selectedCauses?.length ||
    problemsState.associatedCausesData.selectedCauses?.filter(
      (cause: any) => cause.prioritized
    ).length !== 0

  const disableDeprioritize =
    !problemsState.associatedCausesData.selectedCauses?.length ||
    problemsState.associatedCausesData.selectedCauses?.filter(
      (cause: any) => !cause.prioritized
    ).length !== 0

  const handleActionClick = async (
    modalProps: ProblemsActionModalPropsTypes
  ) => {
    setModalState({
      ...modalProps,
      contentProps: {
        selectedProblems: [problem],
        type: modalProps.actionType
      }
    })
  }

  const handleOptionClick = async (modalProps: CausesActionModalPropsTypes) => {
    if (modalProps.actionType === CAUSES_ACTION.PRIORITIZE) {
      setBtn2Loading(true)
    } else if (modalProps.actionType === CAUSES_ACTION.DEPRIORITIZE) {
      setBtn1Loading(true)
    }
    const cause_ids = problemsState.associatedCausesData.selectedCauses.map(
      (cause: any) => `${cause.id}`
    )

    const respectiveProblemsMap = await getProblemsAssociatedForMultipleCauses(
      apiClient,
      cause_ids
    )

    const StackedCauseData = Array.from(
      respectiveProblemsMap,
      ([id, value]) => [
        {
          causeId: id,
          name: value[0].causeName,
          causePrioritized: Boolean(
            value.filter((problem: any) => problem.prioritized).length
          )
        },
        value
      ]
    )
    setBtn1Loading(false)
    setBtn2Loading(false)
    setModalState({
      ...modalProps,
      contentProps: {
        cause:
          problemsState.associatedCausesData.selectedCauses.length === 1
            ? problemsState.associatedCausesData.selectedCauses[0]
            : undefined,
        associatedProblems: StackedCauseData,
        type: modalProps.actionType
      }
    })
  }

  return (
    <>
      <LanguageProvider>
        <Header />
        <MainContainer>
        <S.GobackWrapper>
          <S.NavWrapper>
            <LeftArrow
              height={24}
              width={24}
              color={theme.colors.base.lightPure}
              onClick={() => router.push('/diagnostico/causes-possiveis')}
            />
          </S.NavWrapper>
          <S.GoBackText>
            <FormattedMessage id='page.link.return'/>{' '}
            <S.LinkText
              onClick={() => router.push('/diagnostico/causes-possiveis')}
            >
              <FormattedMessage id='diagnosis.possible.causes.title'/>
            </S.LinkText>
          </S.GoBackText>
        </S.GobackWrapper>
        <S.AboutProblemWrapper>
          <S.NameAndActionWrapper>
            <S.NameWrapper>
              {problem?.prioritized ? (
                <FlagFilledIcon
                  fill={theme.colors.base.lightPure}
                  height={26}
                  width={26}
                />
              ) : (
                <FlagIcon
                  fill={theme.colors.base.lightPure}
                  height={26}
                  width={26}
                />
              )}
              <S.ProblemName>{problem?.name}</S.ProblemName>
            </S.NameWrapper>
            <ButtonV2
              loading={false}
              text={
                problem?.prioritized
                  ? <FormattedMessage id='button.diagnosis.deprioritize.problem'/>
                  : <FormattedMessage id='button.diagnosis.prioritize.problem'/>
              }
              LeadingIcon={problem?.prioritized ? FlagIcon : FlagFilledIcon}
              onClick={() =>
                problem.prioritized
                  ? handleActionClick(
                      PROBLEMS_ACTION_MODAL_PROPS[PROBLEMS_ACTION.DEPRIORITIZE]
                    )
                  : handleActionClick(
                      PROBLEMS_ACTION_MODAL_PROPS[PROBLEMS_ACTION.PRIORITIZE]
                    )
              }
            />
          </S.NameAndActionWrapper>
          <S.DescriptionWrapper>
            <S.DescLabel><FormattedMessage id='diagnosis.desc'/></S.DescLabel>
            <S.Description>{problem?.description}</S.Description>
          </S.DescriptionWrapper>
        </S.AboutProblemWrapper>
        {problem?.isDefault ? (
          <S.NavBarWrapper>
            <NavBar
              nounderline
              links={DETAIL_PAGE_NAV_LINKS}
              totalCaus={totalCauses}
              variant="small"
              trailingParam={`${problemId}?bkt=ca`}
            />
          </S.NavBarWrapper>
        ) : null}
        <S.ActionsWrapper>
          <ButtonV2
            loading={btn1Loading}
            variant="outline"
            text={<FormattedMessage id='button.diagnosis.deprioritize.cause'/>}
            LeadingIcon={FlagIcon}
            disabled={disableDeprioritize}
            onClick={() =>
              handleOptionClick(
                CAUSES_ACTION_MODAL_PROPS[CAUSES_ACTION.DEPRIORITIZE]
              )
            }
          />
          <ButtonV2
            loading={btn2Loading}
            text={<FormattedMessage id='button.diagnosis.prioritize.cause'/>}
            LeadingIcon={FlagFilledIcon}
            disabled={disablePrioritize}
            onClick={() =>
              handleOptionClick(
                CAUSES_ACTION_MODAL_PROPS[CAUSES_ACTION.PRIORITIZE]
              )
            }
          />
        </S.ActionsWrapper>
        <AssociatedCausesTable
          causes={problemsState.associatedCausesData.items}
          problemId={problemId}
          problemName={problem.name}
        />
        <Footer />
      </MainContainer>
</LanguageProvider>
    </>
  )
}

export default AssociatedCauses
