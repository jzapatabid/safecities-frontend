import { useEffect, useState } from 'react'

import { usePlans } from 'contexts/plans'

import Link from 'next/link'
import { getAPIClient } from 'services/axios'
import { getAllInitiativeOutcomes } from 'services/initiatives'

import * as S from './styles'

import DeptDDList from './DeptDDList'

import Dropdown from 'components/Dropdown'
import PlusSignIcon from 'components/icons/PlusSignIcon'
import ToastSuccessIcon from 'components/icons/ToastSuccessIcon'
import Input from 'components/Input'
import MultilineInput from 'components/MultilineInput'
import TextButton from 'components/TextButton'
import { FormattedMessage } from 'react-intl'

type TacticalDimensionContentProps = {
  data: any
  onInputUpdate: (field: string) => (event: any) => void
  onNeighborhoodSelect: (option: any) => void
  onAddNewDeptInvolvement: () => void
  onAddNewGoal: () => void
  onDeptSelect: (departmentId: string) => (option: any) => void
  onDeptRoleUpdate: (departmentId: string) => (event: any) => void
  onGoalSelect: (goalId: string) => (option: any) => void
  onGoalValueUpdate: (goalId: string) => (event: any) => void
  onGoalDateUpdate: (goalId: string) => (event: any) => void
}

