import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  getSortedRowModel,
  SortingState
} from '@tanstack/react-table'

import * as S from './styles'

import MutliDirectionArrow from 'components/TableColumnSortBtn'
import TablePagination from 'components/TablePaginationUncontrolled'
import { FormattedMessage } from 'react-intl'

export default function Table({
  data,
  columns,
  footer,
  search,
  setGlobalSearch,
  showEmptyRows,
  allRowsSelectedAtStart = false,
  widthConfig,
  onRowSelection
}: {
  data: any[]
  columns: ColumnDef<any>[]
  footer?: boolean
  search?: string
  setGlobalSearch?: Dispatch<SetStateAction<string>>
  showEmptyRows?: boolean
  allRowsSelectedAtStart?: boolean
  widthConfig: any
  onRowSelection?: (selectedRows: any) => void
}) {
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection: rowSelection,
      sorting,
      globalFilter: search
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalSearch,
    onSortingChange: setSorting
  })
  const rows = table.getRowModel().rows.length

  const items_info = `${
    table.getState().pagination.pageIndex *
      table.getState().pagination.pageSize +
    1
  } - ${
    table.getCanNextPage()
      ? table.getState().pagination.pageSize *
        (table.getState().pagination.pageIndex + 1)
      : table.getState().pagination.pageSize *
          table.getState().pagination.pageIndex +
        table.getRowModel().rows.length
  } de ${table.getCoreRowModel().rows.length} itens`

  useEffect(() => {
    // if (Object.keys(rowSelection).length) {
    if (!onRowSelection) return
    onRowSelection(
      table?.getSelectedRowModel().flatRows.map((row: any) => row.original) ||
        []
    )
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Object.keys(rowSelection).length])

  useEffect(() => {
    if (allRowsSelectedAtStart) {
      table.toggleAllRowsSelected()
      // setAdminState((state) => ({ ...state, resendTable: table }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <S.Wrapper>
      <S.Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <S.TableHeadCell
                    key={header.id}
                    colSpan={header.colSpan}
                    width={widthConfig[header.id.split('-')[0]]}
                  >
                    <S.TableHeadCellWrapper id={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </>
                      )}
                      {header.id.includes('sorting') && (
                        <MutliDirectionArrow
                          direction={
                            header.column.getIsSorted() === 'desc'
                              ? 'down'
                              : !header.column.getIsSorted()
                              ? 'unsorted'
                              : 'up'
                          }
                          onClick={header.column.getToggleSortingHandler()}
                       />
                      )}
                    </S.TableHeadCellWrapper>
                  </S.TableHeadCell>
                )
              })}
            </tr>
          ))}
        </thead>
        <S.Tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <S.TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <S.TableDataCell key={cell.id}>
                      <S.TableDataCellWrapper>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </S.TableDataCellWrapper>
                    </S.TableDataCell>
                  )
                })}
              </S.TableRow>
            )
          })}
          {rows < 6 &&
            showEmptyRows &&
            Array.from(Array(10 - rows - 3).keys()).map((id) => (
              <tr key={id}>
                {Array.from(Array(columns.length).keys()).map((id) => (
                  <S.TableDataCell key={id}/>
                ))}
              </tr>
            ))}
        </S.Tbody>
      </S.Table>
      {footer && (
        <S.Footer>
          <S.ItemsInfo>{items_info}</S.ItemsInfo>
          <S.PageSize
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </S.PageSize>
          <S.ItemsInfo><FormattedMessage id='table.pager.items.per.page'/></S.ItemsInfo>
          <TablePagination table={table}/>
        </S.Footer>
      )}
    </S.Wrapper>
  )
}
