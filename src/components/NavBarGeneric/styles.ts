import styled, { css, DefaultTheme } from 'styled-components'

type LinkStyleProps = {
  variant?: 'large' | 'small'
  disabled?: boolean
  nounderline?: boolean
}

export const Wrapper = styled.nav`
  ${() => css`
    transition: padding 0.3s ease;
  `}
`

const itemsModifier = {
  small: (theme: DefaultTheme) => css`
    gap: ${theme.spacings.xxxsmall};
  `,
  large: (theme: DefaultTheme) => css`
    gap: ${theme.spacings.small};
  `
}

export const Items = styled.ul<LinkStyleProps>`
  ${({ theme, variant }) => css`
    display: flex;
    justify-content: flex-start;

    ${variant && itemsModifier[variant](theme)}
  `}
`

const itemModifier = {
  small: (theme: DefaultTheme) => css`
    &:not(:first-child) {
      &:before {
        content: '';
        display: inline-block;
        width: 0px;
        background: ${theme.colors.borderGray};
        height: 4rem;
        margin-right: ${theme.spacings.xxsmall};
      }
    }
  `,
  large: (theme: DefaultTheme, disabled: boolean) => css`
    &:not(:last-child) {
      &:after {
        content: '';
        width: 1.7rem;
        height: 1.7rem;
        border: 0.4rem solid ${disabled && theme.colors.base.grayLine};
        border-radius: 0.25rem;
        margin-left: ${theme.spacings.small};
        border-top: 0;
        border-left: 0;
        transform: rotate(-45deg);
        transition: all ${theme.transition.default};
      }
    }
  `
}

export const Item = styled.li<LinkStyleProps>`
  ${({ theme, variant, disabled }) => css`
    display: flex;
    align-items: center;

    ${variant && itemModifier[variant](theme, disabled!)}
  `}
`

const anchorModifiers = {
  hover: () => css``,
  focus: (theme: DefaultTheme) => css`
    background: ${theme.colors.base.lightPure};
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    text-decoration: none;
    font-weight: ${theme.font.weights.regular};
    &:after {
      transform: scaleY(1);
    }
  `,

  active: (theme: DefaultTheme) => css`
    background: ${theme.colors.base.lightPure};
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    text-decoration: none;
    font-weight: ${theme.font.weights.bold};
    &:after {
      transform: scaleY(1);
    }
  `,
  small: (theme: DefaultTheme) => css`
    font-family: Poppins;
    font-size: ${theme.font.content.regular};
    font-weight: ${theme.font.weights.regular};
    line-height: 24px;
    letter-spacing: 0px;
    text-align: center;
    padding: ${theme.spacings.xxsmall} 0;

    text-transform: none;

    &::after {
      height: 0.2rem;
    }
  `,
  large: (theme: DefaultTheme) => css`
    padding: ${theme.spacings.xsmall} 0;
    font-size: ${theme.font.content.xlarge};
    font-weight: ${theme.font.weights.semiBold};

    &::after {
      height: 0.7rem;
    }
  `
}

export const Anchor = styled.a<LinkStyleProps>`
  ${({ theme, variant, disabled, nounderline }) => css`
    color: ${theme.colors.feedback.informativePure};
    position: relative;
    transition: color ${theme.transition.default};
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-thickness: 1px;

    ${nounderline &&
    css`
      text-decoration: none !important;
    `}

    ${disabled &&
    css`
      color: ${theme.colors.base.grayLine};
    `}

    &:after {
      content: '';
      width: 100%;
      transform: scaleY(0);
      background: ${theme.colors.base.lightPure};
      display: block;
      position: absolute;
      bottom: 0;
      transition: transform ${theme.transition.default};
    }

    &:hover {
      ${disabled
        ? css`
            cursor: not-allowed;
          `
        : css`
            ${anchorModifiers.hover()};
          `}
    }

    &.active {
      ${anchorModifiers.active(theme)}
    }

    ${variant && anchorModifiers[variant](theme)}
  `}
`
