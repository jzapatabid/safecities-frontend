import styled, { DefaultTheme, css } from 'styled-components'

type WrapperPropsTypes = {
  criticality: string
}

const wrapperModifiers = {
  none: (theme: DefaultTheme) => css`
    color: ${theme.colors.base.lightPure};
    & svg path {
      fill: ${theme.colors.base.lightPure};
    }
  `,
  low: (theme: DefaultTheme) => css`
    color: ${theme.colors.feedback.lower};
    & svg path {
      fill: ${theme.colors.feedback.lower};
    }
  `,
  medium: (theme: DefaultTheme) => css`
    color: ${theme.colors.feedback.informativePure};
    & svg path {
      fill: ${theme.colors.feedback.informativePure};
    }
  `,
  high: (theme: DefaultTheme) => css`
    color: ${theme.colors.feedback.higher};
    & svg path {
      fill: ${theme.colors.feedback.higher};
    }
  `
}

export const Wrapper = styled.div<WrapperPropsTypes>`
  ${({ criticality, theme }) => css`
    display: flex;
    align-items: center;

    & svg path {
      fill: ${theme.colors.base.lightPure};
    }

    ${criticality === 'low' && wrapperModifiers.low(theme)}
    ${criticality === 'medium' && wrapperModifiers.medium(theme)}
    ${criticality === 'high' && wrapperModifiers.high(theme)}
    ${criticality === 'none' && wrapperModifiers.none(theme)}
  `}
`

export const Text = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.5px;
  text-align: left;
  margin-left: 12px;
`
