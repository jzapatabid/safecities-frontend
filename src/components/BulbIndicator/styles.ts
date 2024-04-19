import styled, { DefaultTheme, css } from 'styled-components'

import { BulbIndicatorProps } from './types'

const bulbModifiers = {
  highest: (theme: DefaultTheme) => css`
    background: ${theme.colors.feedback.higher};
  `,
  high: (theme: DefaultTheme) => css`
    background: ${theme.colors.feedback.high};
  `,
  medium: (theme: DefaultTheme) => css`
    background: ${theme.colors.feedback.medium};
  `,
  low: (theme: DefaultTheme) => css`
    background: ${theme.colors.feedback.low};
  `,
  lowest: (theme: DefaultTheme) => css`
    background: ${theme.colors.feedback.lower};
  `
}

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

export const Bulb = styled.div<BulbIndicatorProps>`
  ${({ score, theme }) => css`
    height: 10px;
    width: 10px;
    border-radius: 5px;

    ${score <= 2 && bulbModifiers.lowest(theme)}
    ${score > 2 && score <= 4 && bulbModifiers.low(theme)}
    ${score > 4 && score <= 6 && bulbModifiers.medium(theme)}
    ${score > 6 && score <= 8 && bulbModifiers.high(theme)}
    ${score > 8 && bulbModifiers.highest(theme)}
  `}
`

export const Count = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.5px;
  text-align: center;
  margin: 2px 0px 0px 12px;
`
