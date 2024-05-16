// import { INITIATIVE_COSTS } from 'contexts/Initiatives/initialState'

// import { PROBLEMS_SUMMARY_FIELDS_NAME } from 'constants/Problems'

import { InitiativesSummaryFieldPropsTypes } from 'types/Initiatives'
import { FormattedMessage }  from 'react-intl'





import {
  INITIATIVES_ACTION,
  INITIATIVES_SUMMARY_FIELDS_ACCESSOR
} from 'enums/Plan'
import { PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT } from 'enums/Problems'

import PlusSignIcon from 'components/icons/PlusSignIcon'
import { MODAL_TYPE } from 'components/Modal'
import InitiativesModalContent from 'components/ModalContents/Initiatives'
import NewIndicator from 'components/ModalContents/NewIndicator'
import NewPlanMeta from 'components/ModalContents/NewPlanMeta'
import PersonalizedInitiative from 'components/ModalContents/PersonalizedInitiative'



const PLAN_NAV_LINKS = [
  {
    id: 1,
    href: '/planejamento/associar-iniciativas',
    label: 'planning.associate.initiatives.title',
    disabled: false
  },
  {
    id: 2,
    href: '/planejamento/construir-plano',
    label: 'planning.build.plan.title',
    disabled: false
  }
] as const

const PLAN_DISCLAIMER = {
  line1:'causes.info.section',
  line2:'causes.info.section.second',
} as const

const CONSTRUCT_PLAN_DISCLAIMER = {
  line1: 'plan.section.description',
  line2:'plan.section.description.second',
}



const INITIATIVES_SUMMARY_FIELDS_NAME = {
  TOTAL_PRIORITIZED_CAUSES: 'planning.prioritized.causes.card',
  TOTAL_PRIORITIZED_PROBLEMS:  'diagnosis.prioritized.problems.card',
  TOTAL_ASSOCIATED: 'Ver más',
} as const

const INITIATIVES_ACTION_MODAL_PROPS = {
  [INITIATIVES_ACTION.PRIORITIZE]: {
    open: true,
    title: 'planning.prioritize.initiative.button',
    desc: 'planning.prioritize.desc',
    cancelBtn: 'button.cancel',
    confirmBtn: 'planning.prioritize.initiative.button',
    actionType: INITIATIVES_ACTION.PRIORITIZE,
    Content: InitiativesModalContent,
    type: MODAL_TYPE.SIDESHEET
  },
  [INITIATIVES_ACTION.DEPRIORITIZE]: {
    open: true,
    title: 'planning.deprioritize.initiative.button',
    desc: 'planning.deprioritize.desc',
    cancelBtn: 'button.cancel',
    confirmBtn: 'planning.deprioritize.initiative.button',
    actionType: INITIATIVES_ACTION.DEPRIORITIZE,
    Content: InitiativesModalContent,
    type: MODAL_TYPE.SIDESHEET
  }
} as const

const INITIATIVE_RELATIONSHIPS_MODAL_PROPS = {
  open: true,
  title: 'Ver relacionamento',
  confirmBtn: 'Entendido',
  Content: InitiativesModalContent,
  type: MODAL_TYPE.SIDESHEET,
  confirmIcon: 'NoIcon'
} as const

const INITIATIVES_PRIORITIZATION_DISCLAIMER = {
  line1:
    'causes.modal.deprioritize.disclaimer'
} as const

const PLANS_TEMP_SUMMARY_FIELDS = [
  {
    label1: 'diagnosis.prioritized.problems.card',
    label2: 'Ver problemas',
    link: '/diagnostico/problemas-potenciais',
    type: PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT.NORMAL,
    key: 'prioritizedProblems',
    label: 'Problemas priorizados'
  },
  {
    label1: 'planning.prioritized.causes.card',
    label2: 'Ver causas',
    link: '/diagnostico/causes-possiveis',
    type: PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT.NORMAL,
    key: 'prioritizedCauses',
    label: 'Causas priorizadas'
  },
  {
    label1: 'Causas priorizadas',
    label2: 'Ver iniciativas',
    key: 'prioritizedInitiatives',
    label: 'Iniciativas priorizadas',
    link: '/planejamento/associar-iniciativas',
    type: PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT.NORMAL
  }
] as const

