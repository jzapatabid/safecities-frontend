import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 38px;
  justify-content: center;
  height: 100%;
`

export const LegendWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
`

export const Circle = styled.div<{ color: string }>`
  ${({ color }) => css`
    position: relative;
    height: 13px;
    width: 13px;
    border-radius: 8px;
    background: black;
    z-index: 5;
    &:after {
      content: '';
      display: block;
      height: 10px;
      width: 10px;
      border-radius: 7px;
      z-index: 1;
      background: ${color};
      position: absolute;
      top: 1.3px;
      left: 1.5px;
    }
  `}
`

export const Percentage = styled.p`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  width: 58px;
`

export const Text = styled.p`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.5px;
  text-align: left;
`
