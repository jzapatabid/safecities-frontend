import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding-bottom: 24px;
    background: ${theme.colors.blueDark};
  `}
`

export const DisabledReason = styled.p`
  padding-left: 120px;
  font-family: Poppins;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff4d;
`
