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

import {
  ASSOCIATED_CAUSES_TABLE_COLUMNS_NAMES,
  ASSOCIATED_CAUSES_TABLE_WIDTH_CONFIG,
  CAUSE_TYPE_LABELS
} from 'constants/Causes'
import { TABLE_COLUMN_VARIANT } from 'constants/Global'
import { PROBLEM_STATUS } from 'constants/Problems'

import { useProblems } from 'contexts/Problems'

import { AssociatedCausesModel, CauseTypeModel } from 'types/Causes'

import { CAUSE, CAUSE_TYPE_ACCESSOR } from 'enums/Causes'
import { SELECT_TABLE_FIRST_COLUMN, SORTING_TYPES } from 'enums/Global'

import { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table'
import Link from 'next/link'

import * as S from './styles'
import theme from 'styles/theme'

import Book2Icon from 'components/icons/Book2Icon'
import DownwardTrendIcon from 'components/icons/DownwardTrend'
import FlagFilledIcon from 'components/icons/FlagFilledIcon'
import RecordVoiceIcon from 'components/icons/RecordVoiceIcon'
import UpwardTrendIcon from 'components/icons/UpwardTrendIcon'
import PaginatedTable from 'components/PaginatedTable'
import { FormattedMessage } from 'react-intl'

export default function AssociatedCausesTable({
  causes,
  problemName,
  problemId,
  search,
  setGlobalSearch
}: {
  causes: AssociatedCausesModel[]
  problemName: string
  problemId: number
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

  const data = causes
  const columns = useMemo<ColumnDef<AssociatedCausesModel>[]>(
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
        accessorFn: (row) => row[CAUSE.NAME],
        id: `${CAUSE.NAME}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) => {
          const name =
            `${info.getValue()}`.charAt(0).toUpperCase() +
            `${info.getValue()}`.slice(1)
          const URL =
            info.row.original.type === CAUSE_TYPE_ACCESSOR.PERSONALIZED
              ? `/diagnostico/detalhe-do-causa/customized/${info.row.original.id}-${problemId}-${problemName}`
              : `/diagnostico/detalhe-do-causa/default/${info.row.original.id}-${problemId}-${problemName}`
          return (
            <S.NameWrapper>
              <Link href={URL} passHref>
                <S.ProblemName selected={info.row.getIsSelected()}>
                  {name}
                </S.ProblemName>
              </Link>
            </S.NameWrapper>
          )
        },
        header: () => (
          <S.ColumnName>
            <FormattedMessage id={ASSOCIATED_CAUSES_TABLE_COLUMNS_NAMES.NAME}/>
          </S.ColumnName>
        )
      },
      {
        accessorFn: (row) => row[CAUSE.PRIORITIZED],
        id: `${CAUSE.PRIORITIZED}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) =>
          info.getValue() === true ? (
            <S.StatusWrapper>
              <FlagFilledIcon fill={theme.colors.base.lightPure} />
              {PROBLEM_STATUS.PRIORITIZED}
            </S.StatusWrapper>
          ) : (
            PROBLEM_STATUS.NOT_PRIORITIZED
          ),
        header: () => (
          <S.ColumnHeader>
            <FormattedMessage id={ASSOCIATED_CAUSES_TABLE_COLUMNS_NAMES.STATUS}/>
          </S.ColumnHeader>
        )
      },
      {
        accessorFn: (row) => row[CAUSE.TREND],
        id: `${CAUSE.TREND}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) => {
          if (Object.is(info.getValue(), null)) {
            return '-'
          }
          const negative = String(info.getValue()).startsWith('-')
          return (
            <S.Trend negative={negative}>
              <S.TrendText>
                {`${!negative ? '+' : ''}${info.getValue()}`}%
              </S.TrendText>
              {negative ? <DownwardTrendIcon /> : <UpwardTrendIcon />}
            </S.Trend>
          )
        },
        header: () => (
          <S.ColumnPerformance>
            <FormattedMessage id={ASSOCIATED_CAUSES_TABLE_COLUMNS_NAMES.RECENT_TREND}/>
          </S.ColumnPerformance>
        )
      },
      {
        accessorFn: (row) => row[CAUSE.TYPE],
        id: `${CAUSE.TYPE}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) => (
          <S.Author>
            {info.getValue() === CAUSE_TYPE_ACCESSOR.PERSONALIZED ? (
              <RecordVoiceIcon />
            ) : (
              <Book2Icon />
            )}
            <S.AuthorText>
              <FormattedMessage id={CAUSE_TYPE_LABELS[`${info.getValue() as CauseTypeModel}`]}/>
            </S.AuthorText>
          </S.Author>
        ),
        header: () => (
          <S.ColumnTrend>
            <FormattedMessage id={ASSOCIATED_CAUSES_TABLE_COLUMNS_NAMES.AUTHOR}/>
          </S.ColumnTrend>
        )
      }
    ],
    []
  )

  const handleRowSelection = useCallback((selectedCauses: any[]) => {
    setProblemsState((state) => ({
      ...state,
      associatedCausesData: { ...state.associatedCausesData, selectedCauses }
    }))
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
      associatedCausesData: {
        ...state.associatedCausesData,
        pageSize,
        pageIndex,
        sorting: { column, type }
      }
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sorting])

  return (
    <div style={{ marginTop: '30px' }}>
      <PaginatedTable
        {...{
          data,
          columns,
          footer: true,
          showEmptyRows: true,
          widthConfig: ASSOCIATED_CAUSES_TABLE_WIDTH_CONFIG,
          pagination: { state: pagination, setPagination },
          totalPages: problemsState.associatedCausesData.totalPages || 1,
          totalItems: problemsState.associatedCausesData.totalItems || 0,
          setSorting,
          sorting,
          onRowSelection: handleRowSelection,
          // onRowClick: handleRowClick,
          search,
          setGlobalSearch
        }}
      />
    </div>
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
  return <S.Input type="checkbox" ref={ref} onClick={handleClick} {...rest} />
}
