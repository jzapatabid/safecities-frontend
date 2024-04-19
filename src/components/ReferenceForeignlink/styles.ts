import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 18px 16px;
    background: ${theme.colors.blueDark};
    margin-bottom: 2px;
  `}
`

export const LinkText = styled.p`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.5px;
    text-align: left;
    color: ${theme.colors.feedback.informativePure};
    text-decoration: underline;
    margin: 0px 10px;
    cursor: pointer;
  `}
`

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
  cursor: pointer;
`

export const ExtremeWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin-left: auto;
    gap: 12px;

    & svg path {
      fill: ${theme.colors.base.lightPure};
    }
  `}
`
