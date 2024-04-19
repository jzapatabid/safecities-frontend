import styled, { css } from 'styled-components'

type ButtonTextProps = {
  disabled?: boolean
}

export const Wrapper = styled.button`
  background-color: transparent;
  display: flex;
  border: none;
  gap: 0.5rem;
`

export const ButtonText = styled.p<ButtonTextProps>`
  ${({ disabled }) => css`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    color: #00add2;

    ${disabled &&
    css`
      color: #555555;
    `}
  `}
`
