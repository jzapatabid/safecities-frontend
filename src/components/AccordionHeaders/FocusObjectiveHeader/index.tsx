import { useMemo } from 'react'

import * as S from './styles'

import AccIcon10 from 'components/icons/AccIcon10'
import AccIcon11 from 'components/icons/AccIcon11'
import AccIcon12 from 'components/icons/AccIcon12'
import AccIcon13 from 'components/icons/AccIcon13'
import AccIcon14 from 'components/icons/AccIcon14'
import AccIcon15 from 'components/icons/AccIcon15'
import AccIcon9 from 'components/icons/AccIcon9'
import MutliDirectionArrow from 'components/TableColumnSortBtn'

type FocusObjectiveHeaderProps = {
  data: any
  index: number
}

const ICONS = {
  icon9: AccIcon9,
  icon10: AccIcon10,
  icon11: AccIcon11,
  icon12: AccIcon12,
  icon13: AccIcon13,
  icon14: AccIcon14,
  icon15: AccIcon15
}

const FocusObjectiveHeader = ({ data, index }: FocusObjectiveHeaderProps) => {
  const Icon = useMemo(
    () =>
      data.iconName
        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ICONS[data.iconName]
        : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ICONS[`icon${Math.floor(Math.random() * 7) + 9}`],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  return (
    <S.Wrapper>
      <S.EnabledItemsWrapper>
        {data.enabled ? (
          <>
            <S.ArrowWrapper>
              <MutliDirectionArrow
                direction={data.open ? 'up' : 'down'}
                source={'Accordion'}
              />
            </S.ArrowWrapper>
          </>
        ) : null}
      </S.EnabledItemsWrapper>
      <S.AllItemsWrapper disabled={!data.enabled}>
        <S.NameAndTitleWrapper>
          <S.AccIconWrapper>
            <Icon />
          </S.AccIconWrapper>
          <S.Name>{`Foco ${index + 1}`}</S.Name>
          <S.Title>{data.name}</S.Title>
        </S.NameAndTitleWrapper>
      </S.AllItemsWrapper>
    </S.Wrapper>
  )
}

export default FocusObjectiveHeader
