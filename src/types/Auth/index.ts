import { SET_NEW_PASSWORD_PAGE } from 'enums/Auth'
import { BACKEND_ERROR } from 'enums/Global'

// Login Page
export type LoginProps = {
  email: string
}

export type Inputs = {
  email: string
  password: string
}

export type SignInData = Inputs

// SetNewPassword Page
export type SetNewPasswordInputs = {
  password: string
  confirmPassword: string
}

export type SetNewPasswordFormData = SetNewPasswordInputs

export type SetNewPasswordProps = {
  type:
    | SET_NEW_PASSWORD_PAGE.FIRST_ACCESS
    | SET_NEW_PASSWORD_PAGE.RESET_PASSWORD
}

// Context

export type UserStateData = {
  email?: string
  isAdmin?: boolean
  fullName: string
  password?: string
}

export type SignInDataContext = {
  email: string
  password: string
  rememberUser: boolean
}

export type ChangePasswordData = {
  email: string
  password: string
  newPassword: string
}

export type ActivateUserData = {
  password: string
  token: string
}

export type AuthContextValue = {
  isAuthenticated: boolean
  loading: boolean
  signIn: (data: SignInDataContext) => Promise<void>
  logOut: () => void
  changePassword: (data: ChangePasswordData) => Promise<void>
  activateUser: (data: ActivateUserData) => Promise<void>
  user: UserStateData
  resetUserPassword: (data: ActivateUserData) => Promise<void>
}

export type AuthProviderProps = {
  children: React.ReactNode
}

export type SetNewPwDetailedErrorTypes = {
  level: BACKEND_ERROR.CATEGORISED | BACKEND_ERROR.UNCATEGORISED
  title: string
  desc: string
}
