import styled, { css } from 'styled-components'

export const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`

export const RootSVG = styled.svg`
  width: 100%;
  height: 100%;
`

export const Tooltip = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid white;
  border-radius: 5px;
  position: fixed;
  background-color: #253245;
  color: #fff;
  padding: 5px;
  opacity: 1;
  pointer-events: none;
  height: 30px;
  padding: 0px 8.95px;

  font-family: Poppins;
  font-size: 16px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.5px;
  min-width: 35px;
  width: max-content;
`

//

// Data visualization styles

type SquareIconProps = {
  color: string
}

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
  margin-bottom: 20px;
`

export const L2Wrapper = styled.div``

export const Count = styled.h2`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 45px;
    font-weight: 800;
    line-height: 62px;
    letter-spacing: 0em;
    text-align: left;
    color: ${theme.colors.feedback.lower};
  `}
`

export const Info = styled.p`
  //styleName: Label Medium;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.5px;
  text-align: left;
`

export const L3Wrapper = styled.div`
  position: relative;
`

// export const Tooltip = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
//   border: 1px solid white;
//   border-radius: 5px;
//   position: absolute;
//   background-color: #253245;
//   color: #fff;
//   padding: 5px;
//   opacity: 0;
//   pointer-events: none;
//   height: 30px;
//   padding: 0px 8.95px;

//   font-family: Poppins;
//   font-size: 16px;
//   font-weight: 700;
//   line-height: 18px;
//   letter-spacing: 0.5px;
//   min-width: 35px;
//   width: max-content;
// `

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

export const L4Wrapper = styled.div`
  display: flex;
  margin: 24px auto;
  gap: 24px;
`

export const LegendWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const LegendText = styled.p`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.5px;
  text-align: left;
  margin-left: 16px;
`

export const SquareIcon = styled.div<SquareIconProps>`
  ${({ color }) => css`
    height: 16px;
    width: 16px;
    background-color: ${color};
  `}
`

export const TaxaIcon = styled.div`
  width: 24px;
  height: 0px;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: -5px;
    left: 7px;
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 50%;
  }
`
//
