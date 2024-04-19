import { INITIATIVE } from 'enums/Plan'

import * as S from './styles'

export type TubelightIndicatorProps = {
  score: number
  label?: string
  type?: INITIATIVE.COST | INITIATIVE.EFFICIENCY | 'planStatus'
  scale?: number
}

const TubelightIndicator: React.FC<TubelightIndicatorProps> = ({
  score,
  label,
  type,
  scale
}) => {
  return (
    <S.Wrapper withLabel={Boolean(label)}>
      {label && (
        <S.Label type={type} score={score}>
          {label}
        </S.Label>
      )}
      <S.Tubelight type={type} score={score} scale={scale}></S.Tubelight>
      {!label && <S.Count>{scale ? score / scale : score}</S.Count>}
    </S.Wrapper>
  )
}

export default TubelightIndicator
