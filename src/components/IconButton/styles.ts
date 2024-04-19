import styled, { css } from 'styled-components'

type IconButtonWrapperProps = {
  disabled?: boolean
}
export const IconButtonWrapper = styled.button<IconButtonWrapperProps>`
  ${({ disabled }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    ${disabled &&
    css`
      cursor: not-allowed;
    `}
  `}
`
