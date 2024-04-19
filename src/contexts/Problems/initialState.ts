import { NEW_PERSONALIZED_PROBLEMS_INITIAL_FIELDS } from 'constants/Problems'

import { ProblemsStateTypes } from 'types/Problems'

import { CAUSE } from 'enums/Causes'
import { SORTING_TYPES } from 'enums/Global'
import { PROBLEM } from 'enums/Problems'

import {
  data_performance,
  data_recent_trend
} from 'components/StackedBarChart/data'

const problemsWithAssociatedCauses = [
  {
    id: 113,
    name: 'Murder',
    totalCauses: 10,
    totalPrioritizedCauses: 5
  },
  {
    id: 113,
    name: 'Theft',
    totalCauses: 15,
    totalPrioritizedCauses: 7
  },
  {
    id: 113,
    name: 'Killing',
    totalCauses: 22,
    totalPrioritizedCauses: 3
  },
  {
    id: 113,
    name: 'Murder',
    totalCauses: 5,
    totalPrioritizedCauses: 1
  },
  {
    id: 115,
    name: 'Bullying',
    totalCauses: 32,
    totalPrioritizedCauses: 20
  },
  {
    id: 116,
    name: 'Murder',
    totalCauses: 9,
    totalPrioritizedCauses: 4
  }
] as const

const initialState: ProblemsStateTypes = {
  sorting: {
    column: PROBLEM.NAME,
    type: SORTING_TYPES.ASCENDING
  },
  pageIndex: 1,
  pageSize: 10,
  summary: {
    potentialProblemsTotal: 0,
    criticalProblemsTotal: 0,
    prioritizedProblemsTotal: 0
  },
  totalItems: 0,
  totalPages: 1,
  selectedProblems: [],
  problems: [],
  associatedCausesData: {
    items: [],
    pageIndex: 1,
    pageSize: 10,
    sorting: {
      column: CAUSE.NAME,
      type: SORTING_TYPES.ASCENDING
    },
    totalItems: 0,
    totalPages: 1
  },
  problemsWithAssociatedCauses: problemsWithAssociatedCauses,
  viewingProblemId: null,
  new_problem: NEW_PERSONALIZED_PROBLEMS_INITIAL_FIELDS,
  edit_problem: {}
}

