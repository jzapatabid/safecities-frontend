import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useModal } from 'contexts/Modal'

import { debounce } from 'debounce'
import { forgotPasswordRequest } from 'services/auth'
import * as yup from 'yup'

import * as S from './styles'

import WarningIcon from 'components/icons/WarningIcon'
import Input from 'components/Input'

type Inputs = {
  email: string
}

const emailSchema = yup.object().shape({
  email: yup.string().required().email()
})

const ForgotPasswordModalContent = () => {
  const { modalState, setModalState } = useModal()
  const [inputError, setInputError] = useState(false)
  const { register } = useForm<Inputs>()

  const handleChange = debounce((event: any) => {
    const { name, value } = event.target
    const hasError = emailSchema.isValidSync({
      [name]: value
    })
    setInputError(!hasError && value.length > 1)
    setModalState((state) => ({
      ...state,
      disableConfirm: !hasError,
      actions: { forgotPassword: { [name]: value } },
      onConfirm: async () => {
        try {
          await forgotPasswordRequest({ email: value })
          setModalState((state) => ({
            ...state,
            desc: 'Um e-mail com instruções de redefinição de senha foi enviado para o seu e-mail registrado.',
            cancelBtn: '',
            disableConfirm: false,
            onConfirm: () => setModalState({ open: false }),
            Content: undefined
          }))
        } catch (err) {
          // checked for blocked user status from backend
          setModalState((state) => ({
            ...state,
            desc: 'Um erro ocorreu durante o processamento do seu pedido. Por favor, tente novamente mais tarde.',
            cancelBtn: '',
            onConfirm: () => setModalState({ open: false }),
            disableConfirm: false,
            Content: undefined
          }))
        }
      }
    }))
  }, 500)

  return (
    <S.Wrapper>
      {(inputError || modalState?.actions?.forgotPassword?.error) && (
        <S.ErrorMessageWrapper>
          <WarningIcon fill="#FF6191" width={22} height={22}/>
          <S.ErrorMessage>
            {inputError
              ? 'O nome de usuário ou e-mail tem um formato inválido'
              : modalState?.actions?.forgotPassword?.error}
          </S.ErrorMessage>
        </S.ErrorMessageWrapper>
      )}
      <S.InputWrapper>
        <Input
          autoComplete="off"
          type="text"
          placeholder="Email"
          {...register('email')}
          error={inputError}
          onChange={handleChange}
       />
      </S.InputWrapper>
    </S.Wrapper>
  )
}

export default ForgotPasswordModalContent
