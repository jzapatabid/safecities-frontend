import * as S from './styles';

const UserBlockedModal = ({email, setUserBlocked}:any) => {
  return (
    <S.GlobalContainer>
        <S.Message>Usuario <h2>{email}</h2> Bloqueado</S.Message>
        <S.AceptButton onClick={() => setUserBlocked(false)}>
          Aceptar
        </S.AceptButton>
    </S.GlobalContainer>
  )
}

export default UserBlockedModal