export const problemDetailPageMockData = {
  problem: {
    criticality_level: 95,
    description:
      'O crime contra a propriedade é uma categoria de crime que inclui roubo, furto de veículo motorizado, furto, incêndio criminoso, vandalismo e furto em lojas.',
    harm_potential: 32,
    id: 117,
    name: 'Crime contra o patrimônio',
    performance: 76,
    prioritized: true,
    relative_incidence: 10,
    trend: 23
  },
  ratePerPopulation: 100,
  totalIncidences: 300,
  performance_dv_data: data_performance,
  recent_trend_dv_data: data_recent_trend,
  associatedCauses: [
    {
      id: 111,
      name: 'Resistência ativa a roubos e assaltos por parte das vítimas',
      justification:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget blandit ligula. Pellentesque aliquet, felis ac laoreet elementum, erat ex scelerisque tellus, non mattis lacus arcu sed lectus. Cras laoreet lorem dui, at accumsan nisi scelerisque quis. Sed vulputate dictum sapien non dictum.',
      status: true,
      recent_trend: -50,
      author: 'Causa da literatura',
      authorName: 'Javier Velazco',
      last_updated: '4 de julho de 2023'
    },
    {
      id: 112,
      name: 'Concentração de vítimas potenciais em localidades marcadas pela ausência de guardiões e com características físicas que reduzem a vigilância natural e/ou conduzem à maior vulnerabilidade situacional',
      justification:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget blandit ligula. Pellentesque aliquet, felis ac laoreet elementum, erat ex scelerisque tellus, non mattis lacus arcu sed lectus. Cras laoreet lorem dui, at accumsan nisi scelerisque quis. Sed vulputate dictum sapien non dictum.',
      status: false,
      recent_trend: 50,
      author: 'Causa personalizada',
      authorName: 'Javier Velazco',
      last_updated: '4 de julho de 2023'
    },
    {
      id: 113,
      name: 'Resistência ativa a roubos e assaltos por parte das vítimas',
      justification:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget blandit ligula. Pellentesque aliquet, felis ac laoreet elementum, erat ex scelerisque tellus, non mattis lacus arcu sed lectus. Cras laoreet lorem dui, at accumsan nisi scelerisque quis. Sed vulputate dictum sapien non dictum.',
      status: true,
      recent_trend: -50,
      author: 'Causa da literatura',
      authorName: 'Javier Velazco',
      last_updated: '4 de julho de 2023'
    },
    {
      id: 114,
      name: 'Concentração de vítimas potenciais em localidades marcadas pela ausência de guardiões e com características físicas que reduzem a vigilância natural e/ou conduzem à maior vulnerabilidade situacional',
      justification:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget blandit ligula. Pellentesque aliquet, felis ac laoreet elementum, erat ex scelerisque tellus, non mattis lacus arcu sed lectus. Cras laoreet lorem dui, at accumsan nisi scelerisque quis. Sed vulputate dictum sapien non dictum.',
      status: false,
      recent_trend: 50,
      author: 'Causa personalizada',
      authorName: 'Javier Velazco',
      last_updated: '4 de julho de 2023'
    },
    {
      id: 115,
      name: 'Resistência ativa a roubos e assaltos por parte das vítimas',
      justification:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget blandit ligula. Pellentesque aliquet, felis ac laoreet elementum, erat ex scelerisque tellus, non mattis lacus arcu sed lectus. Cras laoreet lorem dui, at accumsan nisi scelerisque quis. Sed vulputate dictum sapien non dictum.',
      status: true,
      recent_trend: -50,
      author: 'Causa da literatura',
      authorName: 'Javier Velazco',
      last_updated: '4 de julho de 2023'
    },
    {
      id: 116,
      name: 'Concentração de vítimas potenciais em localidades marcadas pela ausência de guardiões e com características físicas que reduzem a vigilância natural e/ou conduzem à maior vulnerabilidade situacional',
      justification:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget blandit ligula. Pellentesque aliquet, felis ac laoreet elementum, erat ex scelerisque tellus, non mattis lacus arcu sed lectus. Cras laoreet lorem dui, at accumsan nisi scelerisque quis. Sed vulputate dictum sapien non dictum.',
      status: false,
      recent_trend: 50,
      author: 'Causa personalizada',
      authorName: 'Javier Velazco',
      last_updated: '4 de julho de 2023'
    },
    {
      id: 117,
      name: 'Resistência ativa a roubos e assaltos por parte das vítimas',
      justification:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget blandit ligula. Pellentesque aliquet, felis ac laoreet elementum, erat ex scelerisque tellus, non mattis lacus arcu sed lectus. Cras laoreet lorem dui, at accumsan nisi scelerisque quis. Sed vulputate dictum sapien non dictum.',
      status: true,
      recent_trend: -50,
      author: 'Causa da literatura',
      authorName: 'Javier Velazco',
      last_updated: '4 de julho de 2023'
    },
    {
      id: 118,
      name: 'Concentração de vítimas potenciais em localidades marcadas pela ausência de guardiões e com características físicas que reduzem a vigilância natural e/ou conduzem à maior vulnerabilidade situacional. Resistência ativa a roubos e assaltos por parte das vítimas',
      justification:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget blandit ligula. Pellentesque aliquet, felis ac laoreet elementum, erat ex scelerisque tellus, non mattis lacus arcu sed lectus. Cras laoreet lorem dui, at accumsan nisi scelerisque quis. Sed vulputate dictum sapien non dictum.',
      status: false,
      recent_trend: 50,
      author: 'Causa personalizada',
      authorName: 'Javier Velazco',
      last_updated: '4 de julho de 2023'
    }
  ]
}

export default initialState
