/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useEffect, SetStateAction, Dispatch, useState } from 'react'

import {
  POSSIBLE_CAUSES_TABLE_COLUMNS_NAMES,
  CAUSES_TABLE_WIDTH_CONFIG
} from 'constants/Causes'
import { TABLE_COLUMN_VARIANT } from 'constants/Global'

import { useCauses } from 'contexts/Causes'

import { PossibleCausesModel } from 'types/Causes'
import { ProblemModel } from 'types/Problems'

import { CAUSES_TABLE_COLUMNS_IDS } from 'enums/Causes'
import { CAUSE } from 'enums/Causes'
import { SORTING_TYPES } from 'enums/Global'

import { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table'
import Link from 'next/link'

import * as S from './styles'

import PaginatedTable from 'components/PaginatedTable'
import { FormattedMessage } from 'react-intl'

export default function CausesTable({
  problems,
  search,
  setGlobalSearch
}: {
  problems: ProblemModel[]
  search?: string
  setGlobalSearch?: Dispatch<SetStateAction<string>>
}) {
  const { causesState, setCausesState } = useCauses()
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'name-sorting', desc: false }
  ])
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10
  })

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  )
  const data = problems
  const columns = useMemo<ColumnDef<PossibleCausesModel>[]>(
    () => [
      {
        accessorFn: (row) => row[CAUSE.NAME],
        id: `${CAUSES_TABLE_COLUMNS_IDS.NAME}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) => {
          const name =
            `${info.getValue()}`.charAt(0).toUpperCase() +
            `${info.getValue()}`.slice(1)
          return (
            <Link
              href={`/diagnostico/causas-associadas/${info.row.original.id}`}
              passHref
            >
              <S.CauseName selected={info.row.getIsSelected()}>
                {name}
              </S.CauseName>
            </Link>
          )
        },
        header: () => (
          <S.ColumnName>
            <FormattedMessage id={POSSIBLE_CAUSES_TABLE_COLUMNS_NAMES.PRIORITIZED_PROBLEM_NAME}/>
          </S.ColumnName>
        )
      },
      {
        accessorFn: (row) => row[CAUSE.ASSOCIATED_CAUSES],
        id: `${CAUSES_TABLE_COLUMNS_IDS.ASSOCIATED_CAUSES}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) => (
          <S.CountText>{`${info.getValue()} Causa possíveis`}</S.CountText>
        ),
        header: () => (
          <S.ColumnTrend>
            <FormattedMessage id={POSSIBLE_CAUSES_TABLE_COLUMNS_NAMES.ASSOCIATED_POSSIBLE_CAUSES}/>
          </S.ColumnTrend>
        )
      },
      {
        accessorFn: (row) => row[CAUSE.PRIORITIZED_ASSOCIATED_CAUSES],
        id: `${CAUSES_TABLE_COLUMNS_IDS.PRIORITIZED_ASSOCIATED_CAUSES}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) => (
          <S.CountText>{`${info.getValue()} Causa priorizadas`}</S.CountText>
        ),
        header: () => (
          <S.ColumnCriticality>
            <FormattedMessage id={POSSIBLE_CAUSES_TABLE_COLUMNS_NAMES.ASSOCIATED_PRIORITIZED_CAUSES}/>
          </S.ColumnCriticality>
        )
      },
      {
        accessorFn: (row) => row[CAUSE.ID],
        id: `${CAUSES_TABLE_COLUMNS_IDS.SHOW_CAUSES}-${TABLE_COLUMN_VARIANT.NORMAL}`,
        cell: (info) => (
          <Link
            href={`/diagnostico/causas-associadas/${info.getValue() as string}`}
            passHref
          >
            <S.ShowCauses><FormattedMessage id='causes.table.see'/></S.ShowCauses>
          </Link>
        ),
        header: () => ''
      }
    ],
    []
  )

  useEffect(() => {
    let column: any = ''
    let type: any = ''
    if (sorting.length !== 0) {
      const { id, desc } = sorting[0]
      column = id.split('-')[0]
      type = desc ? SORTING_TYPES.DESCENDING : SORTING_TYPES.ASCENDING
    } else {
      setSorting([{ id: 'name-sorting', desc: false }])
      return
    }

    setCausesState((state) => ({
      ...state,
      pageSize,
      pageIndex,
      sorting: { column, type }
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sorting])

  return (
    <>
      <PaginatedTable
        {...{
          data,
          columns,
          footer: true,
          showEmptyRows: true,
          widthConfig: CAUSES_TABLE_WIDTH_CONFIG,
          pagination: { state: pagination, setPagination },
          totalPages: causesState.totalPages || 1,
          totalItems: causesState.totalItems || 0,
          setSorting,
          sorting,
          search,
          setGlobalSearch
        }}
      />
    </>
  )
}
