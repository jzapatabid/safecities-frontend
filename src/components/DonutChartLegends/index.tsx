import * as S from './styles'

import { donutColors } from 'components/DonutChart'

const DonutChartLegends = ({ data }: { data: any }) => {
  return (
    <S.Wrapper>
      {data.slice(0, 7).map((legend: any, idx: number) => (
        <S.LegendWrapper key={idx}>
          <S.Circle color={donutColors[idx]}></S.Circle>
          <S.Percentage>{legend.percentage}%</S.Percentage>
          <S.Text>{legend.name}</S.Text>
        </S.LegendWrapper>
      ))}
    </S.Wrapper>
  )
}

export default DonutChartLegends
