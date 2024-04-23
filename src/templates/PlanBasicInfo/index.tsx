import { useCallback } from 'react'

import { PLAN_PRINARY_NAV_LINKS } from 'constants/Plan'

import { useModal } from 'contexts/Modal'
import { usePlans } from 'contexts/plans'

import { useRouter } from 'next/router'
import { getAPIClient } from 'services/axios'
import { updatePlanBasicInfo } from 'services/plans'

import * as S from './styles'

import ButtonV2 from 'components/ButtonV2'
import Footer from 'components/Footer'
import Header from 'components/Header'
import FloppyIcon from 'components/icons/FloppyIcon'
import SkipNextIcon from 'components/icons/SkipNextIcon'
import Input from 'components/Input'
import MainContainer from 'components/MainContainer'
import NavBarGeneric from 'components/NavBarGeneric'
import NavigateBack from 'components/NavigateBack'
import { FormattedMessage } from 'react-intl'
import LanguageProvider from 'contexts/LanguageSelector'




type PlanBasicInfoPageProps = {
  data: any
}

const PlanBasicInfo = ({ data }: PlanBasicInfoPageProps) => {
  const { setModalState } = useModal()
  const { plansState, setPlansState } = usePlans()
  const router = useRouter()
  const apiClient = getAPIClient()

  

  const handleInputChange = useCallback(
    (key: string) => (event: any) => {
      setPlansState((state) => ({
        ...state,
        basic_information: {
          ...state.basic_information,
          [key]: event.target.value
        }
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleSave = async () => {

    

    try {
      const start = plansState.basic_information.startAt
      const end = plansState.basic_information.endAt
      const payload = {
        title: plansState.basic_information.title,
        start_at: `${start.split('/')[2]}-${start.split('/')[1]}-${
          start.split('/')[0]
        }`,
        end_at: `${end.split('/')[2]}-${end.split('/')[1]}-${end.split('/')[0]}`
      }

      await updatePlanBasicInfo(apiClient, payload)
      router.replace(router.asPath)
      setModalState({ open: false })
    } catch (e) {
      setModalState({ open: false })
      console.log(e)
    }
  }
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
          <S.PlanName>{data?.title || "[Nombre del Plan]"}
          </S.PlanName>
          <S.PlanDates>{`De ${data?.startAt || '[Data de inicio]'} a ${
            data?.endAt || '[Data de término]'
          }`}</S.PlanDates>
        </S.SectionWrapper>
        <S.SectionWrapper>
          <S.NavBarWrapper>
            <NavBarGeneric
              links={PLAN_PRINARY_NAV_LINKS.map((linkProps:any) => {
                return {
                  ...linkProps
                }
              })}
              variant="small"
            />
          </S.NavBarWrapper>
        </S.SectionWrapper>
        <S.SectionWrapper>
          <S.TitleWrapper>
            <Input
              autoComplete="off"
              placeholder={<FormattedMessage id='plan.form.title.placeholder'/>}
              type="text"
              placeholderFixed
              value={plansState.basic_information.title || ''}
              secondaryPlaceholder="Título de plano"
              onChange={handleInputChange('title')}
            />
          </S.TitleWrapper>
          <S.DatesWrapper>
            <S.DateInputWrapper>
              <Input
                autoComplete="off"
                placeholder={<FormattedMessage id='edit.start.date.label'/>}
                type="text"
                placeholderFixed
                value={plansState.basic_information.startAt || ''}
                secondaryPlaceholder="DD/MM/AAAA"
                onChange={handleInputChange('startAt')}
              />
            </S.DateInputWrapper>
            <S.DateInputWrapper>
              <Input
                autoComplete="off"
                placeholder={<FormattedMessage id='edit.finish.date.label'/>}
                type="text"
                placeholderFixed
                value={plansState.basic_information.endAt || ''}
                secondaryPlaceholder="DD/MM/AAAA"
                onChange={handleInputChange('endAt')}
              />
            </S.DateInputWrapper>
          </S.DatesWrapper>
        </S.SectionWrapper>
        <S.FooterWrapper>
          <S.ActionsWrapper>
            <S.DangerBtnWrapper>
              <ButtonV2
                loading={false}
                variant="outline"
                onClick={() => router.push('/planejamento/construir-plano')}
                text= {<FormattedMessage id='button.cancel' />}
              />
            </S.DangerBtnWrapper>
            <S.BtnGroup>
              <S.BtnWrapper>
                <ButtonV2
                  loading={false}
                  variant="outline"
                  onClick={() =>
                    setModalState({
                      open: true,
                      title: <FormattedMessage id='modal.title.continue'/>,
                      desc: <FormattedMessage id='modal.desc.continue'/>,
                      onConfirm: handleSave,
                      confirmBtn: <FormattedMessage id='button.step.by.step.continue'/>,
                      cancelBtn: <FormattedMessage id='button.cancel'/>
                    })
                  }
                  text={ <FormattedMessage id='button.save' />}
                  LeadingIcon={FloppyIcon}
                />
              </S.BtnWrapper>

              <S.BtnWrapper>
                <ButtonV2
                  loading={false}
                  onClick={() =>
                    router.push('/planejamento/plan-strategy-dimension')
                  }
                  text={<FormattedMessage id='button.step.by.step.continue' />}
                  LeadingIcon={SkipNextIcon}
                />
              </S.BtnWrapper>
            </S.BtnGroup>
          </S.ActionsWrapper>
          <Footer />
        </S.FooterWrapper>
      </MainContainer>
</LanguageProvider>
    </>
  )
}

export default PlanBasicInfo
