import styled, { css } from 'styled-components'

export const Wrapper = styled.div<{ showCauseConnectors?: boolean }>`
  ${({ showCauseConnectors }) => css`
    display: flex;
    gap: 33px;
    width: 100%;
    position: relative;
    ${showCauseConnectors &&
    css`
      &:last-child:before {
        content: '';
        position: absolute;
        top: 44px;
        left: -34px;
        width: 4px;
        height: 100%;
        background: rgba(20, 27, 37, 1);
      }
    `}
  `}
`

export const Root = styled.div<{
  selected: boolean
  singleChild: boolean
  showCauseConnectors?: boolean
  readOnly?: boolean
}>`
  ${({ theme, selected, singleChild, showCauseConnectors, readOnly }) => css`
    flex-shrink: 0;
    align-self: flex-start;
    width: calc(50% - 34px);
    border: 2px solid transparent;
    position: relative;
    background: rgba(37, 50, 69, 1);

    ${selected &&
    !readOnly &&
    css`
      border: 2px solid ${theme.colors.base.lightPure};
      background: rgba(43, 50, 59, 1);
    `}
    &:after {
      position: absolute;
      top: 65px;
      right: -35px;
      content: '';
      width: 33px;
      height: 2px;
      background: ${theme.colors.base.lightPure};
      ${singleChild &&
      css`
        top: 40px;
      `}
    }

    ${showCauseConnectors &&
    css`
      &:before {
        position: absolute;
        top: 40px;
        left: -33px;
        content: '';
        width: 33px;
        height: 2px;
        background: white;
      }

      &:last-child:before {
        content: '';
        position: absolute;
        top: 44px;
        left: -34px;
        width: 4px;
        height: 100%;
        background: rgba(20, 27, 37, 1);
      }
    `}
  `}
`

export const CheckboxAndTitleWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin: 16px;
  align-items: center;
`

export const Title = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.base.lightPure};
    font-family: Poppins;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
  `}
`

export const Name = styled.p<{ withCheckbox: boolean }>`
  ${({ theme, withCheckbox }) => css`
    font-family: Poppins;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    color: ${theme.colors.base.lightPure};
    margin: 0px 16px 16px 52px;
    &:first-letter {
      text-transform: capitalize;
    }

    ${!withCheckbox &&
    css`
      margin: 0px 16px 16px 16px;
    `}
  `}
`

export const ProblemName = styled.p<{ readOnly?: boolean }>`
  ${({ readOnly, theme }) => css`
    font-family: Poppins;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    color: ${theme.colors.base.lightPure};
    margin: 0px 16px 16px 51px;
    &:first-letter {
      text-transform: capitalize;
    }
    ${readOnly &&
    css`
      margin: 0px 16px 16px 16px;
    `}
  `}
`

export const Connecter = styled.div`
  ${({ theme }) => css`
    flex-shrink: 0;
    width: 2px;
    height: calc(100% -40px);
    background: ${theme.colors.base.lightPure};
    position: relative;

    &:before {
      position: absolute;
      content: '';
      left: -1px;
      width: 4px;
      height: 42px;
      background: rgba(20, 27, 37, 1);
    }

    &::after {
      position: absolute;
      content: '';
      top: calc(100% - 39px);
      left: -1px;
      width: 4px;
      height: 41px;
      background: rgba(20, 27, 37, 1);
    }
  `}
`

export const Leaves = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: calc(50% - 34px);
`

export const Leaf = styled.div<{ selected: boolean }>`
  ${({ theme, selected }) => css`
    background: rgba(37, 50, 69, 1);
    width: 100%;
    border: 2px solid transparent;
    border-left-color: ${theme.colors.base.lightPure};
    position: relative;

    ${selected &&
    css`
      border: 2px solid ${theme.colors.base.lightPure};
      background: rgba(43, 50, 59, 1);
    `};

    &:after {
      position: absolute;
      top: 50%;
      left: -35px;
      content: '';
      width: 33px;
      height: 2px;
      background: white;
    }

    &:last-child::after {
      position: absolute;
      top: 40px;
      left: -35px;
      content: '';
      width: 33px;
      height: 2px;
      background: white;
    }

    &:first-child::after {
      position: absolute;
      top: 40px;
      left: -35px;
      content: '';
      width: 33px;
      height: 2px;
      background: white;
    }

    &:last-child::before {
      content: '';
      position: absolute;
      top: 42px;
      width: 4px;
      left: -37px;
      height: 300%;
      background: rgba(20, 27, 37, 1);
    }
  `}
`
