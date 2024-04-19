import {
  MANAGE_USERS_OPTIONS,
  NEW_INVITE_MODAL_STATIC_PROPS
} from 'constants/Admin'

import { useAdminData } from 'contexts/Admin'
import { useModal } from 'contexts/Modal'

import * as S from './styles'

import ButtonV2 from 'components/ButtonV2'
import Footer from 'components/Footer'
import Header from 'components/Header'
import NewUserInviteIcon from 'components/icons/NewUserInviteIcon'
import MainContainer from 'components/MainContainer'
import SearchBar from 'components/SearchBar'
import UsersTable from 'components/UsersTable'
import LanguageProvider from 'contexts/LanguageSelector'

const ManageUsers = () => {
  const {
    adminState: { paginatedUsers, search, selectedUsers },
    setAdminState
  } = useAdminData()

  const { setModalState } = useModal()

  const handleSearch = () => (value: string) => {
    setAdminState((state) => ({ ...state, search: value }))
  }

  const handleNewInviteClick = () => {
    setModalState(NEW_INVITE_MODAL_STATIC_PROPS)
  }

  return (
    <>
      <LanguageProvider>
        <Header />
        <MainContainer>
        <S.TitleWrapper>
          <S.Title>Gerenciar usuários</S.Title>
          <S.ButtonWrapper>
            <ButtonV2
              loading={false}
              text={'Enviar novo convite'}
              LeadingIcon={NewUserInviteIcon}
              onClick={handleNewInviteClick}
            />
          </S.ButtonWrapper>
        </S.TitleWrapper>
        <S.PrimaryOptionsWrapper>
          <SearchBar search={search} setSearch={handleSearch()} />
        </S.PrimaryOptionsWrapper>
        <S.OptionsWrapper>
          <S.BtnGroup>
            {MANAGE_USERS_OPTIONS.map((optionProps, idx) => (
              <ButtonV2
                loading={false}
                key={idx}
                {...optionProps}
                disabled={optionProps.disabled ? true : !selectedUsers?.length}
                variant="outline"
                onClick={() =>
                  setModalState({
                    ...optionProps.modalProps
                  })
                }
              />
            ))}
          </S.BtnGroup>
        </S.OptionsWrapper>
        <UsersTable users={paginatedUsers} />
        <Footer />
      </MainContainer>
</LanguageProvider>
    </>
  )
}

export default ManageUsers
