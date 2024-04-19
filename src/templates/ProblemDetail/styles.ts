import styled, { css } from 'styled-components'

export const GobackWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  margin-top: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const GoBackText = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.25px;
  text-align: left;
  margin-left: 16px;
`

export const LinkText = styled.span`
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
`

export const AboutProblemWrapper = styled.section`
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const NameAndActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
`

export const ProblemName = styled.h4`
  font-family: Poppins;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  flex-grow: 0;
  margin-left: 16px;
  &:first-letter {
    text-transform: uppercase;
  }
`

export const DescriptionWrapper = styled.div`
  width: 70%;
  margin-top: 20px;
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
  padding: 32px 24px 24px 24px;
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
  justify-content: space-between;
  gap: 24px;
`

export const KeyVariableVisualizationWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 65%;
    background-color: ${theme.colors.outerSpace};
    padding: 16px 24px;
    height: 100%;
    &:after {
      content: '';
      position: absolute;
      height: 2px;
      background: white;
      width: 100%;
      left: 0px;
      bottom: -1px;
    }
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
  padding: 0px 20px;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const ProblemCharacteristicsWrapper = styled.div`
  padding: 32px 24px 24px 24px;
  border-bottom: 1px solid #2b323b;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`

export const PieChartsTitle = styled.div`
  width: 100%;
  font-family: Poppins;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
`

export const DisclaimerWrapper = styled.div`
  border-bottom: 1px solid #2b323b;
`
