import styled, { css } from 'styled-components'

type TableHeadCellWrapperProps = {
  id: string
}

type TableDataCellProps = {
  width: string
}

export const Wrapper = styled.div`
  margin-bottom: 40px;
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

    &:nth-child(2) > div {
      margin-left: 25px;
    }
  `}
`

export const TableHeadCellWrapper = styled.div<TableHeadCellWrapperProps>`
  ${({ id }) => css`
    display: flex;
    align-items: center;
    color: white;

    & p {
      font-family: Poppins;
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.5px;
      text-align: left;
      flex-grow: 2;
    }

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

    &:nth-child(2) div {
      margin-left: 25px;
    }
  `}
`

export const TableDataCellWrapper = styled.div``

export const Tbody = styled.tbody`
  & tr {
    height: 61px !important;
  }
`

export const TableRow = styled.tr``
