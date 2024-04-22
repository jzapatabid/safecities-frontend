import { useState, useMemo, SVGProps, ComponentType, useContext } from 'react'
import { toast } from 'react-hot-toast'

import { useAuth } from 'contexts/Auth'

import useScrollUp from 'hook/useScrollUp'
import { useRouter } from 'next/router'

import * as S from './styles'

import Container from 'components/Container'
import LogoutIcon from 'components/icons/LogoutIcon'
import NotificationsBell from 'components/icons/NotificationsBell'
import SafeCitiesBrand from 'components/icons/SafeCitiesBrand'
import UserAccountIcon from 'components/icons/UserAccountIcon'
import NotificationFranco from 'components/Notifications'
import UserMenuDropdown from 'components/UserMenuDropdown'
import { FormattedMessage, IntlProvider } from 'react-intl'
import LanguageDropdown from 'components/LanguageDropdown'
import { LanguageContext } from 'contexts/LanguageSelector/context'

export type optionType = {
  forAdmin?: boolean
  text: any
  href?: string
  onClick?: () => void
  TrailingIcon?: ComponentType<SVGProps<SVGSVGElement>>
}

const userOptions: optionType[] = [
  {
    text: <FormattedMessage id='header.manage.user'/>,
    href: '/admin/manage-users',
    forAdmin: true
  },
  {
    text: <FormattedMessage id='button.logout'/>,
    TrailingIcon: LogoutIcon,
    forAdmin: false
  }
]

const Header = () => {
  const { state } = useContext(LanguageContext);
  const { user } = useAuth()
  const router = useRouter()
  const { scrollUp } = useScrollUp()
  const { logOut } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  const options = useMemo(
    () =>
      userOptions
        .map((option: any) =>
          !option.href ? { ...option, onClick: logOut } : option
        )
        .filter((option: optionType) => !(option.forAdmin && !user.isAdmin)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  return (
    <S.Wrapper fixed={!scrollUp}>
      {
        state && (
        <IntlProvider messages={state.messages} locale="es" defaultLocale="es">
          <Container>
            <SafeCitiesBrand
              onClick={() => router.push(`/diagnostico/problemas-potenciais`)}
            />
            <S.UserInfoWrapper>
              <S.BellWrapper
                onClick={() =>
                  toast.custom((t) => (
                    <NotificationFranco
                    id={t.id}
                      text="Enviou corretamente o convite"
                      variant="success"
                      />
                    ))
                  }
              >
                <NotificationsBell />
              </S.BellWrapper>
              <UserMenuDropdown
                options={options}
                fixedSelection
                open={showUserMenu}
                onClick={() => setShowUserMenu((state) => !state)}
              >
                <S.UserAccountInfoWrapper open={showUserMenu}>
                  <UserAccountIcon />
                  <S.Username>{user.fullName}</S.Username>
                </S.UserAccountInfoWrapper>
              </UserMenuDropdown>
              {/* <LanguageDropdown /> */}
            </S.UserInfoWrapper>
          </Container>
        </IntlProvider>
        )
      }
    </S.Wrapper>
  )
}

export default Header
