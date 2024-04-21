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
  INITIATIVES_TABLE_WIDTH_CONFIG,
  INITIATIVE_RELATIONSHIPS_MODAL_PROPS,
  INITIATIVE_STATUS
} from 'constants/Plan'
import { PROBLEMS_TABLE_COLUMNS_NAMES } from 'constants/Problems'
import { INITIATIVES_TABLE_COLUMNS_NAMES } from 'constants/Problems'

import { useInitiatives } from 'contexts/Initiatives'
import { useModal } from 'contexts/Modal'

import { InitiativesModel } from 'types/Initiatives'

import { SELECT_TABLE_FIRST_COLUMN, SORTING_TYPES } from 'enums/Global'
import { INITIATIVE } from 'enums/Plan'

import { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table'
import Link from 'next/link'
import { getAPIClient } from 'services/axios'
import { getInitiativesAssociations } from 'services/initiatives'
import { camelToSnake } from 'utils'

import * as S from './styles'
import theme from 'styles/theme'

import FlagFilledIcon from 'components/icons/FlagFilledIcon'
import PaginatedTable from 'components/PaginatedTable'
import TubelightIndicator from 'components/TubelightIndicator'
import { FormattedMessage } from 'react-intl'

export const getCostLabel: { [key: number]: string } = {
  1: 'Baixo',
  2: 'Médio',
  3: 'Alto'
}

export const getEfficiencyLabel: { [key: number]: any } = {
  1: <FormattedMessage id='efficiency.1'/>,
  2: <FormattedMessage id='efficiency.2'/>,
  3: <FormattedMessage id='efficiency.3'/>,
  4: <FormattedMessage id='efficiency.4'/>,
  5: <FormattedMessage id='efficiency.5'/>
}

export default function InitiativesTable({
  problems,
  search,
  setGlobalSearch
}: {
  problems: InitiativesModel[]
  search?: string
  setGlobalSearch?: Dispatch<SetStateAction<string>>
}) {
  const { setModalState } = useModal()
  const apiClient = getAPIClient()
  const { initiativesState, setInitiativesState } = useInitiatives()
  const [sorting, setSorting] = useState<SortingState>([
    { id: `${camelToSnake(INITIATIVE.NAME)}-sorting`, desc: false }
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

  const handleShowRelations = async (initiative: any) => {
    const associations = await getInitiativesAssociations(apiClient, [
      `${initiative.original.initiativeId}`
    ])
    setModalState({
      ...INITIATIVE_RELATIONSHIPS_MODAL_PROPS,
      contentProps: {
        initiatives: associations,
        type: null
      }
    })
  }

  const data = problems
  const columns = useMemo<ColumnDef<InitiativesModel>[]>(
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
        accessorFn: (row) => row[INITIATIVE.NAME],
        id: `${camelToSnake(INITIATIVE.NAME)}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) => {
          const name =
            `${info.getValue()}`.charAt(0).toUpperCase() +
            `${info.getValue()}`.slice(1)
          return (
            <Link
              href={`/planejamento/associar-iniciativas/${info.row.original.initiativeId}`}
              passHref
            >
              <S.ProblemName selected={info.row.getIsSelected()}>
                {name}
              </S.ProblemName>
            </Link>
          )
        },
        header: () => (
          <S.ColumnName>
            {<FormattedMessage id={INITIATIVES_TABLE_COLUMNS_NAMES.NAME}/> || <FormattedMessage id={PROBLEMS_TABLE_COLUMNS_NAMES.NAME}/>}
          </S.ColumnName>
        )
      },
      {
        accessorFn: (row) => row[INITIATIVE.STATUS],
        id: `${INITIATIVE.STATUS}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) =>
          info.getValue() === true ? (
            <S.StatusWrapper>
              <FlagFilledIcon fill={theme.colors.base.lightPure}/>
              {INITIATIVE_STATUS.PRIORITIZED}
            </S.StatusWrapper>
          ) : (
            INITIATIVE_STATUS.NOT_PRIORITIZED
          ),
        header: () => (
          <S.ColumnHeader>{<FormattedMessage id={PROBLEMS_TABLE_COLUMNS_NAMES.STATUS}/>}</S.ColumnHeader>
        )
      },
      {
        accessorFn: (row) =>
          `${row[INITIATIVE.TOTAL_PROBLEMS]} Problemas ${
            row[INITIATIVE.TOTAL_CAUSES]
          } Causas`,
        id: `${camelToSnake(
          INITIATIVE.TOTAL_PROBLEMS +
            INITIATIVE.TOTAL_CAUSES.slice(0, 1).toUpperCase() +
            INITIATIVE.TOTAL_CAUSES.slice(1)
        )}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) => (
          <S.RelationsName
            onClick={() => handleShowRelations(info.row)}
            selected={info.row.getIsSelected()}
          >
            {info.getValue()}
          </S.RelationsName>
        ),
        header: () => (
          <S.ColumnRelations>
            {<FormattedMessage id={INITIATIVES_TABLE_COLUMNS_NAMES.PROBLEMS}/> ||
              <FormattedMessage id={PROBLEMS_TABLE_COLUMNS_NAMES.PERFORMANCE}/>}
          </S.ColumnRelations>
        )
      },
      {
        accessorFn: (row) => row[INITIATIVE.COST],
        id: `${camelToSnake(INITIATIVE.COST)}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) => (
          <S.IndicatorWrapper>
            <TubelightIndicator
              score={info.getValue() as number}
              label={getCostLabel[info.getValue() as number]}
              type={INITIATIVE.COST}
           />
          </S.IndicatorWrapper>
        ),
        header: () => (
          <S.ColumnTrend>
            {<FormattedMessage id={INITIATIVES_TABLE_COLUMNS_NAMES.ESTIMATED}/> || <FormattedMessage id={PROBLEMS_TABLE_COLUMNS_NAMES.RECENT_TREND}/>}
          </S.ColumnTrend>
        )
      },
      {
        accessorFn: (row) => row[INITIATIVE.EFFICIENCY],
        id: `${camelToSnake(INITIATIVE.EFFICIENCY)}-${
          TABLE_COLUMN_VARIANT.SORTING
        }`,
        cell: (info) => (
          <S.IndicatorWrapper>
            <TubelightIndicator
              score={info.getValue() as number}
              label={getEfficiencyLabel[info.getValue() as number]}
              type={INITIATIVE.EFFICIENCY}
           />
          </S.IndicatorWrapper>
        ),
        header: () => (
          <S.ColumnEffectiveness>
            {<FormattedMessage id={INITIATIVES_TABLE_COLUMNS_NAMES.EFFECTYIVENESS}/> ||
              <FormattedMessage id={PROBLEMS_TABLE_COLUMNS_NAMES.CRITITCALITY_LEVEL}/>}
          </S.ColumnEffectiveness>
        )
      }
    ],
    []
  )

  const handleRowSelection = useCallback(
    (selectedInitiatives: InitiativesModel[]) => {
      setInitiativesState((state) => ({ ...state, selectedInitiatives }))
    },
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
      setSorting([
        { id: `${camelToSnake(INITIATIVE.NAME)}-sorting`, desc: false }
      ])
      return
    }

    setInitiativesState((state) => ({
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
          widthConfig: INITIATIVES_TABLE_WIDTH_CONFIG,
          pagination: { state: pagination, setPagination },
          totalPages: initiativesState.totalPages || 1,
          totalItems: initiativesState.totalItems || 0,
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
  return <S.Input type="checkbox" ref={ref} onClick={handleClick} {...rest}/>
}
