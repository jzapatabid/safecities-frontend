import { useMemo, useRef, useEffect, HTMLProps } from 'react'

import { useAdminData } from 'contexts/Admin'

import { UserModel } from 'types/Admin'

import { ColumnDef } from '@tanstack/react-table'

import * as S from './styles'

import Table from 'components/Table'

type usersTableWidthConfigTypes = {
  select: string
  name: string
}

const widthConfig: usersTableWidthConfigTypes = {
  select: '70px',
  name: '250px'
}

export default function ResendInviteTable({ data }: { data: UserModel[] }) {
  const { setAdminState } = useAdminData()
  const columns = useMemo<ColumnDef<UserModel>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <S.InputColumnWrapper>
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler()
              }}
           />
          </S.InputColumnWrapper>
        ),
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
        accessorFn: (row) => row.name + ' ' + row.lastName,
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>
      },
      {
        accessorFn: (row) => row.email,
        id: 'email',
        cell: (info) => info.getValue(),
        header: () => <span>Email</span>
      }
    ],
    []
  )

  const handleRowSelections = (resendInviteSelectedUsers: UserModel[]) => {
    setAdminState((state) => ({ ...state, resendInviteSelectedUsers }))
  }

  return (
    <>
      <Table
        {...{
          data,
          columns,
          footer: false,
          showEmptyRows: false,
          allRowsSelectedAtStart: true,
          widthConfig,
          onRowSelection: handleRowSelections
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
  //   @ts-expect-error It is typescript issue
  return <S.Input type="checkbox" ref={ref} {...rest}/>
}
