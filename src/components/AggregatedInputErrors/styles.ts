import { BACKEND_ERROR } from 'enums/Global'

import styled, { css } from 'styled-components'

import { AGGREGATED_INPUT_ERRORS_VARIANTS } from '.'

type ErrorMessageWrapperProps = {
  errorLevel: BACKEND_ERROR.CATEGORISED | BACKEND_ERROR.UNCATEGORISED
  variant:
    | AGGREGATED_INPUT_ERRORS_VARIANTS.INLINE
    | AGGREGATED_INPUT_ERRORS_VARIANTS.DETAILED
}

type ErrorMessageProps = {
  variant:
    | AGGREGATED_INPUT_ERRORS_VARIANTS.INLINE
    | AGGREGATED_INPUT_ERRORS_VARIANTS.DETAILED
}

const errorMessageContainerModifiers = {
  detailed: () => css`
    margin-left: 0px;
  `
}

const wrapperModifiers = {
  detailed: () => css`
    display: block;
    padding: 24px;

    & ${IconWrapper} {
      height: 50px;
      width: 58px;
      & svg {
        height: 50px;
        width: 58px;
      }
    }
  `
}
export const ErrorMessage = styled.div<ErrorMessageProps>`
  ${({ theme, variant }) => css`
    font-size: ${theme.font.content.regular};
    line-height: 20px;
    margin-left: 20px;

    ${
      variant === AGGREGATED_INPUT_ERRORS_VARIANTS.DETAILED &&
      errorMessageContainerModifiers.detailed()
    }}
  `}
`

export const ErrorMessageWrapper = styled.div<ErrorMessageWrapperProps>`
  ${({ errorLevel, variant, theme }) => css`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid ${theme.colors.feedback.negativeCompliant};
    border-left-width: medium;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 7px 15px;
    transition: all 0.3s ease;
    min-height: 56px;

    & svg {
      height: 22px;
      width: 22px;
    }

    & svg path {
      fill: ${theme.colors.feedback.negativeCompliant};
    }

    ${variant === AGGREGATED_INPUT_ERRORS_VARIANTS.DETAILED &&
    wrapperModifiers.detailed()}

    ${errorLevel === BACKEND_ERROR.UNCATEGORISED &&
    css`
      border-color: ${theme.colors.feedback.mediumCompliant};

      & svg path {
        fill: ${theme.colors.feedback.mediumCompliant};
      }
    `}
  `}
`

export const IconWrapper = styled.div`
  height: 22px;
  width: 22px;

  & svg path {
    height: 22px;
    width: 22px;
  }
`

export const Title = styled.h4`
  font-family: Poppins;
  font-size: 28px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 14px;
`

export const Description = styled.p`
  font-family: Poppins;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.5px;
  text-align: left;
  margin: 14px 0px;
`
