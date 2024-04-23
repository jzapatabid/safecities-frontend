import { MODAL_TYPE } from 'components/Modal'

export type ModalContextProps = {
  modalState: ModalStateTypes
  setModalState: React.Dispatch<React.SetStateAction<ModalStateTypes>>
}

export type ModalStateTypes = {
  title?: string | any
  desc?: string | any
  open?: boolean
  Content?: React.ComponentType<any>
  confirmIcon?: any
  confirmBtn?: string | any
  cancelBtn?: string | any
  onConfirm?: (...args: any[]) => any
  onCancel?: () => void
  actions?: any
  disableConfirm?: boolean
  contentProps?: any
  type?: MODAL_TYPE.SIDESHEET
  dangerBtn?: string
  onDanger?: () => void
  onGoBack?: () => void
  backBtn?: string
  contentType?: string
}
