import * as S from './styles'

import FilledSuccessIcon from 'components/icons/FilledSuccessIcon'
import FilledWarningIcon from 'components/icons/FilledWarningIcon'
import MutliDirectionArrow from 'components/TableColumnSortBtn'

type DiagnosisSummaryHeaderProps = {
  data: any
  fulfilled: boolean
}
const DiagnosisSummaryHeader = ({
  data,
  fulfilled
}: DiagnosisSummaryHeaderProps) => {
  return (
    <S.Wrapper>
      <S.EnabledItemsWrapper>
        <>
          <S.ArrowWrapper>
            <MutliDirectionArrow
              direction={data.open ? 'up' : 'down'}
              source={'Accordion'}
           />
          </S.ArrowWrapper>
          <S.IconWrapper>
            {fulfilled ? <FilledSuccessIcon/> : <FilledWarningIcon/>}
          </S.IconWrapper>
        </>
      </S.EnabledItemsWrapper>
      <S.AllItemsWrapper>
        <S.NameAndTitleWrapper>
          <S.Title>
            {data.problem_name || data.cause_name || data.initiative_name || ''}
          </S.Title>
        </S.NameAndTitleWrapper>
      </S.AllItemsWrapper>
    </S.Wrapper>
  )
}

export default DiagnosisSummaryHeader
