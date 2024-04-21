// import { CAUSE_TYPE_LABELS, CAUSES_ACTION_MODAL_PROPS } from 'constants/Causes'
// import { PROBLEM_DETAIL_ACTUAL_SITUATION_FIELDS } from 'constants/Problems'

import {
  EDIT_PERSONALIZED_PROBLEM_MODAL_PROPS,
  PERSONALIZED_PROBLEM_TYPE_LABEL,
  PROBLEMS_ACTION_MODAL_PROPS
} from 'constants/Problems'

import { useModal } from 'contexts/Modal'
import { useProblems } from 'contexts/Problems'

import { PROBLEMS_ACTION } from 'enums/Problems'

import { useRouter } from 'next/router'

import * as S from './styles'
import theme from 'styles/theme'

import ButtonV2 from 'components/ButtonV2'
import FileDropzone from 'components/FileDropzone'
import Footer from 'components/Footer'
import Header from 'components/Header'
// import EditIcon from 'components/icons/EditIcon'
import EditIcon from 'components/icons/EditIcon'
import FlagFilledIcon from 'components/icons/FlagFilledIcon'
import FlagIcon from 'components/icons/FlagOutlineIcon'
import LeftArrow from 'components/icons/LeftArrow'
import RecordVoiceIcon from 'components/icons/RecordVoiceIcon'
import MainContainer from 'components/MainContainer'
import ReferenceForeignlink from 'components/ReferenceForeignlink'
import LanguageProvider from 'contexts/LanguageSelector'

type PersonalizedProblemPropTypes = {
  detail: any
}

const PersonalizedProblemDetail: React.FC<PersonalizedProblemPropTypes> = ({
  detail: cause
}) => {
  const router = useRouter()
  const { setProblemsState } = useProblems()
  const { setModalState } = useModal()
  const handleActionClick = async (modalProps: any) => {
    setModalState({
      ...modalProps,
      contentProps: {
        selectedProblems: [cause],
        type: modalProps.actionType
      }
    })
  }

  const handleEditInitiative = () => {
    setProblemsState((state) => ({
      ...state,
      ...(state.edit_problem.editing && cause.id === state.edit_problem.id
        ? {}
        : {
            edit_problem: {
              ...cause
            }
          })
    }))
    setModalState({
      ...EDIT_PERSONALIZED_PROBLEM_MODAL_PROPS,
      contentProps: {
        cause
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
        <Header />
        <MainContainer>
        <S.GobackWrapper>
          <S.NavWrapper>
            <LeftArrow
              height={24}
              width={24}
              color={theme.colors.base.lightPure}
              onClick={() => router.push(`/diagnostico/problemas-potenciais`)}
            />
          </S.NavWrapper>
          <S.GoBackText>
            Volte a lista de{' '}
            <S.LinkText
              onClick={() => router.push(`/diagnostico/problemas-potenciais`)}
            >
              Problemas potenciais
            </S.LinkText>
          </S.GoBackText>
        </S.GobackWrapper>
        <S.SectionWrapper>
          <S.NameAndActionWrapper>
            <S.NameWrapper>
              <S.ProblemName>{cause.name}</S.ProblemName>
            </S.NameWrapper>
            <S.BtnWrapper>
              {cause?.prioritized ? (
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
                loading={false}
                text={
                  cause?.prioritized
                    ? 'Despriorizar problema'
                    : 'Priorizar problema'
                }
                LeadingIcon={cause?.prioritized ? FlagIcon : FlagFilledIcon}
                onClick={() =>
                  cause.prioritized
                    ? handleActionClick(
                        PROBLEMS_ACTION_MODAL_PROPS[
                          PROBLEMS_ACTION.DEPRIORITIZE
                        ]
                      )
                    : handleActionClick(
                        PROBLEMS_ACTION_MODAL_PROPS[PROBLEMS_ACTION.PRIORITIZE]
                      )
                }
              />
            </S.BtnWrapper>
          </S.NameAndActionWrapper>
          <S.CauseInfoWrapper>
            <S.Author>
              <RecordVoiceIcon />
              <S.CauseType>{PERSONALIZED_PROBLEM_TYPE_LABEL}</S.CauseType>
            </S.Author>
            <S.CauseInfoItemWrapper>
              <S.CauseInfoItemKey>Última atualização:</S.CauseInfoItemKey>
              <S.CauseInfoItemValue>4 de julho de 2023</S.CauseInfoItemValue>
            </S.CauseInfoItemWrapper>
          </S.CauseInfoWrapper>
          <S.ButtonWrapper>
            <ButtonV2
              loading={false}
              text="Editar problema"
              variant="outline"
              LeadingIcon={EditIcon}
              onClick={handleEditInitiative}
            />
          </S.ButtonWrapper>
          <S.DescriptionWrapper>
            <S.DescLabel>Descrição</S.DescLabel>
            <S.Description>{cause.description}</S.Description>
          </S.DescriptionWrapper>
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
                <ReferenceForeignlink key={idx} link={link} noDelete />
              ))}
            </S.ReferencesWrapper>
          </S.SectionWrapper>
        ) : null}
        <Footer />
      </MainContainer>
</LanguageProvider>
    </>
  )
}

export default PersonalizedProblemDetail
