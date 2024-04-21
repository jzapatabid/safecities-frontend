import { useState } from 'react'

import * as S from './styles'

import { CheckboxProps } from './types'

const Checkbox = ({
  onCheck,
  isChecked = false,
  label,
  labelFor = '',
  ...props
}: CheckboxProps) => {
  const [checked, setChecked] = useState(isChecked)

  const onChange = () => {
    const status = !checked
    setChecked(status)

    !!onCheck && onCheck(status)
  }

  return (
    <S.Wrapper>
      <S.Input
        id={labelFor}
        type="checkbox"
        onChange={onChange}
        checked={checked}
        {...props}
      />
      {!!label && <S.Label htmlFor={labelFor}>{label}</S.Label>}
    </S.Wrapper>
  )
}

export default Checkbox
