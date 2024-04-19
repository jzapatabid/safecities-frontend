import styled, { css } from 'styled-components'

export const Wrapper = styled.div<{ hasSummary: boolean }>`
  ${({ hasSummary }) => css`
    width: 100%;
    display: flex;
    padding: 24px 0px;
    ${hasSummary &&
    css`
      padding-bottom: 10px;
    `}
  `}
`

export const EnabledItemsWrapper = styled.div`
  width: 82px;
  display: flex;
  align-items: center;
`

export const AllItemsWrapper = styled.div`
  height: auto;
`

export const ArrowWrapper = styled.div`
  margin-left: 5px;
`

export const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`

export const AccIconWrapper = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 40px;
  margin-right: 20px;
`

export const Name = styled.p`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.5px;
    text-align: left;
    text-decoration: underline;
    text-decoration-thickness: 0.5px;
    text-underline-offset: 1px;
    color: ${theme.colors.feedback.informativePure};
    margin-right: 16px;
  `}
`

export const Title = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.25px;
  text-align: left;
  &:first-letter {
    text-transform: capitalize;
  }
`

export const NameAndTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`
