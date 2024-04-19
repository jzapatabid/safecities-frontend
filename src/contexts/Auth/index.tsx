import { createContext, useContext, useEffect, useState } from 'react'

import { useModal } from 'contexts/Modal'

import {
  ActivateUserData,
  AuthContextValue,
  AuthProviderProps,
  ChangePasswordData,
  SignInDataContext,
  UserStateData
} from 'types/Auth'

import Router, { useRouter } from 'next/router'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import {
  changePasswordRequest,
  COOKIE_TOKEN,
  signInRequest,
  activateUserRequest,
  resetUserPasswordRequest
} from 'services/auth'
import {
  getSessionExpirationHashedEpochTime,
  unhashEpoch,
  runAtEpochTime
} from 'utils'
import { SESSION_EXPIRY } from 'utils/config'

export const AuthContext = createContext({} as AuthContextValue)

export const useAuth = () => useContext(AuthContext)

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { setModalState } = useModal()

  const [user, setUser] = useState<UserStateData>({
    email: '',
    password: '',
    isAdmin: false,
    fullName: ''
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const {
    query: { token }
  } = router

  useEffect(() => {
    if (!token) {
      const { [COOKIE_TOKEN]: token, fullName, isAdmin, email } = parseCookies()
      const expirationEpoch = unhashEpoch(
        window.localStorage.getItem('expirationEpoch') || ''
      )

      if (token && expirationEpoch) {
        setUser({
          email,
          fullName,
          isAdmin: isAdmin ? JSON.parse(isAdmin) : false
        })
        runAtEpochTime(expirationEpoch, () => {
          localStorage.removeItem('expirationEpoch')
          setModalState({ open: false })
          Router.push('/login')
        })
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        logOut()
        destroyCookie(null, COOKIE_TOKEN, { path: '/' })
        // Router.push('/')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signIn = async ({
    email,
    password,
    rememberUser = false
  }: SignInDataContext) => {
    setLoading(true)
    try {
      const { emailBlocked, token, fullName, isAdmin } = await signInRequest({
        email,
        password
      })
      if (emailBlocked) {
        return {emailBlocked};
      }
      if (token) {
        const hours = SESSION_EXPIRY
        const { sessionExpirationEpochTime } =
          getSessionExpirationHashedEpochTime(hours)

        setCookie(null, COOKIE_TOKEN, token, {
          path: '/',
          maxAge: 60 * 60 * hours
        })
        setCookie(null, 'fullName', fullName, {
          path: '/',
          maxAge: 60 * 60 * hours
        })

        setCookie(null, 'isAdmin', isAdmin, {
          path: '/',
          maxAge: 60 * 60 * hours
        })

        rememberUser &&
          setCookie(null, 'email', email, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30 // 30 days
          })

        Object.defineProperty(localStorage, 'expirationEpoch', {
          value: sessionExpirationEpochTime,
          writable: false
        })

        runAtEpochTime(unhashEpoch(sessionExpirationEpochTime), () => {
          localStorage.removeItem('expirationEpoch')
          setModalState({ open: false })
          Router.push('/login')
        })

        setIsAuthenticated(!!token)
        setUser({ email, fullName, isAdmin })

        Router.push('/home')
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (
        err.response &&
        err.response.status === 400 &&
        err.response.data.error ===
          'Please change your password before trying to login'
      ) {
        setUser({
          email,
          password,
          isAdmin: false,
          fullName: ''
        })

        Router.push('/primeiro-acesso')
        return err.response.data.error
      }
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logOut = () => {
    localStorage.removeItem('expirationEpoch')
    destroyCookie(null, COOKIE_TOKEN, { path: '/' })
    destroyCookie(null, 'fullName', { path: '/' })
    destroyCookie(null, 'isAdmin', { path: '/' })
    setModalState({ open: false })
    Router.push('/')
  }

  const changePassword = async ({
    email,
    password,
    newPassword
  }: ChangePasswordData) => {
    setLoading(true)
    try {
      const data = await changePasswordRequest({
        email,
        password,
        newPassword
      })

      if (data.status === 201) {
        await signIn({
          email,
          password: newPassword,
          rememberUser: true
        })

        setUser({
          email: '',
          password: '',
          isAdmin: false,
          fullName: ''
        })

        return
      }
    } catch (err) {
      throw err
    } finally {
      setLoading(false)
    }
  }

  const activateUser = async ({ password, token }: ActivateUserData) => {
    setLoading(true)
    try {
      await activateUserRequest({ password, token })
    } catch (err: any) {
      throw err
    } finally {
      setLoading(false)
    }
  }

  const resetUserPassword = async ({ password, token }: ActivateUserData) => {
    setLoading(true)
    try {
      await resetUserPasswordRequest({ password, token })
    } catch (err: any) {
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        logOut,
        loading,
        user,
        changePassword,
        activateUser,
        resetUserPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
