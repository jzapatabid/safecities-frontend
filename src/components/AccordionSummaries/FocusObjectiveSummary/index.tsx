import * as S from './styles'

type FocusObjectiveSummaryProps = {
  goals: any[]
}

const FocusObjectiveSummary = ({ goals }: FocusObjectiveSummaryProps) => {
  return (
    <S.Wrapper>
      {goals.map((goal: any, idx: number) => (
        <S.GoalSummary key={idx}>
          {`Reducir ${goal.problemName} de ${goal.initialRate}% para ${
            goal.goalValue
          }% hasta ${goal.endAt.split('/')[1]}`}
        </S.GoalSummary>
      ))}
    </S.Wrapper>
  )
}

export default FocusObjectiveSummary
