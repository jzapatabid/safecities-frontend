import { cloneElement } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { ActiveLinkProps } from './types'

const ActiveLinkGeneric = ({
  children,
  activeClassName = 'active',
  ...rest
}: ActiveLinkProps) => {
  const { asPath } = useRouter()

  const className =
    asPath === rest.href || asPath.startsWith(String(rest.href))
      ? activeClassName
      : ''

  return (
    <Link
      {...rest}
      href={
        rest.trailingParam ? `${rest.href}/${rest.trailingParam}` : rest.href
      }
    >
      {cloneElement(children, {
        className
      })}
    </Link>
  )
}

export default ActiveLinkGeneric
