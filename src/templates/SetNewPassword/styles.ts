import styled, { css } from 'styled-components'

import * as ButtonStyles from 'components/Button/styles'
import * as ContainerStyles from 'components/Container/styles'

type FormProps = {
  error: boolean
}

export const Wrapper = styled.main`
  min-height: 100vh;
  position: relative;
  background: url('/images/bgNew.svg') no-repeat;
  background-size: cover;

  & ${ContainerStyles.Container} {
    max-width: 100%;
    padding: 100px 126px;
  }
`

export const Content = styled.div`
  max-width: 61rem;
  width: 100%;
`

export const Anchor = styled.a``

export const Description = styled.p`
  ${({ theme }) => css`
    font-weight: ${theme.font.weights.medium};
    font-size: ${theme.font.content.xlarge};
    line-height: 3.2rem;
    margin-top: 3.2rem;
    max-width: 55rem;
  `}
`

export const Form = styled.form<FormProps>`
  ${({ error }) => css`
    width: 100%;
    max-width: 44.5rem;
    margin-top: 2.4rem;
    margin-bottom: 11.6rem;
    position: relative;

    ${ButtonStyles.Wrapper} {
      margin-top: 4rem;
    }

    ${error &&
    css`
      max-width: 56.2rem;
    `}
  `}
`

export const Brand = styled.div`
  width: 229px;
  height: 86px;
  background: url('/images/brand.svg') no-repeat;
  background-size: cover;
`

export const HeadingWrapper = styled.div`
  margin-top: 35px;
  width: 100%;
`

export const ErrorMessage = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.content.regular};
    line-height: 20px;
    margin-left: 20px;
  `}
`

export const ErrorMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ff6191;
  border-left-width: medium;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 7px 15px;
  transition: all 0.3s ease;
  min-height: 56px;
`

export const IconWrapper = styled.div`
  height: 22px;
  width: 22px;
`

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: 445px;
  height: 60px;
`

export const PasswordPolicy = styled.p`
  ${() => css`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.25px;
    text-align: left;

    margin-top: 35px;
    max-width: 40rem;
  `}
`
