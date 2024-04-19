import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  padding: 24px 48px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`

export const Title = styled.p`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
`

export const InputWrapper = styled.div`
  width: 430px;
  height: 60px;
  position: relative;
  margin-bottom: 20px;
`

export const DropdownWrapper = styled.div`
  height: 60px;
  width: 430px;
  margin-bottom: 24px;
  cursor: pointer;
  margin-bottom: 20px;
`

export const AnalysisInputWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 48px;
  background: #253245 !important;
  height: 148px;
`

export const TitleAndDelete = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    & svg path {
      stroke: ${theme.colors.feedback.informativePure};
      fill: ${theme.colors.feedback.informativePure};
      fill-opacity: 1;
    }
  `}
`

export const FlexWrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`

export const IndicatorText = styled.p`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.25px;
    text-align: left;
    color: ${theme.colors.feedback.informativePure};
    text-decoration: underline;
    text-decoration-thickness: 0.5px;
    text-underline-offset: 2px;
    margin-top: 20px;
    cursor: pointer;
  `}
`
