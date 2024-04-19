import styled, { css } from 'styled-components'

type WrapperProps = {
  progress?: number
}
type IconWrapperProps = {
  clickable?: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, progress }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 18px 16px;
    background: ${theme.colors.blueDark};
    margin-bottom: 2px;

    ${progress &&
    css`
      padding-bottom: 12px;
      & p {
        color: white;
        text-decoration: none;
      }

      & ${IconWrapper} {
        margin-top: -6px;
      }

      & ${LinkText} {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 91%;
      }

      & ${Bar} {
        &:after {
          width: ${progress}%;
        }
      }
    `}
  `}
`

export const Bar = styled.div`
  ${({ theme }) => css`
    position: relative;
    height: 4px;
    width: 100%;
    background: #ffffff4d;
    flex-shrink: 0;
    border-radius: 5px;
    margin-top: 8px;
    &:after {
      content: '';
      position: absolute;
      width: 0%;
      height: 4px;
      background: ${theme.colors.base.lightPure};
      border-radius: 5px;
      display: block;
      transition: width 300ms;
    }
  `}
`

export const LinkText = styled.div`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.5px;
    text-align: left;
    color: ${theme.colors.feedback.informativePure};
    text-decoration: underline;
    margin-left: 10px;
  `}
`

export const UploadText = styled.p`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.5px;
    text-align: left;
    color: ${theme.colors.feedback.informativePure};
    text-decoration: underline;
    margin-left: 10px;
    &:after {
      content: '';
      width: 100%;
      height: 4px;
      background: red;
      border-radius: 5px;
      display: block;
      margin-top: 8px;
    }
  `}
`

export const IconWrapper = styled.div<IconWrapperProps>`
  ${({ clickable }) => css`
    display: flex;
    align-items: center;
    height: 24px;

    ${clickable &&
    css`
      cursor: pointer;
    `}
  `}
`

export const ExtremeWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin-left: auto;
    gap: 12px;

    & svg path {
      fill: ${theme.colors.base.lightPure};
    }
  `}
`

export const SpinnerWrapper = styled.div`
  width: 100%;
`
