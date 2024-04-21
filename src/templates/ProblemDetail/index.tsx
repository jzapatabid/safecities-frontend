import { useState, useEffect } from 'react'

import { DETAIL_PAGE_NAV_LINKS } from 'constants/Diagnosis'
import {
  PROBLEM_DETAIL_ACTUAL_SITUATION_FIELDS,
  PROBLEMS_ACTION_MODAL_PROPS
} from 'constants/Problems'

import { useModal } from 'contexts/Modal'

import { ProblemsActionModalPropsTypes } from 'types/Problems'

import { PROBLEMS_ACTION } from 'enums/Problems'

import _ from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  formatNumberToLatinAmerican,
  getLastYearRangeInPortuguese
} from 'utils'

import * as S from './styles'
import theme from 'styles/theme'

import BarLineChart from 'components/BarLineChart'
import ButtonV2 from 'components/ButtonV2'
import DetailCardV1 from 'components/DetailCardV1'
import DetailCardV2 from 'components/DetailCardV2'
import Disclaimer from 'components/Disclaimer'
import Footer from 'components/Footer'
import Header from 'components/Header'
import EditIcon from 'components/icons/EditIcon'
import FlagFilledIcon from 'components/icons/FlagFilledIcon'
import FlagIcon from 'components/icons/FlagOutlineIcon'
import LeftArrow from 'components/icons/LeftArrow'
import PlansIcon from 'components/icons/PlansIcon'
import MainContainer from 'components/MainContainer'
import NavBar from 'components/NavBar'
import ProblemCharacteristicsChart from 'components/ProblemCharacteristicsChart'
import StackedBarChart from 'components/StackedBarChart'
import TreemapChart from 'components/TreemapChart'
import { FormattedMessage } from 'react-intl'
import LanguageProvider from 'contexts/LanguageSelector'

type ProblemDetailPropTypes = {
  detail: any
  id: number
  backTo: string
}

const static_data: any = {
  data_viz: {
    performance: {
      title: <FormattedMessage id = 'chart.title'/>,
      count: '25,000',
      countDesc: 'Do total de ocorrências registradas na cidade',
      footer: <FormattedMessage id = "footer" />,
      legends: [
        { label: 'Florianópolis', color: '#00ADD2' },
        { label: 'Santa Catarina', Icon: EditIcon }
      ]
    },
    trend: {
      title: 'Estatísticas de tendência',
      footer: <FormattedMessage id = "footer" />,
      legends: [
        { label: 'Ocorrências', color: '#00ADD2' },
        { label: 'Taxa', Icon: EditIcon }
      ]
    },
    relativeFrequency: {
      title: 'Estatísticas de frequência relativa',
      footer: <FormattedMessage id = "footer" />
    }
  },
  key_variables: [
    {
      dataKey: 'performance',
      title: <FormattedMessage id = "chart.performance"/>,
      label: <FormattedMessage id = "chart.relation" />,
      indicators: [
        { text: <FormattedMessage id = "chart.performance.1" /> , criticality: 'none', variant: 'up' },
        { text: <FormattedMessage id = "chart.performance.2" />, criticality: 'none', variant: 'center' },
        { text: <FormattedMessage id = "chart.performance.3" />, criticality: 'none', variant: 'down' }
      ],
      footer: <FormattedMessage id = "chart.relation.time" />
    },
    {
      dataKey: 'trend',
      title: <FormattedMessage id = "chart.trend"/>,
      label: <FormattedMessage id = "chart.trend.variation"/>,
      indicators: [
        { text: <FormattedMessage id = "chart.trend.1"/>, criticality: 'none', variant: 'up' },
        { text: <FormattedMessage id = "chart.trend.2"/>, criticality: 'none', variant: 'center' },
        { text: <FormattedMessage id = "chart.trend.3"/>, criticality: 'none', variant: 'down' }
      ],
      footer: <FormattedMessage id = "chart.trend.relation"/>
    },
    {
      dataKey: 'relativeFrequency',
      title: <FormattedMessage id = "chart.relative.frequency"/>,
      percentage: '-25%',
      label: <FormattedMessage id = "chart.relative" />,
      neutral: true,
      indicators: [
        {
          text: <FormattedMessage id = "chart.relative.1"/>,
          criticality: 'none',
          variant: 'center'
        },
        {
          text: <FormattedMessage id="chart.relative.2"/>,
          criticality: 'none',
          variant: 'center'
        },
        {
          text: <FormattedMessage id="chart.relative.3"/>,
          criticality: 'none',
          variant: 'center'
        }
      ],
      footer: <FormattedMessage id="chart.relative.time" />
    }
  ]
}

