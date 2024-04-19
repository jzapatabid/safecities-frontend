import styled, { css } from 'styled-components'

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: 445px;
  background: #253245 !important;
`

export const InputField = styled.textarea<{
  error: boolean
  placeholderFixed?: boolean
}>`
  ${({ error, placeholderFixed }) => css`
    width: 100%;
    resize: none;
    background: #253245;
    border: 1px solid #ccc;
    // border-bottom-width: medium;
    border-radius: 5px;
    color: #ffffff;
    padding: 15px;
    padding-top: 25px;
    font-size: 16px;
    font-weight: 700;
    transition: all 0.3s ease;
    height: 100%;
    caret-color: #ffffff;

    font-family: Poppins;
    line-height: 24px;
    letter-spacing: 0px;

    &:placeholder-shown {
      // border-bottom-width: thin;
      padding: 15px;
      padding-top: 35px;
    }

    &:placeholder-shown + label {
      transform: translateY(0);
      font-size: 16px;
      padding: 10px;
      font-weight: 700;
      padding-top: 0px;
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
        padding-left: 14px;
        padding-top: 25px;
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
  `}
`

export const Placeholder = styled.label<{ placeholderFixed: boolean }>`
  ${({ placeholderFixed }) => css`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 24px;
    color: #ffffff;
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

export const RestrictionLabel = styled.p`
  ${({ theme }) => css`
    position: absolute;
    right: 0px;
    top: calc(100% + 5px);

    font-family: Poppins;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0.5px;
    text-align: right;

    color: ${theme.colors.base.lightPure};
  `}
`
