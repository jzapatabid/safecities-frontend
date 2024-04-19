import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const VisualizationTitle = styled.p`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
`

export const L1Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 54px;
`

export const Footer = styled.p`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.5px;
  text-align: left;
  color: #ffffff80;
  margin-top: auto;
  height: 16px;
`

export const Container = styled.div`
  ${({ theme }) => css`
    height: 100%;
    width: 100%;
    position: relative;
    margin: 24px 0px;
    background: ${theme.colors.blueDark};
  `}
`

export const RootSVG = styled.svg`
  width: 100%;
  height: 100%;
`

export const EmptyContainer = styled.div`
  ${({ theme }) => css`
    height: 100%;
    width: 100%;
    position: relative;
    border: 1px solid white;
    background: ${theme.colors.blueDark};
  `}
`
