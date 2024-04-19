import styled, { css } from 'styled-components'

export const DropzoneWrapper = styled.div`
  width: 100%;
  border: 1px dashed white;
  border-spacing: 6px;
  border-radius: 5px;
  height: 148px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
  margin-bottom: 24px;
`

export const DropzoneTitle = styled.p`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    color: ${theme.colors.base.lightPure};
    margin-top: 18px;
  `}
`

export const DropzoneSizeRestriction = styled.p`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0.5px;
    text-align: center;
    color: ${theme.colors.base.lightPure};
    margin-top: 10px;
  `}
`

export const FileListWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
`

export const MaxFilesWarning = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 16px;
    height: 56px;
    color: ${theme.colors.base.lightPure};
    border: 1px solid ${theme.colors.base.lightPure};
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    width: 100%;
    border-left-width: 4px;

    font-family: Poppins;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;

    padding: 0px 16px;
    & svg path {
      fill: ${theme.colors.base.lightPure};
    }
  `}
`
