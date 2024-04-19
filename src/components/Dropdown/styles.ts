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

type WrapperProps = {
  open: boolean
  disabled: boolean
}

type PlaceholderProps = {
  hasSelection: boolean
}

type SelectedTextProps = {
  singleSelect?: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, open, disabled }) => css`
    width: 100%;
    position: relative;
    background: ${theme.colors.blueDark};
    border: 1px solid ${theme.colors.base.lightPure};
    border-radius: 5px;
    height: 100%;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    justify-content: center;

    ${open &&
    css`
      background: ${theme.colors.base.lightPure};
      border-bottom-right-radius: 0px;
      border-bottom-left-radius: 0px;
      & > p {
        color: ${theme.colors.blueDarker};
      }
      & > label {
        color: ${theme.colors.blueDarker};
      }
    `};

    ${disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `}
  `}
`
export const OptionsWrapper = styled.div<OptionsWrapperProps>`
  ${({ theme, open }) => css`
    height: 0px;
    position: absolute;
    width: 100%;
    z-index: 15;
    top: calc(100% - 1.5px);
    overflow: auto;
    border: 1px solid ${theme.colors.base.lightPure};
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;

    & div:last-child {
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    ${open &&
    css`
      left: -0.5px;
      width: calc(100% + 1px);
      height: auto;
      max-height: 224px;
      top: calc(100% - 1px);
      z-index: 20;
      background: ${theme.colors.blueDark};
    `}
  `}
`

export const Option = styled.div<{ selected?: boolean; link?: boolean }>`
  ${({ link, selected, theme }) => css`
    color: ${theme.colors.base.lightPure};
    background: ${theme.colors.blueDark};
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
    gap: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    ${selected &&
    css`
      background: ${theme.colors.blueDarker};
    `}
    ${link &&
    css`
      & svg path {
        stroke: ${theme.colors.feedback.informativePure};
      }
      & span {
        font-family: Poppins;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: 0px;
        text-align: center;
        color: ${theme.colors.feedback.informativePure};
      }
    `};
  `}
`

export const OptionText = styled.span`
  ${() => css`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.5px;
    text-align: left;

    cursor: pointer;
    &:first-letter {
      text-transform: uppercase;
    }
  `}
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

export const IconWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: calc(50% - 2px);
`

export const SelectedText = styled.p<SelectedTextProps>`
  ${({ theme, singleSelect, placeholder }) => css`
    color: ${theme.colors.base.lightPure};
    font-family: Poppins;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    margin-left: 15px;
    margin-top: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: calc(100% - 60px);
    &:first-letter {
      text-transform: capitalize;
    }
    ${singleSelect &&
    !placeholder &&
    css`
      margin-top: 0px;
    `}
  `}
`

export const Placeholder = styled.label<PlaceholderProps>`
  ${({ theme, hasSelection }) => css`
    position: absolute;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: ${theme.colors.base.lightPure};
    padding: 15px 10px;
    left: 8px;
    transition: all 0.3s ease;
    transform-origin: top left;
    letter-spacing: 0.5px;
    text-align: left;
    cursor: pointer;
    ${hasSelection &&
    css`
      top: 8px;
      left: 8px;
      font-size: 12px;
      font-weight: 500;
      transform: translate(-2px, -20px);
    `}
  `}
`
