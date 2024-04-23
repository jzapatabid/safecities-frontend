import { useModal } from 'contexts/Modal'

import * as S from './styles'

import ButtonV2 from 'components/ButtonV2'
import CrossIcon from 'components/icons/CrossIcon'
import FlagFilledIcon from 'components/icons/FlagFilledIcon'
import FlagIcon from 'components/icons/FlagOutlineIcon'
import { FormattedMessage, IntlProvider } from 'react-intl'
import { useContext } from 'react'
import { LanguageContext } from 'contexts/LanguageSelector/context'

const getConfirmBtnIcon = (text: string) => {
  const negativeActions = 'despriorizar'
  // if (text.toLowerCase().includes(negativeActions)) {
  //   return FlagIcon
  // } else {
  //   return FlagFilledIcon
  // }
}
const DefaultModalTemplate = () => {
  const { state } = useContext(LanguageContext);
  const { modalState, setModalState } = useModal()
  const Content = modalState.Content
  const onClose = () => setModalState({ open: false })
  return (
    <S.Wrapper>
      {
        state && (
          <IntlProvider messages={state.messages} locale="es" defaultLocale="es">
        <S.Header>
          <S.Title>{modalState.title}</S.Title>
          <S.DismissWrapper tabIndex={0} onClick={onClose}>
            <CrossIcon height={16} width={16} fill="#FFFFFF" />
          </S.DismissWrapper>
        </S.Header>
        <S.ContentWrapper>
          <S.Description>{modalState.desc}</S.Description>
          {Content && <Content {...modalState.contentProps} />}
        </S.ContentWrapper>
        <S.Footer>
          {modalState.cancelBtn && (
            <S.BtnWrapper>
              <ButtonV2
                loading={false}
                variant="outline"
                onClick={onClose}
                text={modalState.cancelBtn}
              />
            </S.BtnWrapper>
          )}
          {modalState.confirmBtn && (
            <S.BtnWrapper>
              <ButtonV2
                loading={false}
                disabled={modalState.disableConfirm}
                onClick={modalState.onConfirm}
                text={modalState.confirmBtn}
                LeadingIcon={getConfirmBtnIcon(modalState.confirmBtn)}
              />
            </S.BtnWrapper>
          )}
        </S.Footer>
      </IntlProvider>
        )
      }
      
    </S.Wrapper>
  )
}

export default DefaultModalTemplate
