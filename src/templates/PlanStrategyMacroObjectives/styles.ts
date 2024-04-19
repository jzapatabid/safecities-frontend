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

export const SectionWrapperNoBottomUnderline = styled.div`
  padding: 24px;
`

export const NavBarWrapperWithUnderline = styled.div`
  height: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const ContentSection = styled.section`
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`

export const Title = styled.h6`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: center;
`

export const AddNewMacroObjective = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    & > button {
      text-decoration: underline;
      text-decoration-color: ${theme.colors.feedback.informativePure};
    }
    & svg path {
      stroke: ${theme.colors.feedback.informativePure};
    }
  `}
`

export const Description = styled.div`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.25px;
  text-align: left;
  width: calc(100% - 250px);
  margin-bottom: 24px;
`

export const ListWrapper = styled.div`
  margin: 48px 24px 48px 24px;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
`
