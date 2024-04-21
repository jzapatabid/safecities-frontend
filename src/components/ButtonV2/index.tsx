import Link from 'next/link'

import * as S from './styles'

import { ButtonProps } from './types'
import { FormattedMessage } from 'react-intl'

const ButtonV2: React.FC<ButtonProps> = ({
  text,
  LeadingIcon,
  TrailingIcon,
  disabled,
  href,
  linkExternal,
  loading = false,
  ...props
}) => {
  return (
    <S.Button
      disabled={disabled}
      loading={loading}
      autoFocus={false}
      text={text}
      {...props}
    >
      {LeadingIcon && (
        <S.IconWrapper>
          <LeadingIcon height={22} width={22} />
        </S.IconWrapper>
      )}
      {href ? (
        <Link passHref href={href}>
          {linkExternal ? (
            <S.HTMLLink href={href} target="_blank" rel="noreferrer">
              <S.BtnText>{text}</S.BtnText>
            </S.HTMLLink>
          ) : (
            <S.BtnText>{text}</S.BtnText>
          )}
        </Link>
      ) : (
        <S.BtnText>{text}</S.BtnText>
      )}
      {TrailingIcon && (
        <S.IconWrapper>
          <TrailingIcon />
        </S.IconWrapper>
      )}
    </S.Button>
  )
}

export default ButtonV2
