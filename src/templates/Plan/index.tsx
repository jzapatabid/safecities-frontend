import { useState } from 'react'

import { PORTUGESE_MONTH_MAPPING } from 'constants/Global'
import {
  CONSTRUCT_PLAN_DISCLAIMER,
  PLAN_NAV_LINKS,
  PLANS_PROGRESS_CARDS_STATIC_FIELDS,
  PLANS_TEMP_SUMMARY_FIELDS
} from 'constants/Plan'

import { usePlans } from 'contexts/plans'

import { parseCookies } from 'nookies'
import { getAPIClient } from 'services/axios'
import { getPlanPDFData } from 'services/plans'
import generateBLC from 'utils/generateBLC'
import generateSBC from 'utils/generateSBC'
import generateTreemap from 'utils/generateTreemap'

import * as S from './styles'

import ButtonV2 from 'components/ButtonV2'
import Disclaimer from 'components/Disclaimer'
import Footer from 'components/Footer'
import Header from 'components/Header'
import DownloadIcon from 'components/icons/DownloadIcon'
import MainContainer from 'components/MainContainer'
import NavBar from 'components/NavBar'
import PlanProgressCard from 'components/PlanProgressCard'
import StatCard from 'components/StatCard'
import { FormattedMessage } from 'react-intl'
import LanguageProvider from 'contexts/LanguageSelector'

const DISCLAIMER_TITLE = <FormattedMessage id='planning.build.plan.description.title'/>
const STATS_TITLE = 'planning.subtitle'
const CONSTRUCTION_TITLE = 'planning.step.by.step'

const Plans = () => {

  

  const apiClient = getAPIClient()
  const { plansState } = usePlans()
  const [preparingPDF, setPreparingPDF] = useState(false)
  const [year = '', month = '', date = ''] = plansState.basicInformationStatus
    .lastUpdate
    ? plansState.basicInformationStatus.lastUpdate.split('T')[0].split('-')
    : ''

  const generatePDF = async () => {
    if (!preparingPDF) {
      setPreparingPDF(true)
      const { ['@unacity-token']: accessToken } = parseCookies()
      let problem_diagnosis_data, cause_diagnosis_data
      try {
        const plan_data = await getPlanPDFData(apiClient)
        if (plan_data.problem_diagnoses.length !== 0) {
          problem_diagnosis_data = plan_data.problem_diagnoses.map(
            (problem: any) => {
              let trendMapData, relativeFrequencyMapData, performanceMapData
              if (
                Array.isArray(problem.trend_data) &&
                problem.trend_data.length !== 0
              ) {
                trendMapData = generateSBC(
                  problem?.trend,
                  problem.trend_data,
                  problem?.measurement_unit,
                  problem?.trend_end_at || ''
                )
              }

              if (
                Array.isArray(problem.relative_frequency_data) &&
                problem.relative_frequency_data.length !== 0
              ) {
                relativeFrequencyMapData = generateTreemap(
                  problem.problem_name,
                  problem?.relative_frequency,
                  problem.relative_frequency_data
                )
              }

              if (
                Array.isArray(problem.performance_data) &&
                problem.performance_data.length !== 0
              ) {
                performanceMapData = generateBLC(
                  problem.performance,
                  problem.performance_data,
                  problem?.performance_end_at || ''
                )
              }

              return {
                performance: performanceMapData,
                trend: trendMapData,
                relativeFrequency: relativeFrequencyMapData,
                diagnosis: problem.diagnosis,
                problem_name: problem.problem_name
              }
            }
          )
        }

        if (plan_data.cause_indicator_diagnoses.length !== 0) {
          cause_diagnosis_data = plan_data.cause_indicator_diagnoses.map(
            (problem: any) => {
              let trendMapData
              if (
                Array.isArray(problem.trend_data) &&
                problem.trend_data.length !== 0
              ) {
                trendMapData = generateSBC(problem?.trend, problem.trend_data)
              }

              return {
                trend: trendMapData,
                diagnosis: problem.diagnosis,
                cause_indicator_name: problem.cause_indicator_name
              }
            }
          )
        }

        const response = await fetch('/api/plan-pdf', {
          method: 'POST',
          body: JSON.stringify({
            problem_diagnosis: problem_diagnosis_data || [],
            cause_diagnosis: cause_diagnosis_data || []
          }),
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        // const response = await apiClient.post(
        //   '/api/plan-pdf',
        //   {
        //     problem_diagnosis: problem_diagnosis_data
        //   },
        //   { withCredentials: true }
        // )

        if (response.ok) {
          // Handle a successful response, e.g., initiate download
          const pdfBlob = await response.blob()
          // const pdfBlob = new Blob([response.data], {
          //   type: 'application/pdf '
          // })
          const url = window.URL.createObjectURL(pdfBlob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'Plan.pdf'
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
        } else {
          // Handle the API error
          console.error('API request failed:', response.statusText)
        }
      } catch (error) {
        console.error('API request error:', error)
      } finally {
        setPreparingPDF(false)
      }
    }
  }

  

  return (
    
    <>
      <LanguageProvider>
        <Header />
        <MainContainer>
        <S.NavBarWrapper>
          <NavBar links={PLAN_NAV_LINKS} variant="small" />
        </S.NavBarWrapper>
        <S.SectionWrapper>
          <S.DetailAndNewPlanWrapper>
            <S.DisclaimerWrapper>
              <S.Title>{DISCLAIMER_TITLE}</S.Title>
              <Disclaimer withTitle={true} data={CONSTRUCT_PLAN_DISCLAIMER} />
            </S.DisclaimerWrapper>
            {/* <ButtonV2
              loading={false}
              text="Fazer novo plano"
              LeadingIcon={PlusSignIcon}
              onClick={() =>
                router.push('/planejamento/plan-basic-information')
              }
            /> */}
          </S.DetailAndNewPlanWrapper>
        </S.SectionWrapper>
        <S.StatsWrapper>
          <S.Title>{<FormattedMessage id={STATS_TITLE}/>}</S.Title>
          <S.Wrapper>
            {PLANS_TEMP_SUMMARY_FIELDS.map(({ key, ...stats }, idx) => (
              <StatCard key={idx} count={plansState.summary[key]} {...stats} />
            ))}
          </S.Wrapper>
        </S.StatsWrapper>
        <S.SectionWrapper>
          <S.TitleAndDownloadWrapper>
            <S.ConstructionTitle>{<FormattedMessage id ={CONSTRUCTION_TITLE}/>}</S.ConstructionTitle>
            <S.DownloadBtnWrapper>
              <ButtonV2
                loading={preparingPDF}
                text= {< FormattedMessage id="button.plan.download.pdf"/>}
                variant="outline"
                LeadingIcon={DownloadIcon}
                onClick={generatePDF}
              />
            </S.DownloadBtnWrapper>
          </S.TitleAndDownloadWrapper>
          <S.PlanProgressCardsWrapper>
            {PLANS_PROGRESS_CARDS_STATIC_FIELDS.map((detail: any, idx) => (
              <PlanProgressCard
                key={idx}
                detail={detail}
                data={plansState[detail.dataKey]}
              />
            ))}
          </S.PlanProgressCardsWrapper>
        </S.SectionWrapper>
        <S.Text>{`última atualização: ${date} de ${
          PORTUGESE_MONTH_MAPPING[month] as string
        } de ${year}`}</S.Text>
        <Footer />
      </MainContainer>
</LanguageProvider>
    </>
  )
}

export default Plans
