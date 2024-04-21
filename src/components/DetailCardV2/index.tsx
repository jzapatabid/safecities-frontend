import React, { useEffect, useState } from 'react'

import * as S from './styles'
import theme from 'styles/theme'

import { formatRelativeData } from '../TreemapChart'
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

interface relativeArrayItem {
  text: string
  criticality: string
  variant: string
}

function updateRelativeArray(
  arr: relativeArrayItem[],
  dataKey: string,
  percentage: string
): relativeArrayItem[] {
  const percentageNumber = parseFloat(percentage)
  return arr.map((item, index) => {
    if (percentageNumber < 5 && index === 2) {
      return { ...item, criticality: 'low' }
    } else if (percentageNumber >= 5 && percentageNumber < 25 && index === 1) {
      return { ...item, criticality: 'medium' }
    } else if (percentageNumber >= 25 && index === 0) {
      return { ...item, criticality: 'high' }
    }

    return { ...item, criticality: 'none' }
  })
}

const DetailCardV2: React.FC<DetailCardV2PropsTypes> = ({
  data: { title, percentage, label, indicators, footer, dataKey, neutral },
  setData,
  polarity,
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

  slope =
    dataKey === 'relativeFrequency'
      ? percentage < 5
        ? 'positive'
        : percentage < 25
        ? 'neutral'
        : 'negative'
      : slope

  const [indicators2, setIndicators2] = useState(indicators)
  const [slope2, setSlop2] = useState('')

  function polarityCheck(
    polaritive: 'positive' | 'negative',
    polaritivevalue: any,
    originalArray: Array<relativeArrayItem>
  ): Array<relativeArrayItem> | null {
    if (
      !originalArray ||
      !Array.isArray(originalArray) ||
      originalArray.length !== 3
    ) {
      return null
    }

    const newArray = originalArray.map((item) => ({ ...item })) // Create a copy of the original array

    if (polaritive === 'positive' && polaritivevalue > 0) {
      newArray[0].criticality = 'low'
      setSlop2('positive')
    } else if (
      polaritive === 'positive' &&
      (polaritivevalue === null || polaritivevalue === 0)
    ) {
      newArray[1].criticality = 'none'
    } else if (polaritive === 'positive' && polaritivevalue < 0) {
      newArray[2].criticality = 'high'
      setSlop2('negative')
    } else if (polaritive === 'negative' && polaritivevalue > 0) {
      newArray[0].criticality = 'high'
      setSlop2('negative')
    } else if (
      polaritive === 'negative' &&
      (polaritivevalue === null || polaritivevalue === 0)
    ) {
      newArray[1].criticality = 'none'
    } else if (polaritive === 'negative' && polaritivevalue < 0) {
      newArray[2].criticality = 'low'
      setSlop2('positive')
    }
    return newArray
  }

  /* eslint-disable */
  useEffect(() => {
    let updatedIndicators: relativeArrayItem[] = indicators2 // Initialize with current state

    if (dataKey === 'relativeFrequency') {
      updatedIndicators = updateRelativeArray(indicators, dataKey, percentage)
    } else if (dataKey === 'trend') {
      const updatedTrend: relativeArrayItem[] | null = polarityCheck(
        polarity.trend,
        polarity.trendValue,
        indicators
      )
      if (updatedTrend) {
        updatedIndicators = updatedTrend
      }
    } else if (dataKey === 'performance') {
      const updatedPerformance: relativeArrayItem[] | null = polarityCheck(
        polarity.performance,
        polarity.performanceValue,
        indicators
      )
      if (updatedPerformance) {
        updatedIndicators = updatedPerformance
      }
    }

    setIndicators2(updatedIndicators)
  }, [
    indicators,
    dataKey,
    percentage,
    polarity.trend,
    polarity.trendValue,
    polarity.performance,
    polarity.performanceValue
  ])
  /* eslint-enable */
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
          <S.Percentage
            type={
              dataKey === 'trend' || dataKey === 'performance' ? slope2 : slope
            }
          >{`${
            dataKey === 'relativeFrequency'
              ? `${formatRelativeData(percentage)}`?.slice(0, 1) === '+' ||
                `${formatRelativeData(percentage)}`?.slice(0, 1) === '-'
                ? `${formatRelativeData(percentage) + '%'}`?.slice(1)
                : `${formatRelativeData(percentage) + '%'}`
              : `${formatRelativeData(percentage)}`
          }${
            dataKey === 'relativeFrequency' ? '' : percentage === '-' ? '' : '%'
          }`}</S.Percentage>
          <S.Label>{label}</S.Label>
        </S.PercentageWrapper>
        <S.TrendWrapper>
          {indicators2.map((data, idx) => (
            <TrendIndicator
              key={idx}
              {...{
                ...data
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
