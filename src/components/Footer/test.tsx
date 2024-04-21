import { render, screen } from 'utils/test-utils'

import Footer from '.'

describe('Footer', () => {
  it('should render correclty', () => {
    render(<Footer/>)

    const heading = screen.getByRole('heading', {
      name: /Gestão de Segurança Pública da Prefeitura de Florianópolis/i,
      level: 2
    })

    expect(heading).toBeInTheDocument()
  })
})
