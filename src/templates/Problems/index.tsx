// import { useState } from 'react'

import { DIAGNOSIS_NAV_LINKS } from 'constants/Diagnosis'
import { NEW_PERSONALIZED_PROBLEM_MODAL_PROPS } from 'constants/Problems'
import {
  PROBLEMS_ACTION_MODAL_PROPS,
  PROBLEMS_DISCLAIMER,
  PROBLEMS_SUMMARY_FIELDS
} from 'constants/Problems'

import { useModal } from 'contexts/Modal'
import { useProblems } from 'contexts/Problems'

import { ProblemsActionModalPropsTypes } from 'types/Problems'

import { PROBLEMS_ACTION } from 'enums/Problems'

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
import MainContainer from 'components/MainContainer'
import NavBar from 'components/NavBar'
import ProblemsTable from 'components/ProblemsTable'
// import SearchBar from 'components/SearchBar'
import StatCard from 'components/StatCard'
import { FormattedMessage } from 'react-intl'
import LanguageProvider from 'contexts/LanguageSelector'

const Initiatives = () => {
  const date = new Date()
  const { problemsState } = useProblems()
  const { setModalState } = useModal()
  // const [search, setSearch] = useState<string>('')
  const disablePrioritization =
    !problemsState.selectedProblems?.length ||
    problemsState.selectedProblems?.length ===
      problemsState.selectedProblems?.filter((problem) => problem.prioritized)
        .length
  const disableDeprioritization =
    !problemsState.selectedProblems?.length ||
    problemsState.selectedProblems?.length ===
      problemsState.selectedProblems?.filter((problem) => !problem.prioritized)
        .length

  const handleOptionClick = (modalProps: ProblemsActionModalPropsTypes) => {
    let filteredProblems
    if (modalProps.actionType === PROBLEMS_ACTION.PRIORITIZE) {
      filteredProblems = problemsState.selectedProblems?.filter(
        (problem) => !problem.prioritized
      )
    } else if (modalProps.actionType === PROBLEMS_ACTION.DEPRIORITIZE) {
      filteredProblems = problemsState.selectedProblems?.filter(
        (problem) => problem.prioritized
      )
    }
    setModalState({
      ...modalProps,
      contentProps: {
        selectedProblems: filteredProblems,
        type: modalProps.actionType
      }
    })
  }

  return (
    <>
      <LanguageProvider>
        <Header />
        <MainContainer>
        <S.NavBarWrapper>
          <NavBar links={DIAGNOSIS_NAV_LINKS} variant="small" />
        </S.NavBarWrapper>
        <Disclaimer data={PROBLEMS_DISCLAIMER} />
        <S.StatsWrapper>
          <S.Wrapper>
            {PROBLEMS_SUMMARY_FIELDS.map(({ key, ...stats }, idx) => (
              <StatCard
                key={idx}
                count={problemsState.summary[key]}
                {...stats}
              />
            ))}
          </S.Wrapper>
          <S.BtnWrapper>
            <ButtonV2
              loading={false}
              text={<FormattedMessage id='button.diagnosis.add.problem'/>}
              LeadingIcon={PlusSignIcon}
              onClick={() =>
                setModalState(NEW_PERSONALIZED_PROBLEM_MODAL_PROPS)
              }
            />
          </S.BtnWrapper>
        </S.StatsWrapper>
        {/* <S.FiltersWrapper>
          <SearchBar search={search} setSearch={setSearch} />
          <S.ClearFiltersBtnWrapper>
            <ButtonV2 text="Limpar filtros" LeadingIcon={CrossIcon} disabled />
          </S.ClearFiltersBtnWrapper>
        </S.FiltersWrapper> */}
        <S.ActionsWrapper>
          <ButtonV2
            loading={false}
            variant="outline"
            text={<FormattedMessage id='button.diagnosis.deprioritize.problem'/>}
            LeadingIcon={FlagIcon}
            disabled={disableDeprioritization}
            onClick={() =>
              handleOptionClick(
                PROBLEMS_ACTION_MODAL_PROPS[PROBLEMS_ACTION.DEPRIORITIZE]
              )
            }
          />
          <ButtonV2
            loading={false}
            text={<FormattedMessage id='button.diagnosis.prioritize.problem'/>}
            LeadingIcon={FlagFilledIcon}
            disabled={disablePrioritization}
            onClick={() =>
              handleOptionClick(
                PROBLEMS_ACTION_MODAL_PROPS[PROBLEMS_ACTION.PRIORITIZE]
              )
            }
          />
        </S.ActionsWrapper>
        <ProblemsTable problems={problemsState.problems} />
        <S.Text>
          <FormattedMessage id='last.update.footer.text' />
          {
          date.toUTCString()
          }
        </S.Text>
        <Footer />
      </MainContainer>
</LanguageProvider>
    </>
  )
}

export default Initiatives
