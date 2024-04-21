import React, { useEffect, useRef } from 'react'

import { useModal } from 'contexts/Modal'

import * as S from './styles'

// import ButtonV2 from 'components/ButtonV2'
import DefaultModalTemplate from 'components/DefaultModalTemplate'
// import CrossIcon from 'components/icons/CrossIcon'
import SidesheetModalTemplate from 'components/SidesheetModalTemplate'

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

  return (
    <S.Dialog ref={dialogRef} type={type}>
      <Template />
    </S.Dialog>
  )
}

export default Modal
