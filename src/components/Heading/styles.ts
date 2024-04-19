import styled, { css } from 'styled-components'

import { HeadingProps } from '.'

export const Wrapper = styled.h1.attrs<HeadingProps>(({ level }) => ({
  as: `h${level}`
}))<HeadingProps>`
  ${({ theme, color, size, fontWeight, lineHeight }) => css`
    font-size: ${theme.font.heading[size!]};
    color: ${color};
    font-weight: ${fontWeight};
    line-height: ${lineHeight};
    @media (max-width: 550px) {
      font-size: calc(${theme.font.heading[size!]} / 1.3);
      line-height: 1.3;
    }
  `}
`
