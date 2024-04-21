/* eslint-disable react-hooks/exhaustive-deps */
import {
  useMemo,
  useRef,
  useEffect,
  HTMLProps,
  SetStateAction,
  Dispatch,
  useState,
  useCallback
} from 'react'

import { TABLE_COLUMN_VARIANT } from 'constants/Global'
import {
  PROBLEMS_TABLE_COLUMNS_NAMES,
  PROBLEMS_TABLE_WIDTH_CONFIG,
  PROBLEM_STATUS
} from 'constants/Problems'

import { useProblems } from 'contexts/Problems'

import { ProblemModel } from 'types/Problems'

import { SELECT_TABLE_FIRST_COLUMN, SORTING_TYPES } from 'enums/Global'
import { PROBLEM } from 'enums/Problems'

import { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table'
import Link from 'next/link'

import * as S from './styles'
import theme from 'styles/theme'

import BulbIndicator from 'components/BulbIndicator'
import FlagFilledIcon from 'components/icons/FlagFilledIcon'
import PaginatedTable from 'components/PaginatedTable'
import TubelightIndicator from 'components/TubelightIndicator'
import { FormattedMessage } from 'react-intl'

export default function ProblemsTable({
  problems,
  search,
  setGlobalSearch
}: {
  problems: ProblemModel[]
  search?: string
  setGlobalSearch?: Dispatch<SetStateAction<string>>
}) {
  const { problemsState, setProblemsState } = useProblems()
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
  const columns = useMemo<ColumnDef<ProblemModel>[]>(
    () => [
      {
        id: SELECT_TABLE_FIRST_COLUMN.SELECT,
        header: () => null,
        cell: ({ row }) => (
          <S.InputColumnWrapper>
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler()
              }}
           />
          </S.InputColumnWrapper>
        ),
        width: 70
      },
      {
        accessorFn: (row) => row[PROBLEM.NAME],
        id: `${PROBLEM.NAME}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) => {
          const name =
            `${info.getValue()}`.charAt(0).toUpperCase() +
            `${info.getValue()}`.slice(1)
          const url_prefix = info.row.original.is_default
            ? '/diagnostico/detalhe-do-problema'
            : '/diagnostico/detalhe-do-problema/personalizada'
          return (
            <S.NameWrapper>
              <Link href={`${url_prefix}/${info.row.original.id}`} passHref>
                <S.ProblemName selected={info.row.getIsSelected()}>
                  {name}
                </S.ProblemName>
              </Link>
            </S.NameWrapper>
          )
        },
        header: () => (
          <S.ColumnName>{<FormattedMessage id={PROBLEMS_TABLE_COLUMNS_NAMES.NAME}/>}</S.ColumnName>
        )
      },
      {
        accessorFn: (row) => row[PROBLEM.STATUS],
        id: `${PROBLEM.STATUS}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) =>
          info.getValue() === true ? (
            <S.StatusWrapper>
              <FlagFilledIcon fill={theme.colors.base.lightPure}/>
              {PROBLEM_STATUS.PRIORITIZED}
            </S.StatusWrapper>
          ) : (
            PROBLEM_STATUS.NOT_PRIORITIZED
          ),
        header: () => (
          <S.ColumnHeader>{<FormattedMessage id={PROBLEMS_TABLE_COLUMNS_NAMES.STATUS}/>}</S.ColumnHeader>
        )
      },
      {
        accessorFn: (row) => row[PROBLEM.PERFORMANCE],
        id: `${PROBLEM.PERFORMANCE}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) =>
          info.row.original.is_default &&
          typeof info.getValue() === 'number' ? (
            <BulbIndicator score={info.getValue() as number}/>
          ) : (
            <>-</>
          ),
        header: () => (
          <S.ColumnPerformance>
            {<FormattedMessage id={PROBLEMS_TABLE_COLUMNS_NAMES.PERFORMANCE}/>}
          </S.ColumnPerformance>
        )
      },
      {
        accessorFn: (row) => row[PROBLEM.RECENT_TREND],
        id: `${PROBLEM.RECENT_TREND}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) => {
          return info.row.original.is_default &&
            typeof info.getValue() === 'number' ? (
            <BulbIndicator score={info.getValue() as number}/>
          ) : (
            <>-</>
          )
        },
        header: () => (
          <S.ColumnTrend>
            {<FormattedMessage id={PROBLEMS_TABLE_COLUMNS_NAMES.RECENT_TREND}/>}
          </S.ColumnTrend>
        )
      },
      {
        accessorFn: (row) => row[PROBLEM.RELATIVE_FREQUENCY],
        id: `${PROBLEM.RELATIVE_FREQUENCY}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) =>
          info.row.original.is_default &&
          typeof info.getValue() === 'number' ? (
            <BulbIndicator score={info.getValue() as number}/>
          ) : (
            <>-</>
          ),
        header: () => (
          <S.ColumnFrequency>
            {<FormattedMessage id={PROBLEMS_TABLE_COLUMNS_NAMES.RELATIVE_FREQUENCY}/>}
          </S.ColumnFrequency>
        )
      },
      {
        accessorFn: (row) => row[PROBLEM.POTENTIAL_DAMAGE],
        id: `${PROBLEM.POTENTIAL_DAMAGE}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) =>
          info.row.original.is_default &&
          typeof info.getValue() === 'number' ? (
            <BulbIndicator score={info.getValue() as number}/>
          ) : (
            <>-</>
          ),
        header: () => (
          <S.ColumnDamage>
            {<FormattedMessage id={PROBLEMS_TABLE_COLUMNS_NAMES.POTENTIAL_DAMAGE}/>}
          </S.ColumnDamage>
        )
      },
      {
        accessorFn: (row) => row[PROBLEM.CRITITCALITY_LEVEL],
        id: `${PROBLEM.CRITITCALITY_LEVEL}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) =>
          info.row.original.is_default &&
          typeof info.getValue() === 'number' ? (
            <TubelightIndicator
              score={((info.getValue() as number) * 10) as number}
              scale={10}
           />
          ) : (
            <>-</>
          ),
        header: () => (
          <S.ColumnCriticality>
            {<FormattedMessage id={PROBLEMS_TABLE_COLUMNS_NAMES.CRITITCALITY_LEVEL}/>}
          </S.ColumnCriticality>
        )
      }
    ],
    []
  )

  const handleRowSelection = useCallback((selectedProblems: ProblemModel[]) => {
    setProblemsState((state) => ({ ...state, selectedProblems }))
  }, [])

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

    setProblemsState((state) => ({
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
          widthConfig: PROBLEMS_TABLE_WIDTH_CONFIG,
          pagination: { state: pagination, setPagination },
          totalPages: problemsState.totalPages || 1,
          totalItems: problemsState.totalItems || 0,
          setSorting,
          sorting,
          onRowSelection: handleRowSelection,
          search,
          setGlobalSearch
        }}
     />
    </>
  )
}

function IndeterminateCheckbox({
  indeterminate,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!)

  const handleClick = useCallback((e: any) => {
    e.stopPropagation()
  }, [])

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate, rest.checked])
  // @ts-expect-error It is typescript issue
  return <S.Input type="checkbox" ref={ref} onClick={handleClick} {...rest}/>
}
