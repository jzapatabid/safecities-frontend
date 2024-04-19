import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { useAuth } from 'contexts/Auth'
import { useModal } from 'contexts/Modal'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { getAPIClient } from 'services/axios'
import { sendNewInvite } from 'services/manage-users'
import * as yup from 'yup'

import * as S from './styles'

import WarningIcon from 'components/icons/WarningIcon'
import Input from 'components/Input'
import Notifications from 'components/Notifications'

type Inputs = {
  firstname: string
  lastname: string
  email: string
}

const newInviteSchema = yup.object().shape({
  firstname: yup.string().required('First name must be provided'),
  lastname: yup.string().required('Last name must be provided'),
  email: yup
    .string()
    .required('Email must be provided')
    .email('Provided Email must be valid')
})

const NewInviteModalContent = () => {
  const router = useRouter()
  const { logOut } = useAuth()
  const { modalState, setModalState } = useModal()
  const [inputError, setInputError] = useState(false)
  const apiClient = getAPIClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch
  } = useForm<Inputs>({
    resolver: yupResolver(newInviteSchema)
  })

  const onSubmit = handleSubmit(async () => {
    setInputError(false)
  })

  const watchFirstName = watch('firstname')
  const watchLastName = watch('lastname')
  const watchEmail = watch('email')

  const watchedFields = watch()

  useEffect(() => {
    setInputError(false)
    const isValid = newInviteSchema.isValidSync(watchedFields)
    trigger()
    if (isValid) {
      setModalState((state) => ({
        ...state,
        disableConfirm: !isValid,
        actions: { newInvite: { ...watchedFields } },
        onConfirm: async () => {
          try {
            await sendNewInvite({ api: apiClient, ...watchedFields })
            toast.custom((t) => (
              <Notifications
                id={t.id}
                text={'Enviou corretamente o convite!'}
                variant="success"
              />
            ))
            setModalState({ open: false })
            router.replace(router.asPath)
          } catch (err: any) {
            if (err.response?.statusText === 'UNAUTHORIZED') {
              setModalState({ open: false })
              logOut()
            }
            toast.custom((t) => (
              <Notifications
                id={t.id}
                text={
                  err.response?.data?.detail?.json?.email[0] ===
                  'Email already registered'
                    ? 'O e-mail/usuário existe em nossa base de usuários'
                    : 'Não foi possível enviar os convites. Tente novamente em algum momento'
                }
                variant="warning"
              />
            ))
            setModalState({ open: false })
          }
        }
      }))
    } else {
      if (
        Object.values(errors).filter((item) => item.type !== 'required').length
      ) {
        setInputError(true)
      } else if (errors?.email && !watchEmail) {
        setInputError(false)
      } else {
        setInputError(false)
      }
      setModalState((state) => ({
        ...state,
        disableConfirm: !isValid
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchEmail, watchFirstName, watchLastName])

  return (
    <S.Wrapper>
      {(inputError || modalState?.actions?.newInvite?.error) && (
        <S.ErrorMessageWrapper>
          <WarningIcon fill="#FF6191" width={22} height={22} />
          <S.ErrorMessage>
            {inputError
              ? 'O nome de usuário ou e-mail tem um formato inválido'
              : modalState?.actions?.forgotPassword?.error}
          </S.ErrorMessage>
        </S.ErrorMessageWrapper>
      )}
      <S.Form onSubmit={onSubmit}>
        <S.InputWrapper>
          <Input
            autoComplete="off"
            type="text"
            placeholder="Primeiro nome*"
            {...register('firstname')}
            error={watchFirstName && errors?.firstname ? true : false}
          />
        </S.InputWrapper>
        <S.InputWrapper>
          <Input
            autoComplete="off"
            type="text"
            placeholder="Sobrenome*"
            {...register('lastname')}
            error={watchLastName && errors?.lastname ? true : false}
          />
        </S.InputWrapper>
        <S.InputWrapper>
          <Input
            autoComplete="off"
            type="text"
            placeholder="E-mail*"
            {...register('email')}
            error={watchEmail && errors?.email ? true : false}
          />
        </S.InputWrapper>
      </S.Form>
    </S.Wrapper>
  )
}

export default NewInviteModalContent
