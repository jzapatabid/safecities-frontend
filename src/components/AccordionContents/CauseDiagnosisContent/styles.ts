import styled, { css } from 'styled-components'

export const AddNewGoalBtnWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    margin-top: 24px;
    margin-bottom: 17px;
    margin-right: 24px;
    & > button {
      text-decoration: underline;
      text-decoration-color: ${theme.colors.feedback.informativePure};
    }
    & svg path {
      stroke: ${theme.colors.feedback.informativePure};
    }
  `}
`
