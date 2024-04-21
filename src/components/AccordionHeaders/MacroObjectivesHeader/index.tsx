import { useMemo } from 'react'

import * as S from './styles'

import AccIcon1 from 'components/icons/AccIcon1'
import AccIcon2 from 'components/icons/AccIcon2'
import AccIcon3 from 'components/icons/AccIcon3'
import AccIcon4 from 'components/icons/AccIcon4'
import AccIcon5 from 'components/icons/AccIcon5'
import AccIcon6 from 'components/icons/AccIcon6'
import AccIcon7 from 'components/icons/AccIcon7'
import AccIcon8 from 'components/icons/AccIcon8'
import FilledWarningIcon from 'components/icons/FilledWarningIcon'
import MutliDirectionArrow from 'components/TableColumnSortBtn'

type MacroObjectiveHeaderProps = {
  data: any
  hasSummary: boolean
}

const ICONS = {
  icon1: AccIcon1,
  icon2: AccIcon2,
  icon3: AccIcon3,
  icon4: AccIcon4,
  icon5: AccIcon5,
  icon6: AccIcon6,
  icon7: AccIcon7,
  icon8: AccIcon8
}

const MacroObjectiveHeader = ({
  data,
  hasSummary
}: MacroObjectiveHeaderProps) => {
  const Icon = useMemo(
    () =>
      data.iconName
        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ICONS[data.iconName]
        : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ICONS[`icon${Math.floor(Math.random() * 8) + 1}`],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  return (
    <S.Wrapper hasSummary={hasSummary}>
      <S.EnabledItemsWrapper>
        {data.enabled ? (
          <>
            <S.ArrowWrapper>
              <MutliDirectionArrow
                direction={data.open ? 'up' : 'down'}
                source={'Accordion'}
             />
            </S.ArrowWrapper>
            <S.IconWrapper>
              <FilledWarningIcon/>
            </S.IconWrapper>
          </>
        ) : null}
      </S.EnabledItemsWrapper>
      <S.AllItemsWrapper>
        <S.NameAndTitleWrapper>
          <S.AccIconWrapper>
            <Icon/>
          </S.AccIconWrapper>
          <S.Name>{`Macro objetivo ${data.id}`}</S.Name>
          <S.Title>{data.name}</S.Title>
        </S.NameAndTitleWrapper>
      </S.AllItemsWrapper>
    </S.Wrapper>
  )
}

export default MacroObjectiveHeader
