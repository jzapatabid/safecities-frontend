import styled, { css } from 'styled-components'

export const CauseTitleInputWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    position: relative;
    margin: 24px 0px;
    margin-bottom: 48px;
    background: ${theme.colors.blueDark} !important;
    height: 75px;
  `}
`

export const EvidenceInputWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 48px;
  background: #253245 !important;
  height: 148px;
`

export const AttachmentsWrapper = styled.div`
  width: 100%;
  margin-bottom: 24px;
`

export const AttachmentsTitle = styled.h3`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: 0em;
    text-align: left;
    color: ${theme.colors.base.lightPure};
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 24px;
  `}
`

export const ReferencesWrapper = styled.div``

export const ReferencesDesc = styled.p`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.25px;
    text-align: left;
    color: ${theme.colors.base.lightPure};
    margin-bottom: 24px;
  `}
`

export const ReferencesInputWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    position: relative;
    margin: 24px 0px;
    background: ${theme.colors.blueDark} !important;
    height: 60px;
  `}
`

export const AddReferencesBtnWrapper = styled.div`
  ${({ theme }) => css`
    height: 56px;
    display: flex;
    justify-content: flex-end;
    margin: 24px 0px;
    & > button {
      text-decoration: underline;
      text-decoration-color: ${theme.colors.feedback.informativePure};
    }
    & svg path {
      stroke: ${theme.colors.feedback.informativePure};
    }
  `}
`

export const InfoTooltip = styled.div`
  content: attr(title);
  position: absolute;
  display: flex;
  height: 56px;
  left: 35px;
  top: calc(50% - 28px);
  background-color: rgba(44, 45, 47, 1);
  opacity: 0;
  width: 400px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: white;
  border: 1px solid white;

  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.5px;
  text-align: left;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    z-index: 10;
    left: -10px;
    margin-top: -5px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 0 6px 10px;
    border-color: transparent transparent transparent white;
    transform: rotate(180deg);
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    z-index: 10;
    left: -10px;
    margin-top: -3px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 0 4px 10px;
    border-color: transparent transparent transparent #333;
    transform: rotate(180deg);
  }
`

export const IconWrapper = styled.div`
  position: relative;
  cursor: help;
  display: flex;
  align-items: center;

  &:hover ${InfoTooltip} {
    opacity: 1;
  }
`
