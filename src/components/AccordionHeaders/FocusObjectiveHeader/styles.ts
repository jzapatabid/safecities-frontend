import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  padding: 20px 0px;
  margin-left: 45px;
`

export const EnabledItemsWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const AllItemsWrapper = styled.div<{ disabled: boolean }>`
  ${({ disabled }) => css`
    height: auto;

    ${disabled &&
    css`
      margin-left: 48px;
    `}
  `}
`

export const ArrowWrapper = styled.div`
  margin-left: 2px;
`

export const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`

export const AccIconWrapper = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 29px;
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
`

export const NameAndTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`
