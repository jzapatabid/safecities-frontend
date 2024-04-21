import React, { ComponentType, SVGProps } from 'react'

import * as S from './styles'

interface SVGRProps {
  title?: string
  titleId?: string
  color?: string
}

type IconProps = SVGProps<SVGSVGElement> & SVGRProps

type TextButtonProps = {
  text: string
  LeadingIcon?: ComponentType<IconProps>
  TrailingIcon?: ComponentType<IconProps>
  onClick: () => void
  disabled?: boolean
}

const TextButton: React.FC<TextButtonProps> = ({
  text,
  LeadingIcon,
  TrailingIcon,
  onClick,
  disabled
}) => (
  <S.Wrapper onClick={onClick}>
    {LeadingIcon && <LeadingIcon />}
    <S.ButtonText disabled={disabled}>{text}</S.ButtonText>
    {TrailingIcon && <TrailingIcon fill="#555555" />}
  </S.Wrapper>
)

export default TextButton
