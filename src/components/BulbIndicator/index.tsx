import * as S from './styles'

import { BulbIndicatorProps } from './types'

const BulbIndicator: React.FC<BulbIndicatorProps> = ({ score }) => {
  return (
    <S.Wrapper>
      <S.Bulb score={score}></S.Bulb>
      <S.Count>{score}</S.Count>
    </S.Wrapper>
  )
}

export default BulbIndicator
