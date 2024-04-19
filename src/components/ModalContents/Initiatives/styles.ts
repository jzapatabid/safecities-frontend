import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  width: 100%;
`
export const ListItem = styled.li`
  height: 60px;
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 2px;
  padding: 24px 16px;
`

export const List = styled.ul`
  & ${ListItem}:not(:first-child) {
    height: auto;
  }
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
  `}
`

export const DisclaimerWrapper = styled.div`
  margin-left: -22px;
  margin-right: -22px;
  margin-top: -24px;
`

export const MapWrapper = styled.div`
  overflow: hidden;
  margin-bottom: 24px;
  width: 100%;
`

export const CauseTreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-left: 48px;
  position: relative;
  &:before {
    content: '';
    height: 100%;
    width: 2px;
    background: white;
    position: absolute;
    left: -33px;
  }
`

export const InitiativeInfo = styled.div`
  ${({ theme }) => css`
    height: 80px;
    width: 100%;
    border: 2px solid white;
    position: relative;
    background: ${theme.colors.blueDark};
    margin-bottom: 50px;
    &:after {
      position: absolute;
      top: 100%;
      content: '';
      height: 95px;
      left: 13px;
      width: 2px;
      background: white;
      z-index: 10;
    }
  `}
`

export const CheckboxAndTitleWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin: 16px;
  margin-bottom: 8px;
  align-items: center;
`

export const Title = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.base.lightPure};
    font-family: Poppins;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
  `}
`

export const Name = styled.p<{ withCheckbox: boolean }>`
  ${({ theme, withCheckbox }) => css`
    font-family: Poppins;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    color: ${theme.colors.base.lightPure};
    margin: 0px 16px 16px 52px;
    &:first-letter {
      text-transform: capitalize;
    }

    ${!withCheckbox &&
    css`
      margin: 0px 16px 16px 16px;
    `}
  `}
`

export const TabsWrapper = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 40px;
  padding: 0px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`
