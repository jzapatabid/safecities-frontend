import React from 'react'

import * as S from './styles'

type IndicatorProps = {
  name: string
  count: number
}

type IndicatorsProps = {
  details: IndicatorProps[]
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Indicators: React.FC<IndicatorsProps> = ({ details }) => (
  <S.Wrapper>
    {details.map((detail) => (
      <Indicator key={detail.name} name={detail.name} count={detail.count}/>
    ))}
  </S.Wrapper>
)

const Indicator: React.FC<IndicatorProps> = ({ name, count }) => (
  <S.IndicatorWrapper>
    <S.IndicatorCount>{count}</S.IndicatorCount>
    <S.IndicatorName>{name}</S.IndicatorName>
  </S.IndicatorWrapper>
)

export default Indicators
