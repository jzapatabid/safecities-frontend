import { InputHTMLAttributes } from 'react'

import * as S from './styles'

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement>

const CheckboxV2 = ({ ...props }: CheckboxProps) => {
  return <S.Input type="checkbox" {...props}/>
}

export default CheckboxV2
