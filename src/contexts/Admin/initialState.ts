export const initialState = {
  users: [],
  paginatedUsers: [],
  pageIndex: 1,
  pageSize: 10,
  search: '',
  totalItems: 0,
  totalPages: 1,
  sorting: { column: 'name', type: 'asc' },
  selectedUsers: [],
  resendInviteSelectedUsers: []
}
