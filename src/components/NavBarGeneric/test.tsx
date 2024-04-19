import { render, screen } from 'utils/test-utils'

import NavBar from '.'

const links = [
  {
    id: 1,
    href: '/problemas-do-municipio',
    label: 'Problemas do Município'
  },
  {
    id: 2,
    href: '/fatores-de-risco',
    label: 'Fatores de Risco'
  }
]

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/problemas-do-municipio'
  })
}))

describe('NavBar', () => {
  it('should render correctly', () => {
    const { container } = render(<NavBar links={links} />)

    expect(container.querySelectorAll('li')).toHaveLength(2)

    expect(screen.getByText('Problemas do Município')).toHaveAttribute(
      'href',
      '/problemas-do-municipio'
    )
    expect(screen.getByText('Fatores de Risco')).toHaveAttribute(
      'href',
      '/fatores-de-risco'
    )
  })

  it('should render the variant large as default', () => {
    render(<NavBar links={links} />)

    const link = screen.getAllByRole('link')[0]

    expect(link).toHaveStyleRule('padding', '1.6rem 0')
    expect(link).toHaveStyleRule('font-size', '2.0rem')
    expect(link).toHaveStyleRule('font-weight', '600')
    expect(link).not.toHaveStyleRule('text-transform', 'uppercase')
    expect(link).not.toHaveStyleRule('letter-spacing', '0.2rem')
  })

  it('should render the variant small', () => {
    render(<NavBar links={links} variant="small" />)

    const link = screen.getAllByRole('link')[0]

    expect(link).toHaveStyleRule('padding', '0.8rem 0')
    expect(link).toHaveStyleRule('font-size', '1.4rem')
    expect(link).toHaveStyleRule('font-weight', '700')
    expect(link).toHaveStyleRule('text-transform', 'uppercase')
    expect(link).toHaveStyleRule('letter-spacing', '0.2rem')
  })
})
