import * as S from './styles'

import LensIcon from 'components/icons/LensIcon'

type SearchBarProps = {
  search: string
  setSearch: (value: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  return (
    <S.SearchWrapper>
      <S.IconWrapper>
        <LensIcon/>
      </S.IconWrapper>
      <S.Input
        type="text"
        placeholder="Buscar"
        value={search}
        onChange={({ target: { value } }) => setSearch(value)}
     />
    </S.SearchWrapper>
  )
}

export default SearchBar
