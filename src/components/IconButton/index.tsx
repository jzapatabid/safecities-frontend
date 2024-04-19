import React from 'react'

import * as S from './styles'

type IconButtonProps = {
  icon: React.ReactNode
  onClick?: () => void
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className,
  ...props
}) => (
  <S.IconButtonWrapper onClick={onClick} className={className} {...props}>
    {icon}
  </S.IconButtonWrapper>
)

export default IconButton
