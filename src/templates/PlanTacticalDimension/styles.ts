import styled, { css } from 'styled-components'

export const SectionWrapper = styled.section`
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const PlanName = styled.p`
  font-family: Poppins;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: left;
`

export const PlanDates = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.25px;
  text-align: left;
  margin-top: 10px;
`

export const NavBarWrapper = styled.div`
  height: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
`

export const ListWrapper = styled.div`
  margin-bottom: 24px;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const TotalCostWrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.blueDark};
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  `}
`

export const TotalCostTitle = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.5px;
  text-align: left;
`

export const TotalCostValue = styled.p`
  font-family: Poppins;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: left;
`

export const TotalCostForecast = styled.p`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 22px 0px 22px 16px;
    height: 60px;
    background: ${theme.colors.blueDark};
  `}
`

export const ColumnText = styled.p`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.5px;
  text-align: left;
`
