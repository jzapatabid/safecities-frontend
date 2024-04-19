import { api } from './apiClient'

export const COOKIE_TOKEN = '@unacity-token'

type SignInRequestParams = {
  email: string
  password: string
}

type ForgotPasswordRequestParams = {
  email: string
}

type ChangePasswordRequestParams = {
  email: string
  password: string
  newPassword: string
}

type ActivateUserRequestParams = {
  password: string
  token: string
}

export const signInRequest = async ({
  email,
  password
}: SignInRequestParams) => {
    try {
      if ("userBlockedData" in localStorage) {
        let userBlockedData = JSON.parse(localStorage.getItem("userBlockedData")!)
        if (userBlockedData.some((user:any) => user.email === email)) {
          return {emailBlocked: email}
        }
      }
      const response = await api.post('/auth/login', {
        email,
        password
      })
      return response.data.data
    } catch (err:any) {
      if (err.response) {
        if (err.response.status === 422 && err.response.data.message === "Validation error") {
          if ("blockUserCount" in localStorage) {
            let blockUsr = Number(localStorage.getItem("blockUserCount"))
            blockUsr++
            localStorage.setItem("blockUserCount", JSON.stringify(blockUsr))
            if (blockUsr >= 3) {
              localStorage.setItem("blockUserCount", JSON.stringify(0))
              if ("userBlockedData" in localStorage) {
                let userBlockedData = JSON.parse(localStorage.getItem("userBlockedData")!)
                userBlockedData.push({email:email, blocked: true})
                localStorage.setItem("userBlockedData", JSON.stringify(userBlockedData))
              } else {
                localStorage.setItem("userBlockedData", JSON.stringify([{email:email, blocked: true}]))
              }
              alert("Usuario Bloqueado");
              return;
            }
          } else {
            localStorage.setItem("blockUserCount", JSON.stringify(1))
          }
        }
      }
    }
}

export const forgotPasswordRequest = async ({
  email
}: ForgotPasswordRequestParams) => {
  try {
    const response = await api.post('auth/send-reset-password-token', { email })
    return response.data
  } catch (err) {
    throw err
  }
}

export const changePasswordRequest = async ({
  email,
  password,
  newPassword
}: ChangePasswordRequestParams) => {
  try {
    const response = await api.post('/change-password', {
      email,
      password,
      new_password: newPassword
    })
    return response
  } catch (err) {
    throw err
  }
}

export const activateUserRequest = async ({
  token,
  password
}: ActivateUserRequestParams) => {
  try {
    const response = await api.post('/auth/activate-account', {
      password,
      token
    })
    return response
  } catch (err) {
    throw err
  }
}

export const resetUserPasswordRequest = async ({
  token,
  password
}: ActivateUserRequestParams) => {
  try {
    const response = await api.post('/auth/reset-password', {
      password,
      token
    })
    return response
  } catch (err) {
    throw err
  }
}
