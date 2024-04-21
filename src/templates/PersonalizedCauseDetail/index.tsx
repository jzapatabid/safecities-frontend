import { useState } from 'react'

import {
  CAUSE_TYPE_LABELS,
  CAUSES_ACTION_MODAL_PROPS,
  EDIT_PERSONALIZED_CAUSE_MODAL_PROPS
} from 'constants/Causes'
import { SAMPLE_ALL_PROBLEMS } from 'constants/Problems'

import { useCauses } from 'contexts/Causes'
import { useModal } from 'contexts/Modal'

import { CausesActionModalPropsTypes } from 'types/Causes'

import { CAUSE_TYPE_ACCESSOR, CAUSES_ACTION } from 'enums/Causes'

import { useRouter } from 'next/router'
import { getAPIClient } from 'services/axios'
import { getProblemsAssociatedForMultipleCauses } from 'services/causes'

import * as S from './styles'
import theme from 'styles/theme'

import ButtonV2 from 'components/ButtonV2'
import FileDropzone from 'components/FileDropzone'
import Footer from 'components/Footer'
import Header from 'components/Header'
import EditIcon from 'components/icons/EditIcon'
import FlagFilledIcon from 'components/icons/FlagFilledIcon'
import FlagIcon from 'components/icons/FlagOutlineIcon'
import LeftArrow from 'components/icons/LeftArrow'
import RecordVoiceIcon from 'components/icons/RecordVoiceIcon'
import MainContainer from 'components/MainContainer'
import ReferenceForeignlink from 'components/ReferenceForeignlink'
import { FormattedMessage } from 'react-intl'
import LanguageProvider from 'contexts/LanguageSelector'

type DefaultCauseDetailPropTypes = {
  detail: any
  id: number
  problemId: number
  problemName: string
}

