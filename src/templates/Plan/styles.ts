import styled, { css } from 'styled-components'

// import * as Button from 'components/Button/styles'

//used
export const Wrapper = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 16px;
`

// used
export const NavBarWrapper = styled.div`
  padding: 0px 20px;
  height: 80px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

//used
export const Text = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.content.small};
    font-weight: ${theme.font.weights.light};
    font-style: italic;
    margin: 1rem 30px 4rem;
  `}
`

//used
export const StatsWrapper = styled.div`
  gap: 20px;
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

//used
export const SectionWrapper = styled.section`
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

//used
export const Title = styled.p`
  font-family: Poppins;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: left;
`

//used
export const DetailAndNewPlanWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

//used
export const DisclaimerWrapper = styled.div``

//used
export const TitleAndDownloadWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ConstructionTitle = styled.p`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: center;
`

export const DownloadBtnWrapper = styled.div`
  height: 56px;
`

export const PlanProgressCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 24px 0px;
`
