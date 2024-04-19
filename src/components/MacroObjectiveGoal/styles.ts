import styled, { css } from 'styled-components'

export const Goal = styled.div`
  display: flex;
  margin: 24px;
  gap: 24px;
`

export const ParameterGroup = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 24px;
`

export const ParamterText = styled.p`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
`

export const DropdownWrapper = styled.div`
  height: 60px;
  width: 415px;
  position: relative;
`

export const TaxaInputWrapper = styled.div`
  height: 60px;
  width: 80px;
  position: relative;
`

export const MetaInputWrapper = styled.div`
  height: 60px;
  width: 160px;
  position: relative;
`

export const LinkTextBtnWrapper = styled.div`
  ${({ theme }) => css`
    margin-top: 8px;
    display: flex;
    & svg path {
      stroke: ${theme.colors.feedback.informativePure};
      fill: ${theme.colors.feedback.informativePure};
      fill-opacity: 1;
    }
    & > p {
      font-family: Poppins;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0px;
      text-align: center;
    }
  `}
`

export const DeleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

export const DeleteBtnWrapper = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: -30px;
    right: 0px;
    display: flex;
    & svg path {
      stroke: ${theme.colors.feedback.informativePure};
      fill: ${theme.colors.feedback.informativePure};
      fill-opacity: 1;
    }
    & > p {
      font-family: Poppins;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0px;
      text-align: center;
    }
  `}
`
