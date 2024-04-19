import * as S from './styles'
import theme from 'styles/theme'

import { DetailCardV2PropsTypes } from './types'

import RightArrow from 'components/icons/RightArrow'
import TrendIndicator from 'components/TrendIndicator'

export const getCriticalityDetail = (slope: string) => {
  if (slope === 'neutral') {
    return { index: 1, criticality: 'medium' }
  } else if (slope === 'positive') {
    return { index: 2, criticality: 'low' }
  } else if (slope === 'negative') {
    return { index: 0, criticality: 'high' }
  } else {
    return { index: 4, criticality: 'none' }
  }
}

const DetailCardV2: React.FC<DetailCardV2PropsTypes> = ({
  data: { title, percentage, label, indicators, footer, dataKey, neutral },
  setData,
  selected
}) => {
  percentage = percentage.toString()
  let slope
  if (percentage === '-' || neutral) {
    slope = 'unavailable'
  } else {
    slope =
      typeof percentage === 'number'
        ? 'neutral'
        : percentage.slice(0, 1) === '-'
        ? 'positive'
        : 'negative'
  }

  const criticality_info = getCriticalityDetail(slope)

  return (
    <S.Wrapper onClick={() => setData(dataKey)} selected={selected}>
      <S.TitleAndNavWrapper>
        <S.Title>{title}</S.Title>
        <RightArrow
          height={16}
          width={16}
          fill={theme.colors.feedback.informativePure}
        />
      </S.TitleAndNavWrapper>
      <S.StatsWrapper>
        <S.PercentageWrapper>
          <S.Percentage type={slope}>{`${
            dataKey === 'relativeFrequency'
              ? percentage.slice(0, 1) === '+' || percentage.slice(0, 1) === '-'
                ? percentage.slice(1)
                : percentage
              : percentage
          }${
            dataKey === 'relativeFrequency' ? '' : percentage === '-' ? '' : '%'
          }`}</S.Percentage>
          <S.Label>{label}</S.Label>
        </S.PercentageWrapper>
        <S.TrendWrapper>
          {indicators.map((data, idx) => (
            <TrendIndicator
              key={idx}
              {...{
                ...data,
                ...(idx === criticality_info.index
                  ? { criticality: criticality_info.criticality }
                  : {})
              }}
            />
          ))}
        </S.TrendWrapper>
      </S.StatsWrapper>
      <S.Footer>{footer}</S.Footer>
    </S.Wrapper>
  )
}

export default DetailCardV2
