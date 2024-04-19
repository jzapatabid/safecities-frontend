import { render, screen } from 'utils/test-utils'

import Button from '.'

describe('Button', () => {
  it('should render text correctly', () => {
    render(<Button>Entrar</Button>)

    expect(screen.getByRole('button')).toHaveTextContent('Entrar')

    expect(screen.queryByTestId('is-loading')).not.toBeInTheDocument()
  })

  it('should render a fullWidth version', () => {
    render(<Button fullWidth>Entrar</Button>)

    expect(screen.queryByTestId('is-loading')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Entrar/i })).toHaveStyle({
      width: '100%'
    })
  })

  it('should render a minimal version', () => {
    render(<Button minimal>Entrar</Button>)

    expect(screen.queryByTestId('is-loading')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toHaveStyle({
      background: 'none',
      color: '#FFF'
    })
  })

  it('should render Button as a link', () => {
    render(
      <Button as="a" href="/login">
        Entrar
      </Button>
    )

    expect(screen.queryByTestId('is-loading')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /entrar/i })).toHaveAttribute(
      'href',
      '/login'
    )
  })

  it('should render a disabled Button', () => {
    render(<Button disabled>Entrar</Button>)

    expect(screen.queryByTestId('is-loading')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toHaveStyleRule(
      'cursor',
      'not-allowed',
      {
        modifier: ':disabled'
      }
    )
  })

  it('should render a isLoading Button', () => {
    render(<Button isLoading>Entrar</Button>)

    expect(screen.getByTestId('is-loading')).toBeInTheDocument()
  })
})