const INITIATIVES_SUMMARY_FIELDS: readonly InitiativesSummaryFieldPropsTypes[] =
  [
    {
      key1: INITIATIVES_SUMMARY_FIELDS_ACCESSOR.TOTAL_PRIORITIZED_PROBLEMS,
      key2: INITIATIVES_SUMMARY_FIELDS_ACCESSOR.TOTAL_ASSOCIATED_PROBLEMS,
      label1: INITIATIVES_SUMMARY_FIELDS_NAME.TOTAL_PRIORITIZED_PROBLEMS,
      label2: INITIATIVES_SUMMARY_FIELDS_NAME.TOTAL_ASSOCIATED,
      type: PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT.NORMAL
    },
    {
      key1: INITIATIVES_SUMMARY_FIELDS_ACCESSOR.TOTAL_PRIORITIZED_CAUSES,
      key2: INITIATIVES_SUMMARY_FIELDS_ACCESSOR.TOTAL_ASSOCIATED_CAUSES,
      label1: INITIATIVES_SUMMARY_FIELDS_NAME.TOTAL_PRIORITIZED_CAUSES,
      label2: INITIATIVES_SUMMARY_FIELDS_NAME.TOTAL_ASSOCIATED,
      type: PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT.NORMAL
    }
  ] as const

const PLANS_SUMMARY_FIELDS = [
  {
    key1: 'totalPrioritizedProblems',
    label1: 'Problemas priorizados',
    label2: 'Ver problemas',
    link: '/diagnostico/problemas-potenciais',
    type: PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT.NORMAL
  },
  {
    key1: 'totalPrioritizedCauses',
    label1: 'Causas priorizadas',
    label2: 'Ver causas',
    link: '/diagnostico/causes-possiveis',
    type: PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT.NORMAL
  }
] as const

const INITIATIVES_TABLE_WIDTH_CONFIG = {
  select: '5%',
  name: '35%',
  status: '15%',
  performance: '19%',
  trend: '13.2065%',
  criticality_level: '13.2065%'
} as const



const NEW_PERSONALIZED_INITIATIVE_MODAL_PROPS = {
  type: MODAL_TYPE.SIDESHEET,
  open: true,
  title: 'add.initiative.title',
  cancelBtn: 'button.cancel',
  confirmBtn: 'button.save',
  Content: PersonalizedInitiative
}

const EDIT_PERSONALIZED_INITIATIVE_MODAL_PROPS = {
  type: MODAL_TYPE.SIDESHEET,
  open: true,
  title: 'edit.initiative',
  cancelBtn: 'button.cancel',
  confirmBtn: 'button.save',
  dangerBtn: 'causes.title.exclude.initiative',
  Content: PersonalizedInitiative
}

const INITIATIVE_STATUS = {
  PRIORITIZED: 'prioritized.text',
  NOT_PRIORITIZED: ''
} as const

// const INITIATIVE_COST_LEVELS = [
//   { id: 1, text: 'Baixo', checked: false },
//   { id: 2, text: 'Médio', checked: false },
//   { id: 3, text: 'Alto', checked: false }
// ] as const

// const INITIATIVE_EFFICIENCY_LEVELS = [
//   { id: 1, text: 'Efeito negativo', checked: false },
//   { id: 2, text: 'Sem efeitos', checked: false },
//   { id: 3, text: 'Evidência mista', checked: false },
//   { id: 4, text: 'Promissora', checked: false },
//   { id: 5, text: 'Efetiva', checked: false }
// ] as const