const PersonalizedCauseDetail: React.FC<DefaultCauseDetailPropTypes> = ({
  detail: cause,
  problemId,
  problemName
}) => {
  const apiClient = getAPIClient()
  const router = useRouter()
  const { setCausesState } = useCauses()
  const { setModalState } = useModal()
  const [btn1Loading, setBtn1Loading] = useState(false)

  const handleActionClick = async (modalProps: CausesActionModalPropsTypes) => {
    setBtn1Loading(true)

    const cause_ids = [cause.id]

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

    setModalState({
      ...modalProps,
      contentProps: {
        cause: cause,
        associatedProblems: StackedCauseData,
        type: modalProps.actionType
      }
    })
  }

  const handleEditCause = () => {
    setCausesState((state) => ({
      ...state,
      ...(state.edit_cause.editing && cause.id === state.edit_cause.id
        ? {}
        : {
            edit_cause: {
              ...cause,
              problems: []
            }
          })
    }))
    setModalState({
      ...EDIT_PERSONALIZED_CAUSE_MODAL_PROPS,
      contentProps: {
        cause: {
          ...cause,
          problems: SAMPLE_ALL_PROBLEMS.map((problem) => {
            if (cause.problems.includes(problem.id)) {
              return { ...problem, checked: true }
            }
            return problem
          }),
          associatedProblems: cause.problems
        }
      }
    })
  }

  const onFileDownload = (file: any) => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('a')
      link.href = file.url
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <>
      <LanguageProvider>
        <Header/>
        <MainContainer>
        <S.GobackWrapper>
          <S.NavWrapper>
            <LeftArrow
              height={24}
              width={24}
              color={theme.colors.base.lightPure}
              onClick={() =>
                router.push(`/diagnostico/causas-associadas/${problemId}`)
              }
           />
          </S.NavWrapper>
          <S.GoBackText>
            Detalhe das causas associadas:{' '}
            <S.LinkText
              onClick={() =>
                router.push(`/diagnostico/causas-associadas/${problemId}`)
              }
            >
              {problemName}
            </S.LinkText>
          </S.GoBackText>
        </S.GobackWrapper>
        <S.SectionWrapper>
          <S.NameAndActionWrapper>
            <S.NameWrapper>
              <S.ProblemName>{cause.name}</S.ProblemName>
            </S.NameWrapper>
            <S.BtnWrapper>
              {cause.prioritized ? (
                <S.IconWrapper>
                  <FlagFilledIcon
                    fill={theme.colors.base.lightPure}
                    height={26}
                    width={26}
                 />
                </S.IconWrapper>
              ) : (
                <S.IconWrapper>
                  <FlagIcon
                    fill={theme.colors.base.lightPure}
                    height={26}
                    width={26}
                 />
                </S.IconWrapper>
              )}
              <ButtonV2
                loading={btn1Loading}
                text={
                  cause.prioritized ? <FormattedMessage id='button.diagnosis.deprioritize.cause'/> : <FormattedMessage id='button.diagnosis.prioritize.cause'/>
                }
                LeadingIcon={cause.prioritized ? FlagIcon : FlagFilledIcon}
                onClick={() =>
                  cause.prioritized
                    ? handleActionClick(
                        CAUSES_ACTION_MODAL_PROPS[CAUSES_ACTION.DEPRIORITIZE]
                      )
                    : handleActionClick(
                        CAUSES_ACTION_MODAL_PROPS[CAUSES_ACTION.PRIORITIZE]
                      )
                }
             />
            </S.BtnWrapper>
          </S.NameAndActionWrapper>
          <S.CauseInfoWrapper>
            <S.Author>
              <RecordVoiceIcon/>
              <S.CauseType>
                {CAUSE_TYPE_LABELS[CAUSE_TYPE_ACCESSOR.PERSONALIZED]}
              </S.CauseType>
            </S.Author>
            {/* <S.CauseInfoItemWrapper>
              <S.CauseInfoItemKey>Autor:</S.CauseInfoItemKey>
              <S.CauseInfoItemValue>{cause.authorName}</S.CauseInfoItemValue>
            </S.CauseInfoItemWrapper> */}
            {/* <S.CauseInfoItemWrapper>
              <S.CauseInfoItemKey>Última atualização:</S.CauseInfoItemKey>
              <S.CauseInfoItemValue>{cause.last_updated}</S.CauseInfoItemValue>
            </S.CauseInfoItemWrapper> */}
          </S.CauseInfoWrapper>
          <S.ButtonWrapper>
            <ButtonV2
              loading={false}
              text="Editar causa"
              variant="outline"
              LeadingIcon={EditIcon}
              onClick={handleEditCause}
           />
          </S.ButtonWrapper>
          <S.DescriptionWrapper>
            <S.DescLabel>Descrição</S.DescLabel>
            <S.Description>{cause.justification}</S.Description>
          </S.DescriptionWrapper>
        </S.SectionWrapper>
        <S.SectionWrapper>
          <S.EvidenceLabel>Evidências</S.EvidenceLabel>
          <S.Description>{cause.evidences}</S.Description>
        </S.SectionWrapper>
        {cause.annexes?.length ? (
          <S.SectionWrapper>
            <S.AttachmentsWrapper>
              <S.AttachmentsTitle>Anexos</S.AttachmentsTitle>
              <FileDropzone
                onlyFilesList
                filesList={cause.annexes}
                onFileDownload={onFileDownload}
             />
            </S.AttachmentsWrapper>
          </S.SectionWrapper>
        ) : null}
        {cause.references?.length ? (
          <S.SectionWrapper>
            <S.ReferencesWrapper>
              <S.AttachmentsTitle>Referências</S.AttachmentsTitle>
              {cause.references.map((link: any, idx: number) => (
                <ReferenceForeignlink key={idx} link={link} noDelete/>
              ))}
            </S.ReferencesWrapper>
          </S.SectionWrapper>
        ) : null}
        <Footer/>
      </MainContainer>
</LanguageProvider>
    </>
  )
}

export default PersonalizedCauseDetail
