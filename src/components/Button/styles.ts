import styled, { css, DefaultTheme } from 'styled-components'

import { ButtonProps } from '.'

const wrapperModifiers = {
  minimal: (theme: DefaultTheme) => css`
    background: none;
    color: ${theme.colors.base.lightPure};
    width: initial;
    max-width: initial;
    text-decoration: none;
    padding: 0.2rem 2rem;
    font-weight: ${theme.font.weights.medium};

    &:hover {
      box-shadow: none;
      filter: brightness(1);
      color: ${theme.colors.base.lightPure};
      text-decoration: underline;
    }
  `,

  fullWidth: () => css`
    max-width: 100%;
  `,

  disabled: (theme: DefaultTheme) => css`
    &:disabled {
      background: ${theme.colors.grayDisable};
      cursor: not-allowed;

      &:hover {
        color: ${theme.colors.base.blueDark};
      }
    }
  `,

  isLoading: () => css`
    &:disabled {
      cursor: progress;
      border: none;
    }
  `,

  checked: (theme: DefaultTheme) => css`
    background: ${theme.colors.feedback.positivePure};
  `,

  modal: () => css`
    height: 100%;
    padding: 0px 16px;
  `,

  outline: (theme: DefaultTheme) => css`
    background: transparent;
    border: 2.5px solid ${theme.colors.feedback.informativePure};
    color: ${theme.colors.feedback.informativePure};
    white-space: nowrap;
    padding: 0px 16px;
  `
}

export type WrapperProps = Pick<
  ButtonProps,
  'fullWidth' | 'minimal' | 'isLoading' | 'checked' | 'modal' | 'outline'
>

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, fullWidth, minimal, isLoading, checked, modal, outline }) => css`
    display: inline-flex;
    justify-content: center;
    position: relative;
    align-items: center;
    border-radius: ${theme.border.radius.medium};
    border: none;
    color: ${theme.colors.base.blueDark};
    width: 100%;
    max-width: 44.5rem;
    height: 6.4rem;
    padding: 2rem 2rem;
    // transition: ${theme.transition.default};
    cursor: pointer;
    font-size: ${theme.font.content.regular};
    background: ${theme.colors.brand.gradientPrimary01};
    font-weight: ${theme.font.weights.bold};

    svg {
      position: absolute;
      left: 0;
      margin-left: 2.4rem;
    }

    &:hover {
      border: 2px solid ${theme.colors.blueDark};
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    &:focus {
      background: ${theme.colors.base.lightPure}
    }

    &:active {
      background: ${theme.colors.feedback.informativePure};
      color: ${theme.colors.base.blueDark};
    }

    &:disabled {
      background: ${theme.colors.blueDark};
      cursor: not-allowed;
      color: rgba(255, 255, 255, 0.5);
      &:hover {
        text-decoration: none;
      }
    }

    ${!!minimal && wrapperModifiers.minimal(theme)}}
    ${fullWidth && wrapperModifiers.fullWidth()};
    ${checked && wrapperModifiers.checked(theme)};
    ${isLoading && wrapperModifiers.isLoading()};
    ${modal && wrapperModifiers.modal()}
    ${outline && wrapperModifiers.outline(theme)}
  `}
`

export const Spinner = styled.div`
  ${({ theme }) => css`
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    border: 2px solid ${theme.colors.borderGray};
    border-top-color: ${theme.colors.base.blueDark};
    animation: spin 0.7s linear infinite;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(359deg);
      }
    }
  `}
`
