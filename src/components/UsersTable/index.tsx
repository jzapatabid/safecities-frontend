import { useMemo, useRef, useEffect, HTMLProps } from 'react'
import { useState } from 'react'

import { USERS_TABLE_WIDTH_CONFIG } from 'constants/Admin'
import { TABLE_COLUMN_VARIANT } from 'constants/Global'

import { useAdminData } from 'contexts/Admin'

import { UserModel } from 'types/Admin'

import { USER } from 'enums/Admin'
import { SELECT_TABLE_FIRST_COLUMN, SORTING_TYPES } from 'enums/Global'

import { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table'

import * as S from './styles'

import PaginationTable from 'components/PaginatedTable'
import TagV2 from 'components/Tag'
import { FormattedMessage } from 'react-intl'

export default function UsersTable({ users }: { users?: UserModel[] }) {
  const { adminState, setAdminState } = useAdminData()
  const [sorting, setSorting] = useState<SortingState>([
    { id: `${USER.NAME}-${TABLE_COLUMN_VARIANT.SORTING}`, desc: false }
  ])
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10
  })

  const handleUserSelections = (selectedUsers: UserModel[]) => {
    setAdminState((state) => ({
      ...state,
      selectedUsers,
      resendInviteSelectedUsers: selectedUsers
    }))
  }

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  )

  useEffect(() => {
    let column = ''
    let type = ''

    if (sorting.length !== 0) {
      const { id, desc } = sorting[0]
      column = id.split('-')[0]
      type = desc ? SORTING_TYPES.DESCENDING : SORTING_TYPES.ASCENDING
    } else {
      setSorting([
        { id: `${USER.NAME}-${TABLE_COLUMN_VARIANT.SORTING}`, desc: false }
      ])
      return
    }

    setAdminState((state) => ({
      ...state,
      pageSize,
      pageIndex,
      sorting: { column, type }
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sorting])

  const data = users
  const columns = useMemo<ColumnDef<UserModel>[]>(
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
        accessorFn: (row) => row[USER.NAME] + ' ' + row[USER.LAST_NAME],
        id: `${USER.NAME}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) => info.getValue(),
        header: () => <span><FormattedMessage id='user.table.name'/></span>
      },
      {
        accessorFn: (row) => row.email,
        id: USER.EMAIL,
        cell: (info) => info.getValue(),
        header: () => <span><FormattedMessage id='login.email.label'/></span>
      },
      {
        accessorFn: (row) => row.isActive,
        id: `${USER.STATUS}-${TABLE_COLUMN_VARIANT.SORTING}`,
        cell: (info) => <TagV2 label={info.getValue() ? 'Ativo' : 'Inativa'} />,
        header: () => <span><FormattedMessage id='diagnosis.problem.table.status'/></span>
      }
    ],
    []
  )

  return (
    <>
      <PaginationTable
        {...{
          data: data || [],
          columns,
          footer: true,
          showEmptyRows: true,
          widthConfig: USERS_TABLE_WIDTH_CONFIG,
          pagination: { state: pagination, setPagination },
          totalPages: adminState.totalPages,
          totalItems: adminState.totalItems,
          setSorting,
          sorting,
          onRowSelection: handleUserSelections
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

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate, rest.checked])
  // @ts-expect-error It is typescript issue
  return <S.Input type="checkbox" ref={ref} {...rest} />
}
