import * as S from './styles'

import DeleteIcon from 'components/icons/DeleteIcon'
import LinkIcon from 'components/icons/LinkIcon'
import OpenInNewIcon from 'components/icons/OpenInNewIcon'

type ReferenceForeignlinkPropsTypes = {
  link: string
  noDelete?: boolean
  onDelete?: (link: any) => void
}
const ReferenceForeignlink = ({
  link,
  noDelete,
  onDelete
}: ReferenceForeignlinkPropsTypes) => {
  const openInNewTab = () => {
    if (typeof window !== 'undefined') {
      if (!link.startsWith('http://') && !link.startsWith('https://')) {
        const url = `https://${link}`
        window.open(url, '_blank')
      } else {
        window.open(link, '_blank')
      }
    }
  }
  return (
    <S.Wrapper>
      <S.IconWrapper>
        <LinkIcon/>
      </S.IconWrapper>
      <S.LinkText onClick={openInNewTab}>{link}</S.LinkText>
      <S.ExtremeWrapper>
        <S.IconWrapper onClick={openInNewTab}>
          <OpenInNewIcon/>
        </S.IconWrapper>
        {!noDelete && (
          <S.IconWrapper onClick={() => (onDelete ? onDelete(link) : null)}>
            <DeleteIcon viewBox="0 0 14 18"/>
          </S.IconWrapper>
        )}
      </S.ExtremeWrapper>
    </S.Wrapper>
  )
}

export default ReferenceForeignlink
