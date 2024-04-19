import { useProblems } from 'contexts/Problems'

import * as S from './styles'

const DeleteProblem = () => {
  const {
    problemsState: { edit_problem }
  } = useProblems()
  return (
    <S.Wrapper>
      <S.List>
        <S.ListItem>
          <S.HeaderText>Problema</S.HeaderText>
        </S.ListItem>
        {[edit_problem]?.map(({ name }, idx) => (
          <S.ListItem key={idx}>
            <S.ProblemName key={name}>{name}</S.ProblemName>
          </S.ListItem>
        ))}
      </S.List>
    </S.Wrapper>
  )
}

export default DeleteProblem
