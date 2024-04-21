import React, { ChangeEvent, useEffect, useState } from 'react'

import Link from 'next/link'

import * as S from './styles'

import { limitChar, placeHolders } from '../auxiliarText'
import ModalForm from '../ModalForm'

import Button from 'components/Button'
import Container from 'components/Container'
import Footer from 'components/Footer'
import Header from 'components/Header'
import LeftArrow from 'components/icons/LeftArrow'

export default function EditCause(Causa?: any) {
  const initialFormData = Object({
    cause_name: Causa.title ?? '',
    cause_evidence: Causa.evidence ?? '',
    cause_description: Causa.description ?? ''
  })

  const [counterTitleChar, setCounterTitleChar] = useState(Causa.title.length)
  const [counterJustificativeChar, setCounterJustificativeChar] = useState(
    Causa.title.length
  )
  const [counterEvidenceChar, setCounterEvidenceChar] = useState(
    Causa.title.length
  )

  const [title, setTitle] = useState(Causa.title)
  const [justificative, setJustificative] = useState(Causa.description)
  const [evidence, setEvidence] = useState(Causa.evidence)

  const [formData, updateFormData] = useState(initialFormData)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const baseURL = process.env.NEXT_PUBLIC_API_URL

    const response = await fetch(`${baseURL}/city/${1}/cause/${Causa.id}`, {
      body: JSON.stringify(formData),
      headers: {
        Authorization: `Bearer ${Causa.token}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH'
    })
    !Causa.is_literature_based && response
  }

  const [modalOpen, setModalOpen] = useState(false)
  const [feedBackModalOpen, setFeedBackModalOpen] = useState(false)
  const [DiscardModalOpen, setDiscardModalOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [blockedModalOpen, setblockedModalOpen] = useState(
    Causa.is_literature_based
  )

  useEffect(() => {
    !modalOpen
      ? (document.body.style.overflow = 'unset')
      : (document.body.style.overflow = 'hidden')
  }, [modalOpen])

  useEffect(() => {
    !DiscardModalOpen
      ? (document.body.style.overflow = 'unset')
      : (document.body.style.overflow = 'hidden')
  }, [DiscardModalOpen])

  useEffect(() => {
    !feedBackModalOpen
      ? (document.body.style.overflow = 'unset')
      : (document.body.style.overflow = 'hidden')
  }, [feedBackModalOpen])

  useEffect(() => {
    !blockedModalOpen
      ? (document.body.style.overflow = 'unset')
      : (document.body.style.overflow = 'hidden')
  }, [blockedModalOpen])

  return (
    <Container>
      {blockedModalOpen && (
        <ModalForm
          handleMainButtonAction={function () {
            location.href = `/diagnostico/causas/${Causa.problemId}`
          }}
          mainButtonText="Voltar para causas"
        >
          <h1>Ops...</h1>
          <p>Está causa é de acervo datado e portanto não pode ser editada.</p>
        </ModalForm>
      )}
      <Header />
      <Link href={`/diagnostico/causas/${Causa.problemId}`}>
        <a style={{ margin: '20px 0' }}>
          <LeftArrow color="white" />
        </a>
      </Link>
      <S.WrapperTextHero>
        <S.Title>Faça a edição da sua causa</S.Title>
        <S.Description>
          A edição de uma causa personalizada de fora da literatura é muito
          importante dado o contexto de cada municipio. Aqui, na edição dessa
          causa, busque ao máximo preenche-la com detalhes e informações que
          corroborem a relevância dessa causa sob o contexto do problema que se
          procura associar.
        </S.Description>
      </S.WrapperTextHero>

      <S.Form>
        <S.Wrapper>
          <S.Label>Edite o título da sua causa</S.Label>
          <S.Input
            name="cause_name"
            placeholder={placeHolders.title}
            onChange={(e) => {
              setTitle(e.target.value)
              handleChange(e)
              setCounterTitleChar(e.currentTarget.value.length)
            }}
            value={title}
            maxLength={limitChar.title}
          />
          <S.AssistentWrapper>
            <p>
              {counterTitleChar
                ? `${counterTitleChar}/${limitChar.title}`
                : `Insira até ${limitChar.title} caracteres`}
            </p>
            <legend>{!counterTitleChar && '* Obrigatório'}</legend>
          </S.AssistentWrapper>
        </S.Wrapper>

        <S.Wrapper>
          <S.Label>Edite a justificativa da sua causa</S.Label>
          <S.Input
            name="cause_description"
            placeholder={placeHolders.justificative}
            onChange={(e) => {
              setJustificative(e.target.value)
              handleChange(e)
              setCounterJustificativeChar(e.currentTarget.value.length)
            }}
            value={justificative}
            maxLength={limitChar.justificative}
          />
          <S.AssistentWrapper>
            <p>
              {counterJustificativeChar
                ? `${counterJustificativeChar}/${limitChar.justificative}`
                : `Insira até ${limitChar.justificative} caracteres`}
            </p>

            <legend>{!counterJustificativeChar && '* Obrigatório'}</legend>
          </S.AssistentWrapper>
        </S.Wrapper>

        <S.Wrapper>
          <S.Label>Edite a evidência da sua causa</S.Label>
          <S.Input
            name="cause_evidence"
            placeholder={placeHolders.evidence}
            onChange={(e) => {
              setEvidence(e.target.value)
              handleChange(e)
              setCounterEvidenceChar(e.currentTarget.value.length)
            }}
            value={evidence}
            maxLength={limitChar.evidence}
          />
          <S.AssistentWrapper>
            <p>
              {counterEvidenceChar
                ? `${counterEvidenceChar}/${limitChar.evidence}`
                : `Insira até ${limitChar.evidence} caracteres`}
            </p>
            <legend style={{ color: '#fff' }}>
              {!counterEvidenceChar && 'Opcional'}
            </legend>
          </S.AssistentWrapper>
        </S.Wrapper>
      </S.Form>

      <S.Hr />
      <S.WrapperButton>
        <Button
          onClick={() => {
            setModalOpen(!modalOpen)
          }}
          disabled={!counterTitleChar || !counterJustificativeChar}
        >
          Salvar causa
        </Button>
        <a onClick={() => setDiscardModalOpen(!DiscardModalOpen)}>
          Descartar alterações
        </a>
      </S.WrapperButton>

      {DiscardModalOpen && (
        <ModalForm
          optionalButtonText="Continuar editando"
          handleOptionalButtonAction={() =>
            setDiscardModalOpen(!DiscardModalOpen)
          }
          mainButtonText="Sim, descartar"
          handleMainButtonAction={function () {
            setDiscardModalOpen(!DiscardModalOpen)
            location.href = `/diagnostico/causas/${Causa.problemId}`
          }}
        >
          Deseja descartar as alterações feitas na causa selecionada?
        </ModalForm>
      )}

      {modalOpen && (
        <ModalForm
          optionalButtonText="Voltar para edição"
          handleOptionalButtonAction={() => setModalOpen(!modalOpen)}
          mainButtonText="Sim, salvar"
          handleMainButtonAction={(e: any) => {
            handleSubmit(e)
            setModalOpen(!modalOpen)
            setFeedBackModalOpen(!feedBackModalOpen)
          }}
        >
          Deseja salvar as alterações feitas na causa selecionada?
        </ModalForm>
      )}

      {feedBackModalOpen && (
        <ModalForm
          mainButtonText="Voltar para Causas"
          handleMainButtonAction={function () {
            setFeedBackModalOpen(!feedBackModalOpen)
            location.href = `/diagnostico/causas/${Causa.problemId}`
          }}
        >
          Alterações salvas com sucesso.
        </ModalForm>
      )}
      <Footer />
    </Container>
  )
}
