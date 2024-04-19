import styled, { css } from 'styled-components'

type WrapperPropsTypes = {
  selected: boolean
}

type PercentageProps = {
  type: string
}

export const Wrapper = styled.div<WrapperPropsTypes>`
  ${({ selected, theme }) => css`
    padding: 24px 24px 0px;
    background: ${theme.colors.blueDark};
    width: 100%;
    cursor: pointer;
    ${selected &&
    css`
      border-bottom: 1px solid white;
      background: ${theme.colors.outerSpace};
      & ${Title} {
        text-decoration: none;
        color: ${theme.colors.base.lightPure};
      }
      & svg path {
        fill: ${theme.colors.base.lightPure};
      }
    `}
  `}
`

export const TitleAndNavWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
`

export const Title = styled.h5`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    color: ${theme.colors.feedback.informativePure};
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 1.5px;
  `}
`

export const StatsWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
`

export const PercentageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
  flex-grow: 0;
  padding-right: 20px;
`

export const Percentage = styled.h2<PercentageProps>`
  ${({ theme, type }) => css`
    font-family: Poppins;
    font-size: 45px;
    font-weight: 800;
    line-height: 62px;
    letter-spacing: 0em;
    text-align: left;
    ${type === 'negative' &&
    css`
      color: ${theme.colors.feedback.higher};
    `};
    ${type === 'positive' &&
    css`
      color: ${theme.colors.feedback.lower};
    `};
    ${type === 'neutral' &&
    css`
      color: ${theme.colors.feedback.informativePure};
    `}
  `}
`

export const Label = styled.div`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.5px;
  text-align: left;
`

export const TrendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Footer = styled.div`
  padding: 16px 0px;
  font-family: Poppins;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.5px;
  text-align: left;
  color: rgba(255, 255, 255, 0.5);
`
