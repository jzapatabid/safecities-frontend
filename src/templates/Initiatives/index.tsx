// import { useState } from 'react'

// import { NEW_PERSONALIZED_CAUSE_MODAL_PROPS } from 'constants/Causes'

import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  PLAN_NAV_LINKS,
  PLAN_DISCLAIMER,
  INITIATIVES_SUMMARY_FIELDS,
  NEW_PERSONALIZED_INITIATIVE_MODAL_PROPS,
  INITIATIVES_ACTION_MODAL_PROPS
} from 'constants/Plan'
// import { PROBLEMS_ACTION_MODAL_PROPS } from 'constants/Problems'

import { useInitiatives } from 'contexts/Initiatives'
import { useModal } from 'contexts/Modal'

// import { ProblemsActionModalPropsTypes } from 'types/Problems'

// import { PROBLEMS_ACTION } from 'enums/Problems'

import { INITIATIVES_ACTION } from 'enums/Plan'

import { getAPIClient } from 'services/axios'
import { getInitiativesAssociations } from 'services/initiatives'

import * as S from './styles'

import ButtonV2 from 'components/ButtonV2'
import Disclaimer from 'components/Disclaimer'
import Footer from 'components/Footer'
import Header from 'components/Header'
// import CrossIcon from 'components/icons/CrossIcon'
import FlagFilledIcon from 'components/icons/FlagFilledIcon'
import FlagIcon from 'components/icons/FlagOutlineIcon'
// import HistoryIcon from 'components/icons/HistoryIcon'
import PlusSignIcon from 'components/icons/PlusSignIcon'
import InitiativesTable from 'components/InitiativesTable'
import MainContainer from 'components/MainContainer'
import NavBar from 'components/NavBar'
// import SearchBar from 'components/SearchBar'
import StatCard from 'components/StatCard'
import LanguageProvider from 'contexts/LanguageSelector'

const Initiatives = () => {
  const { initiativesState } = useInitiatives()
  const apiClient = getAPIClient()
  const [btn1Loading, setBtn1Loading] = useState(false)
  const [btn2Loading, setBtn2Loading] = useState(false)
  const { setModalState } = useModal()
  // const [search, setSearch] = useState<string>('')
  const disablePrioritize =
    !initiativesState.selectedInitiatives?.length ||
    initiativesState.selectedInitiatives?.filter(
      (item: any) => item.prioritized
    ).length !== 0

  const disableDeprioritize =
    !initiativesState.selectedInitiatives?.length ||
    initiativesState.selectedInitiatives?.filter(
      (item: any) => !item.prioritized
    ).length !== 0

  const handleOptionClick = async (modalProps: any) => {
    if (modalProps.actionType === INITIATIVES_ACTION.PRIORITIZE) {
      setBtn2Loading(true)
    } else if (modalProps.actionType === INITIATIVES_ACTION.DEPRIORITIZE) {
      setBtn1Loading(true)
    }
    const initiative_ids =
      initiativesState?.selectedInitiatives?.map(
        (initiative: any) => `${initiative.initiativeId}`
      ) || []

    const initiativeAssociations = await getInitiativesAssociations(
      apiClient,
      initiative_ids
    )

    setBtn1Loading(false)
    setBtn2Loading(false)
    setModalState({
      ...modalProps,
      contentProps: {
        initiatives: initiativeAssociations,
        type: modalProps.actionType
      }
    })
  }

  return (
    <>
      <LanguageProvider>
        <Header/>
        <MainContainer>
        <S.NavBarWrapper>
          <NavBar links={PLAN_NAV_LINKS} variant="small"/>
        </S.NavBarWrapper>
        <Disclaimer data={PLAN_DISCLAIMER}/>
        <S.StatsWrapper>
          <S.Wrapper>
            {INITIATIVES_SUMMARY_FIELDS.map(
              ({ key1, key2, label1: label, label2, ...stats }, idx) => (
                <StatCard
                  key={idx}
                  count={initiativesState.summary[key1]}
                  count2={initiativesState.summary[key2]}
                  label={label}
                  label2={label2}
                  iniciativasCard={true}
                  {...stats}
               />
              )
            )}
          </S.Wrapper>
          <S.BtnWrapper>
            {/* <ButtonV2
            loading={false}
              text="Histórico de problemas despriorizados"
              LeadingIcon={HistoryIcon}
              disabled
           /> */}
            <ButtonV2
              loading={false}
              text = {<FormattedMessage id='button.planning.add.new.initiative'/>}
              LeadingIcon={PlusSignIcon}
              onClick={() =>
                setModalState(NEW_PERSONALIZED_INITIATIVE_MODAL_PROPS)
              }
           />
          </S.BtnWrapper>
        </S.StatsWrapper>
        {/* <S.FiltersWrapper>
          <SearchBar search={search} setSearch={setSearch}/>
          <S.ClearFiltersBtnWrapper>
            <ButtonV2 loading={false} text="Limpar filtros" LeadingIcon={CrossIcon} disabled/>
          </S.ClearFiltersBtnWrapper>
        </S.FiltersWrapper> */}
        <S.ActionsWrapper>
          <ButtonV2
            loading={btn1Loading}
            variant="outline"
            text={<FormattedMessage id ='button.diagnosis.deprioritize.problem'/>}
            LeadingIcon={FlagIcon}
            disabled={disableDeprioritize}
            onClick={() =>
              handleOptionClick(
                INITIATIVES_ACTION_MODAL_PROPS[INITIATIVES_ACTION.DEPRIORITIZE]
              )
            }
         />
          <ButtonV2
            loading={btn2Loading}
            text={<FormattedMessage id ='button.diagnosis.prioritize.problem'/>}
            LeadingIcon={FlagFilledIcon}
            disabled={disablePrioritize}
            onClick={() =>
              handleOptionClick(
                INITIATIVES_ACTION_MODAL_PROPS[INITIATIVES_ACTION.PRIORITIZE]
              )
            }
         />
        </S.ActionsWrapper>
        <InitiativesTable problems={initiativesState.problems}/>
        <S.Text>{<FormattedMessage id ='last.update.footer.text'/>}: 23 de junho de 2023</S.Text> 
        <Footer/>
      </MainContainer>
</LanguageProvider>
    </>
  )
}

export default Initiatives
