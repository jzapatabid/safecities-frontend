import { ComponentType, SVGProps } from 'react'

import * as S from './styles'

import ActiveLink from 'components/ActiveLink'

type Link = {
  id: number
  href: string
  target?: string
  label: string
  disabled?: boolean
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

export type NavBarProps = {
  links: Link[]
  variant?: 'large' | 'small'
}

const NavBar = ({ links, variant = 'large' }: NavBarProps) => {
  return (
    <S.Wrapper>
      <S.Items variant={variant}>
        {links.map(({ id, href, label, disabled, Icon }) => (
          <ActiveLink
            key={id}
            href={disabled ? '#' : href}
            passHref
            scroll={false}
          >
            <S.Item variant={variant} disabled={disabled}>
              <S.ItemContentWrapper>
                <S.IconWrapper>
                  <Icon />
                </S.IconWrapper>
                <S.Text>{label}</S.Text>
              </S.ItemContentWrapper>
            </S.Item>
          </ActiveLink>
        ))}
      </S.Items>
    </S.Wrapper>
  )
}
export default NavBar
