import styled, { css } from 'styled-components'

import { Container } from 'components/Container/styles'

export const Wrapper = styled.footer`
  ${({ theme }) => css`
    padding: ${theme.spacings.xxsmall} 0;
    margin-top: auto;
    & ${Container} {
      max-width: 100%;
    }
  `}
`

export const Title = styled.h2`
  ${({ theme }) => css`
    font-weight: ${theme.font.weights.medium};
    font-size: ${theme.font.content.xsmall};
    line-height: 1.8rem;
    text-align: left;
    letter-spacing: 0.2em;
    color: ${theme.colors.base.lightPure};
  `}
`
