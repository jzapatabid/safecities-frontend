import styled, { css } from 'styled-components'

type DownArrowProps = {
  state: boolean
}

type FirstSelectionWrapperProps = {
  open: boolean
}

type OptionsWrapperProps = {
  open: boolean
}

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
`
export const OptionsWrapper = styled.div<OptionsWrapperProps>`
  ${({ theme, open }) => css`
    height: 0px;
    position: absolute;
    width: 100%;
    transition: height 500ms;

    overflow: hidden;
    & div:nth-child(odd) {
      background-color: ${theme.colors.blueDark};
      color: ${theme.colors.base.lightPure};
      & svg path {
        fill: ${theme.colors.base.lightPure};
      }
    }
    & div:nth-child(even) {
      background-color: ${theme.colors.base.lightPure};
      color: ${theme.colors.blueDarker};
      & svg path {
        fill: ${theme.colors.blueDarker};
      }
    }
    & div:last-child {
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    ${open &&
    css`
      height: 168px;
    `}
  `}
`

export const Option = styled.div`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.15px;
  text-align: left;
  padding: 0px 16px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const OptionText = styled.span`
  cursor: pointer;
`

export const DownArrow = styled.div<DownArrowProps>`
  ${({ theme, state }) => css`
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid ${theme.colors.base.lightPure};
    margin-left: 30px;
    cursor: pointer;
    transition: transform 500ms;
    ${state &&
    css`
      transform: rotate(180deg);
      border-top-color: ${theme.colors.blueDarker};
    `};
  `}
`

export const FirstSelectionWrapper = styled.div<FirstSelectionWrapperProps>`
  ${({ open, theme }) => css`
    display: flex;
    align-items: center;
    background-color: none;
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    position: relative;
    min-width: 200px;
    height: 56px;
    padding: 18px;

    ${open &&
    css`
      background-color: ${theme.colors.base.lightPure};
      color: black;
      border-bottom-right-radius: 0px;
      border-bottom-left-radius: 0px;

      & svg path {
        fill: black;
      }
    `}
  `}
`
