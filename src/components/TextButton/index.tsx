import React, { ComponentType, SVGProps } from 'react'

import Link from 'next/link'

import * as S from './styles'
import { useIntl } from 'react-intl'

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
  onClick?: () => void
  disabled?: boolean
  link?: boolean
  href?: string
  leadingIconProps?: any
}

const TextButton: React.FC<TextButtonProps> = ({
  text,
  LeadingIcon,
  TrailingIcon,
  onClick,
  disabled,
  link,
  href = '',
  leadingIconProps
}) => {

  const intl = useIntl()
  const formattedText = intl.formatMessage({id: text})
  console.log("This Is  formattedText:", formattedText)


  return <S.Wrapper onClick={onClick} disabled={disabled}>
  {LeadingIcon && <LeadingIcon {...leadingIconProps} />}
  {link ? (
    <Link passHref href={href}>
      <S.ButtonText disabled={disabled}>{formattedText} </S.ButtonText>
    </Link>
  ) : (
    <S.ButtonText disabled={disabled}>{formattedText}</S.ButtonText>
  )}
  {TrailingIcon && <TrailingIcon fill="#555555" />}
</S.Wrapper>
}





export default TextButton
