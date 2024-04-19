import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${() => css`
    width: 100%;
    display: flex;
    padding: 24px 0px;
  `}
`

export const EnabledItemsWrapper = styled.div`
  width: 82px;
  display: flex;
  align-items: center;
`

export const AllItemsWrapper = styled.div`
  height: auto;
  display: flex;
  align-items: center;
`

export const ArrowWrapper = styled.div`
  margin-left: 5px;
`

export const IconWrapper = styled.div`
  width: 20px;
  height: 21px;
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
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 14px;
    text-align: left;
    &:first-letter {
      text-transform: uppercase;
    }
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.5px;
    text-align: left;
    color: ${theme.colors.feedback.informativePure};
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-thickness: 1px;
  `}
`

export const NameAndTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
`
