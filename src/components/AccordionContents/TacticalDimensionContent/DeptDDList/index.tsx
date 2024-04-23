import { useState } from 'react'

import * as S from './styles'

import Dropdown from 'components/Dropdown'
import Input from 'components/Input'
import { FormattedMessage } from 'react-intl'

const DeptDDList = ({
  options,
  selectedText,
  role,
  date,
  onDeptSelect,
  onRoleUpdate,
  onGoalDateUpdate,
  placeholderText,
  applyNumericOnly = true
}: {
  options: any
  selectedText: string
  role?: string
  date?: string
  onDeptSelect: (option: any) => void
  onRoleUpdate: (event: any) => void
  onGoalDateUpdate?: (event: any) => void
  placeholderText: any
  applyNumericOnly?: boolean
}) => {
  const [deptDD, setDeptDD] = useState(false)
  const handleOptionSelect = (option: any) => {
    onDeptSelect(option)
    setDeptDD(false)
  }
  return (
    <S.DetailWrapper>
      <S.DropdownWrapper>
        <Dropdown
          singleSelect
          open={deptDD}
          setOpen={() => setDeptDD((state: boolean) => !state)}
          options={options}
          onOptionClick={handleOptionSelect}
          selectedText={selectedText}
        />
      </S.DropdownWrapper>
      <S.DashInputWrapper>
        <Input
          autoComplete="off"
          placeholder={<FormattedMessage id='form.orgs.label'/>}
          type="text"
          placeholderFixed
          secondaryPlaceholder="-"
          value={role || ''}
          numericOnly={applyNumericOnly}
          onChange={onRoleUpdate}
        />
      </S.DashInputWrapper>
      {onGoalDateUpdate ? (
        <S.DashInputWrapper>
          <Input
            autoComplete="off"
            placeholder={<FormattedMessage id='date.month.year'/>}
            type="text"
            placeholderFixed
            secondaryPlaceholder="MM/AAAA"
            value={date || ''}
            onChange={onGoalDateUpdate}
          />
        </S.DashInputWrapper>
      ) : null}
    </S.DetailWrapper>
  )
}

export default DeptDDList
