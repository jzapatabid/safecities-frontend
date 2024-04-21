import { useModal } from 'contexts/Modal'

import * as S from './styles'

import ButtonV2 from 'components/ButtonV2'
import DeleteIcon from 'components/icons/DeleteIcon'
import FlagFilledIcon from 'components/icons/FlagFilledIcon'
import LeftArrow from 'components/icons/LeftArrow'

const SidesheetModalTemplate = () => {
  const { modalState, setModalState } = useModal()
  const Content = modalState.Content
  const onClose = () => setModalState({ open: false })

  return (
    <S.Wrapper>
      {modalState.backBtn && (
        <S.BackNavigationWrapper>
          <LeftArrow
            height={24}
            width={24}
            onClick={modalState.onGoBack}
            strokeWidth={3}
         />
          <S.BackNavText>{modalState.backBtn}</S.BackNavText>
        </S.BackNavigationWrapper>
      )}
      <S.Header>
        <S.Title>{modalState.title}</S.Title>
        {modalState.desc ? (
          <S.Description>{modalState.desc}</S.Description>
        ) : null}
      </S.Header>
      <S.ContentWrapper>
        {Content && <Content {...modalState.contentProps}/>}
      </S.ContentWrapper>
      {modalState.contentType !== 'static' && (
        <S.Footer hasDangerBtn={Boolean(modalState.dangerBtn)}>
          {modalState.dangerBtn && (
            <S.DangerBtnWrapper>
              <ButtonV2
                loading={false}
                variant="outline"
                btnType="danger"
                onClick={modalState.onDanger}
                text={modalState.dangerBtn}
                LeadingIcon={DeleteIcon}
             />
            </S.DangerBtnWrapper>
          )}
          <S.BtnGroup>
            {modalState.cancelBtn && (
              <S.BtnWrapper>
                <ButtonV2
                  loading={false}
                  variant="outline"
                  onClick={modalState.onCancel || onClose}
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
                  LeadingIcon={
                    modalState.confirmIcon === 'NoIcon'
                      ? null
                      : modalState.confirmIcon || FlagFilledIcon
                  }
               />
              </S.BtnWrapper>
            )}
          </S.BtnGroup>
        </S.Footer>
      )}
    </S.Wrapper>
  )
}

export default SidesheetModalTemplate
