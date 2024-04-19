import { SELECT_TABLE_FIRST_COLUMN } from 'enums/Global'

export enum PROBLEM {
  ID = 'id',
  NAME = 'name',
  STATUS = 'prioritized',
  DESCRIPTION = 'description',
  PERFORMANCE = 'performance',
  RECENT_TREND = 'trend',
  RELATIVE_FREQUENCY = 'relative_incidence',
  POTENTIAL_DAMAGE = 'harm_potential',
  CRITITCALITY_LEVEL = 'criticality_level',
  IS_DEFAULT = 'is_default'
}

export const {
  ID: DO_NOT_USE_ID,
  DESCRIPTION: DO_NOT_USE_DESCRIPTION,
  ...PROBLEMS_TABLE_COLUMNS_IDS
} = {
  ...SELECT_TABLE_FIRST_COLUMN,
  ...PROBLEM
}

export enum PROBLEM_SUMMARY_FIELDS_ACCESSOR {
  TOTAL_PROBLEMS = 'potentialProblemsTotal',
  TOTAL_CRITICAL_PROBLEMS = 'criticalProblemsTotal',
  TOTAL_PRIORITIZED_PROBLEMS = 'prioritizedProblemsTotal'
}

export enum PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT {
  CRITICAL = 'Critical',
  NORMAL = ''
}

export enum PROBLEMS_ACTION {
  PRIORITIZE = 'prioritize',
  DEPRIORITIZE = 'deprioritize'
}
