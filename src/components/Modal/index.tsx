import React, { useContext, useEffect, useRef } from 'react'

import { useModal } from 'contexts/Modal'

import * as S from './styles'

import DefaultModalTemplate from 'components/DefaultModalTemplate'
import SidesheetModalTemplate from 'components/SidesheetModalTemplate'
import { IntlProvider } from 'react-intl'
import { LanguageContext } from 'contexts/LanguageSelector/context'

export enum MODAL_TYPE {
  SIDESHEET = 'sidesheet'
}

export type ModalPropTypes = {
  type?: MODAL_TYPE.SIDESHEET
}

const Modal: React.FC<ModalPropTypes> = ({ type }) => {
  const { modalState, setModalState } = useModal()
  const Template = type ? SidesheetModalTemplate : DefaultModalTemplate
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (modalState.open) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [modalState.open])

  useEffect(() => {
    const onEscapeClose = (event: any) => {
      if (event.key === 'Escape') {
        setModalState({ open: false })
      }
    }

    document.addEventListener('keydown', onEscapeClose)

    return () => {
      document.removeEventListener('keydown', onEscapeClose)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const { state } = useContext(LanguageContext);
  return (
    <IntlProvider messages={state.messages} locale="pt" defaultLocale="pt">
      <S.Dialog ref={dialogRef} type={type}>
        <Template />
      </S.Dialog>
    </IntlProvider>
  )
}

export default Modal