const ProblemDetail: React.FC<ProblemDetailPropTypes> = ({
  detail,
  id,
  backTo
}) => {
  console.log("This Is  detail:", detail)
  const router = useRouter()
  const [chartDataKey, setChartDataKey] = useState('performance')
  const { setModalState } = useModal()
  const handleActionClick = (modalProps: ProblemsActionModalPropsTypes) => {
    setModalState({
      ...modalProps,
      contentProps: {
        selectedProblems: [detail.problem],
        type: modalProps.actionType
      }
    })
  }

  useEffect(() => {
    PROBLEM_DETAIL_ACTUAL_SITUATION_FIELDS[1].label =
      detail.problem?.measurement_unit
  }, [detail.problem?.measurement_unit])

  const polarity = {
    performance:
      detail.problem && detail.problem.polarity ? detail.problem.polarity : '',
    performanceValue:
      detail.kpi && detail.kpi.performance ? detail.kpi.performance : '',
    trend:
      detail.problem && detail.problem.polarity ? detail.problem.polarity : '',
    trendValue: detail.kpi && detail.kpi.trend ? detail.kpi.trend : ''
  }

  return (
    <>
      <LanguageProvider>
        <Header />
        <MainContainer>
        {backTo !== 'bktplan' ? (
          <S.GobackWrapper>
            <S.NavWrapper>
              <Link href="/diagnostico/problemas-potenciais" passHref>
                <LeftArrow
                  width={24}
                  height={24}
                  color={theme.colors.base.lightPure}
                />
              </Link>
            </S.NavWrapper>
            <S.GoBackText>
              <FormattedMessage id='page.link.return'/>{' '}
              <Link href="/diagnostico/problemas-potenciais" passHref>
                <S.LinkText><FormattedMessage id='diagnosis.potential.problems.title'/></S.LinkText>
              </Link>
            </S.GoBackText>
          </S.GobackWrapper>
        ) : null}
        <S.AboutProblemWrapper>
          <S.NameAndActionWrapper>
            <S.NameWrapper>
              {detail?.problem?.prioritized ? (
                <FlagFilledIcon
                  fill={theme.colors.base.lightPure}
                  height={26}
                  width={26}
                />
              ) : (
                <FlagIcon
                  fill={theme.colors.base.lightPure}
                  height={26}
                  width={26}
                />
              )}
              <S.ProblemName>{detail?.problem?.name}</S.ProblemName>
            </S.NameWrapper>
            <ButtonV2
              loading={false}
              text={
                detail?.problem?.prioritized
                  ? <FormattedMessage id='button.diagnosis.prioritize.problem'/>
                  : <FormattedMessage id='button.diagnosis.deprioritize.problem'/>
              }
              LeadingIcon={
                detail?.problem?.prioritized ? FlagIcon : FlagFilledIcon
              }
              onClick={() =>
                detail.problem?.prioritized
                  ? handleActionClick(
                      PROBLEMS_ACTION_MODAL_PROPS[PROBLEMS_ACTION.DEPRIORITIZE]
                    )
                  : handleActionClick(
                      PROBLEMS_ACTION_MODAL_PROPS[PROBLEMS_ACTION.PRIORITIZE]
                    )
              }
            />
          </S.NameAndActionWrapper>
          <S.DescriptionWrapper>
            <S.DescLabel><FormattedMessage id='diagnosis.desc'/></S.DescLabel>
            <S.Description>{detail.problem?.description}</S.Description>
          </S.DescriptionWrapper>
        </S.AboutProblemWrapper>
        {router.query.bkt === 'ca' ? (
          <S.NavBarWrapper>
            <NavBar
              nounderline
              links={DETAIL_PAGE_NAV_LINKS}
              totalCaus={detail.totalCauses}
              variant="small"
              trailingParam={id}
            />
          </S.NavBarWrapper>
        ) : null}
        {_.isBoolean(detail?.problem?.hasData) &&
        detail.problem.hasData === true ? (
          <>
            <S.CurrentSituationDetailsWrapper>
              <S.CurrentSituationTitle><FormattedMessage id='problem.detail.current.situation'/></S.CurrentSituationTitle>
              <S.CSCardWrapper>
                {PROBLEM_DETAIL_ACTUAL_SITUATION_FIELDS.map(
                  ({ dataKey, ...fieldProps }, idx) => (
                    <DetailCardV1
                      key={idx}
                      {...fieldProps}
                      period={getLastYearRangeInPortuguese(
                        detail?.problem?.updatedAt || 'NA'
                      )}
                      count={detail[dataKey]}
                    />
                  )
                )}
              </S.CSCardWrapper>
            </S.CurrentSituationDetailsWrapper>
            <S.KeyVariableDetailsWrapper>
              <S.KeyVariablesTitle>
              <FormattedMessage id='problem.detail.key.variables'/>
              </S.KeyVariablesTitle>
              <S.KeyVariableDataWrapper>
                <S.KeyVariableCardsWrapper>
                  {static_data.key_variables.map((data: any, idx: number) => (
                    <DetailCardV2
                      key={idx}
                      polarity={polarity}
                      data={{
                        ...data,
                        percentage:
                          typeof detail.kpi?.[data.dataKey] === 'number'
                            ? Math.sign(detail.kpi?.[data.dataKey]) === -1
                              ? `${formatNumberToLatinAmerican(
                                  detail.kpi?.[data.dataKey]
                                )}`
                              : Math.sign(detail.kpi?.[data.dataKey]) === 1
                              ? `+${formatNumberToLatinAmerican(
                                  detail.kpi?.[data.dataKey]
                                )}`
                              : 0
                            : '-'
                      }}
                      setData={setChartDataKey}
                      selected={chartDataKey === data.dataKey}
                    />
                  ))}
                </S.KeyVariableCardsWrapper>
                <S.KeyVariableVisualizationWrapper>
                  {chartDataKey === 'performance' ? (
                    <BarLineChart
                      static_data={static_data.data_viz['performance']}
                      data={detail.kpi?.performanceData || []}
                      problemId={detail.problem.id}
                      updatedAt={detail.problem.updatedAt || ''}
                    />
                  ) : null}
                  {chartDataKey === 'trend' ? (
                    <StackedBarChart
                      static_data={static_data.data_viz[chartDataKey]}
                      measurementUnit={detail.problem.measurement_unit}
                      data={{
                        data: detail.kpi?.trendData || [],
                        keys: ['totalCityIncidents'],
                        updatedAt: detail.problem.updatedAt || ''
                      }}
                      problemId={detail.problem.id}
                    />
                  ) : null}
                  {chartDataKey === 'relativeFrequency' ? (
                    <TreemapChart
                      static_data={static_data.data_viz[chartDataKey]}
                      data={
                        detail.kpi?.relativeFrequencyData
                          ? {
                              name: detail?.problem?.name || '',
                              children: detail.kpi?.relativeFrequencyData
                            }
                          : { name: detail?.problem?.name || '', children: [] }
                      }
                      problemId={detail.problem.id}
                    />
                  ) : null}
                </S.KeyVariableVisualizationWrapper>
              </S.KeyVariableDataWrapper>
            </S.KeyVariableDetailsWrapper>
            {Array.isArray(detail?.dataCharacteristics) && (
              <S.ProblemCharacteristicsWrapper>
                <S.PieChartsTitle>
                <FormattedMessage id='problem.detail.key.features'/>
                </S.PieChartsTitle>
                {detail?.dataCharacteristics.map((field: any, idx: number) => (
                  <ProblemCharacteristicsChart
                    title={field.name}
                    key={idx}
                    data={field.data}
                    icon={field.iconName || ''}
                    updatedAt={detail?.problem?.updatedAt || 'NA'}
                  />
                ))}
                {/* <S.WrapperConcentration>
                  <S.Title>Concentração</S.Title>
                 <S.ConcentrationContent>
                    <ConsentrationBarChart
                      data={detail.kpi.concentrationData}
                      legendColors={legendColor}
                      updateDate={detail.problem.updatedAt}
                    /> 
                  </S.ConcentrationContent>
                  <S.Footer>Valores de Abr/2021 a Mar/2022</S.Footer>
                </S.WrapperConcentration> */}
              </S.ProblemCharacteristicsWrapper>
            )}
          </>
        ) : (
          <S.DisclaimerWrapper>
            <Disclaimer
              data={{ line1: <FormattedMessage id='problem.detail.no.data.found'/> }}
            />
          </S.DisclaimerWrapper>
        )}
        {detail?.problem?.hasData && detail?.problem?.geonetLink ? (
        <S.AccessMapWrapper>
          <S.AccessMapDetailsWrapper>
            <S.AccessMapTitle>
              <FormattedMessage id='problem.detail.footer.analyzing'/>
            </S.AccessMapTitle>
            <S.AccessMapDesc>
              <FormattedMessage id='problem.detail.footer.georeferenced.depth'/>
            </S.AccessMapDesc>
          </S.AccessMapDetailsWrapper>
          <S.ButtonWrapper>
            <ButtonV2
              loading={false}
              text={<FormattedMessage id='button.problem.detail.map.acces'/>}
              variant="outline"
              LeadingIcon={PlansIcon}
              href={detail.problem?.geonetLink || ''}
              linkExternal
              disabled={!detail?.problem?.geonetLink}
            />
          </S.ButtonWrapper>
        </S.AccessMapWrapper>
        ) : null}
        <Footer />
      </MainContainer>
</LanguageProvider>
    </>
  )
}

export default ProblemDetail
