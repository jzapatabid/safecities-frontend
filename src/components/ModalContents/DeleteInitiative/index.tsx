import { useInitiatives } from 'contexts/Initiatives'

import * as S from './styles'

const DeleteInitiative = () => {
  const {
    initiativesState: { edit_initiative }
  } = useInitiatives()
  return (
    <S.Wrapper>
      <S.List>
        <S.ListItem>
          <S.HeaderText>Iniciativa</S.HeaderText>
        </S.ListItem>
        {[edit_initiative]?.map(({ name }, idx) => (
          <S.ListItem key={idx}>
            <S.ProblemName key={name}>{name}</S.ProblemName>
          </S.ListItem>
        ))}
      </S.List>
    </S.Wrapper>
  )
}

export default DeleteInitiative
