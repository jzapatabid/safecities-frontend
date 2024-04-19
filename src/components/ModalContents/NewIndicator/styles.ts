import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  width: 100%;
`

export const DisclaimerWrapper = styled.div`
  margin-left: -22px;
  margin-right: -22px;
  margin-top: -24px;
`

export const SMARTDescWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const DetailText = styled.p`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.25px;
    text-align: left;
    color: ${theme.colors.base.lightPure};

    &:first-letter {
      font-weight: 700;
    }
  `}
`

export const ValueInputWrapper = styled.div`
  height: 60px;
  width: 100%;
  position: relative;
  margin-top: 48px;
  margin-bottom: 48px;
`

export const JustificationInputWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 48px;
  background: #253245 !important;
  height: 148px;
`

export const ActualSituationLabel = styled.div`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.15000000596046448px;
    text-align: left;
    color: ${theme.colors.base.lightPure};
    margin-top: -24px;
    margin-bottom: 24px;
  `}
`

export const DatesWrapper = styled.div`
  width: 100%;
  display: flex;
  height 60px;
  gap: 24px;
  margin:24px 0px;
`

export const DateInputWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`
