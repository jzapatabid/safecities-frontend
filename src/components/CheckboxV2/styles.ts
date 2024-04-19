import styled, { css } from 'styled-components'

export const Input = styled.input`
  ${({ theme }) => css`
    cursor: pointer;
    display: flex;
    align-items: center;
    background: transparent;
    justify-content: center;
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid ${theme.colors.base.lightPure};
    border-radius: 2px;
    transition: ${theme.transition.fast};
    position: relative;
    flex-shrink: 0;

    &:before {
      content: '';
      width: 7px;
      height: 13px;
      border: 0.25rem solid black;
      border-top: 0;
      border-left: 0;
      position: absolute;
      transform: rotate(41deg);
      top: -0.25px;
      opacity: 0;
      transition: all ${theme.transition.fast};
    }

    &:checked {
      background: ${theme.colors.base.lightPure};
      &:before {
        opacity: 1;
      }
    }
  `}
`
