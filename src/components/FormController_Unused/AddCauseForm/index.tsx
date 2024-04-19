import { ChangeEvent, useEffect, useState } from 'react'

import Link from 'next/link'

import * as S from './styles'

import { limitChar, placeHolders } from '../auxiliarText'

import Button from 'components/Button'
import Container from 'components/Container'
import Footer from 'components/Footer'
import ModalForm from 'components/FormController_Unused/ModalForm'
import Header from 'components/Header'
import LeftArrow from 'components/icons/LeftArrow'

const initialFormData = Object({
  cause_name: '',
  cause_evidence: '',
  cause_description: ''
})

export default function AddCauseForm(CauseProps: any) {
  const [counterTitleChar, setCounterTitleChar] = useState(0)
  const [counterJustificativeChar, setCounterJustificativeChar] = useState(0)
  const [counterEvidenceChar, setCounterEvidenceChar] = useState(0)

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
    const response = await fetch(
      `${baseURL}/city/${1}/problem/${CauseProps.problemId}/cause`,
      {
        body: JSON.stringify(formData),
        headers: {
          Authorization: `Bearer ${CauseProps.token}`,
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )
    response
  }

  const [modalOpen, setModalOpen] = useState(false)
  useEffect(() => {
    !modalOpen
      ? (document.body.style.overflow = 'unset')
      : (document.body.style.overflow = 'hidden')
  }, [modalOpen])

  return (
    <Container>
      <Header />
      <Link href={`/diagnostico/causas/${CauseProps.problemId}`}>
        <a style={{ margin: '20px 0' }}>
          <LeftArrow color="white" />
        </a>
      </Link>

      <S.WrapperTextHero>
        <S.Title>Adicione uma nova causa</S.Title>
        <S.Description>
          A inclusão de uma causa personalizada de fora da literatura é muito
          importante dado o contexto de cada municipio. Aqui, no cadastro dessa
          causa, busque ao máximo preenche-la com detalhes e informações que
          corroborem a relevância dessa causa sob o contexto do problema que se
          procura associar.{' '}
        </S.Description>
      </S.WrapperTextHero>

      <S.Form method="POST" onSubmit={handleSubmit}>
        <S.Wrapper>
          <S.Label htmlFor="cause_name">
            Adicione um título para sua causa
          </S.Label>
          <S.Input
            name="cause_name"
            placeholder={placeHolders.title}
            onChange={(e) => {
              setCounterTitleChar(e.currentTarget.value.length)
              handleChange(e)
            }}
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
          <S.Label htmlFor="cause_description">
            Adicione uma justificativa para sua causa
          </S.Label>
          <S.Input
            name="cause_description"
            placeholder={placeHolders.justificative}
            onChange={(e) => {
              setCounterJustificativeChar(e.currentTarget.value.length)
              handleChange(e)
            }}
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
          <S.Label htmlFor="cause_evidence">
            Adicione evidências para sua causa
          </S.Label>
          <S.Input
            name="cause_evidence"
            placeholder={placeHolders.evidence}
            onChange={(e) => {
              setCounterEvidenceChar(e.currentTarget.value.length)
              handleChange(e)
            }}
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
          type="submit"
          onClick={(e: any) => {
            setModalOpen(!modalOpen)
            handleSubmit(e)
          }}
          disabled={!counterTitleChar || !counterJustificativeChar}
        >
          Salvar causa
        </Button>
      </S.WrapperButton>

      {modalOpen && (
        <ModalForm
          handleMainButtonAction={function () {
            setModalOpen(!modalOpen)
            location.href = `/diagnostico/causas/${CauseProps.problemId}`
          }}
          mainButtonText="Voltar para Causas"
        >
          Causa salva com sucesso.
        </ModalForm>
      )}

      <Footer />
    </Container>
  )
}
