import { render, screen } from 'utils/test-utils'

import Header from '.'
import LanguageProvider from 'contexts/LanguageSelector'

jest.mock('contexts/AuthContext', () => {
  return {
    useAuth() {
      return {
        logOut: null
      }
    }
  }
})

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/diagnostico'
      }
    }
  }
})

describe('Header', () => {
  it('should render correclty', () => {
    render(
      <LanguageProvider><Header /></LanguageProvider>
    )

    expect(screen.getAllByRole('link')).toHaveLength(3)
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument()
  })
})
