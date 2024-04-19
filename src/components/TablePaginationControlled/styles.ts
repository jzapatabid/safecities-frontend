import styled, { css } from 'styled-components'

type PageButtonProps = {
  active: boolean
}

type PageNavBtnWrapperProps = {
  disabled: boolean
}

export const Pagination = styled.div`
  display: flex;
  margin-left: auto;
  width: max-content;

  & div:first-child {
    margin-right: 10px;
  }

  & div:last-child {
    margin-left: 10px;
  }
`

export const PageNavBtnWrapper = styled.div<PageNavBtnWrapperProps>`
  ${({ disabled }) => css`
    position: relative;
    &:hover svg path {
      fill: #00add2;
    }

    ${disabled &&
    css`
      &:hover svg path {
        fill: #555555;
      }
    `}
  `}
`

export const PageBtnsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin: 0px 15px;
`

export const PageButton = styled.button<PageButtonProps>`
  ${({ theme, active }) => css`
    height: 24px;
    width: 24px;
    font-family: Poppins;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: center;
    background: transparent;
    border: none;
    border-radius: 5px;
    color: ${theme.colors.base.lightPure};
    ${active &&
    css`
      background-color: ${theme.colors.base.lightPure};
      color: ${theme.colors.blueDarker};
    `}
  `}
`
