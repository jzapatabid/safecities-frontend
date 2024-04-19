import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
`

export const ErrorMessage = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.content.regular};
    line-height: 24px;
    margin-left: 20px;
    color: #ffffff;
  `}
`

export const ErrorMessageWrapper = styled.div`
  width: 445px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  height: 56px;
  border: 1px solid #ff6191;
  border-left-width: medium;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 0px 15px;
  transition: all 0.3s ease;
`

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: 445px;
  height: 60px;
`

export const Form = styled.form``
