import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  height: calc(100vh - 94.67px);
`

export const SideNavBar = styled.nav`
  min-width: 152px;
  max-width: 152px;
  background-color: #000000;
  height: auto;
`

export const Wrapper = styled.div`
  width: 100%;
  margin-left: 100px;
  margin-right: auto;
  overflow: auto;
  display: flex;
  flex-direction: column;
`
export const SideNavBarWrapper = styled.div`
  ${({ theme }) => css`
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    position: fixed;
    overflow: hidden;
    height: calc(100% - 94px);
    width: 100px;
    z-index: 100;
    background-color: ${theme.colors.blueDarker};

    &:hover {
      width: 238px;
      & > nav > ul > li {
        & > div {
          width: 100%;
          & > div {
            margin-right: 10px;
          }
          & p {
            display: block;
            width: 100%;
          }
        }
        &:not(.active) {
          & > div > p {
            color: ${theme.colors.base.lightPure};
            display: block;
          }
        }
      }
    }
  `}
`
