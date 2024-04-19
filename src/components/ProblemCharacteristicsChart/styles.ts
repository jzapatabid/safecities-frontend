import styled, { css } from 'styled-components'

import * as ButtonV2Styles from 'components/ButtonV2/styles'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.blueDark};
    width: calc(50% - 12px);
    height: auto;
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
  `}
`

export const Section1Wrapper = styled.div`
  ${() => css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  `}
`

export const TitleAndIcon = styled.div`
  height: 50px;
`

export const DropdownWrapper = styled.div`
  height: 50px;
  width: 240px;
`

export const IconWrapper = styled.div`
  height: 25px;
`
export const Title = styled.p`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  height: 25px;
`

export const Section2Wrapper = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 16px;
`

export const Section3Wrapper = styled.div`
  margin-top: 16px;
`

export const BtnsGroup = styled.div`
  display: flex;
  gap: 17.47px;
  flex-wrap: wrap;
  & > ${ButtonV2Styles.Button} {
    height: 28px;
  }
`

export const Section4Wrapper = styled.div`
  margin-top: 16px;
  padding: 24px;
  display: flex;
  height: 305px;
  flex-grow: 2;
  overflow: auto;
`

export const DataVizWrapper = styled.div`
  width: 45%;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
`

export const LegendsWrapper = styled.div`
  width: 55%;
  flex-shrink: 0;
`

export const Section5Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  margin-bottom: 24px;
  height: 50px;
`

export const Footer = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  height: 50px;
  display: flex;
  align-items: center;

  font-family: Poppins;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.5px;
  text-align: left;

  color: rgba(255, 255, 255, 0.5);
`
