import styled, { css } from 'styled-components'

type FooterProps = {
  hasDangerBtn: boolean
}

export const Wrapper = styled.section`
  height: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding-bottom: 0px;
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const Title = styled.h4`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;

  color: #ffffff;
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-grow: 2;
`

export const Description = styled.p`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;s
  letter-spacing: 0.5px;
  color: #ffffff;
  margin-top: 24px;
`

export const Footer = styled.footer<FooterProps>`
  ${({ hasDangerBtn }) => css`
    padding: 24px 0px 40px 0px;
    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
    align-items: center;
    ${hasDangerBtn &&
    css`
      justify-content: space-between;
    `}
  `}
`

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`

export const DismissWrapper = styled.div`
  height: 16px;
  cursor: pointer;
`

export const BtnWrapper = styled.div`
  height: 50px;
  margin-left: 25px;
`

export const DangerBtnWrapper = styled.div`
  height: 50px;
`

export const BtnGroup = styled.div`
  display: flex;
  wrap: no-wrap;
`

export const BackNavigationWrapper = styled.div`
  display: flex;
  gap: 16px;
  aling-items: center;
  margin-bottom: 18px;
  cursor: pointer;
`

export const BackNavText = styled.p`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.25px;
    text-align: left;
    color: ${theme.colors.base.lightPure};
    display: flex;
    align-items: center;
  `}
`
