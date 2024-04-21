import { formatNumberToLatinAmerican } from 'utils'

import * as S from './styles'

import { DetailCardPropsTypes } from './types'
import { FormattedMessage } from 'react-intl'

const DetailCardV1: React.FC<DetailCardPropsTypes> = ({
  count,
  label,
  period
}) => {
  console.log("This Is  label:", label)
  return (
    <S.Wrapper>
      <S.Content>
        <S.Count>
          {count === null || count === undefined
            ? '-'
            : formatNumberToLatinAmerican(count)}
        </S.Count>
        <S.Text><FormattedMessage id={label}/></S.Text>
      </S.Content>
      <S.Footer><FormattedMessage id='causes.associated.detail.card'/>: {period}</S.Footer>
    </S.Wrapper>
  )
}

export default DetailCardV1
