import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { NEW_PERSONALIZED_PROBLEMS_INITIAL_FIELDS } from 'constants/Problems'

import { useModal } from 'contexts/Modal'
import { useProblems } from 'contexts/Problems'

import { useRouter } from 'next/router'
import { getAPIClient } from 'services/axios'
import {
  createPersonalizedProblem,
  deletePersonalizedProblem,
  updatePersonalizedProblem
} from 'services/problems'
import { v4 } from 'uuid'

import * as S from './styles'

import DeleteProblem from '../DeleteProblem'

import FileDropzone from 'components/FileDropzone'
import InfoIcon from 'components/icons/InfoIcon'
import PlusSignIcon from 'components/icons/PlusSignIcon'
import Input from 'components/Input'
import MultilineInput from 'components/MultilineInput'
import Notifications from 'components/Notifications'
import ReferenceForeignlink from 'components/ReferenceForeignlink'
import TextButton from 'components/TextButton'

type PersonalizedProblemPropTypes = {
  cause?: any
}

const PersonalizedProblem = ({ cause }: PersonalizedProblemPropTypes) => {
  const {
    problemsState: { edit_problem, new_problem },
    setProblemsState
  } = useProblems()
  const apiClient = getAPIClient()
  const router = useRouter()
  const [showReferenceInput, setShowReferenceInput] = useState(false)
  const { setModalState } = useModal()
  const [causeData, setCauseData] = useState(
    cause ? { ...cause, ...edit_problem } : new_problem
  )

  const onTitleChange = (e: any) => {
    if (e.target.value.length <= 200) {
      setCauseData((state: any) => ({ ...state, name: e.target.value }))
    }
  }

  const onDescriptionChange = (e: any) => {
    if (e.target.value.length <= 1000) {
      setCauseData((state: any) => ({
        ...state,
        description: e.target.value
      }))
    }
  }

  const addNewLink = useCallback(() => {
    setCauseData((state: any) => ({
      ...state,
      references: [
        ...state.references,
        ...(state.newLink !== '' ? [state.newLink] : [])
      ],
      newLink: ''
    }))
    setShowReferenceInput(false)
  }, [])

  const handlerLinkDelete = useCallback((link: any) => {
    setCauseData((state: any) => ({
      ...state,
      references: state.references.filter((linkItem: any) => link !== linkItem)
    }))
  }, [])

  const handleFileDelete = useCallback((file: any) => {
    if (file.uuid) {
      setCauseData((state: any) => ({
        ...state,
        annexes: state.annexes.filter(
          (fileItem: any) => file.uuid !== fileItem.uuid
        ),
        ...(file.id
          ? {
              annexesToRemove: [
                ...(state?.annexesToRemove ? state.annexesToRemove : []),
                file.id
              ]
            }
          : {})
      }))
    } else if (file.id) {
      setCauseData((state: any) => ({
        ...state,
        annexes: state.annexes.filter(
          (fileItem: any) => file.id !== fileItem.id
        ),
        ...(file.id
          ? {
              annexesToRemove: [
                ...(state?.annexesToRemove ? state.annexesToRemove : []),
                file.id
              ]
            }
          : {})
      }))
    }
  }, [])

  const handleFileDownload = useCallback((file: any) => {
    if (typeof window !== 'undefined') {
      let url
      const a = document.createElement('a')
      if (file.type) {
        url = URL.createObjectURL(file)
      } else {
        url = file.url
      }
      a.href = url
      a.download = file.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      if (file.type) URL.revokeObjectURL(url)
    }
  }, [])

  const handleFilesUploaded = (new_files: any[]) => {
    const filesWithUUID = new_files.map((file: any) => {
      file.uuid = v4()
      return file
    })
    setCauseData((state: any) => ({
      ...state,
      annexes: [...(state.annexes || []), ...filesWithUUID],
      annexesToAdd: new_files
    }))
  }

  useEffect(() => {
    if (cause) {
      setProblemsState((state) => ({
        ...state,
        edit_problem: { ...causeData, editing: true }
      }))
      setModalState((state) => ({
        ...state,
        disableConfirm: !causeData.name || !causeData.description,
        onConfirm: async () => {
          setModalState({ open: false })
          try {
            await updatePersonalizedProblem(apiClient, causeData)
            router.replace(router.asPath)
            toast.custom((t) => (
              <Notifications
                id={t.id}
                text="A problema personalizada foi atualizada corretamente."
                variant="success"
              />
            ))
          } catch (e) {
            toast.custom((t) => (
              <Notifications
                id={t.id}
                text="A solicitação de atualização para problema personalizada falhou devido a erros. Por favor, tente novamente mais tarde."
                variant="warning"
              />
            ))
          }
        }
      }))
    } else {
      setProblemsState((state) => ({
        ...state,
        new_problem: causeData
      }))
      setModalState((state) => ({
        ...state,
        disableConfirm: !causeData.name || !causeData.description,
        onConfirm: async () => {
          setModalState({ open: false })
          try {
            await createPersonalizedProblem(apiClient, causeData)
            router.replace(router.asPath)
            toast.custom((t) => (
              <Notifications
                id={t.id}
                text="Problema novo adicionado corretamente"
                variant="success"
              />
            ))
            setProblemsState((state) => ({
              ...state,
              new_initiative: NEW_PERSONALIZED_PROBLEMS_INITIAL_FIELDS
            }))
          } catch (e) {
            toast.custom((t) => (
              <Notifications
                id={t.id}
                text="Problema personalizado não registrado. Por favor, tente novamente mais tarde"
                variant="warning"
              />
            ))
          }
        }
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [causeData])

  useEffect(() => {
    setModalState((state) => ({
      ...state,
      onCancel: () => {
        setModalState({ open: false })
        setProblemsState((state) => ({
          ...state,
          new_problem: NEW_PERSONALIZED_PROBLEMS_INITIAL_FIELDS,
          edit_problem: {}
        }))
      },
      onDanger: () => {
        setModalState({
          open: true,
          type: undefined,
          title: 'Excluir problema',
          desc: 'Tem certeza de que deseja excluir esta problema?',
          Content: DeleteProblem,
          cancelBtn: 'Cancelar',
          confirmBtn: 'Excluir problema',
          onConfirm: async () => {
            try {
              await deletePersonalizedProblem(apiClient, cause.id)
              router.push('/diagnostico/problemas-potenciais')
              setModalState({ open: false })
              toast.custom((t) => (
                <Notifications
                  id={t.id}
                  text="Problema excluído corretamente."
                  variant="success"
                />
              ))
            } catch (e) {
              setModalState({ open: false })
              toast.custom((t) => (
                <Notifications
                  id={t.id}
                  text="Ocorreu um erro ao excluir a problema. Por favor, tente novamente mais tarde."
                  variant="warning"
                />
              ))
            }
          }
        })
      }
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <S.CauseTitleInputWrapper>
        <MultilineInput
          spellCheck={false}
          autoComplete="off"
          placeholder="Título do problema*"
          type="text"
          value={causeData.name}
          onChange={onTitleChange}
          restrictionLabel="Insira até 200 caracteres"
        />
      </S.CauseTitleInputWrapper>
      <S.EvidenceInputWrapper>
        <MultilineInput
          spellCheck={false}
          autoComplete="off"
          placeholder="Descrição do problema*"
          value={causeData.description}
          onChange={onDescriptionChange}
          restrictionLabel="Insira até 1000 caracteres"
        />
      </S.EvidenceInputWrapper>
      <S.AttachmentsWrapper>
        <S.AttachmentsTitle>
          Anexos
          <S.IconWrapper>
            <InfoIcon height={20} width={20} />
            <S.InfoTooltip>
              {'.doc, .docx, .ppt, .pptx, .pdf, .epub, .html, .xls, .csv'}
            </S.InfoTooltip>
          </S.IconWrapper>
        </S.AttachmentsTitle>
        <FileDropzone
          onFileUpload={handleFilesUploaded}
          filesList={cause ? edit_problem.annexes : new_problem.annexes}
          onFileDelete={handleFileDelete}
          onFileDownload={handleFileDownload}
        />
      </S.AttachmentsWrapper>
      <S.ReferencesWrapper>
        <S.AttachmentsTitle>Referências</S.AttachmentsTitle>
        <S.ReferencesDesc>
          Certifique-se que todos possam ter acesso a URL adicionada
        </S.ReferencesDesc>
        {causeData.references?.length
          ? causeData.references.map((link: any, idx: number) => (
              <ReferenceForeignlink
                key={idx}
                link={link}
                onDelete={handlerLinkDelete}
              />
            ))
          : null}
        {(showReferenceInput || causeData.references?.length === 0) && (
          <S.ReferencesInputWrapper>
            <Input
              autoComplete="off"
              placeholder="Adicione URL"
              type="text"
              trailingAction={addNewLink}
              value={causeData.newLink}
              onChange={(e) =>
                setCauseData((state: any) => ({
                  ...state,
                  newLink: e.target.value
                }))
              }
            />
          </S.ReferencesInputWrapper>
        )}
        {!showReferenceInput && causeData.references?.length !== 0 && (
          <S.AddReferencesBtnWrapper>
            <TextButton
              text="Adicionar referências"
              LeadingIcon={PlusSignIcon}
              onClick={() => setShowReferenceInput(true)}
            />
          </S.AddReferencesBtnWrapper>
        )}
      </S.ReferencesWrapper>
    </>
  )
}

export default PersonalizedProblem
