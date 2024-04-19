import styled, { css } from 'styled-components'

export const GobackWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  margin-top: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const GoBackText = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.25px;
  text-align: left;
  margin-left: 16px;
`

export const LinkText = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.feedback.informativePure};
    font-family: Poppins;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.25px;
    text-align: left;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thinkness: 1px;
    cursor: pointer;
  `}
`

export const NavWrapper = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    height: 24px;
    & svg path {
      stroke: ${theme.colors.base.lightPure};
    }
  `}
`
