import { OmitMultiple } from 'utils/ts-utils'

export type UserModel = {
  email: string
  id: number
  isActive: boolean
  lastName: string
  name: string
}

export type AdminContextProps = {
  adminState: AdminStateProps
  setAdminState: React.Dispatch<React.SetStateAction<AdminStateProps>>
}

export type sortingType = { column: string; type: string }

export type AdminStateProps = {
  actions?: any
  users?: UserModel[]
  table?: any
  paginatedUsers?: UserModel[]
  pageIndex: number
  pageSize: number
  search: string
  totalPages: number
  totalItems: number
  sorting: sortingType
  selectedUsers: UserModel[]
  resendInviteSelectedUsers: UserModel[]
}

type UsersTableWidthConfigExcludeKeys = ['id', 'lastName']

export type UsersTableWidthConfigTypes = OmitMultiple<
  UserModel,
  UsersTableWidthConfigExcludeKeys[number]
> & {
  select: string
}
