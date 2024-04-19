import React, { useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'

import * as S from './styles'

import CrossIcon from 'components/icons/CrossIcon'
import ToastSuccessIcon from 'components/icons/ToastSuccessIcon'
import ToastWarningIcon from 'components/icons/ToastWarningIcon'

type NotificationProps = {
  text: string
  id: string
  variant: string
}

const Icons: any = {
  success: ToastSuccessIcon,
  warning: ToastWarningIcon
}

const Notification: React.FC<NotificationProps> = ({ text, id, variant }) => {
  const Icon = Icons[variant]
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('click', (e) => {
        if (ref.current) {
          const dialogDimensions = ref.current.getBoundingClientRect()
          if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
          ) {
            ref.current.style.display = 'none'
            ref.current.close()
            toast.dismiss(id)
          }
        }
      })
      ref.current.style.display = 'flex'
      ref.current?.showModal()
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.display = 'none'
          ref.current?.close()
        }
      }, 2000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <S.Wrapper ref={ref}>
      <S.VariantWrapper>
        <Icon />
      </S.VariantWrapper>
      <S.Text>{text}</S.Text>
      <S.DismissWrapper onClick={() => toast.dismiss(id)}>
        <CrossIcon height={15} width={15} fill="#fff" />
      </S.DismissWrapper>
    </S.Wrapper>
  )
}

export default Notification
