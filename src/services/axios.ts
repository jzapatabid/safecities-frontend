import axios, { AxiosRequestConfig } from 'axios'
import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'

const baseURL = "https://safecities-backend.sndbx.run/"

export const getAPIClient = (ctx?: GetServerSidePropsContext) => {
  const { ['@unacity-token']: token } = parseCookies(ctx)

  const api = axios.create({
    baseURL
  })

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`
    }

    return config
  })

  return api
}
