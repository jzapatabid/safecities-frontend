import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { NEW_PERSONALIZED_CAUSE_DEFAULT_FIELDS } from 'constants/Causes'

import { useCauses } from 'contexts/Causes'
import { useModal } from 'contexts/Modal'

import { PersonalizedCauseModel } from 'types/Causes'

import { useRouter } from 'next/router'
import { getAPIClient } from 'services/axios'
import {
  createPersonalizedCause,
  updatePersonalizedCause,
  deleteCause
} from 'services/causes'
import { getAllProblems } from 'services/problems'
import { v4 } from 'uuid'

import * as S from './styles'

import DeleteCause from '../DeleteCause'

import Dropdown from 'components/Dropdown'
import FileDropzone from 'components/FileDropzone'
import InfoIcon from 'components/icons/InfoIcon'
import PlusSignIcon from 'components/icons/PlusSignIcon'
import Input from 'components/Input'
import MultilineInput from 'components/MultilineInput'
import Notifications from 'components/Notifications'
import ReferenceForeignlink from 'components/ReferenceForeignlink'
import TextButton from 'components/TextButton'

type PersonalizedCausePropTypes = {
  cause?: any
}

const PersonalizedCause = ({ cause }: PersonalizedCausePropTypes) => {
  const router = useRouter()
  const {
    causesState: { edit_cause, new_cause },
    setCausesState
  } = useCauses()
  const apiClient = getAPIClient()
  const [causeData, setCauseData] = useState(
    cause ? { ...cause, ...edit_cause } : new_cause
  )
  const [showReferenceInput, setShowReferenceInput] = useState(false)
  const [open, setOpen] = useState(false)
  const { setModalState } = useModal()

  const onTitleChange = (e: any) => {
    if (e.target.value.length <= 200) {
      setCauseData((state: any) => ({ ...state, name: e.target.value }))
    }
  }

  const fetchAllProblems = async () => {
    const all_problems = await getAllProblems(apiClient)
    if (cause) {
      setCauseData((state: any) => ({
        ...state,
        problems: all_problems.data.data.map((problem: any) => {
          if (cause.associatedProblems.includes(problem.id)) {
            return { ...problem, text: problem.name, checked: true }
          }
          return { ...problem, text: problem.name }
        })
      }))
    } else {
      setCauseData((state: any) => ({
        ...state,
        problems: all_problems.data.data.map((item: any) => ({
          ...item,
          text: item.name
        }))
      }))
    }
  }

  const onJustificationChange = (e: any) => {
    if (e.target.value.length <= 320) {
      setCauseData((state: any) => ({
        ...state,
        justification: e.target.value
      }))
    }
  }

  const onEvidenceChange = (e: any) => {
    if (e.target.value.length <= 320) {
      setCauseData((state: any) => ({ ...state, evidences: e.target.value }))
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

  const handleOptionClick = useCallback(
    (clickedOption: any) => {
      setCauseData((state: any) => ({
        ...state,
        problems: cause
          ? edit_cause.problems?.map((option) =>
              option.text === clickedOption.text
                ? { ...option, checked: !option.checked }
                : option
            )
          : new_cause.problems?.map((option) =>
              option.text === clickedOption.text
                ? { ...option, checked: !option.checked }
                : option
            )
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [edit_cause.problems, new_cause.problems]
  )

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

    // setCauseData((state: any) => ({
    //   ...state,
    //   annexes: state.annexes.filter(
    //     (fileItem: any) => file.name !== fileItem.name
    //   ),
    //   ...(file.id
    //     ? {
    //         annexesToRemove: [
    //           ...(state?.annexesToRemove ? state.annexesToRemove : []),
    //           file.id
    //         ]
    //       }
    //     : {})
    // }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setCausesState((state) => ({
        ...state,
        edit_cause: { ...causeData, editing: true }
      }))
      setModalState((state) => ({
        ...state,
        disableConfirm:
          causeData.problems.filter((problem: any) => problem.checked)
            .length === 0 ||
          !causeData.evidences ||
          !causeData.name,
        onConfirm: async () => {
          setModalState({ open: false })
          setCausesState((state) => ({
            ...state,
            edit_cause: {} as any
          }))
          try {
            await updatePersonalizedCause(apiClient, {
              ...causeData,
              problems: causeData.problems.filter(
                (problem: any) => problem.checked
              )
            })
            router.replace(router.asPath)
            toast.custom((t) => (
              <Notifications
                id={t.id}
                text="A causa personalizada foi atualizada corretamente."
                variant="success"
             />
            ))
          } catch (e) {
            toast.custom((t) => (
              <Notifications
                id={t.id}
                text="A solicitação de atualização para causa personalizada falhou devido a erros. Por favor, tente novamente mais tarde."
                variant="warning"
             />
            ))
          }
        }
      }))
    } else {
      setCausesState((state) => ({ ...state, new_cause: causeData }))
      setModalState((state) => ({
        ...state,
        disableConfirm:
          causeData.problems.filter((problem: any) => problem.checked)
            .length === 0 ||
          !causeData.evidences ||
          !causeData.name,
        onConfirm: async () => {
          setModalState({ open: false })
          try {
            await createPersonalizedCause(apiClient, {
              ...causeData,
              problems: causeData.problems.filter(
                (problem: any) => problem.checked
              )
            })
            router.replace(router.asPath)
            toast.custom((t) => (
              <Notifications
                id={t.id}
                text="Causa nova adicionada corretamente."
                variant="success"
             />
            ))
            setCausesState((state) => ({
              ...state,
              new_cause: NEW_PERSONALIZED_CAUSE_DEFAULT_FIELDS
            }))
          } catch (e) {
            toast.custom((t) => (
              <Notifications
                id={t.id}
                text="Causa não registrada. Por favor, tente novamente mais tarde"
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
        setCausesState((state) => ({
          ...state,
          new_cause: NEW_PERSONALIZED_CAUSE_DEFAULT_FIELDS,
          edit_cause: {} as PersonalizedCauseModel
        }))
      },
      onDanger: () => {
        setModalState({
          open: true,
          type: undefined,
          title: 'Excluir causa',
          desc: 'Tem certeza de que deseja excluir esta causa?',
          Content: DeleteCause,
          cancelBtn: 'Cancelar',
          confirmBtn: 'Excluir causa',
          onConfirm: async () => {
            try {
              await deleteCause(apiClient, cause.id)
              router.push('/diagnostico/causes-possiveis')
              setModalState({ open: false })
              toast.custom((t) => (
                <Notifications
                  id={t.id}
                  text="Causa nova adicionada corretamente."
                  variant="success"
               />
              ))
            } catch (e) {
              setModalState({ open: false })
              toast.custom((t) => (
                <Notifications
                  id={t.id}
                  text="Ocorreu um erro ao excluir a causa. Por favor, tente novamente mais tarde."
                  variant="warning"
               />
              ))
            }
          }
        })
      }
    }))

    fetchAllProblems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <S.CauseTitleInputWrapper>
        <MultilineInput
          spellCheck={false}
          autoComplete="off"
          placeholder="Título da causa*"
          type="text"
          value={causeData.name}
          onChange={onTitleChange}
          restrictionLabel="Insira até 200 caracteres"
       />
      </S.CauseTitleInputWrapper>
      <S.DropdownWrapper>
        <Dropdown
          options={cause ? edit_cause.problems : new_cause.problems}
          open={open}
          setOpen={setOpen}
          onOptionClick={handleOptionClick}
          selectedText={
            cause
              ? `${
                  edit_cause.problems?.filter((option) => option.checked).length
                    ? `[${
                        edit_cause.problems.filter((option) => option.checked)
                          .length
                      }]`
                    : ''
                }` +
                edit_cause.problems
                  ?.filter((option) => option.checked)
                  .map(
                    (option) =>
                      option.text.slice(0, 1)?.toUpperCase() +
                      option.text.slice(1)
                  )
                  .join(', ')
              : `${
                  new_cause.problems?.filter((option) => option.checked).length
                    ? `[${
                        new_cause.problems.filter((option) => option.checked)
                          .length
                      }]`
                    : ''
                }` +
                new_cause.problems
                  ?.filter((option) => option.checked)
                  .map(
                    (option) =>
                      option.text.slice(0, 1)?.toUpperCase() +
                      option.text.slice(1)
                  )
                  .join(', ')
          }
          placeholder={
            'Selecione um problema ao qual a nova causa será associada*'
          }
       />
      </S.DropdownWrapper>
      <S.JustificationInputWrapper>
        <MultilineInput
          spellCheck={false}
          autoComplete="off"
          placeholder="Justificativa da causa*"
          value={causeData.justification}
          onChange={onJustificationChange}
          restrictionLabel="Insira até 320 caracteres"
       />
      </S.JustificationInputWrapper>
      <S.EvidenceInputWrapper>
        <MultilineInput
          spellCheck={false}
          autoComplete="off"
          placeholder="Evidencia*"
          value={causeData.evidences}
          onChange={onEvidenceChange}
          restrictionLabel="Insira até 320 caracteres"
       />
      </S.EvidenceInputWrapper>
      <S.AttachmentsWrapper>
        <S.AttachmentsTitle>
          Anexos
          <S.IconWrapper>
            <InfoIcon height={20} width={20}/>
            <S.InfoTooltip>
              {'.doc, .docx, .ppt, .pptx, .pdf, .epub, .html, .xls, .csv'}
            </S.InfoTooltip>
          </S.IconWrapper>
        </S.AttachmentsTitle>
        <FileDropzone
          onFileUpload={handleFilesUploaded}
          filesList={cause ? edit_cause.annexes : new_cause.annexes}
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

export default PersonalizedCause
