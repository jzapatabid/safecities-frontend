import styled, { css } from 'styled-components'

type ButtonTextProps = {
  disabled?: boolean
}

export const Wrapper = styled.button`
  background-color: transparent;
  display: flex;
  border: none;
  gap: 0.5rem;
  &:disabled {
    cursor: not-allowed;
    text-decoration-color: #555555;
    & svg path {
      stroke: #555555;
      fill: #555555;
      fill-opacity: 1;
    }
  }
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
