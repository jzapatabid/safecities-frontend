import styled, { css } from 'styled-components'

type WrapperProps = {
  withTitle?: boolean
  mtOnly?: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ withTitle, mtOnly }) => css`
    align-items: center;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 12px 16px 12px 16px;
    margin: 20px;
    ${mtOnly &&
    css`
      margin: 20px 0px 0px 0px;
    `}
    border: 1px solid rgba(255, 255, 255, 0.3);

    ${withTitle &&
    css`
      padding: 0px;
      padding-top: 10px;
      border: none;
      margin: 0px;
    `}
  `}
`

export const Text = styled.p`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    text-align: left;
    flex-grow: 1;
    color: ${theme.colors.base.lightPure};
  `}
`

export const VariantWrapper = styled.div`
  height: 20px;
  margin: 2px 20px 0px 0px;
`

export const TextWrapper = styled.div``

export const ReadMoreText = styled.a`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.25px;
    text-align: left;
    text-decoration: underline;
    cursor: pointer;
    color: ${theme.colors.feedback.informativePure};
    margin-left: 3px;
  `}
`

export const InlineText = styled.span`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: left;
  flex-grow: 1;
`
