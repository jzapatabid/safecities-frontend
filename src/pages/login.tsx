import LanguageProvider from 'contexts/LanguageSelector'
import { parseCookies } from 'nookies'
import Login from 'templates/Login'
import { withSSRGuest } from 'utils/withSSRGuest'

type LoginPageProps = {
  email: string
}

export default function LoginPage({ email }: LoginPageProps) {
  return (<LanguageProvider> <Login email={email}/> </LanguageProvider>)
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  const { email = '' } = parseCookies(ctx)
  return {
    props: { email }
  }
})
