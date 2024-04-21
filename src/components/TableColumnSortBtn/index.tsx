import * as S from './styles'

import UnsortedIcon from 'components/icons/UnsortedIcon'

export type ArrowProps = {
  direction?: 'right' | 'left' | 'up' | 'down' | 'unsorted'
  onClick?: (event: unknown) => void
  source?: 'Accordion'
}

const MutliDirectionArrow = ({ direction, onClick, source }: ArrowProps) => {
  return (
    <>
      {direction === 'unsorted' ? (
        <S.IconWrapper onClick={onClick}>
          <UnsortedIcon/>
        </S.IconWrapper>
      ) : (
        <S.I direction={direction} onClick={onClick} source={source}></S.I>
      )}
    </>
  )
}

export default MutliDirectionArrow
