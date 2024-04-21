import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  PASSWORD_ALREADY_USED_BACKEND_ERROR_MESSAGE,
  PASSWORD_ALREADY_USED_DETAILED_ERROR_MESSAGE_OBJECT,
  SET_NEW_PW_PAGE_UNCATEGORISED_BACKEND_ERROR_MESSAGE_OBJECT,
  SET_NEW_PW_SUCCESS_MESSAGE,
  TOKEN_EXPIRED_BACKEND_ERROR_MESSAGE,
  TOKEN_EXPIRED_DETAILED_ERROR_MESSAGE_OBJECT
} from 'constants/Auth'

import { useAuth } from 'contexts/Auth'

import {
  SetNewPasswordFormData,
  SetNewPasswordInputs,
  SetNewPasswordProps,
  SetNewPwDetailedErrorTypes
} from 'types/Auth'

import { SET_NEW_PASSWORD_PAGE } from 'enums/Auth'

import { yupResolver } from '@hookform/resolvers/yup'
import Router, { useRouter } from 'next/router'
import * as yup from 'yup'

import * as S from './styles'

import AggregatedInputErrors, {
  AGGREGATED_INPUT_ERRORS_VARIANTS
} from 'components/AggregatedInputErrors'
import Button from 'components/Button'
import Container from 'components/Container'
import Heading from 'components/Heading'
import BidLogo from 'components/icons/BidLogo'
import Input from 'components/Input'
import Notification from 'components/Notifications'

const changePasswordFormSchema = yup.object().shape({
  password: yup
    .string()
    .required('Senha obrigatória')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
      'A senha deve ter no mínimo 8 caracteres, sendo 1 letra maiúscula e 1 número e 1 caractere especial'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas devem corresponder')
})

const getStaticErrorMessage = (errorObject: any) => {
  if (Object.keys(errorObject).length === 0) return ''
  if (Object.keys(errorObject).length === 1) {
    return errorObject?.password
      ? errorObject.password.message
      : errorObject?.confirmPassword.message
  }
  if (Object.keys(errorObject).length === 2) {
    if (errorObject?.password?.type === 'matches') {
      return errorObject?.password?.message
    }
    if (
      errorObject?.password.type === 'required' &&
      errorObject?.confirmPassword.message === 'As senhas devem corresponder'
    ) {
      return 'Ambos os campos são obrigatórios'
    }
  }
  return ''
}

const SetNewPassword = ({ type }: SetNewPasswordProps) => {
  const [detailedError, setDetailedError] = useState(
    {} as SetNewPwDetailedErrorTypes
  )
  const router = useRouter()
  const {
    query: { token }
  } = router

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<SetNewPasswordInputs>({
    resolver: yupResolver(changePasswordFormSchema)
  })
  const watchedFields = watch()
  const isDisabled =
    Object.keys(watchedFields).length === 0 ||
    Object.values(watchedFields).filter((value) => !value).length !== 0 ||
    Object.keys(errors).length !== 0
  const { loading, activateUser, resetUserPassword } = useAuth()

  useEffect(() => {
    if (!token) {
      Router.push('/login')
    }
  }, [token])

  const onSubmit = async (
    { password }: SetNewPasswordFormData,
    { token }: { token: string }
  ) => {
    setDetailedError({} as SetNewPwDetailedErrorTypes)
    try {
      if (type === SET_NEW_PASSWORD_PAGE.RESET_PASSWORD) {
        await resetUserPassword({
          token,
          password
        })
      } else if (type === SET_NEW_PASSWORD_PAGE.FIRST_ACCESS) {
        await activateUser({
          token,
          password
        })
      }
      toast.custom((t) => (
        <Notification
          id={t.id}
          text={SET_NEW_PW_SUCCESS_MESSAGE[type]}
          variant="success"
       />
      ))
      Router.push('/login')
    } catch (err: any) {
      if (
        err?.response?.data?.error?.errors[0]?.message ==
        TOKEN_EXPIRED_BACKEND_ERROR_MESSAGE
      ) {
        setDetailedError(TOKEN_EXPIRED_DETAILED_ERROR_MESSAGE_OBJECT)
      } else if (
        err?.response?.data?.message ===
        PASSWORD_ALREADY_USED_BACKEND_ERROR_MESSAGE
      ) {
        setDetailedError(PASSWORD_ALREADY_USED_DETAILED_ERROR_MESSAGE_OBJECT)
      } else {
        setDetailedError(
          SET_NEW_PW_PAGE_UNCATEGORISED_BACKEND_ERROR_MESSAGE_OBJECT
        )
      }
    }
  }

  const handleFormSubmit = (additionalData: { token: string }) =>
    handleSubmit((formData: SetNewPasswordFormData) =>
      onSubmit(formData, additionalData)
    )

  const handlePageReload = () => {
    setDetailedError({} as SetNewPwDetailedErrorTypes)
    reset()
    router.replace(router.asPath)
  }

  return (
    <S.Wrapper>
      <Container>
        <S.Content>
          <S.Brand/>
          <S.HeadingWrapper>
            <Heading size="large" lineHeight="6rem">
              Bem-vind@ à Plataforma Cidades Seguras.
            </Heading>
          </S.HeadingWrapper>

          {Object.keys(detailedError).length === 0 ? (
            <>
              <S.Description>
                Crie a senha de acesso que você irá utilizar nas próximas vezes
                que acessar a plataforma.
              </S.Description>
              <S.PasswordPolicy>
                Defina a sua senha (Mínimo de 8 caracteres, 1 letra maiúscula e
                1 número).
              </S.PasswordPolicy>
            </>
          ) : null}
          <S.Form
            error={Object.keys(detailedError).length !== 0}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onSubmit={handleFormSubmit({ token })}
          >
            {(Object.keys(errors).length > 0 ||
              Object.keys(detailedError).length > 0) && (
              <AggregatedInputErrors
                variant={
                  Object.keys(detailedError).length
                    ? AGGREGATED_INPUT_ERRORS_VARIANTS.DETAILED
                    : AGGREGATED_INPUT_ERRORS_VARIANTS.INLINE
                }
                detailedError={detailedError}
                inlineError={errors}
                getErrorMessage={getStaticErrorMessage}
                handleClick={handlePageReload}
             />
            )}
            {Object.keys(detailedError).length === 0 ? (
              <>
                <S.InputWrapper>
                  <Input
                    placeholder="Nova senha"
                    type="password"
                    {...register('password')}
                    error={errors.password?.message}
                 />
                </S.InputWrapper>
                <S.InputWrapper>
                  <Input
                    placeholder="Repetir nova senha"
                    type="password"
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                 />
                </S.InputWrapper>
                <Button disabled={isDisabled} isLoading={loading}>
                  Enviar
                </Button>
              </>
            ) : null}
          </S.Form>
          <BidLogo/>
        </S.Content>
      </Container>
    </S.Wrapper>
  )
}

export default SetNewPassword
