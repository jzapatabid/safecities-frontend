import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { useInitiatives } from 'contexts/Initiatives'
import { NEW_PERSONALIZED_INITIATIVE_DEFAULT_FIELDS } from 'contexts/Initiatives/initialState'
import { useModal } from 'contexts/Modal'

import { useRouter } from 'next/router'
import { getAPIClient } from 'services/axios'
import {
  createPersonalizedInitiative,
  deleteInitiative,
  getAllDepartments,
  getAllPrioritizedCauses,
  updatePersonalizedInitiative
} from 'services/initiatives'
import { v4 } from 'uuid'

import * as S from './styles'
import theme from 'styles/theme'

import DeleteInitiative from '../DeleteInitiative'

import Dropdown from 'components/Dropdown'
import EfficiencyTable from 'components/EfficiencyTable'
import FileDropzone from 'components/FileDropzone'
import InfoIcon from 'components/icons/InfoIcon'
import PlusSignIcon from 'components/icons/PlusSignIcon'
import Input from 'components/Input'
import MultilineInput from 'components/MultilineInput'
import Notifications from 'components/Notifications'
import ReferenceForeignlink from 'components/ReferenceForeignlink'
import TextButton from 'components/TextButton'
import { FormattedMessage } from 'react-intl'
import {useIntl} from 'react-intl'

type PersonalizedCausePropTypes = {
  cause?: any
}

