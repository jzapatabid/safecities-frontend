import * as S from './styles'

import CrossIconFilled from 'components/icons/CrossIconFilled'
import DeleteIcon from 'components/icons/DeleteIcon'
import DownloadIcon from 'components/icons/DownloadIcon'
import FileAttachmentIcon from 'components/icons/FileAttachmentIcon'

type FileAttachmentItemPropsTypes = {
  file: any
  uploadProgress?: number
  onlyFilesList?: boolean
  onDelete?: (file: any) => void
  onDownload?: (file: any) => void
}
const FileAttachmentItem = ({
  file,
  uploadProgress,
  onlyFilesList,
  onDelete,
  onDownload
}: FileAttachmentItemPropsTypes) => {
  return (
    <S.Wrapper progress={uploadProgress}>
      <S.IconWrapper>
        <FileAttachmentIcon />
      </S.IconWrapper>
      {uploadProgress ? (
        <S.LinkText>
          {file?.fileName || file?.name || file?.url}
          <S.Bar />
        </S.LinkText>
      ) : (
        <S.LinkText>{file?.fileName || file?.name || file?.url}</S.LinkText>
      )}

      <S.ExtremeWrapper>
        {!uploadProgress && onDownload && (
          <S.IconWrapper clickable onClick={() => onDownload(file)}>
            <DownloadIcon width={22} height={20} viewBox="0 0 22 19" />
          </S.IconWrapper>
        )}
        {uploadProgress === undefined ? (
          <>
            {onlyFilesList ? null : (
              <S.IconWrapper
                clickable
                onClick={() => (onDelete ? onDelete(file) : null)}
              >
                <DeleteIcon viewBox="0 0 14 18" />
              </S.IconWrapper>
            )}
          </>
        ) : (
          <S.IconWrapper clickable>
            <CrossIconFilled />
          </S.IconWrapper>
        )}
      </S.ExtremeWrapper>
    </S.Wrapper>
  )
}

export default FileAttachmentItem
