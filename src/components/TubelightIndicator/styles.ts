import { INITIATIVE } from 'enums/Plan'

import styled, { DefaultTheme, css } from 'styled-components'

import { TubelightIndicatorProps } from './index'

type WrapperProps = {
  withLabel?: boolean
}

const labelModifiers = {
  cost: (theme: DefaultTheme, score: number) => css`
    ${score === 1 &&
    css`
      color: ${theme.colors.feedback.lower};
    `};
    ${score === 2 &&
    css`
      color: ${theme.colors.feedback.low};
    `};
    ${score === 3 &&
    css`
      color: ${theme.colors.feedback.higher};
    `};
  `,
  efficiency: (theme: DefaultTheme, score: number) => css`
    ${score === 1 &&
    css`
      color: ${theme.colors.feedback.higher};
    `};
    ${score === 2 &&
    css`
      color: ${theme.colors.feedback.high};
    `};
    ${score === 3 &&
    css`
      color: ${theme.colors.feedback.medium};
    `};
    ${score === 4 &&
    css`
      color: ${theme.colors.feedback.low};
    `};
    ${score === 5 &&
    css`
      color: ${theme.colors.feedback.lower};
    `};
  `,
  planStatus: (theme: DefaultTheme) => css`
    color: ${theme.colors.feedback.lower};
  `
}

const tubelightModifiers = {
  planStatus: (theme: DefaultTheme, score: number) => css`
    &:before {
      background: ${theme.colors.feedback.lower};
      width: ${score}%;
    }
  `,
  cost: (theme: DefaultTheme, score: number) => css`
    &:before {
      ${score === 1 &&
      css`
        background: ${theme.colors.feedback.lower};
        width: 33.34%;
      `};
      ${score === 2 &&
      css`
        background: ${theme.colors.feedback.medium};
        width: 66.67%;
      `};
      ${score === 3 &&
      css`
        background: ${theme.colors.feedback.higher};
        width: 100%;
      `}
    }
  `,
  efficiency: (theme: DefaultTheme, score: number) => css`
    &:before {
      ${score === 1 &&
      css`
        background: ${theme.colors.feedback.higher};
        width: 20%;
      `};
      ${score === 2 &&
      css`
        background: ${theme.colors.feedback.high};
        width: 40%;
      `};
      ${score === 3 &&
      css`
        background: ${theme.colors.feedback.medium};
        width: 60%;
      `};
      ${score === 4 &&
      css`
        background: ${theme.colors.feedback.low};
        width: 80%;
      `};
      ${score === 5 &&
      css`
        background: ${theme.colors.feedback.lower};
        width: 100%;
      `};
    }
  `,
  highest: (theme: DefaultTheme) => css`
    &:before {
      background: ${theme.colors.feedback.higher};
    }
  `,
  high: (theme: DefaultTheme) => css`
    &:before {
      background: ${theme.colors.feedback.high};
    }
  `,
  medium: (theme: DefaultTheme) => css`
    &:before {
      background: ${theme.colors.feedback.medium};
    }
  `,
  low: (theme: DefaultTheme) => css`
    &:before {
      background: ${theme.colors.feedback.low};
    }
  `,
  lowest: (theme: DefaultTheme) => css`
    &:before {
      background: ${theme.colors.feedback.lower};
    }
  `
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ withLabel }) => css`
    display: flex;
    align-items: center;
    position: relative;

    ${withLabel &&
    css`
      flex-direction: column;
      align-items: flex-start;
      & ${Tubelight} {
        width: 100%;
        height: 3px;
        &:before {
          top: 24px;
          height: 3px;
        }
      }
    `}
  `}
`

export const Tubelight = styled.div<TubelightIndicatorProps>`
  ${({ score, theme, type }) => css`
    height: 6px;
    width: 100px;
    border-radius: 50px;
    background: ${theme.colors.blueDarker};

    &:before {
      position: absolute;
      top: 5px;
      content: '';
      height: 10px;
      width: ${score}px;
      border-radius: 50px;
    }

    ${!type && score <= 20 && tubelightModifiers.lowest(theme)}
    ${!type && score > 20 && score <= 40 && tubelightModifiers.low(theme)}
    ${!type && score > 40 && score <= 60 && tubelightModifiers.medium(theme)}
    ${!type && score > 60 && score <= 80 && tubelightModifiers.high(theme)}
    ${!type && score > 80 && tubelightModifiers.highest(theme)}
    ${type === INITIATIVE.COST && tubelightModifiers.cost(theme, score)}
    ${type === INITIATIVE.EFFICIENCY &&
    tubelightModifiers.efficiency(theme, score)}
    ${type === 'planStatus' && tubelightModifiers.planStatus(theme, score)}
  `}
`

export const Count = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.5px;
  text-align: center;
  margin: 2px 0px 0px 12px;
`

export const Label = styled.p<{ type?: string; score?: number }>`
  ${({ score = 0, type, theme }) => css`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.5px;
    text-align: left;
    margin-bottom: 6px;
    white-space: nowrap;
    ${type === INITIATIVE.EFFICIENCY && labelModifiers.efficiency(theme, score)}
    ${type === INITIATIVE.COST && labelModifiers.cost(theme, score)}
    ${type === 'planStatus' && labelModifiers.planStatus(theme)}
  `}
`
