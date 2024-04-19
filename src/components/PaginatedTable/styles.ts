import styled, { DefaultTheme, css } from 'styled-components'

type TableHeadCellWrapperProps = {
  id: string
}

type TableDataCellProps = {
  width: string
}

type TableRowProps = {
  selected: boolean
}

const tableRowHoverAndSelectStyles = (theme: DefaultTheme) => css`
   {
    background: ${theme.colors.outerSpace};
    &::after {
      content: '';
      height: 1px;
      position: absolute;
      background-color: ${theme.colors.base.lightPure};
      left: 0px;
      right: 0px;
      bottom: 1px;
    }
  }
`

export const Wrapper = styled.div`
  margin: 0 24px 50px 24px;
`

export const Footer = styled.div`
  margin-top: 25px;
  width: 100%;
  display: flex;
  align-items: center;
`

export const ItemsInfo = styled.p`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: center;
    color: ${theme.colors.base.lightPure};
  `}
`

export const PageSize = styled.select`
  height: 30px;
  margin: 0rem 1.1rem;
  width: 80px;
  background: #d9d9d9;
`

export const Table = styled.table`
  ${({ theme }) => css`
    background: ${theme.colors.blueDark};
    border-collapse: collapse;
    width: 100%;
  `}
`

export const TableHeadCell = styled.th<TableDataCellProps>`
  ${({ theme, width }) => css`
    border-bottom: 1px solid ${theme.colors.blueDarker};
    text-align: left;
    height: 61px;

    ${width &&
    css`
      width: ${width};
    `}
  `}
`

export const TableHeadCellWrapper = styled.div<TableHeadCellWrapperProps>`
  ${({ id }) => css`
    display: flex;
    align-items: center;
    color: white;
    justify-content: space-between;

    ${id === 'select' &&
    css`
      justify-content: center;
    `};
  `}
`

export const TableDataCell = styled.td`
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.blueDarker};
    height: 61px;

    font-family: Poppins;
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.5px;
    text-align: left;
    color: ${theme.colors.base.lightPure};

    &:first-child {
      width: 60px;
    }
  `}
`

export const TableDataCellWrapper = styled.div``

export const TableRow = styled.tr<TableRowProps>`
  ${({ selected, theme }) => css`
    position: relative;

    &: hover ${tableRowHoverAndSelectStyles(theme)}
      ${selected && tableRowHoverAndSelectStyles(theme)};
  `}
`

export const Tbody = styled.tbody`
  & ${TableRow} {
    height: 61px !important;
  }
`
