import styled, { css } from 'styled-components'

type TabProps = {
  selected: boolean
  linkText?: boolean
}

type WrapperProps = {
  linkText?: boolean
  noBottomBorder?: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ linkText, noBottomBorder }) => css`
    width: 100%;
    overflow-x: auto;
    display: flex;
    gap: 16px;
    height: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    ${noBottomBorder &&
    css`
      border-bottom: none;
    `}
    ${linkText &&
    css`
      gap: 24px;
    `}
  `}
`

export const Tab = styled.div<TabProps>`
  ${({ selected, theme, linkText }) =>
    css`
      white-space: nowrap;
      font-family: Poppins;
      width: auto;
      height: 100%;
      border-bottom: 2px solid transparent;
      display: flex;
      align-items: center;
      cursor: pointer;
      ${linkText &&
      css`
        color: ${theme.colors.feedback.informativePure};
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 3px;
      `}
      ${selected &&
      css`
        text-decoration: none;
        color: ${theme.colors.base.lightPure};
        border-bottom: 2px solid ${theme.colors.base.lightPure};
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: 0px;
        text-align: center;
      `};
    `}
`

export const Name = styled.p`
  &:first-letter {
    text-transform: uppercase;
  }
`
