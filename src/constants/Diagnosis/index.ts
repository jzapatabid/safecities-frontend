const DIAGNOSIS_NAV_LINKS = [
  {
    id: 1,
    href: '/diagnostico/problemas-potenciais',
    label: 'diagnosis.potential.problems.title',
    disabled: false
  },
  {
    id: 2,
    href: '/diagnostico/causes-possiveis',
    label: 'diagnosis.possible.causes.title',
    disabled: false
  }
] as const

const DETAIL_PAGE_NAV_LINKS = [
  {
    id: 1,
    href: '/diagnostico/detalhe-do-problema',
    label: 'diagnosis.possible.causes.detail.title',
    disabled: false
  },
  {
    id: 2,
    href: '/diagnostico/causas-associadas',
    label: 'diagnosis.possible.associated.title',
    disabled: false
  }
]

export { DIAGNOSIS_NAV_LINKS, DETAIL_PAGE_NAV_LINKS }
