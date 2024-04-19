import styled, { DefaultTheme, css } from 'styled-components'

import { TagProps } from 'components/Tag'

type TagWrapperProps = TagProps

const tagModifiers = {
  Ativo: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.feedback.lower};
  `,
  Inativa: () => css`
    background-color: #555555;
  `
}

export const Tag = styled.div<TagWrapperProps>`
  ${({ label, theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    text-align: center;
    height: 28px;
    border-radius: 5px;
    color: ${theme.colors.blueDarker};
    ${label === 'Ativo' && tagModifiers.Ativo(theme)}
    ${label === 'Inativa' && tagModifiers.Inativa()};
  `}
`
