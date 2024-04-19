import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

export const Input = styled.input`
  ${({ theme }) => css`
    cursor: pointer;
    display: flex;
    align-items: center;
    background: ${theme.colors.base.blueDark};
    justify-content: center;
    appearance: none;
    width: ${theme.spacings.medium};
    height: 3.4rem;
    border: 0.2rem solid ${theme.colors.base.lightPure};
    border-radius: ${theme.border.radius.large};
    transition: ${theme.transition.fast};
    position: relative;

    &:before {
      content: '';
      width: 1rem;
      height: 2rem;
      border: 0.25rem solid ${theme.colors.base.lightPure};
      border-top: 0;
      border-left: 0;
      position: absolute;
      top: 0.3rem;
      transform: rotate(41deg);
      opacity: 0;
      transition: all ${theme.transition.fast};
    }

    &:checked {
      &:before {
        opacity: 1;
      }
    }
  `}
`

export const Label = styled.label`
  ${({ theme }) => css`
    cursor: pointer;
    padding-left: ${theme.spacings.xsmall};
    color: ${theme.colors.white};
    line-height: ${theme.spacings.medium};
  `}
`
