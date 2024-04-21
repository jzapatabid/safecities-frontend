import { useEffect, useState } from 'react'

import { getPaginationPageGroupInfo } from 'utils'

import * as S from './styles'

import IconButton from 'components/IconButton'
import PaginationLeft from 'components/icons/PaginationLeft'
import PaginationExtremeLeft from 'components/icons/PaginationLeftExtreme'
import { PaginationType } from 'components/PaginatedTable'

const getPageButtons = (total_pages: number, current_page: number) => {
  const { start, end } = getPaginationPageGroupInfo(current_page)
  return Array.from(
    { length: total_pages < 5 ? total_pages : 5 },
    (_, index) => start + (start <= end ? index : -index)
  )
}

const TablePaginationControlled = ({
  pagination,
  totalPages
}: {
  pagination: PaginationType
  totalPages: number
}) => {
  const [paginationBtns, setPaginationBtns] = useState([1])
  const pageIndex = pagination.state.pageIndex

  useEffect(() => {
    if (!totalPages) return
    setPaginationBtns(
      getPageButtons(totalPages, pageIndex + 1).filter(
        (page) => page <= totalPages
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, totalPages])

  return (
    <S.Pagination>
      <S.PageNavBtnWrapper disabled={pageIndex === 1}>
        <IconButton
          onClick={() =>
            pagination.setPagination((state) => ({
              ...state,
              pageIndex: 1
            }))
          }
          disabled={pageIndex === 1}
          icon={<PaginationExtremeLeft/>}
       />
      </S.PageNavBtnWrapper>
      <S.PageNavBtnWrapper disabled={pageIndex === 1}>
        <IconButton
          onClick={() =>
            pageIndex > 1
              ? pagination.setPagination((state) => ({
                  ...state,
                  pageIndex: pageIndex - 1
                }))
              : // eslint-disable-next-line @typescript-eslint/no-empty-function
                () => {}
          }
          disabled={pageIndex === 1}
          icon={<PaginationLeft/>}
       />
      </S.PageNavBtnWrapper>
      <S.PageBtnsWrapper>
        {paginationBtns
          .filter((idx) => idx >= 1)
          .map((idx) => (
            <S.PageButton
              key={idx}
              active={pageIndex === idx}
              onClick={() =>
                pagination.setPagination((state) => ({
                  ...state,
                  pageIndex: idx
                }))
              }
            >
              {idx}
            </S.PageButton>
          ))}
      </S.PageBtnsWrapper>
      <S.PageNavBtnWrapper disabled={pageIndex === totalPages}>
        <IconButton
          onClick={() =>
            pagination.setPagination((state) => ({
              ...state,
              pageIndex: pageIndex + 1
            }))
          }
          disabled={pageIndex === totalPages}
          icon={<PaginationLeft transform="rotate(180 0 0)"/>}
       />
      </S.PageNavBtnWrapper>
      <S.PageNavBtnWrapper disabled={pageIndex === totalPages}>
        <IconButton
          onClick={() =>
            pagination.setPagination((state) => ({
              ...state,
              pageIndex: totalPages
            }))
          }
          disabled={pageIndex === totalPages}
          icon={<PaginationExtremeLeft transform="rotate(180 0 0)"/>}
       />
      </S.PageNavBtnWrapper>
    </S.Pagination>
  )
}

export default TablePaginationControlled
