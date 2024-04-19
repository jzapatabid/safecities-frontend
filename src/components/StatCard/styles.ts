import { PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT } from 'enums/Problems'

import styled, { css } from 'styled-components'

type WrapperProps = {
  type?: string
  withLabel2?: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, type, withLabel2 }) => css`
    // display: flex;
    // justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-radius: 5px;
    border: 2px solid ${theme.colors.base.lightPure};
    gap: 16px;
    background: ${theme.colors.blueDark};

    ${type === PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT.CRITICAL &&
    css`
      color: ${theme.colors.feedback.high};
    `};

    ${withLabel2 &&
    css`
      padding: 24px;
      padding-bottom: 12px;
    `}
  `}
`

export const Count = styled.p`
  font-family: Poppins;
  font-size: 45px;
  font-weight: 800;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: left;
`

export const Label = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.5px;
  text-align: left;
  max-width: 90px;
`

export const IndicatorInfoWrapper = styled.div`
  display: flex;
  margin-top: 12px;
  align-items: center;
`

export const IndicatorText = styled.p<{ link?: boolean }>`
  ${({ link, theme }) => css`
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

    ${link &&
    css`
      cursor: pointer;
    `}
  `}
`

export const Section1Wrapper = styled.section`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const IconWrapper = styled.div`
  ${({ theme }) => css`
    margin-right: 8px;
    display: flex;
    align-items: center;
    & svg path {
      fill: ${theme.colors.base.lightPure};
    }
  `}
`
