import styled, { css } from 'styled-components'

import * as ButtonStyles from 'components/Button/styles'
import * as ContainerStyles from 'components/Container/styles'

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

export const LoginContent = styled.div`
  max-width: 61rem;
  width: 100%;
`

export const BrandContainer = styled.div `
  height: 86px;
  display: flex;
  overflow: visible;
  position: relative;
`;

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

export const Description = styled.p`
  ${({ theme }) => css`
    font-weight: ${theme.font.weights.medium};
    font-size: ${theme.font.content.xlarge};
    line-height: 3.2rem;
    margin-top: 1.6rem;
    max-width: 57rem;
  `}
`

export const Form = styled.form`
  width: 100%;
  max-width: 44.5rem;
  margin-top: 2.4rem;
  margin-bottom: 11.6rem;
  position: relative;

  ${ButtonStyles.Wrapper} {
    margin-top: 4rem;
  }
`

export const ErrorMessage = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.content.regular};
    line-height: 1.1rem;
    margin-left: 20px;
  `}
`

export const ErrorMessageWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    height: 56px;
    border: 1px solid ${theme.colors.feedback.negativeCompliant};
    border-left-width: medium;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 0px 15px;
    transition: all 0.3s ease;
  `}
`

export const Link = styled.p`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  text-decoration: underline;
  color: white;
  font-size: 1.5rem;
  text-underline-offset: 6px;
  cursor: pointer;
`

export const Hr = styled.hr`
  margin-bottom: 24px;
  border-color: rgba(255, 255, 255, 0.1);
`

export const RememberUserWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 50px;
`

export const RememberUserText = styled.label`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
`

export const Input = styled.input`
  ${({ theme }) => css`
    cursor: pointer;
    display: flex;
    align-items: center;
    background: transparent;
    justify-content: center;
    appearance: none;
    width: 24px;
    height: 24px;
    border: 2px solid #ffffff;
    border-radius: 5px;
    transition: ${theme.transition.fast};
    position: relative;

    &:before {
      content: '';
      width: 8px;
      height: 14px;
      border: 0.25rem solid black;
      border-top: 0;
      border-left: 0;
      position: absolute;
      top: 0.1rem;
      transform: rotate(41deg);
      opacity: 0;
      transition: all ${theme.transition.fast};
    }

    &:checked {
      background: #00add2;
      &:before {
        opacity: 1;
      }
    }
  `}
`

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: 445px;
  height: 60px;
`
