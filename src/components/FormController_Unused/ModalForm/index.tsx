import React, { useEffect } from 'react'

import * as S from './styles'

type Props = {
  children?: React.ReactNode
  mainButtonText: string
  optionalButtonText?: string
  handleMainButtonAction: (e: any) => void | React.ReactNode
  handleOptionalButtonAction?: () => void
}

export default function ModalForm({
  children,
  mainButtonText,
  optionalButtonText,
  handleMainButtonAction,
  handleOptionalButtonAction
}: Props) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <S.ModalContainer>
      <S.Content>
        {children}

        <S.Hr />

        <S.ButtonArea doubleButtons={!!optionalButtonText}>
          {optionalButtonText && (
            <S.Button onClick={handleOptionalButtonAction} optional>
              {optionalButtonText}
            </S.Button>
          )}

          {mainButtonText && (
            <S.Button onClick={handleMainButtonAction}>
              {mainButtonText}
            </S.Button>
          )}
        </S.ButtonArea>
      </S.Content>
    </S.ModalContainer>
  )
}
