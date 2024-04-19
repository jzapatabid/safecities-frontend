import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: 16px 24px;
    background: ${theme.colors.blueDark};
    border: 1px solid ${theme.colors.base.lightPure};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
  `}
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
  flex-grow: 2;
`

export const Count = styled.p`
  font-family: Poppins;
  font-size: 45px;
  font-weight: 800;
  line-height: 62px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0px 24px 16px 0px;
  min-width: 24px;
`

export const Text = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.5px;
  text-align: left;
  margin-bottom: 16px;
  width: 140px;
`

export const Footer = styled.div`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.5px;
  text-align: left;

  padding-top: 16px;
`
