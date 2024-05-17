import { useState } from 'react'

import {
  EDIT_PERSONALIZED_INITIATIVE_MODAL_PROPS,
  INITIATIVE_RELATIONSHIPS_MODAL_PROPS,
  INITIATIVES_ACTION_MODAL_PROPS
} from 'constants/Plan'

import { useInitiatives } from 'contexts/Initiatives'
import {
  INITIATIVE_COSTS,
  INITIATIVE_EFFICIENCIES
} from 'contexts/Initiatives/initialState'
import { useModal } from 'contexts/Modal'
import { INITIATIVES_ACTION } from 'enums/Plan'

import { useRouter } from 'next/router'
import { getAPIClient } from 'services/axios'
import { getInitiativesAssociations } from 'services/initiatives'

import * as S from './styles'
import theme from 'styles/theme'

import ButtonV2 from 'components/ButtonV2'
import DepartmentCard from 'components/DepartmentCard'
import FileDropzone from 'components/FileDropzone'
import Footer from 'components/Footer'
import Header from 'components/Header'
import EditIcon from 'components/icons/EditIcon'
import FlagFilledIcon from 'components/icons/FlagFilledIcon'
import FlagIcon from 'components/icons/FlagOutlineIcon'
import LeftArrow from 'components/icons/LeftArrow'
import ToastSuccessIcon from 'components/icons/ToastSuccessIcon'
import { getCostLabel, getEfficiencyLabel } from 'components/InitiativesTable'
import MainContainer from 'components/MainContainer'
import ReferenceForeignlink from 'components/ReferenceForeignlink'
import { FormattedMessage } from 'react-intl'
import LanguageProvider from 'contexts/LanguageSelector'
type InitiativeDetailPropTypes = {
  detail: any
  id: number
}