const PersonalizedInitiative = ({ cause }: PersonalizedCausePropTypes) => {
  const router = useRouter()
  const {
    initiativesState: { new_initiative, edit_initiative, restore_initiative },
    setInitiativesState
  } = useInitiatives()
  const apiClient = getAPIClient()
  const [causeData, setCauseData] = useState(
    restore_initiative
      ? restore_initiative
      : cause
      ? {
          ...cause,
          ...edit_initiative,
          costs: edit_initiative.costs.map((cost: any) =>
            cost.id === cause.costLevel ? { ...cost, checked: true } : cost
          ),
          efficiencies: edit_initiative.efficiencies.map((efficiency: any) =>
            efficiency.id === cause.efficiencyLevel
              ? { ...efficiency, checked: true }
              : efficiency
          )
        }
      : new_initiative
  )
  const [showReferenceInput, setShowReferenceInput] = useState(false)
  const [causesOpen, setCausesOpen] = useState(false)
  const [costsOpen, setCostsOpen] = useState(false)
  const [efficienciesOpen, setEfficienciesOpen] = useState(false)
  const [deptsOpen, setDeptsOpen] = useState(false)
  const { setModalState } = useModal()

  const handleShowEfficiencyInfoClick = useCallback(() => {
    setModalState((state) => ({
      ...state,
      Content: EfficiencyTable,
      title: 'Informações sobre eficácia',
      backBtn: 'Voltar a adicionar nova iniciativa',
      onGoBack: () =>
        setModalState((state) => ({
          ...state,
          Content: PersonalizedInitiative,
          title: cause ? 'Editar iniciativa' : 'Adicione uma nova iniciativa',
          contentType: undefined,
          backBtn: undefined
        })),
      contentType: 'static'
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onTitleChange = (e: any) => {
    if (e.target.value.length <= 200) {
      setCauseData((state: any) => ({ ...state, name: e.target.value }))
    }
  }

  const fetchAllCauses = async () => {
    const allCauses = await getAllPrioritizedCauses(apiClient)
    if (cause) {
      // if (cause.associatedProblems) {
      setCauseData((state: any) => ({
        ...state,
        causes: allCauses.data.data.map((problem: any) => {
          if (cause.causes.includes(problem.id)) {
            return { ...problem, text: problem.name, checked: true }
          }
          return { ...problem, text: problem.name }
        })
      }))
      // }
    } else {
      setCauseData((state: any) => ({
        ...state,
        causes: allCauses.data.data.map((item: any) => ({
          ...item,
          text: item.name
        }))
      }))
    }
  }

  const fetchAllDepartments = async () => {
    const allDepartments = await getAllDepartments(apiClient)
    if (cause) {
      // Add criteria here to auto select the existing causes on edit Initiative
      setCauseData((state: any) => ({
        ...state,
        departments: allDepartments.data.data.map((dept: any) => {
          if (cause.departments.includes(dept.id)) {
            return { ...dept, text: dept.name, checked: true }
          }
          return { ...dept, text: dept.name }
        })
      }))
    } else {
      setCauseData((state: any) => ({
        ...state,
        departments: allDepartments.data.data.map((item: any) => ({
          ...item,
          text: item.name
        }))
      }))
    }
  }

  const onDescriptionChange = (e: any) => {
    if (e.target.value.length <= 1000) {
      setCauseData((state: any) => ({
        ...state,
        justification: e.target.value
      }))
    }
  }

  const onEvidenceChange = (e: any) => {
    if (e.target.value.length <= 1000) {
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

  const handleCauseOptionClick = useCallback(
    (clickedOption: any) => {
      setCauseData((state: any) => ({
        ...state,
        causes: cause
          ? edit_initiative.causes?.map((option: any) =>
              option.text === clickedOption.text
                ? { ...option, checked: !option.checked }
                : option
            )
          : new_initiative.causes?.map((option: any) =>
              option.text === clickedOption.text
                ? { ...option, checked: !option.checked }
                : option
            )
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [new_initiative.causes, edit_initiative.causes]
  )

  const handleDeptOptionClick = useCallback(
    (clickedOption: any) => {
      setCauseData((state: any) => ({
        ...state,
        departments: cause
          ? edit_initiative.departments?.map((option: any) =>
              option.text === clickedOption.text
                ? { ...option, checked: !option.checked }
                : option
            )
          : new_initiative.departments?.map((option: any) =>
              option.text === clickedOption.text
                ? { ...option, checked: !option.checked }
                : option
            )
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [new_initiative.departments, edit_initiative.departments]
  )

  const handleCostOptionClick = useCallback(
    (clickedOption: any) => {
      setCauseData((state: any) => ({
        ...state,
        costs: cause
          ? edit_initiative.costs?.map((option: any) =>
              option.text === clickedOption.text
                ? { ...option, checked: true }
                : { ...option, checked: false }
            )
          : new_initiative.costs?.map((option: any) =>
              option.text === clickedOption.text
                ? { ...option, checked: !option.checked }
                : option
            )
      }))
      setCostsOpen(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleEfficiencyOptionClick = useCallback(
    (clickedOption: any) => {
      setCauseData((state: any) => ({
        ...state,
        efficiencies: cause
          ? edit_initiative.efficiencies?.map((option: any) =>
              option.text === clickedOption.text
                ? { ...option, checked: true }
                : { ...option, checked: false }
            )
          : new_initiative.efficiencies?.map((option: any) =>
              option.text === clickedOption.text
                ? { ...option, checked: !option.checked }
                : option
            )
      }))
      setEfficienciesOpen(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
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
      setInitiativesState((state) => ({
        ...state,
        edit_initiative: { ...causeData, editing: true },
        restore_initiative: { ...causeData, editing: true }
      }))
      setModalState((state) => ({
        ...state,
        onConfirm: async () => {
          setModalState({ open: false })
          try {
            await updatePersonalizedInitiative(apiClient, causeData)
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
      setInitiativesState((state) => ({
        ...state,
        new_initiative: causeData,
        restore_initiative: causeData
      }))
      setModalState((state) => ({
        ...state,
        onConfirm: async () => {
          setModalState({ open: false })
          try {
            await createPersonalizedInitiative(apiClient, causeData)
            router.replace(router.asPath)
            toast.custom((t) => (
              <Notifications
                id={t.id}
                text="Causa nova adicionada corretamente."
                variant="success"
              />
            ))
            setInitiativesState((state) => ({
              ...state,
              new_initiative: NEW_PERSONALIZED_INITIATIVE_DEFAULT_FIELDS
            }))
          } catch (e) {
            toast.custom((t) => (
              <Notifications
                id={t.id}
                text="Iniciativa não registada. Por favor, tente novamente mais tarde"
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
        setInitiativesState((state) => ({
          ...state,
          new_initiative: NEW_PERSONALIZED_INITIATIVE_DEFAULT_FIELDS,
          edit_initiative: {},
          restore_initiative: undefined
        }))
      },
      onDanger: () => {
        setModalState({
          open: true,
          type: undefined,
          title: 'Excluir iniciativa',
          desc: 'Tem certeza de que deseja excluir esta iniciativa?',
          Content: DeleteInitiative,
          cancelBtn: 'Cancelar',
          confirmBtn: 'Excluir iniciativa',
          onConfirm: async () => {
            try {
              await deleteInitiative(apiClient, cause.id)
              router.push('/planejamento/associar-iniciativas')
              setModalState({ open: false })
              toast.custom((t) => (
                <Notifications
                  id={t.id}
                  text="Iniciativa excluído corretamente."
                  variant="success"
                />
              ))
            } catch (e: any) {
              setModalState({ open: false })
              console.log(
                'Error',
                e.response?.data?.message,
                "The initiative is prioritized so can't be deleted"
              )
              if (
                e.response?.data?.message ===
                "The initiative is prioritized so can't be deleted"
              ) {
                toast.custom((t) => (
                  <Notifications
                    id={t.id}
                    text="
                    Você deve despriorizar a iniciativa por todas as causas antes de excluí-la."
                    variant="warning"
                  />
                ))
              } else {
                toast.custom((t) => (
                  <Notifications
                    id={t.id}
                    text="Ocorreu um erro ao excluir a iniciativa. Por favor, tente novamente mais tarde."
                    variant="warning"
                  />
                ))
              }
            }
          }
        })
      }
    }))
    if (!restore_initiative) {
      fetchAllCauses()
      fetchAllDepartments()
    }

    setInitiativesState((state) => ({
      ...state,
      restore_initiative: undefined
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const intl = useIntl()
  

  

  return (
    <>
      <S.CauseTitleInputWrapper>
        <MultilineInput
          spellCheck={false}
          autoComplete="off"
          placeholder= {<FormattedMessage id = "add.initiative.title.label"/>}
          type="text"
          value={causeData.name}
          onChange={onTitleChange}
          restrictionLabel={<FormattedMessage id = "add.initiative.title.char.counter"/>}
        />
      </S.CauseTitleInputWrapper>
      <S.DropdownWrapper>
        <Dropdown
          options={cause ? edit_initiative.causes : new_initiative.causes}
          open={causesOpen}
          setOpen={setCausesOpen}
          onOptionClick={handleCauseOptionClick}
          selectedText={
            cause
              ? `${
                  edit_initiative.causes?.filter(
                    (option: any) => option.checked
                  ).length
                    ? `[${
                        edit_initiative.causes.filter(
                          (option: any) => option.checked
                        ).length
                      }]`
                    : ''
                }` +
                edit_initiative.causes
                  ?.filter((option: any) => option.checked)
                  .map((option: any) => option.text)
                  .join(', ')
              : `${
                  new_initiative.causes?.filter((option: any) => option.checked)
                    .length
                    ? `[${
                        new_initiative.causes.filter(
                          (option: any) => option.checked
                        ).length
                      }]`
                    : ''
                }` +
                new_initiative.causes
                  ?.filter((option: any) => option.checked)
                  .map((option: any) => option.text)
                  .join(', ')
          }
          placeholder={
            <FormattedMessage id = "add.initiative.cause.selector"/>
          }
        />
      </S.DropdownWrapper>
      <S.JustificationInputWrapper>
        <MultilineInput
          spellCheck={false}
          autoComplete="off"
          placeholder={<FormattedMessage id = "diagnosis.desc"/>}
          value={causeData.justification}
          onChange={onDescriptionChange}
          restrictionLabel={<FormattedMessage id = "form.char.max"/>}
        />
      </S.JustificationInputWrapper>
      <S.DropdownWrapper>
        <Dropdown
          singleSelect
          options={cause ? edit_initiative.costs : new_initiative.costs}
          open={costsOpen}
          setOpen={setCostsOpen}
          onOptionClick={handleCostOptionClick}
          selectedText={
            cause
              ? `${
                  edit_initiative.costs?.filter((option: any) => option.checked)
                    .length
                    ? `${
                        edit_initiative.costs.filter(
                          (option: any) => option.checked
                        )[0].text
                      }`
                    : edit_initiative.costs?.filter(
                        (option: any) => option.id === edit_initiative.costLevel
                      )[0]?.text || 'Nível de costo'
                }`
              : `${
                  new_initiative.costs.filter((cost: any) => cost.checked)
                    .length
                    ? new_initiative.costs.filter(
                        (cost: any) => cost.checked
                      )[0].text
                    : intl.formatMessage({id: "add.initiative.cost.selector" })
                }`
          }
        />
      </S.DropdownWrapper>
      <S.DropdownWrapper>
        <Dropdown
          singleSelect
          options={
            cause ? edit_initiative.efficiencies : new_initiative.efficiencies
          }
          open={efficienciesOpen}
          setOpen={setEfficienciesOpen}
          onOptionClick={handleEfficiencyOptionClick}
          selectedText={
            cause
              ? `${
                  edit_initiative.efficiencies?.filter(
                    (option: any) => option.checked
                  ).length
                    ? `${
                        edit_initiative.efficiencies.filter(
                          (option: any) => option.checked
                        )[0].text
                      }`
                    : edit_initiative.efficiencies?.filter(
                        (option: any) => option.id === edit_initiative.costLevel
                      )[0]?.text || ''
                }`
              : `${
                  new_initiative.efficiencies.filter(
                    (efficiency: any) => efficiency.checked
                  ).length
                    ? new_initiative.efficiencies.filter(
                        (efficiency: any) => efficiency.checked
                      )[0].text
                    : intl.formatMessage({id: "initiatives.effectiveness.level" })
                }`
          }
        />
      </S.DropdownWrapper>
      <S.InfoLabel onClick={handleShowEfficiencyInfoClick}>
        <InfoIcon color={theme.colors.feedback.informativePure} />
        <S.InfoText><FormattedMessage id='initiative.Effectiveness'/></S.InfoText>
      </S.InfoLabel>
      <S.DropdownWrapper>
        <Dropdown
          options={
            cause ? edit_initiative.departments : new_initiative.departments
          }
          open={deptsOpen}
          setOpen={setDeptsOpen}
          onOptionClick={handleDeptOptionClick}
          selectedText={
            cause
              ? `${
                  edit_initiative.departments?.filter(
                    (option: any) => option.checked
                  ).length
                    ? `[${
                        edit_initiative.departments.filter(
                          (option: any) => option.checked
                        ).length
                      }]`
                    : ''
                }` +
                edit_initiative.departments
                  ?.filter((option: any) => option.checked)
                  .map((option: any) => option.text)
                  .join(', ')
              : `${
                  new_initiative.departments?.filter(
                    (option: any) => option.checked
                  ).length
                    ? `[${
                        new_initiative.departments.filter(
                          (option: any) => option.checked
                        ).length
                      }]`
                    : ''
                }` +
                new_initiative.departments
                  ?.filter((option: any) => option.checked)
                  .map((option: any) => option.text)
                  .join(', ')
          }
          placeholder={'Departamentos envueltos*'}
        />
      </S.DropdownWrapper>
      <S.EvidenceInputWrapper>
        <MultilineInput
          spellCheck={false}
          autoComplete="off"
          placeholder= {< FormattedMessage id = "form.summary.evidences" />}
          value={causeData.evidences}
          onChange={onEvidenceChange}
          restrictionLabel={<FormattedMessage id = "form.char.max"/>}
        />
      </S.EvidenceInputWrapper>
      <S.AttachmentsWrapper>
        <S.AttachmentsTitle>
          <FormattedMessage id = "form.add.references"/>
          <S.IconWrapper>
            <InfoIcon height={20} width={20} />
            <S.InfoTooltip>
              {'.doc, .docx, .ppt, .pptx, .pdf, .epub, .html, .xls, .csv'}
            </S.InfoTooltip>
          </S.IconWrapper>
        </S.AttachmentsTitle>
        <FileDropzone
          onFileUpload={handleFilesUploaded}
          filesList={cause ? edit_initiative.annexes : new_initiative.annexes}
          onFileDelete={handleFileDelete}
          onFileDownload={handleFileDownload}
        />
      </S.AttachmentsWrapper>
      <S.ReferencesWrapper>
        <S.AttachmentsTitle><FormattedMessage id = "add.initiative.external.references.title"/></S.AttachmentsTitle>
        <S.ReferencesDesc>
          <FormattedMessage id = "form.url.description"/>
        </S.ReferencesDesc>
        {causeData.references?.map((link: any, idx: number) => (
          <ReferenceForeignlink
            key={idx}
            link={link}
            onDelete={handlerLinkDelete}
          />
        ))}
        {(showReferenceInput || causeData.references?.length === 0) && (
          <S.ReferencesInputWrapper>
            <Input
              autoComplete="off"
              placeholder={<FormattedMessage id = "form.add.url"/>}
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

export default PersonalizedInitiative
