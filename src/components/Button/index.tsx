import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import * as S from './styles'

import CheckedIcon from 'components/icons/CheckedIcon'

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = {
  children: ReactNode
  fullWidth?: boolean
  as?: React.ElementType
  minimal?: boolean
  isLoading?: boolean
  checked?: boolean
  modal?: boolean
  outline?: boolean
} & ButtonTypes

const Button = ({
  children,
  fullWidth = false,
  minimal = false,
  isLoading = false,
  checked = false,
  modal = false,
  outline = false,
  ...props
}: ButtonProps) => {
  return (
    <S.Wrapper
      fullWidth={fullWidth}
      minimal={minimal}
      checked={checked}
      modal={modal}
      outline={outline}
      {...props}
    >
      {isLoading ? (
        <S.Spinner data-testid="is-loading" />
      ) : (
        <>
          {checked && <CheckedIcon />}
          {children}
        </>
      )}
    </S.Wrapper>
  )
}

export default Button
