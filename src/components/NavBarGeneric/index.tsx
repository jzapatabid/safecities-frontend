import * as S from './styles'

import ActiveLinkGeneric from 'components/ActiveLinkGeneric'

export type Link = {
  id: number
  href: string
  target?: string
  label: string
  disabled?: boolean
}

export type NavBarProps = {
  links: readonly Link[]
  variant?: 'large' | 'small'
  trailingParam?: any
  nounderline?: boolean
}

const NavBarGeneric = ({
  links,
  variant = 'large',
  trailingParam,
  nounderline
}: NavBarProps) => {
  return (
    <S.Wrapper>
      <S.Items variant={variant}>
        {links.map(({ id, href, label, target, disabled }) => (
          <S.Item key={id} variant={variant} disabled={disabled}>
            <ActiveLinkGeneric
              href={disabled ? '#' : href}
              passHref
              scroll={false}
              trailingParam={trailingParam}
            >
              <S.Anchor
                target={target}
                variant={variant}
                disabled={disabled}
                nounderline={nounderline}
              >
                {label}
              </S.Anchor>
            </ActiveLinkGeneric>
          </S.Item>
        ))}
      </S.Items>
    </S.Wrapper>
  )
}
export default NavBarGeneric