const TacticalDimensionContent = ({
  data,
  onInputUpdate,
  onNeighborhoodSelect,
  onAddNewDeptInvolvement,
  onDeptSelect,
  onDeptRoleUpdate,
  onGoalSelect,
  onGoalValueUpdate,
  onGoalDateUpdate,
  onAddNewGoal
}: TacticalDimensionContentProps) => {
  const used_depts_id = data?.tactical_dimension.department_roles.map(
    (dept: any) => dept.department_id
  )
  const used_outcomes_id = data?.tactical_dimension.goals.map(
    (outcome: any) => outcome.initiative_outcome_id
  )
  const apiClient = getAPIClient()
  const [nhDD, setNhDD] = useState(false)
  const [allOutcomes, setAllOutcomes] = useState([])
  const { plansState } = usePlans()
  const available_departments = plansState.departments.filter(
    (dept: any) => !used_depts_id.includes(dept.id)
  )

  const handleNeighborhoodOptionClick = (clickedOption: any) => {
    onNeighborhoodSelect(clickedOption)
    setNhDD(false)
  }

  const fetchInitiativeOutcomes = async () => {
    const all_outcomes: any = await getAllInitiativeOutcomes(
      apiClient,
      data.initiative_id
    )
    setAllOutcomes(
      all_outcomes.data.map((item: any) => ({
        ...item,
        text: item.name
      }))
    )
  }

  useEffect(() => {
    fetchInitiativeOutcomes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <S.Wrapper>
      <S.SectionWrapper>
        <S.Title><FormattedMessage id="form.linkage"/></S.Title>
        <S.RelationshipsWrapper>
          <ToastSuccessIcon/>
          <S.Relationships>{`${data?.total_macro_objectives} Macro objetivos, ${data?.total_focuses} Focos`}</S.Relationships>
        </S.RelationshipsWrapper>
      </S.SectionWrapper>
      <S.SectionWrapper>
        <S.Title><FormattedMessage id="form.description"/></S.Title>
        <S.MultilineInputWrapper>
          <MultilineInput
            spellCheck={false}
            autoComplete="off"
            placeholder={<FormattedMessage id="form.description.label"/>}
            placeholderFixed
            secondaryPlaceholder=""
            value={data?.tactical_dimension?.diagnosis || ''}
            onChange={onInputUpdate('diagnosis')}
            restrictionLabel={<FormattedMessage id="form.char.max"/>}
         />
        </S.MultilineInputWrapper>
      </S.SectionWrapper>
      <S.SectionWrapper>
        <S.Title><FormattedMessage id="form.geo.orientation"/></S.Title>
        <S.DetailWrapper>
          <S.DropdownWrapper>
            <Dropdown
              singleSelect
              open={nhDD}
              setOpen={() => setNhDD((state: boolean) => !state)}
              options={plansState.neighborhoods}
              onOptionClick={handleNeighborhoodOptionClick}
              selectedText={
                plansState.neighborhoods.filter(
                  (option: any) =>
                    option?.id === data.tactical_dimension.neighborhood_id
                )[0]?.text || 'Selecionar bairros'
              }
           />
          </S.DropdownWrapper>
          <S.GeograficDetailWrapper>
            <Link href="https://www.geonet.app/" passHref>
              <a target="_blank">
                <S.Relationships>
                  <FormattedMessage id='form.geo.orientation.link'/>
                </S.Relationships>
              </a>
            </Link>
            <S.SimpleText>Powered by GeoNet</S.SimpleText>
          </S.GeograficDetailWrapper>
        </S.DetailWrapper>
        <S.MultilineInputWrapper>
          <MultilineInput
            spellCheck={false}
            autoComplete="off"
            placeholder= {<FormattedMessage id='form.geo.orientation.label'/>}
            placeholderFixed
            secondaryPlaceholder="A focalização das ações em público-alvo específico e bem definido é um dos princípios da gestão por resultados. 
            A especificação do público-alvo deve considerar a especificação dos principais beneficiários da iniciativa, e deve responder as seguintes questões: i. Quem são (a quem os resultados / produtos da iniciativa deverão beneficiar)?; ii. Quantos são (qual a quantidade estimada de beneficiários que se pretende atender com o projeto)?; e iii. Onde estão (onde se localiza esse público-alvo)?."
            value={data?.tactical_dimension?.sociodemographic_targeting || ''}
            onChange={onInputUpdate('sociodemographic_targeting')}
            restrictionLabel={<FormattedMessage id='form.char.max'/>}
         />
        </S.MultilineInputWrapper>
      </S.SectionWrapper>
      <S.SectionWrapper>
        <S.Title><FormattedMessage id="form.execution"/></S.Title>
        <S.DatesWrapper>
          <S.DateInputWrapper>
            <Input
              autoComplete="off"
              placeholder = 'edit.start.date.label' 
              type="text"
              placeholderFixed
              value={data?.tactical_dimension?.start_at || ''}
              secondaryPlaceholder="DD/MM/AAAA"
              onChange={onInputUpdate('start_at')}
           />
          </S.DateInputWrapper>
          <S.DateInputWrapper>
            <Input
              autoComplete="off"
              placeholder="edit.finish.date.label"
              type="text"
              placeholderFixed
              value={data?.tactical_dimension?.end_at || ''}
              secondaryPlaceholder="DD/MM/AAAA"
              onChange={onInputUpdate('end_at')}
           />
          </S.DateInputWrapper>
        </S.DatesWrapper>
      </S.SectionWrapper>
      <S.SectionWrapper>
        <S.TitleAndAddNewWrapper>
          <S.Title><FormattedMessage id="form.orgs"/></S.Title>
          <S.TextButtonWrapper>
            <TextButton
              text='add.new.org'
              LeadingIcon={PlusSignIcon}
              onClick={onAddNewDeptInvolvement}
              disabled={!available_departments?.length}
           />
          </S.TextButtonWrapper>
        </S.TitleAndAddNewWrapper>
        {data?.tactical_dimension.department_roles.map((dept: any) => {
          return (
            <DeptDDList
              key={dept.departmentId}
              options={[
                ...(dept.department_id
                  ? [
                      plansState.departments.find(
                        (department: any) =>
                          department.id === dept.department_id
                      )
                    ]
                  : []),
                ...available_departments
              ]}
              selectedText={
                plansState.departments.filter(
                  (option: any) => option?.id === dept.department_id
                )[0]?.text || 'Selecione a lista de órgãos envolvidos'
              }
              role={dept.role || ''}
              onDeptSelect={onDeptSelect(dept.departmentId)}
              onRoleUpdate={onDeptRoleUpdate(dept.departmentId)}
              placeholderText="Função/responsabilidade do órgão"
              applyNumericOnly={false}
           />
          )
        })}
      </S.SectionWrapper>
      <S.SectionWrapper>
        <S.TitleAndAddNewWrapper>
          <S.Title><FormattedMessage id="form.indicators"/></S.Title>
          <S.TextButtonWrapper>
            <TextButton
              text="add.new.indicator"
              LeadingIcon={PlusSignIcon}
              onClick={onAddNewGoal}
              disabled={used_outcomes_id.length === allOutcomes.length}
           />
          </S.TextButtonWrapper>
        </S.TitleAndAddNewWrapper>
        {data?.tactical_dimension.goals.map((goal: any) => {
          return (
            <DeptDDList
              key={goal.goalId}
              options={[
                ...(goal.initiative_outcome_id
                  ? [
                      allOutcomes.find(
                        (outcome: any) =>
                          outcome.id === goal.initiative_outcome_id
                      )
                    ]
                  : []),
                ...allOutcomes.filter(
                  (outcome: any) => !used_outcomes_id.includes(outcome.id)
                )
              ]}
              selectedText={
                allOutcomes.filter(
                  (outcome: any) => outcome?.id === goal.initiative_outcome_id
                )[0]?.text || 'Selecionar indicador(es) de produto'
              }
              role={goal.goal || ''}
              date={goal.date || ''}
              onDeptSelect={onGoalSelect(goal.goalId)}
              onRoleUpdate={onGoalValueUpdate(goal.goalId)}
              onGoalDateUpdate={onGoalDateUpdate(goal.goalId)}
              placeholderText="Defina metas quantitativas"
           />
          )
        })}
      </S.SectionWrapper>
      <S.SectionWrapper>
        <S.Title><FormattedMessage id='form.total.estimated.cost'/></S.Title>
        <S.DetailWrapper>
          <S.DashInputWrapper>
            <Input
              autoComplete="off"
              placeholder="form.total.label"
              type="text"
              numericOnly={true}
              placeholderFixed
              secondaryPlaceholder="R$"
              value={data?.tactical_dimension.total_cost || ''}
              onChange={onInputUpdate('total_cost')}
           />
          </S.DashInputWrapper>
          <S.GeograficDetailWrapper>
            {/* <a target="_blank"> */}
            <S.Relationships disabled={true}>
              <FormattedMessage id ="form.references"/>
            </S.Relationships>
            {/* </a> */}
          </S.GeograficDetailWrapper>
        </S.DetailWrapper>
      </S.SectionWrapper>
    </S.Wrapper>
  )
}

export default TacticalDimensionContent
