import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
`
export const List = styled.ul``

export const ListItem = styled.li`
  height: 60px;
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 2px;
  padding: 24px 16px;
`

export const HeaderText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.base.lightPure};
    font-family: Poppins;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0.5px;
    text-align: left;
  `}
`

export const ProblemName = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.base.lightPure};
    font-family: Poppins;
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.5px;
    text-align: left;
    &:first-letter {
      text-transform: uppercase;
    }
  `}
`
