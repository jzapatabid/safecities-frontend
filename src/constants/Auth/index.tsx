import { BACKEND_ERROR } from 'enums/Global'

import ForgotPasswordModalContent from 'components/ModalContents/ForgotPassword'

import { FormattedMessage } from 'react-intl'

const SET_NEW_PW_SUCCESS_MESSAGE = {
  FirstAccess: 'Senha definida com sucesso.',
  PasswordChangeRequest: 'A redefinição de senha foi bem-sucedida.'
} as const

const FORGOT_PASSWORD_STATIC_MODAL_PROPS = {
  open: true,
  title: <FormattedMessage id = "login.recover.password"/>,
  desc: <FormattedMessage id = "login.recover.email"/>,
  Content: ForgotPasswordModalContent,
  confirmBtn: <FormattedMessage id = "button.ok"/>,
  cancelBtn: <FormattedMessage id = "button.back.to.login"/>,
  disableConfirm: true
}


const TOKEN_EXPIRED_BACKEND_ERROR_MESSAGE = 'Token already used or expired'

const PASSWORD_ALREADY_USED_BACKEND_ERROR_MESSAGE =
  "New password shouldn't be used previously"
  

const TOKEN_EXPIRED_DETAILED_ERROR_MESSAGE_OBJECT = {
  title: 'Desculpe, ocorreu um erro',
  desc: 'Não podemos configurar sua senha para registro de usuário. Possivelmente o link expirou',
  level: BACKEND_ERROR.CATEGORISED
} as const

const PASSWORD_ALREADY_USED_DETAILED_ERROR_MESSAGE_OBJECT = {
  title: 'Desculpe, ocorreu um erro',
  desc: 'A senha não pode ser igual à antiga',
  level: BACKEND_ERROR.CATEGORISED
}

const SET_NEW_PW_PAGE_UNCATEGORISED_BACKEND_ERROR_MESSAGE_OBJECT = {
  title: 'Desculpe, ocorreu um erro',
  desc: 'Ocorreu um erro inesperado ao processar sua solicitação. Por favor tente novamente depois de algum tempo.',
  level: BACKEND_ERROR.UNCATEGORISED
}

export {
  SET_NEW_PW_SUCCESS_MESSAGE,
  FORGOT_PASSWORD_STATIC_MODAL_PROPS,
  TOKEN_EXPIRED_BACKEND_ERROR_MESSAGE,
  TOKEN_EXPIRED_DETAILED_ERROR_MESSAGE_OBJECT,
  SET_NEW_PW_PAGE_UNCATEGORISED_BACKEND_ERROR_MESSAGE_OBJECT,
  PASSWORD_ALREADY_USED_BACKEND_ERROR_MESSAGE,
  PASSWORD_ALREADY_USED_DETAILED_ERROR_MESSAGE_OBJECT
}
