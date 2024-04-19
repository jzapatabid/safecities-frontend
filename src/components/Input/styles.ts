import styled, { css } from 'styled-components'

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: 445px;
  background: #253245 !important;
`

export const InputField = styled.input<{
  error: boolean
  trailingAction: any
  isFirefox: boolean
  placeholderFixed?: boolean
}>`
  ${({ error, trailingAction, theme, isFirefox, placeholderFixed }) => css`
    font-family: 'Poppins';
    width: 100%;
    background: ${theme.colors.blueDark};
    border: 1px solid ${theme.colors.base.lightPure};
    border-bottom-width: medium;
    border-radius: 5px;
    color: ${theme.colors.base.lightPure};
    padding: 15px;
    padding-top: 35px;
    font-size: 16px;
    font-weight: 700;
    transition: all 0.3s ease;
    height: 100%;
    caret-color: ${theme.colors.base.lightPure};

    &:placeholder-shown {
      border-bottom-width: thin;
      padding: 15px;
    }

    &:placeholder-shown + label {
      transform: translateY(0);
      font-size: 16px;
      padding: 10px;
      font-weight: 700;
    }

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: transparent;
      transition: all 0.3s ease;
    }

    &:-webkit-autofill {
      & + label {
        color: black;
      }
    }

    ${placeholderFixed &&
    css`
      border-bottom-width: thin;
      &:placeholder-shown {
        border-bottom-width: thin;
        padding: 15px;
        padding-top: 35px;
      }
      &:placeholder-shown + label {
        font-size: 12px;
        padding: 10px;
        font-weight: 500;
      }
      &::placeholder {
        color: #ffffff4d;
        transition: all 0.3s ease;
      }
    `}

    ${error &&
    css`
      border-color: #ff6191;
    `};

    ${trailingAction &&
    css`
      width: calc(100% - 111px);
      border-right: none;
      padding-right: 0px;
      border-bottom-width: thin;
    `}

    ${isFirefox &&
    css`
      &:autofill {
        & + label {
          color: white;
        }
      }
    `}
  `}
`

export const Placeholder = styled.label<{ placeholderFixed: boolean }>`
  ${({ theme, placeholderFixed }) => css`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 24px;
    color: ${theme.colors.base.lightPure};
    padding: 15px 10px;

    position: absolute;
    top: 8px;
    left: 8px;
    transition: all 0.3s ease;
    transform-origin: top left;
    transform: translate(-2px, -20px);
    cursor: text;

    ${placeholderFixed &&
    css`
      top: -3px;
      left: 5px;
      font-weight: 500;
      transform: translate(0px, 0px);
      padding: 10px 10px;
    `}
  `}
`

export const IconWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 18px;
  cursor: pointer;
`

export const ButtonWrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.blueDark};
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    height: 60px;
    border: 1px solid ${theme.colors.base.lightPure};
    border-radius: 5px;
    padding: 2px;
    border-left: none;
    z-index: 120;
    width: 111px;
    padding-left: 5px;
    padding-top: 3px;
    padding-bottom: 3px;

    &:before {
      content: '';
      height: calc(100% + 2px);
      width: 10px;
      border-top: 1px solid white;
      position: absolute;
      left: -5px;
      top: -1px;
      border-bottom: 1px solid white;
      background: ${theme.colors.blueDark};
    }
  `}
`

export const TrainingIconActionWrapper = styled.div`
  position: absolute;
  top: calc(50% - 19px);
  right: 5px;
  & > button > svg path {
    stroke: white;
  }
`
