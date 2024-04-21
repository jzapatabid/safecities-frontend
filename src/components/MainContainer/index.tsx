import React, { useContext } from 'react'

import * as S from './styles'

import DiagnosticsIcon from 'components/icons/DiagnosticsIcon'
import HomeIcon from 'components/icons/HomeIcon'
import MonitoramentoIcon from 'components/icons/MonitoramentoIcon'
import PlanejamentoIcon from 'components/icons/PlanejamentoIcon'
import SideNavBar from 'components/SideNavBar'
import { FormattedMessage, IntlProvider } from 'react-intl'
import { LanguageContext } from 'contexts/LanguageSelector/context'

const links = [
  {
    id: 1,
    href: '/home',
    label: <FormattedMessage id='sidebar.home.text'/>,
    Icon: HomeIcon
  },
  {
    id: 2,
    href: '/diagnostico',
    label: <FormattedMessage id='sidebar.diagnosis.text'/>,
    Icon: DiagnosticsIcon
  },
  {
    id: 3,
    href: '/planejamento',
    label: <FormattedMessage id='sidebar.planning.text'/>,
    Icon: PlanejamentoIcon
  },
  {
    id: 4,
    href: '#',
    label: <FormattedMessage id='sidebar.monitoring.text'/>,
    disabled: true,
    Icon: MonitoramentoIcon
  }
]

type ContainerProps = {
  children: React.ReactNode
}

const MainContainer = ({ children }: ContainerProps) => {
  const { state } = useContext(LanguageContext);
  
  return (
      state && (
        <IntlProvider messages={state.messages} locale="pt" defaultLocale="pt">
          <S.Container>
            <S.SideNavBarWrapper>
              <SideNavBar links={links} variant="small"/>
            </S.SideNavBarWrapper>
            <S.Wrapper>{children}</S.Wrapper>
          </S.Container>
        </IntlProvider>
      )
  )
}

export default MainContainer