const InitiativeDetail: React.FC<InitiativeDetailPropTypes> = ({
  detail: cause
}) => {
  const router = useRouter()
  const apiClient = getAPIClient()
  const { setInitiativesState } = useInitiatives()
  const { setModalState } = useModal()
  const [btnLoading, setBtnLoading] = useState(false)
  const handleActionClick = async (modalProps: any) => {
    setBtnLoading(true)
    const initiativeAssociations = await getInitiativesAssociations(apiClient, [
      `${cause.id}`
    ])
    setBtnLoading(false)
    setModalState({
      ...modalProps,
      contentProps: {
        initiatives: initiativeAssociations,
        type: modalProps.actionType
      }
    })
  }

  const handleShowRelations = async (initiativeId: any) => {
    const associations = await getInitiativesAssociations(apiClient, [
      `${initiativeId}`
    ])
    setModalState({
      ...INITIATIVE_RELATIONSHIPS_MODAL_PROPS,
      contentProps: {
        initiatives: associations,
        type: null
      }
    })
  }

  const handleEditInitiative = () => {
    setInitiativesState((state) => ({
      ...state,
      ...(state.edit_initiative.editing && cause.id === state.edit_initiative.id
        ? {}
        : {
            edit_initiative: {
              ...cause,
              causes: [],
              departments: [],
              costs: INITIATIVE_COSTS,
              efficiencies: INITIATIVE_EFFICIENCIES
            }
          })
    }))
    setModalState({
      ...EDIT_PERSONALIZED_INITIATIVE_MODAL_PROPS,
      contentProps: {
        cause: {
          ...cause,
          causes: cause?.causes
            ? cause.causes.map((cause: any) => cause.id)
            : [],
          departments: cause?.municipalDepartments
            ? cause.municipalDepartments.map((dept: any) => dept.id)
            : []
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
  const date = new Date()
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
              onClick={() => router.push(`/planejamento/associar-iniciativas`)}
            />
          </S.NavWrapper>
          <S.GoBackText>
            <FormattedMessage id="plan.basic.info.go.back" />{' '}
            <S.LinkText
              onClick={() => router.push(`/planejamento/associar-iniciativas/`)}
            >
              <FormattedMessage id="planning.associate.initiatives.title" />
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
                loading={btnLoading}
                text={
                  cause?.prioritized
                    ? <FormattedMessage id = "button.planning.deprioritize.initiative" />
                    : <FormattedMessage id = "button.planning.prioritize.initiative" />
                }
                LeadingIcon={cause?.prioritized ? FlagIcon : FlagFilledIcon}
                onClick={() =>
                  cause.prioritized
                    ? handleActionClick(
                        INITIATIVES_ACTION_MODAL_PROPS[
                          INITIATIVES_ACTION.DEPRIORITIZE
                        ]
                      )
                    : handleActionClick(
                        INITIATIVES_ACTION_MODAL_PROPS[
                          INITIATIVES_ACTION.PRIORITIZE
                        ]
                      )
                }
              />
            </S.BtnWrapper>
          </S.NameAndActionWrapper>
          <S.CauseInfoWrapper>
            <S.CauseInfoItemWrapper>
              <S.CauseInfoItemKey><FormattedMessage id="last.update.footer.text" /></S.CauseInfoItemKey>
              <S.CauseInfoItemValue>{date.toLocaleDateString()}</S.CauseInfoItemValue>
            </S.CauseInfoItemWrapper>
          </S.CauseInfoWrapper>
          {!cause?.isDefault ? (
            <S.ButtonWrapper>
              <ButtonV2
                loading={false}
                text="Editar iniciativa"
                variant="outline"
                LeadingIcon={EditIcon}
                onClick={handleEditInitiative}
              />
            </S.ButtonWrapper>
          ) : null}
          <S.DescriptionWrapper>
            <S.DescLabel><FormattedMessage id="asociate.initiatives.justfication"/></S.DescLabel>
            <S.Description>{cause.justification}</S.Description>
          </S.DescriptionWrapper>
        </S.SectionWrapper>
        <S.SectionWrapper>
          <S.CurrentSituationTitle><FormattedMessage id="asociate.initiatives.current.sitation"/></S.CurrentSituationTitle>
          <S.CostAndEffectivenessWrapper>
            <S.Card>
              <S.CardTitle><FormattedMessage id="asociate.initiatives.cost"/></S.CardTitle>
              {cause.costLevel && (
                <>
                  <S.CardLabel>
                    {getCostLabel[cause.costLevel as number]}
                  </S.CardLabel>
                  <S.CardBar
                    percentage={(cause.costLevel / 3) * 100}
                    type="cost"
                  />
                </>
              )}
            </S.Card>
            <S.Card>
              <S.CardTitle><FormattedMessage id="asociate.initiatives.effectiveness"/></S.CardTitle>
              {cause.efficiencyLevel && (
                <>
                  <S.CardLabel>
                    {getEfficiencyLabel[cause.efficiencyLevel as number]}
                  </S.CardLabel>
                  <S.CardBar
                    percentage={(cause.efficiencyLevel / 5) * 100}
                    type="effectiveness"
                  />
                </>
              )}
            </S.Card>
          </S.CostAndEffectivenessWrapper>
        </S.SectionWrapper>
        <S.SectionWrapper>
          <S.EvidenceLabel><FormattedMessage id="asociate.initiatives.conection"/></S.EvidenceLabel>
          <S.ConnectionsDetailsWrapper>
            <ToastSuccessIcon />
            <S.EvidenceText onClick={() => handleShowRelations(cause.id)}>
              {cause?.totalProblems || 0} <FormattedMessage id='diagnosis.problems.and'/> {cause?.totalCauses || 0} <FormattedMessage id='diagnosis.problems.priority.causes'/>
            </S.EvidenceText>
          </S.ConnectionsDetailsWrapper>
        </S.SectionWrapper>
        <S.SectionWrapper>
          <S.EvidenceLabel><FormattedMessage id="asociate.initiatives.evidence"/></S.EvidenceLabel>
          <S.Description>{cause.evidences}</S.Description>
        </S.SectionWrapper>
        {cause.municipalDepartments?.length ? (
          <S.SectionWrapper>
            <S.EvidenceLabel><FormattedMessage id="asociate.initiatives.departments"/></S.EvidenceLabel>
            <S.DeptCardWrapper>
              {cause.municipalDepartments.map((dept: any) => (
                <DepartmentCard key={dept.id} label={dept.name} />
              ))}
            </S.DeptCardWrapper>
          </S.SectionWrapper>
        ) : null}
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
              <S.AttachmentsTitle><FormattedMessage id="asociate.initiatives.references"/></S.AttachmentsTitle>
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

export default InitiativeDetail
