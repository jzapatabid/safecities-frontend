import { SELECT_TABLE_FIRST_COLUMN } from 'enums/Global'

export enum USER {
  NAME = 'name',
  EMAIL = 'email',
  STATUS = 'isActive',
  LAST_NAME = 'lastName'
}

export enum USERS_TABLE_COLUMN_IDS {
  NAME = 'name',
  EMAIL = 'email',
  status = 'isActive'
}

export const USERS_TABLE_COLUMNS_WIDTHS = {
  ...SELECT_TABLE_FIRST_COLUMN,
  ...USERS_TABLE_COLUMN_IDS
} as const
