import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding-bottom: 24px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: ${theme.colors.blueDark};
  `}
`

export const GoalSummary = styled.p`
  margin-left: 120px;
  font-family: Poppins;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  // color: #ffffff4d;
`
