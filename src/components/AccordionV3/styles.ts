import styled, { css } from 'styled-components'

type WrapperProps = {
  open: boolean
  disabled: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ open, disabled }) => css`
    width: 100%;
    ${open &&
    css`
      background: #00000033;
    `}

    ${disabled &&
    css`
      & p {
        color: #ffffff4d;
      }
      & path {
        fill: #ffffff4d;
      }
    `}
  `}
`

export const HeaderWrapper = styled.div<{
  disabled: boolean
  open: boolean
  dark?: boolean
}>`
  ${({ dark, disabled, open, theme }) => css`
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
    ${disabled &&
    css`
      cursor: not-allowed;
    `}
    background: ${theme.colors.blueDark};
    ${dark &&
    css`
      background: #00000033;
    `}
    ${open &&
    css`
      background: #00000033;
    `}
  `}
`

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const SummaryWrapper = styled.div<{ disabled: boolean }>`
  ${({ disabled }) => css`
    width: 100%;
    cursor: pointer;
    ${disabled &&
    css`
      cursor: not-allowed;
    `}
  `}
`

export const FooterWrapper = styled.div`
  width: 100%;
`
