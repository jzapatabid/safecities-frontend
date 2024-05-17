// import { INITIATIVE_COSTS } from 'contexts/Initiatives/initialState'

// import { PROBLEMS_SUMMARY_FIELDS_NAME } from 'constants/Problems'

import { InitiativesSummaryFieldPropsTypes } from 'types/Initiatives'

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

import { FormattedMessage } from 'react-intl'

const PLAN_NAV_LINKS = [
  {
    id: 1,
    href: '/planejamento/associar-iniciativas',
    label: 'Associar iniciativas',
    disabled: false
  },
  {
    id: 2,
    href: '/planejamento/construir-plano',
    label: 'Construir plano',
    disabled: false
  }
] as const

const PLAN_DISCLAIMER = {
  line1:
    'O processo de identificação, análise e priorização de soluções é altamente complexo.',
  line2:
    'A plataforma suporta uma parte importante, mas não todas as atividades necessárias.'
} as const

const CONSTRUCT_PLAN_DISCLAIMER = {
  line1:
    'Construr um plano municipal é um processo altamente complexo. A plataforma apoiará sua cidade numa parte',
  line2:
    'importante, mas há outras atividades “offline” que também serão necessárias.'
}

const INITIATIVES_SUMMARY_FIELDS_NAME = {
  TOTAL_PRIORITIZED_CAUSES: 'Causas priorizadas',
  TOTAL_PRIORITIZED_PROBLEMS: 'Problemas priorizados',
  TOTAL_ASSOCIATED: 'já associados com iniciativas.'
} as const

const INITIATIVES_ACTION_MODAL_PROPS = {
  [INITIATIVES_ACTION.PRIORITIZE]: {
    open: true,
    title: 'Priorizar a inciativa',
    desc: 'Você tem certeza de que deseja priorizar esta iniciativa?',
    cancelBtn: 'Cancelar',
    confirmBtn: 'Priorizar iniciativa',
    actionType: INITIATIVES_ACTION.PRIORITIZE,
    Content: InitiativesModalContent,
    type: MODAL_TYPE.SIDESHEET
  },
  [INITIATIVES_ACTION.DEPRIORITIZE]: {
    open: true,
    title: 'Despriorizar a inciativa',
    desc: 'Você tem certeza de que deseja despriorizar esta iniciativa?',
    cancelBtn: 'Cancelar',
    confirmBtn: 'Despriorizar iniciativa',
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
    'Por favor, primeiro selecione uma causa para definir os problemas a serem priorizados com esta iniciativa.'
} as const

const PLANS_TEMP_SUMMARY_FIELDS = [
  {
    label1: 'Problemas priorizados',
    label2: 'Ver problemas',
    link: '/diagnostico/problemas-potenciais',
    type: PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT.NORMAL,
    key: 'prioritizedProblems',
    label: 'Problemas priorizados'
  },
  {
    label1: 'Causas priorizadas',
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
      label2: 'de un total de XX problemas registrados',
      type: PROBLEMS_SUMMARY_FIELDS_CRITICALITY_VARIANT.NORMAL
    },
    {
      key1: INITIATIVES_SUMMARY_FIELDS_ACCESSOR.TOTAL_PRIORITIZED_CAUSES,
      key2: INITIATIVES_SUMMARY_FIELDS_ACCESSOR.TOTAL_ASSOCIATED_CAUSES,
      label1: INITIATIVES_SUMMARY_FIELDS_NAME.TOTAL_PRIORITIZED_CAUSES,
      label2: 'de un total de XX causas registrados',
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
  title: 'Adicione uma nova iniciativa',
  cancelBtn: 'Cancelar',
  confirmBtn: 'Salvar',
  Content: PersonalizedInitiative
}

const EDIT_PERSONALIZED_INITIATIVE_MODAL_PROPS = {
  type: MODAL_TYPE.SIDESHEET,
  open: true,
  title: 'Editar iniciativa',
  cancelBtn: 'Cancelar',
  confirmBtn: 'Salvar',
  dangerBtn: 'Excluir iniciativa',
  Content: PersonalizedInitiative
}

const INITIATIVE_STATUS = {
  PRIORITIZED: 'Priorizado',
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
    title: 'Informações básicas',
    dateTitle: 'Última atualização: ',
    description: 'Horizonte temporal e identidade visual',
    href: '/planejamento/plan-basic-information',
    idx: 0
  },
  {
    dataKey: 'diagnosisStatus',
    title: 'Construir a síntese do diagnóstico',
    dateTitle: 'Última atualização: ',
    description:
      'Onde estamos? Resumo executivo dos principais problemas atuais e suas causas',
    href: '/planejamento/plan-diagnostic-summary',
    idx: 1
  },
  {
    dataKey: 'strategicDimensionStatus',
    title: 'Construir a dimensão estratégica do plano',
    dateTitle: 'Última atualização: ',
    description:
      'Aonde queremos chegar? Macrobjetivos e focos estratégicos do plano',
    href: '/planejamento/plan-strategy-dimension',
    idx: 2
  },
  {
    dataKey: 'tacticalDimensionStatus',
    title: 'Construir a dimensão tática do plano',
    dateTitle: 'Última atualização: ',
    description:
      'Como vamos chegar lá? Detalhamento das iniciativas estratégicas',
    href: '/planejamento/plan-tactical-dimension',
    idx: 3
  }
]

const ADD_NEW_INDICATOR_MODAL_PROPS = {
  type: MODAL_TYPE.SIDESHEET,
  open: true,
  title: 'Adicionar novo indicador',
  cancelBtn: 'Cancelar',
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
  cancelBtn: 'Cancelar',
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
    label: 'Informações básicas',
    disabled: false
  },
  {
    id: 2,
    href: '/planejamento/plan-diagnostic-summary',
    label: 'Construir a síntese do diagnóstico',
    disabled: false
  },
  {
    id: 3,
    href: '/planejamento/plan-strategy-dimension',
    label: 'Construir a dimensão estratégica do plano',
    disabled: false
  },
  {
    id: 4,
    href: '/planejamento/plan-tactical-dimension',
    label: 'Construir a dimensão tática do plano',
    disabled: false
  }
] as const

const PLAN_STRATEGY_PRIMARY_NAV_LINKS = [
  {
    id: 2,
    href: '/planejamento/plan-strategy-dimension/macro-objectives',
    label: 'Macro objetivos estratégicos',
    disabled: false
  },
  {
    id: 3,
    href: '/planejamento/plan-strategy-dimension/focus-objectives',
    label: 'Focos preventivos',
    disabled: false
  }
] as const

const PLAN_DISGNOSIS_SUMMARY_NAV_LINKS = [
  {
    id: 1,
    href: '/planejamento/plan-diagnostic-summary/problem-diagnosis',
    label: 'Problemas',
    disabled: false
  },
  {
    id: 2,
    href: '/planejamento/plan-diagnostic-summary/causes-diagnosis',
    label: 'Causas',
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
