import { render, screen } from 'utils/test-utils'

import ActiveLink from '.'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe('<ActiveLink />', () => {
  it('renders correctly', () => {
    render(
      <ActiveLink href="/">
        <a>Home</a>
      </ActiveLink>
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('must add active class if link is currently active', () => {
    render(
      <ActiveLink href="/">
        <a>Home</a>
      </ActiveLink>
    )

    expect(screen.getByText('Home')).toHaveClass('active')
  })

  it('should not add the active class if the link is not currently active', () => {
    render(
      <ActiveLink href="/home">
        <a>Home</a>
      </ActiveLink>
    )

    expect(screen.getByText('Home')).not.toHaveClass('active')
  })
})