const PLANS_PROGRESS_CARDS_STATIC_FIELDS = [
  {
    dataKey: 'basicInformationStatus',
    title: 'planning.stats.card.title.1',
    dateTitle: "last.update.footer.text",
    description: 'planning.stats.card.description.1',
    href: '/planejamento/plan-basic-information',
    idx: 0
  },
  {
    dataKey: 'diagnosisStatus',
    title: 'planning.stats.card.title.2',
    dateTitle: 'Última atualização: ',
    description:'planning.stats.card.description.2',
    href: '/planejamento/plan-diagnostic-summary',
    idx: 1
  },
  {
    dataKey: 'strategicDimensionStatus',
    title: 'planning.stats.card.title.3',
    dateTitle: 'Última atualização: ',
    description:'planning.stats.card.description.3',
    href: '/planejamento/plan-strategy-dimension',
    idx: 2
  },
  {
    dataKey: 'tacticalDimensionStatus',
    title: 'planning.stats.card.title.4',
    dateTitle: 'Última atualização: ',
    description:'planning.stats.card.description.4',
    href: '/planejamento/plan-tactical-dimension',
    idx: 3
  }
]

const ADD_NEW_INDICATOR_MODAL_PROPS = {
  type: MODAL_TYPE.SIDESHEET,
  open: true,
  title: 'Adicionar novo indicador',
  cancelBtn: 'button.cancel',
  confirmBtn: 'Adicionar novo indicador',
  confirmIcon: PlusSignIcon,
  Content: NewIndicator
} as const

const NEW_INDICATOR_DISCLAIMER = {
  line1:
    'Ao definir um novo indicador, considere os seguintes critérios de qualidade'
} as const

const NEW_INDICATOR_RCSECVP_DESC_DETAILS = [
  'Relevância e Validade (indicador, isto é, a forma de mensuração, é efetivamente relevante para medir o objetivo que se almeja descrever, bem como é adequada para refletir o conceito/objetivo que ele busca mensurar)',
  'Confiabilidade (propriedade relacionada à qualidade do levantamento dos dados usados no seu cômputo)',
  'Sensibilidade (capacidade do indicador de expressar variações ocorridas naquele segmento realidade ao qual o objetivo se refere)',
  'Especificidade (capacidade do indicador em refletir alterações estritamente relacionadas ao objetivo que ele busca mensurar/quantificar)',
  'Comunicabilidade ou Inteligibilidade (passível e fácil de ser compreendido por atores internos e externos à Prefeitura)',
  'Viabilidade (devem ser selecionados indicadores cuja coleta de dados para mensuração seja simples e a prazos e custos razoáveis)',
  'Periodicidade e Factibilidade (passível de ser atualizável periodicamente)'
] as const

const ADD_NEW_PLAN_META_MODAL_PROPS = {
  type: MODAL_TYPE.SIDESHEET,
  open: true,
  title: 'Adicionar nova meta',
  cancelBtn: 'button.cancel',
  confirmBtn: 'Adicionar nova meta',
  confirmIcon: PlusSignIcon,
  Content: NewPlanMeta
} as const

const NEW_PLAN_META_DISCLAIMER = {
  line1:
    'Ao definir uma nova meta, considere os seguintes critérios de qualidade “S.M.A.R.T.“, as quais são definidas com base em 5 critérios:'
} as const

const PLAN_META_SMART_DESC_DETAILS = [
  'S (Specific / Específica: o alcance do resultado deve ficar absolutamente claro e nítido por meio do indicador e sua meta, sem possibilidade de ambiguidades nem interpretações)',
  'M (Measurable / Mensurável: tanto durante o progresso do plano quanto ao término/conclusão do mesmo)',
  'A (Achievable / Atingível: valor passível de ser alcançado dentro das limitações de orçamento e tempo plano)',
  'R (Relevant/Relevante: adequado, de fato, para expressar o alcance do resultado e a superação do problema que se procura solucionar)',
  'T (Timely / Temporal: considerar o nível de resultado que é efetivamente possível de ser alcançado dentro do período de execução do plano).'
] as const

