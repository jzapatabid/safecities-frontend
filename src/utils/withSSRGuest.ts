import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import { parseCookies } from 'nookies'
import { COOKIE_TOKEN } from 'services/auth'

export function withSSRGuest<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>,
  destination = '/home'
): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const { [COOKIE_TOKEN]: token } = parseCookies(ctx)

    if (token) {
      return {
        redirect: {
          destination,
          permanent: false
        }
      }
    }

    const resultFn = await fn(ctx)
    return resultFn
  }
}
