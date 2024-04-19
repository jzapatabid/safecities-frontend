import * as S from './styles'

export type TagProps = {
  label: string
}

const TagV2: React.FC<TagProps> = ({ label }) => {
  return <S.Tag label={label}>{label}</S.Tag>
}

export default TagV2
