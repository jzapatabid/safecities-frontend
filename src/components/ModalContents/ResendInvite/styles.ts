import styled, { css } from 'styled-components'

export const InputColumnWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const Input = styled.input`
  ${({ theme }) => css`
    cursor: pointer;
    display: flex;
    align-items: center;
    background: #ffffff;
    justify-content: center;
    appearance: none;
    width: 27px;
    height: 27px;
    border: 1px solid #666666;
    border-radius: 0px;
    transition: ${theme.transition.fast};
    position: relative;

    &:before {
      content: '';
      width: 1rem;
      height: 2rem;
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
