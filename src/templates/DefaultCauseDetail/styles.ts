import styled, { css } from 'styled-components'

export const GobackWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  margin-top: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const GoBackText = styled.div`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.25px;
  text-align: left;
  margin-left: 16px;
  display: flex;
  gap: 5px;
`

export const LinkText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.feedback.informativePure};
    font-family: Poppins;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.25px;
    text-align: left;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thinkness: 1px;
    cursor: pointer;
    &:first-letter {
      text-transform: capitalize;
    }
  `}
`

export const SectionWrapper = styled.section`
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const UnpaddedSectionWrapper = styled.section`
  padding: 24px 0px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const CharacteristicsSectionWrapper = styled.section`
  padding: 24px 0px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`

export const NameAndActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 270px);
`

export const ProblemName = styled.h4`
  font-family: Poppins;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  flex-grow: 0;
  &:first-letter {
    text-transform: uppercase;
  }
`

export const DescriptionWrapper = styled.div`
  width: calc(100% - 270px);
  margin-top: 25px;
`

export const DescLabel = styled.h5`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.5px;
  text-align: left;
  margin-bottom: 10px;
`

export const Description = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.25px;
  text-align: left;
`

export const CurrentSituationDetailsWrapper = styled.section`
  padding: 32px 0px 24px 0px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const CurrentSituationTitle = styled.h3`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 16px;
`

export const CSCardWrapper = styled.div`
  display: flex;
  gap: 24px;
`

export const KeyVariableDetailsWrapper = styled.div`
  padding: 32px 24px 24px 24px;
  border-bottom: 1px solid #2b323b;
`

export const KeyVariablesTitle = styled.h6`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 24px;
`

export const KeyVariableDataWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
  height: 720px;
`

export const KeyVariableCardsWrapper = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const KeyVariableVisualizationWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.outerSpace};
    padding: 16px 24px;
    height: 100%;
  `}
`

export const AccessMapWrapper = styled.div`
  width: 100%;
  padding: 24px;
  border-bottom: 1px solid #2b323b;
  display: flex;
  justify-content: space-between;
`

export const AccessMapDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const AccessMapTitle = styled.h4`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
`

export const ButtonWrapper = styled.div`
  align-self: flex-start;
  margin-top: 10px;
`

export const AccessMapDesc = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.25px;
  text-align: left;
`

export const NavWrapper = styled.div`
  cursor: pointer;
  height: 24px;
`

export const NavBarWrapper = styled.div`
  height: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const IconWrapper = styled.div`
  flex-shrink: 0;
  align-self: flex-start;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`

export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  flex-shrink: 0;
`

export const CauseInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  width: 100%;
  margin-top: 10px;
`

export const Author = styled.div`
  display: flex;
  align-items: center;
`

export const CauseType = styled.p`
  margin-left: 8px;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.5px;
  text-align: left;
`

export const CauseInfoItemWrapper = styled.div`
  display: flex;
  margin-left: 32px;
  font-size: 14px;
  font-family: Poppins;
  line-height: 18px;
  letter-spacing: 0.5px;
  text-align: left;
`

export const CauseInfoItemKey = styled.p`
  font-weight: 400;
`
export const CauseInfoItemValue = styled.p`
  font-weight: 700;
  margin-left: 3px;
`

export const SectionTitle = styled.h4`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
`

export const TabsWrapper = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 16px;
`

export const PieChartsTitle = styled.div`
  width: 100%;
  font-family: Poppins;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 24px;
`

export const DisclaimerWrapper = styled.div`
  padding: 0px 24px;
`
