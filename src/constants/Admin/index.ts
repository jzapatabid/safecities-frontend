import { USERS_TABLE_COLUMNS_WIDTHS } from 'enums/Admin'

// import BlockUserIcon from 'components/icons/BlockUserIcon'
import InviteEmailIcon from 'components/icons/ResendInviteIcon'
// import UnblockUserIcon from 'components/icons/UnblockUserIcon'
import NewInviteModalContent from 'components/ModalContents/NewInvite'
import ResendInviteModalContent from 'components/ModalContents/ResendInvite'

// Manage Users Page
const NEW_INVITE_MODAL_STATIC_PROPS = {
  open: true,
  title: 'Novo convite',
  desc: 'Insira o nome e e-mail da pessoa que você deseja convidar para a plataforma. Certifique-se de que os dados estão corretos, pois o convite concederá acesso completo a plataforma e todos os seus dados.',
  cancelBtn: 'Cancelar',
  confirmBtn: 'Enviar convite',
  Content: NewInviteModalContent
} as const

const RESEND_INVITE_MODAL_STATIC_PROPS = {
  open: true,
  title: 'Reenviar convite',
  desc: 'Você tem certeza de que deseja reenviar este convite?',
  cancelBtn: 'Cancelar',
  confirmBtn: 'Enviar convites',
  Content: ResendInviteModalContent
} as const

const MANAGE_USERS_OPTIONS = [
  {
    text: 'Reenviar convite',
    LeadingIcon: InviteEmailIcon,
    disabled: false,
    modalProps: RESEND_INVITE_MODAL_STATIC_PROPS
  }
  // {
  //   text: 'Desbloquear usuário',
  //   LeadingIcon: UnblockUserIcon,
  //   disabled: true
  // },
  // {
  //   text: 'Bloquear usuário',
  //   LeadingIcon: BlockUserIcon,
  //   disabled: true
  // }
]

type UsersTableWidthConfigTypes = {
  select: string
  name: string
  email: string
}

const USERS_TABLE_WIDTH_CONFIG: {
  [key in keyof UsersTableWidthConfigTypes]: string
} = {
  [USERS_TABLE_COLUMNS_WIDTHS.SELECT]: '70px',
  [USERS_TABLE_COLUMNS_WIDTHS.NAME]: '38%',
  [USERS_TABLE_COLUMNS_WIDTHS.EMAIL]: '44%'
}

export {
  NEW_INVITE_MODAL_STATIC_PROPS,
  RESEND_INVITE_MODAL_STATIC_PROPS,
  MANAGE_USERS_OPTIONS,
  USERS_TABLE_WIDTH_CONFIG
}
