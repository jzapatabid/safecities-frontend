import { FormattedMessage } from 'react-intl'
import * as S from './styles'

import ActiveLink from 'components/ActiveLink'

export type Link = {
  id: number
  href: string
  target?: string
  label: any
  disabled?: boolean
}

export type NavBarProps = {
  links: readonly Link[]
  variant?: 'large' | 'small'
  trailingParam?: any
  nounderline?: boolean
  totalCaus?: number | string
}

const NavBar = ({
  links,
  variant = 'large',
  trailingParam,
  nounderline,
  totalCaus
}: NavBarProps) => {
  return (
    <S.Wrapper>
      <S.Items variant={variant}>
        {links.map(({ id, href, label, target, disabled }) => (
          <S.Item key={id} variant={variant} disabled={disabled}>
            <ActiveLink
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
                {(id === 2 && totalCaus) && totalCaus} <FormattedMessage id={label}/>
              </S.Anchor>
            </ActiveLink>
          </S.Item>
        ))}
      </S.Items>
    </S.Wrapper>
  )
}
export default NavBar
