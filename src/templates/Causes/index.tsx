// import { useState } from 'react'

import {
  CAUSES_DISCLAIMER,
  CAUSES_SUMMARY_FIELDS,
  NEW_PERSONALIZED_CAUSE_MODAL_PROPS
} from 'constants/Causes'
import { DIAGNOSIS_NAV_LINKS } from 'constants/Diagnosis'

import { useCauses } from 'contexts/Causes'
import { useModal } from 'contexts/Modal'

import * as S from './styles'

// import ButtonV2 from 'components/ButtonV2'
import ButtonV2 from 'components/ButtonV2'
import CausesTable from 'components/CausesTable'
import Disclaimer from 'components/Disclaimer'
import Footer from 'components/Footer'
import Header from 'components/Header'
import PlusSignIcon from 'components/icons/PlusSignIcon'
import MainContainer from 'components/MainContainer'
import NavBar from 'components/NavBar'
// import SearchBar from 'components/SearchBar'
import StatCard from 'components/StatCard'
import { FormattedMessage } from 'react-intl'
import LanguageProvider from 'contexts/LanguageSelector'

const Causes = () => {
  const { causesState } = useCauses()
  const { setModalState } = useModal()
  // const [search, setSearch] = useState<string>('')
  let date = new Date()
  return (
    <>
      <LanguageProvider>
        <Header/>
        <MainContainer>
        <S.NavBarWrapper>
          <NavBar links={DIAGNOSIS_NAV_LINKS} variant="small"/>
        </S.NavBarWrapper>
        <Disclaimer data={CAUSES_DISCLAIMER}/>
        <S.StatsWrapper>
          <S.Wrapper>
            {CAUSES_SUMMARY_FIELDS.map(({ key, ...stats }, idx) => (
              <StatCard key={idx} count={causesState.summary[key]} {...stats}/>
            ))}
          </S.Wrapper>
          {/* <S.BtnWrapper>
            <ButtonV2
            loading={false}
              text="Histórico de causas despriorizados"
              LeadingIcon={HistoryIcon}
              disabled
           />
          </S.BtnWrapper> */}
        </S.StatsWrapper>
        {/* <S.FiltersWrapper>
          <SearchBar search={search} setSearch={setSearch}/>
          <S.ClearFiltersBtnWrapper>
            <ButtonV2 text="Limpar filtros" LeadingIcon={CrossIcon} disabled/>
          </S.ClearFiltersBtnWrapper>
        </S.FiltersWrapper> */}
        <S.ActionsWrapper>
          <ButtonV2
            loading={false}
            text={<FormattedMessage id='button.causes.add.new.cause'/>}
            LeadingIcon={PlusSignIcon}
            onClick={() => setModalState(NEW_PERSONALIZED_CAUSE_MODAL_PROPS)}
         />
        </S.ActionsWrapper>
        <CausesTable
          problems={causesState.problemsWithCausesDetail.filter(
            (problem) => problem.prioritized
          )}
       />
        <S.Text><FormattedMessage id='last.update.footer.text'/> {date.toUTCString()}</S.Text>
        <Footer/>
      </MainContainer>
</LanguageProvider>
    </>
  )
}

export default Causes
