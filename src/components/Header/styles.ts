import styled, { css } from 'styled-components'

import * as ContainerStyles from 'components/Container/styles'

type DownArrowProps = {
  state: boolean
}

type UserAccountInfoWrapperProps = {
  open: boolean
}

export const Wrapper = styled.header<{ fixed: boolean }>`
  ${({ theme, fixed }) => css`
    width: 100%;
    margin: auto;
    border-bottom: 0.1rem solid ${theme.colors.base.whiteLine};
    top: -118px;
    position: sticky;
    z-index: 500;
    transition: all 0.3s ease;

    & ${ContainerStyles.Container} {
      max-width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 94px;
    }

    ${fixed &&
    css`
      top: 0;
    `}
  `}
`

export const Label = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.base.lightPure};
    font-size: 14px;
    letter-spacing: 0.2rem;
    margin-right: 1.5rem;
  `}
`

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const Username = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.5px;
  text-align: left;

  margin-left: 15px;
`

export const Dialog = styled.dialog`
  background: #d9d9d9;
  border: 1px solid #000000;
  position: absolute;
  top: 35px;
  width: 395px;
  left: -340px;
  & > ul > li:not(last-child) {
    border-bottom: 1px solid #000000;
  }
`

export const List = styled.ul`
  width: 100%;
`

export const ListItem = styled.li`
  height: 60px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 60px;
  padding-left: 31px;
  text-align: left;
  letter-spacing: 0.2em;
`

export const LogoutText = styled.p`
  font-weight: 400;
  margin-right: 1rem;
`
export const BellWrapper = styled.div`
  cursor: pointer;
  height: 25px;
  margin-right: 25px;
`

export const DownArrow = styled.div<DownArrowProps>`
  ${({ theme, state }) => css`
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid ${theme.colors.base.lightPure};

    ${state &&
    css`
      transform: rotate(180deg);
    `}
  `}
`

export const DownArrowWrapper = styled.div`
  position: relative;
  margin-left: 45px;
  height: 20px;
  width: 24px;
  display: flex;
  align-items: center;
  padding: 5px;
  padding-top: 7px;
  cursor: pointer;
`

export const UserAccountInfoWrapper = styled.div<UserAccountInfoWrapperProps>`
  ${() => css`
    display: flex;
    align-items: center;
    cursor: pointer;
  `}
`
