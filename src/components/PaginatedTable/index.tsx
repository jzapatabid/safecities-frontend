/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { TABLE_COLUMN_VARIANT } from 'constants/Global'

import { SORTING_TYPES } from 'enums/Global'

import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  PaginationState
} from '@tanstack/react-table'
import { useRouter } from 'next/router'

import * as S from './styles'

import MutliDirectionArrow from 'components/TableColumnSortBtn'
import TablePaginationControlled from 'components/TablePaginationControlled'
import { FormattedMessage } from 'react-intl'

export type PaginationType = {
  state: PaginationState
  setPagination: Dispatch<SetStateAction<PaginationState>>
}

export default function Table({
  data,
  columns,
  footer,
  showEmptyRows,
  allRowsSelectedAtStart = false,
  widthConfig,
  pagination,
  totalPages,
  totalItems,
  setSorting,
  sorting,
  onRowSelection
}: {
  data: any[]
  columns: ColumnDef<any>[]
  footer?: boolean
  showEmptyRows?: boolean
  allRowsSelectedAtStart?: boolean
  widthConfig: any
  pagination: PaginationType
  totalPages: number
  totalItems: number
  setSorting: Dispatch<SetStateAction<SortingState>>
  sorting: SortingState
  onRowSelection?: (selectedRows: any) => void
}) {
  const router = useRouter()
  const [rowSelection, setRowSelection] = useState({})
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection: rowSelection,
      sorting,
      pagination: pagination.state
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: pagination.setPagination,
    onSortingChange: setSorting,
    manualPagination: true,
    manualSorting: true
  })
  const rows = table.getRowModel().rows.length
  const items_info = `${
    totalItems !== 0
      ? (pagination.state.pageIndex - 1) * pagination.state.pageSize + 1
      : 0
  } - ${
    pagination.state.pageIndex < totalPages
      ? pagination.state.pageSize * pagination.state.pageIndex
      : pagination.state.pageSize * (pagination.state.pageIndex - 1) +
        (totalItems > pagination.state.pageSize
          ? totalItems % pagination.state.pageSize
          : totalItems)
  }`

  const resetRowSelections = () => {
    setRowSelection({})
  }

  useEffect(() => {
    if (!onRowSelection) return
    onRowSelection(
      table?.getSelectedRowModel().flatRows.map((row: any) => row.original) ||
        []
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Object.keys(rowSelection).length])

  useEffect(() => {
    if (allRowsSelectedAtStart) {
      table.toggleAllRowsSelected()
    }
    router.events.on('routeChangeComplete', resetRowSelections)
    return () => {
      router.events.off('routeChangeComplete', resetRowSelections)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    table.resetRowSelection(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.state.pageIndex])

  return (
    <S.Wrapper>
      <S.Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup:any) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header:any) => {
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
                      {header.id.includes(TABLE_COLUMN_VARIANT.SORTING) && (
                        <MutliDirectionArrow
                          direction={
                            header.column.getIsSorted() ===
                            SORTING_TYPES.DESCENDING
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
          {table.getRowModel().rows.map((row:any) => {
            return (
              <S.TableRow
                key={row.id}
                selected={Object.keys(rowSelection)
                  .map((id) => Number(id))
                  .includes(Number(row.id))}
              >
                {row.getVisibleCells().map((cell:any) => {
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
                  <S.TableDataCell key={id} />
                ))}
              </tr>
            ))}
        </S.Tbody>
      </S.Table>
      {footer && (
        <S.Footer>
          <S.ItemsInfo>{items_info} <FormattedMessage id='table.pager.of'/> {totalItems} <FormattedMessage id='table.pager.items'/></S.ItemsInfo>
          <S.PageSize
            value={pagination.state.pageSize}
            onChange={(e:any) =>
              pagination.setPagination((state:any) => ({
                ...state,
                pageSize: Number(e.target.value)
              }))
            }
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </S.PageSize>
          <S.ItemsInfo><FormattedMessage id='table.pager.items.per.page'/></S.ItemsInfo>
          <TablePaginationControlled
            pagination={pagination}
            totalPages={totalPages}
          />
        </S.Footer>
      )}
    </S.Wrapper>
  )
}
