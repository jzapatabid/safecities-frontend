import { Toaster } from 'react-hot-toast'
import { AdminProvider } from 'contexts/Admin'
import AuthProvider from 'contexts/Auth'
import { CausesProvider } from 'contexts/Causes'
import { InitiativesProvider } from 'contexts/Initiatives'
import { ModalProvider } from 'contexts/Modal'
import { PlansProvider } from 'contexts/plans'
import { ProblemsProvider } from 'contexts/Problems'

import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from 'styles/global'
import theme from 'styles/theme'
import { IntlProvider } from 'react-intl'
import { useState } from 'react'

function App({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider theme={theme}>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <Head>
          <title>Plataforma Cidades Seguras</title>
        </Head>
        <GlobalStyles />
        <AdminProvider>
          <ProblemsProvider>
            <CausesProvider>
              <InitiativesProvider>
                <PlansProvider>
                  <ModalProvider>
                    <AuthProvider>
                      <Component {...pageProps} />
                    </AuthProvider>
                  </ModalProvider>
                </PlansProvider>
              </InitiativesProvider>
            </CausesProvider>
          </ProblemsProvider>
        </AdminProvider>
      </ThemeProvider>
  )
}

export default App
