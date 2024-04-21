import { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { FORGOT_PASSWORD_STATIC_MODAL_PROPS } from 'constants/Auth'

import { useAuth } from 'contexts/Auth'
import { useModal } from 'contexts/Modal'

import { Inputs, LoginProps, SignInData } from 'types/Auth'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as S from './styles'

import Button from 'components/Button'
import Container from 'components/Container'
import Heading from 'components/Heading'
import BidLogo from 'components/icons/BidLogo'
import WarningIcon from 'components/icons/WarningIcon'
import Input from 'components/Input'
import { FormattedMessage, IntlProvider } from 'react-intl'
import LanguageDropdown from 'components/LanguageDropdown'
import UserBlockedModal from 'components/UserBlockedModal'
import { LanguageContext } from 'contexts/LanguageSelector/context'

const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('Você deve fornecer um ID de e-mail')
    .email('O e-mail inserido deve ser válido'),
  password: yup.string().required('Você deve fornecer sua senha')
})

const getStaticErrorMessage = (errorObject: any) => {
  if (Object.keys(errorObject).length === 0) return ''
  if (Object.keys(errorObject).length === 1) {
    return errorObject?.email
      ? errorObject.email.message
      : errorObject?.password.message
  }
  if (Object.keys(errorObject).length === 2) {
    if (
      errorObject?.email?.message === 'Você deve fornecer um ID de e-mail' &&
      errorObject?.password?.message === 'Você deve fornecer sua senha'
    ) {
      return 'Ambos e-mail e senha são necessários'
    } else {
      return 'O e-mail deve ser válido e fornecer a senha'
    }
  }
  return ''
}

const Login = ({ email }: LoginProps) => {
  const { state } = useContext(LanguageContext);
  const { signIn, loading } = useAuth()
  const rememberUser = useRef<boolean>(false)
  const [userBlocked, setUserBlocked] = useState(false);
  const [inputError, setInputError] = useState<boolean | string>(false)
  const { setModalState } = useModal()
  
  const onForgotPasswordClick = () =>
    setModalState(FORGOT_PASSWORD_STATIC_MODAL_PROPS)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<Inputs>({
    resolver: yupResolver(signInFormSchema)
  })
  const watchedFields = watch()
  const watchEmail = watch('email')
  const watchPassword = watch('password')
  const isDisabled =
  Object.keys(watchedFields).length === 0 ||
  Object.values(watchedFields).filter((value) => !value).length !== 0
  
  const onSubmit = handleSubmit(async ({ email, password }: SignInData) => {
    setInputError(false)
    try {
      await signIn({ email, password, rememberUser: rememberUser.current }).then(({emailBlocked}:any) => {
        if (emailBlocked) {
          setUserBlocked(true);
        }
      })
    } catch (err: any) {
      if (err.response?.data.error?.errors.length) {
        setInputError(err.response.data.error.errors[0].message)
      } else if (err.response?.data?.message) {
        const message =
        err.response?.data?.message === 'User or password invalid'
        ? 'Usuário ou senha incorretos'
            : err.response?.data?.message
        setInputError(message)
      }
    }
  })
  useEffect(() => {
    setInputError(false)
  }, [watchEmail, watchPassword])
  return (
    <S.Wrapper>
      {state && (
        <IntlProvider messages={state.messages} locale="pt" defaultLocale="pt">
            {userBlocked && (
              <UserBlockedModal email={watchEmail} setUserBlocked={setUserBlocked}/>
            )}
          <Container>
          <S.LoginContent>
            <S.BrandContainer>
              <S.Brand/>
              {/* <LanguageDropdown/> */}
            </S.BrandContainer>
            <S.HeadingWrapper>
              <Heading size="large" lineHeight="6rem">
                <FormattedMessage id='login.title'/>
              </Heading>
            </S.HeadingWrapper>
                <S.Description>
                <FormattedMessage id='login.description'/>
                </S.Description>
                <S.Form onSubmit={onSubmit}>
                  {(Object.keys(errors).length > 0 || inputError) && (
                    <S.ErrorMessageWrapper>
                      <WarningIcon fill="#FF6191" width={22} height={22}/>
                      <S.ErrorMessage>
                        {getStaticErrorMessage(errors) || inputError}
                      </S.ErrorMessage>
                    </S.ErrorMessageWrapper>
                  )}
                  <S.InputWrapper>
                    <Input
                      autoComplete="off"
                      placeholder={<FormattedMessage id='login.email.label'/>}
                      type="text"
                      {...register('email')}
                      error={Boolean(Object.keys(errors).length) || inputError}
                      defaultValue={email}
                   />
                  </S.InputWrapper>
                  <S.InputWrapper>
                    <Input
                      placeholder={<FormattedMessage id='login.password.label'/>}
                      type="password"
                      {...register('password')}
                      error={Boolean(Object.keys(errors).length) || inputError}
                   />
                  </S.InputWrapper>
                  <S.Link onClick={onForgotPasswordClick}><FormattedMessage id='login.recover.password'/></S.Link>
                  <S.RememberUserWrapper>
                    <S.Input
                      id="rememberUser"
                      type="checkbox"
                      onChange={({ target: { checked } }) =>
                        (rememberUser.current = checked)
                      }
                   />
                    <S.RememberUserText htmlFor="rememberUser">
                      <FormattedMessage id='login.remember.username'/>
                    </S.RememberUserText>
                  </S.RememberUserWrapper>
                  <Button disabled={isDisabled} isLoading={loading}>
                    <FormattedMessage id='button.login'/>
                  </Button>
                </S.Form>
                <S.Hr/>
                <BidLogo/>
              </S.LoginContent>
          </Container>
        </IntlProvider>
      )}
    </S.Wrapper>
  )
}

export default Login
