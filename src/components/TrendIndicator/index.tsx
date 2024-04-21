import * as S from './styles'

import DownwardTrendIcon from 'components/icons/DownwardTrend'
import NormalTrendIcon from 'components/icons/NormalTrend'
import UpwardTrendIcon from 'components/icons/UpwardTrendIcon'

type TrendIndicatorPropsTypes = {
  text: string
  criticality: string
  variant: string
}

const Icons: any = {
  up: UpwardTrendIcon,
  center: NormalTrendIcon,
  down: DownwardTrendIcon
}

const TrendIndicator: React.FC<TrendIndicatorPropsTypes> = ({
  text,
  criticality,
  variant
}) => {
  const Icon = Icons[variant]
  return (
    <S.Wrapper criticality={criticality}>
      <Icon />
      <S.Text>{text}</S.Text>
    </S.Wrapper>
  )
}

export default TrendIndicator
