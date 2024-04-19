import styled, { css, DefaultTheme } from 'styled-components'

type LinkStyleProps = {
  variant?: 'large' | 'small'
  disabled?: boolean
}

export const Wrapper = styled.nav`
  ${({ theme }) => css`
    height: 100%;
    transition: padding 0.3s ease;
    padding-top: ${theme.spacings.small};
    min-width: 152px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
  `}
`

const itemsModifier = {
  small: (theme: DefaultTheme) => css`
    gap: ${theme.spacings.small};
  `,
  large: (theme: DefaultTheme) => css`
    gap: ${theme.spacings.small};
  `
}

export const Items = styled.ul<LinkStyleProps>`
  ${({ theme, variant }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;

    ${variant && itemsModifier[variant](theme)}
  `}
`

export const Item = styled.li<LinkStyleProps>`
  ${({ theme, disabled }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    & p {
      display: none;
    }

    &.active {
      & > div {
        background-color: ${theme.colors.base.lightPure};
        & svg path {
          fill: ${theme.colors.blueDarker};
        }
      }
    }

    ${disabled &&
    css`
      & > div {
        cursor: not-allowed;
        opacity: 0.2;
      }
    `}
  `}
`

export const LogoutWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 60px;
  padding-left: 31px;
  text-align: left;
  letter-spacing: 0.2em;
  cursor: pointer;
`

export const LogoutText = styled.p`
  font-weight: 400;
  margin-right: 1rem;
`

export const ItemContentWrapper = styled.div`
  ${({ theme }) => css`
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 52px;
    height: 52px;
    border-radius: 5px;
    margin: 0px 24px;
    cursor: pointer;
    & > div {
      margin-right: 0px;
    }

    &:hover {
      width: 100%;
      // padding: 0px 14px;
      background-color: ${theme.colors.base.lightPure};

      & > div {
        margin-right: 16px;
      }

      & p {
        display: block;
        width: 100%;
        color: ${theme.colors.blueDarker} !important;
      }

      & svg path {
        fill: ${theme.colors.blueDarker};
      }
    }
  `}
`

export const IconWrapper = styled.div`
  flex-shrink: 0;
  height: 32px;
  width: 32px;
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Text = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.blueDarker};
    font-family: Poppins;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.15px;
    text-align: left;
  `}
`
