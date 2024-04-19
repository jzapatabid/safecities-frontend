import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    width: 100%;
    max-width: ${theme.grid.container};
    padding: 0 ${theme.grid.gutter};
    margin-left: auto;
    margin-right: auto;
    height: auto;
  `}
`

export const SideNavBar = styled.nav`
  min-width: 152px;
  background-color: red;
  height: 100vh;
`
