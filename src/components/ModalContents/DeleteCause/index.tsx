import { useCauses } from 'contexts/Causes'

import * as S from './styles'

const DeleteCause = () => {
  const {
    causesState: { edit_cause }
  } = useCauses()
  return (
    <S.Wrapper>
      <S.List>
        <S.ListItem>
          <S.HeaderText>Causa</S.HeaderText>
        </S.ListItem>
        {[edit_cause]?.map(({ name }, idx) => (
          <S.ListItem key={idx}>
            <S.ProblemName key={name}>{name}</S.ProblemName>
          </S.ListItem>
        ))}
      </S.List>
    </S.Wrapper>
  )
}

export default DeleteCause
