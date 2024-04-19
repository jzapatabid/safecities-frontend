export enum INITIATIVES_SUMMARY_FIELDS_ACCESSOR {
  TOTAL_PRIORITIZED_CAUSES = 'totalPrioritizedCauses',
  TOTAL_PRIORITIZED_PROBLEMS = 'totalPrioritizedProblems',
  TOTAL_ASSOCIATED_PROBLEMS = 'totalProblems',
  TOTAL_ASSOCIATED_CAUSES = 'totalCauses'
}

export enum INITIATIVE {
  ID = 'initiativeId',
  NAME = 'initiativeName',
  STATUS = 'prioritized',
  JUSTIFICATION = 'justification',
  EVIDENCES = 'evidences',
  TOTAL_CAUSES = 'totalCauseCount',
  TOTAL_PROBLEMS = 'totalProblemCount',
  COST = 'costLevel',
  EFFICIENCY = 'efficiencyLevel'
}

export enum INITIATIVES_ACTION {
  PRIORITIZE = 'prioritize',
  DEPRIORITIZE = 'deprioritize'
}
