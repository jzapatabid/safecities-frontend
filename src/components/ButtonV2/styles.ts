import styled, { DefaultTheme, css } from 'styled-components'

type ButtonProps = {
  disabled?: boolean
  text?: string
  variant?: string
  btnType?: string
  selected?: boolean
  loading?: boolean
}

const buttonModifiers = {
  normal: (
    theme: DefaultTheme,
    disabled?: boolean,
    text?: string,
    loading?: boolean
  ) =>
    css`
    background: ${theme.colors.brand.primary01};
    ${text?.toString().toLowerCase().includes('excluir') &&
      css`
      background: ${theme.colors.feedback.high};
    `}

      ${loading &&
      css`
        &:after {
          content: '';
          position: absolute;
          top: calc(50% - 1.1.rem);
          left: calc(50% - 1.1rem);
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
        }
      `}

      &:hover {
        border-color: ${theme.colors.blueDarker};
        color: ${theme.colors.blueDarker};
      }

      &:focus {
        background: ${theme.colors.base.lightPure};
        border: transparent;
      }

      ${disabled &&
      css`
        background: rgba(255, 255, 255, 0.1);
        border-color: transparent;
        color: rgba(255, 255, 255, 0.3);
        cursor: not-allowed;

        &:hover {
          border-color: transparent;
          color: rgba(255, 255, 255, 0.3);
        }

        & svg > path {
          fill: rgba(255, 255, 255, 0.3);
        }
      `}
    `,
  outline: (
    theme: DefaultTheme,
    disabled?: boolean,
    btnType?: string,
    selected?: boolean,
    loading?: boolean
  ) => css`
    background: transparent;
    border-color: ${theme.colors.base.lightPure};
    color: ${theme.colors.base.lightPure};

    & svg > path {
      fill: ${theme.colors.base.lightPure};
    }

    ${loading &&
    css`
      &:after {
        content: '';
        position: absolute;
        top: calc(50% - 1.1.rem);
        left: calc(50% - 1.1rem);
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 50%;
        border: 2px solid ${theme.colors.borderGray};
        border-top-color: ${theme.colors.base.lightPure};

        animation: spin 0.7s linear infinite;

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(359deg);
          }
        }
      }
    `}

    &:hover {
      background: ${theme.colors.base.lightPure};
      color: ${theme.colors.blueDarker};
      border-color: ${theme.colors.blueDarker};
      & svg > path {
        fill: ${theme.colors.blueDarker};
      }
      ${loading &&
    css`
        &:after {
          content: '';
          position: absolute;
          top: calc(50% - 1.1.rem);
          left: calc(50% - 1.1rem);
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
        }
      `}
    }

    &:focus {
      ${!selected &&
    css`
        background: ${theme.colors.feedback.informativePure};
        border-color: ${theme.colors.blueDarker};
        color: ${theme.colors.blueDarker};
        & svg > path {
          fill: ${theme.colors.blueDarker};
        }

        ${loading &&
      css`
          &:after {
            content: '';
            position: absolute;
            top: calc(50% - 1.1.rem);
            left: calc(50% - 1.1rem);
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
          }
        `}
      `}
    }

    ${btnType === 'danger' &&
    css`
      border-color: ${theme.colors.feedback.high};
      color: ${theme.colors.feedback.high};

      & svg > path {
        fill: ${theme.colors.feedback.high};
      }
    `}

    ${disabled &&
    css`
      color: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.3);
      cursor: not-allowed;
      background: transparent;

      &:hover {
        color: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.3);
        background: transparent;
        & svg > path {
          fill: rgba(255, 255, 255, 0.3);
        }
      }

      & svg > path {
        fill: rgba(255, 255, 255, 0.3);
      }
    `}

    ${selected &&
    css`
      background: ${theme.colors.base.lightPure};
      color: ${theme.colors.blueDarker};
      border-color: transparent;
      & svg > path {
        fill: ${theme.colors.blueDarker};
      }

      &:focus {
        background: ${theme.colors.base.lightPure};
        color: ${theme.colors.blueDarker};
        border-color: transparent;
        & svg > path {
          fill: ${theme.colors.blueDarker};
        }
      }
    `}
  `
}

export const Button = styled.button<ButtonProps>`
  ${({ disabled, theme, variant, btnType, selected, text, loading }) => css`
    align-items: center;
    display: flex;
    border-radius: 5px;
    border-color: transparent;
    border-style: solid;
    padding: 13px 16px;

    font-family: Poppins;
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: center;
    height: 100%;
    position: relative;

    &:hover {
      color: ${theme.colors.base.lightPure};
      & ${HTMLLink} {
        color: ${theme.colors.base.blueDark};
      }
    }

    & svg > path {
      fill: #141b25;
    }
    ${!variant && buttonModifiers.normal(theme, disabled, text, loading)}
    ${variant === 'outline' &&
    buttonModifiers.outline(theme, disabled, btnType, selected, loading)}

    ${loading &&
    css`
      & ${IconWrapper} {
        visibility: hidden;
      }
      & ${BtnText} {
        visibility: hidden;
      }
    `}
  `}
`

export const IconWrapper = styled.div`
  margin-top: 1px;
  margin-right: 10px;
  display: flex;
  align-items: center;
`

export const BtnText = styled.p``

export const HTMLLink = styled.a`
  color: white;
  &:hover {
    color: black;
  }
`
