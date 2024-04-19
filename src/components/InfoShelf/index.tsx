import * as S from './styles'

const InfoShelf = ({ data }: { data: any }) => {
  return (
    <S.Wrapper>
      <S.List>
        <S.ListItem>
          <S.HeaderText>Categoria</S.HeaderText>
          <S.HeaderText>Valor</S.HeaderText>
        </S.ListItem>
        {data?.map(({ name, percentage }: any, idx: number) => (
          <S.ListItem key={idx}>
            <S.ProblemName>{name}</S.ProblemName>
            <S.Percentage>{percentage}%</S.Percentage>
          </S.ListItem>
        ))}
      </S.List>
    </S.Wrapper>
  )
}

export default InfoShelf
