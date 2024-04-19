import styled, { css } from 'styled-components'

export const HeroWelcome = styled.section`
  padding: 3.2rem 3rem;
`

export const Paragraph = styled.p`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  color: #ffffff;
`

export const Description = styled.p`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #ffffff;
  padding: 0 3rem;
  margin-bottom: 3rem;
`

export const PlatformFeaturesWrapper = styled.section`
  width: 100%;
  display: flex;
  gap: 40px;
  justify-content: space-between;
  margin-top: 3.5rem;
  margin-bottom: 7.5rem;
  color: black;
  padding: 0 3rem;

  & > div {
    width: 32%;
    min-width: 333.33px;
  }
`

export const ReadMoreText = styled.a`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.25px;
    text-align: left;
    text-decoration: underline;
    cursor: pointer;
    color: ${theme.colors.feedback.informativePure};
    margin-left: 3rem;
    margin-bottom: 5px;
  `}
`
