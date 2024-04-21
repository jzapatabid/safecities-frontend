import { useEffect, useState } from 'react'

import { UserModel } from 'types/Admin'

import { Table } from '@tanstack/react-table'
import { getPaginationPageGroupInfo } from 'utils'

import * as S from './styles'

import IconButton from 'components/IconButton'
import PaginationLeft from 'components/icons/PaginationLeft'
import PaginationExtremeLeft from 'components/icons/PaginationLeftExtreme'

type TablePaginationProps = {
  table: Table<UserModel>
}

const getPageButtons = (total_pages: number, current_page: number) => {
  const { start, end } = getPaginationPageGroupInfo(current_page)
  return Array.from(
    { length: total_pages < 5 ? total_pages : 5 },
    (_, index) => start + (start <= end ? index : -index)
  )
}

const TablePagination = ({ table }: TablePaginationProps) => {
  const [paginationBtns, setPaginationBtns] = useState([1])
  const total_pages = table.getPageCount()
  const currPage = table.getState().pagination.pageIndex

  useEffect(() => {
    if (!total_pages) return
    setPaginationBtns(
      getPageButtons(total_pages, currPage + 1).filter(
        (page) => page <= total_pages
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage, total_pages])

  return (
    <S.Pagination>
      <S.PageNavBtnWrapper disabled={!table.getCanPreviousPage()}>
        <IconButton
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          icon={<PaginationExtremeLeft/>}
       />
      </S.PageNavBtnWrapper>
      <S.PageNavBtnWrapper disabled={!table.getCanPreviousPage()}>
        <IconButton
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          icon={<PaginationLeft/>}
       />
      </S.PageNavBtnWrapper>
      <S.PageBtnsWrapper>
        {paginationBtns
          .filter((idx) => idx >= 1)
          .map((idx) => (
            <S.PageButton
              key={idx}
              active={currPage + 1 === idx}
              onClick={() => table.setPageIndex(idx - 1)}
            >
              {idx}
            </S.PageButton>
          ))}
      </S.PageBtnsWrapper>
      <S.PageNavBtnWrapper disabled={!table.getCanNextPage()}>
        <IconButton
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          icon={<PaginationLeft transform="rotate(180 0 0)"/>}
       />
      </S.PageNavBtnWrapper>
      <S.PageNavBtnWrapper disabled={!table.getCanNextPage()}>
        <IconButton
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          icon={<PaginationExtremeLeft transform="rotate(180 0 0)"/>}
       />
      </S.PageNavBtnWrapper>
    </S.Pagination>
  )
}

export default TablePagination
