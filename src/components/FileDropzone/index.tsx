import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FormattedMessage, useIntl } from 'react-intl'

import * as S from './styles'

import FileAttachmentItem from 'components/FileAttachmentItem'
import FileUploadCloudIcon from 'components/icons/FileUploadCloudIcon'
import WarningIcon from 'components/icons/WarningIcon'

type File = {
  url: string
  id?: string | number
}

type FileDropzoneProps = {
  onlyFilesList?: boolean
  filesList?: File[]
  onFileUpload?: (files_list: any[]) => void
  onFileDelete?: (file: any) => void
  onFileDownload?: (file: any) => void
}

const FileDropzone = ({
  onlyFilesList,
  filesList = [],
  onFileUpload,
  onFileDelete,
  onFileDownload
}: FileDropzoneProps) => {
  const [files, setFiles] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(10)
  const onDrop = (acceptedFiles: any, fileRejections: any) => {
    setFiles(acceptedFiles)
    setUploadProgress(10)
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 5242880,
    maxFiles: 5 - filesList.length,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        ['.pptx'],
      'application/epub+zip': ['.epub'],
      'text/html': ['.html'],
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'text/csv': ['.csv']
    }
  })

  useEffect(() => {
    const process = async () => {
      setUploading(true)
      await new Promise((resolve) => setTimeout(resolve, 2500))
      setUploadProgress(100)
      setUploadedFiles(files)
      setUploading(false)
    }
    process()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files])

  useEffect(() => {
    let progress = 10
    if (uploading) {
      const progressInterval = setInterval(() => {
        progress = Math.min(progress + 10, 100)
        setUploadProgress(progress)
        if (progress === 100) {
          clearInterval(progressInterval)
        }
      }, 500)
      return () => clearInterval(progressInterval)
    }
  }, [uploading])

  useEffect(() => {
    if (!onFileUpload) return
    onFileUpload(uploadedFiles)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFiles])

  const intl = useIntl();

  return (
    <>
      {!onlyFilesList && (
        <>
          {filesList.length < 5 ? (
            <S.DropzoneWrapper {...getRootProps()}>
              <input {...getInputProps()} />
              <FileUploadCloudIcon />
              <S.DropzoneTitle>
                {isDragActive
                  ? 'Solte os arquivos aqui'
                  : intl.formatMessage({id: "form.drop.files"})}
              </S.DropzoneTitle>
              <S.DropzoneSizeRestriction>
                <FormattedMessage id = "form.max.size"/>
              </S.DropzoneSizeRestriction>
            </S.DropzoneWrapper>
          ) : (
            <S.MaxFilesWarning>
              <WarningIcon height={24} width={24} />
              Você atingiu o número máximo de arquivos para anexar
            </S.MaxFilesWarning>
          )}
          {files.length > 0 && (
            <>
              {uploading && (
                <FileAttachmentItem
                  file={{ url: 'Uploading files ...' }}
                  uploadProgress={uploadProgress}
                />
              )}
            </>
          )}
        </>
      )}
      <S.FileListWrapper>
        {filesList.map((file: any) => (
          <FileAttachmentItem
            key={file?.id || file?.uuid}
            file={file}
            onlyFilesList={onlyFilesList}
            onDelete={onFileDelete}
            onDownload={onFileDownload}
          />
        ))}
      </S.FileListWrapper>
    </>
  )
}

export default FileDropzone
