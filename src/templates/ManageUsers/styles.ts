import styled, { css } from 'styled-components'

import * as Button from 'components/Button/styles'

export const Title = styled.p`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 28px;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: 0em;
    text-align: left;

    // margin: 23px 20px;
    color: ${theme.colors.base.lightPure};
  `}
`

export const TitleWrapper = styled.div`
  padding: 23px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const PrimaryOptionsWrapper = styled.div`
  display: flex;
  padding: 3.9rem 3rem 2.5rem 3rem;
  justify-content: space-between;
`

export const ButtonWrapper = styled.div`
  width: max-content;

  & ${Button.Wrapper} {
    width: 250px;
    height: 50px;
  }
`

export const OptionsWrapper = styled.div`
  position: relative;
  padding: 0 3rem;
  margin-bottom: 3rem;
  width: 100%;
  gap: 15px;
`

export const OrderingWrapper = styled.div`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 600;
`

export const BtnGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 24px;
`

export const NotificationsContainer = styled.div`
  position: relative;
  top: 20px;
`

export const SortBy = styled.select`
  position: relative;
  font-family: Poppins;
  font-size: 15px;
  font-weight: 600;
  text-align: left;
  background-color: transparent;
  color: #00add2;
  border: none;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
  &:focus {
    outline: none;
  }
`
