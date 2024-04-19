import styled, { css } from 'styled-components'

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 48px;
  gap: 60px;
`

export const AddNewGoalBtnWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    margin-top: 24px;
    margin-bottom: 17px;
    & > button {
      text-decoration: underline;
      text-decoration-color: ${theme.colors.feedback.informativePure};
    }
    & svg path {
      stroke: ${theme.colors.feedback.informativePure};
    }
  `}
`