const PLAN_PRINARY_NAV_LINKS = [
  {
    id: 1,
    href: '/planejamento/plan-basic-information',
    label: <FormattedMessage id='planning.stats.card.title.1' />,
    disabled: false
  },
  {
    id: 2,
    href: '/planejamento/plan-diagnostic-summary',
    label: <FormattedMessage id='planning.stats.card.title.2' />,
    disabled: false
  },
  {
    id: 3,
    href: '/planejamento/plan-strategy-dimension',
    label: <FormattedMessage id='planning.stats.card.title.3' />,
    disabled: false
  },
  {
    id: 4,
    href: '/planejamento/plan-tactical-dimension',
    label: <FormattedMessage id='planning.stats.card.title.4' />,
    disabled: false
  }
] as const

const PLAN_STRATEGY_PRIMARY_NAV_LINKS = [
  {
    id: 2,
    href: '/planejamento/plan-strategy-dimension/macro-objectives',
    label: <FormattedMessage id="macro.objectives.title"/>,
    disabled: false
  },
  {
    id: 3,
    href: '/planejamento/plan-strategy-dimension/focus-objectives',
    label: <FormattedMessage id="focuses.title"/>,
    disabled: false
  }
] as const

const PLAN_DISGNOSIS_SUMMARY_NAV_LINKS = [
  {
    id: 1,
    href: '/planejamento/plan-diagnostic-summary/problem-diagnosis',
    label: <FormattedMessage id="text.problems"/>,
    disabled: false
  },
  {
    id: 2,
    href: '/planejamento/plan-diagnostic-summary/causes-diagnosis',
    label: <FormattedMessage id="text.causes"/>,
    disabled: false
  }
] as const

const PROBLEM_KPI_OPTIONS = [
  { text: 'Desempeño', dataKey: 'performance' },
  { text: 'Tendencia', dataKey: 'trend' },
  { text: 'Frequencia relativa', dataKey: 'relative_frequency' }
]

const CAUSE_KPI_OPTIONS = [{ text: 'Tendencia', dataKey: 'trend' }]

export {
  PROBLEM_KPI_OPTIONS,
  CAUSE_KPI_OPTIONS,
  // INITIATIVE_COST_LEVELS,
  // INITIATIVE_EFFICIENCY_LEVELS,
  PLAN_NAV_LINKS,
  PLAN_DISCLAIMER,
  INITIATIVES_SUMMARY_FIELDS,
  INITIATIVES_TABLE_WIDTH_CONFIG,
  NEW_PERSONALIZED_INITIATIVE_MODAL_PROPS,
  EDIT_PERSONALIZED_INITIATIVE_MODAL_PROPS,
  INITIATIVE_STATUS,
  INITIATIVES_SUMMARY_FIELDS_NAME,
  CONSTRUCT_PLAN_DISCLAIMER,
  PLANS_SUMMARY_FIELDS,
  PLANS_PROGRESS_CARDS_STATIC_FIELDS,
  ADD_NEW_PLAN_META_MODAL_PROPS,
  NEW_PLAN_META_DISCLAIMER,
  PLAN_META_SMART_DESC_DETAILS,
  ADD_NEW_INDICATOR_MODAL_PROPS,
  NEW_INDICATOR_DISCLAIMER,
  NEW_INDICATOR_RCSECVP_DESC_DETAILS,
  PLANS_TEMP_SUMMARY_FIELDS,
  PLAN_PRINARY_NAV_LINKS,
  PLAN_STRATEGY_PRIMARY_NAV_LINKS,
  INITIATIVES_ACTION_MODAL_PROPS,
  INITIATIVES_PRIORITIZATION_DISCLAIMER,
  INITIATIVE_RELATIONSHIPS_MODAL_PROPS,
  PLAN_DISGNOSIS_SUMMARY_NAV_LINKS
}
