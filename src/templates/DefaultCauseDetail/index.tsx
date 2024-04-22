import { useEffect, useState } from 'react'

import {
  CAUSE_TYPE_LABELS,
  CAUSES_ACTION_MODAL_PROPS,
  DEFAULT_CAUSE_DETAIL_ACTUAL_SITUATION_FIELDS
} from 'constants/Causes'

import { useModal } from 'contexts/Modal'

import { CausesActionModalPropsTypes } from 'types/Causes'

import { CAUSE_TYPE_ACCESSOR, CAUSES_ACTION } from 'enums/Causes'

import _ from 'lodash'
import { useRouter } from 'next/router'
import { getAPIClient } from 'services/axios'
import { getProblemsAssociatedForMultipleCauses } from 'services/causes'
import {
  formatNumberToLatinAmerican,
  getLastYearRangeInPortuguese
} from 'utils'

import * as S from './styles'
import theme from 'styles/theme'

import ButtonV2 from 'components/ButtonV2'
import ControlledTabs from 'components/ControlledTabs'
import DetailCardV1 from 'components/DetailCardV1'
import Disclaimer from 'components/Disclaimer'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Book2Icon from 'components/icons/Book2Icon'
import EditIcon from 'components/icons/EditIcon'
import FlagFilledIcon from 'components/icons/FlagFilledIcon'
import FlagIcon from 'components/icons/FlagOutlineIcon'
import LeftArrow from 'components/icons/LeftArrow'
import MainContainer from 'components/MainContainer'
import ProblemCharacteristicsChart from 'components/ProblemCharacteristicsChart'
import StackedBarChart from 'components/StackedBarChart'
import { FormattedMessage } from 'react-intl'
import LanguageProvider from 'contexts/LanguageSelector'

type DefaultCauseDetailPropTypes = {
  detail: any
  id: number
  problemId: number
  problemName: string
}

const static_data = {
  title: 'Tendência',
  count: '-50%',
  countDesc: 'Variação da taxa',
  footer: <FormattedMessage id="footer" />,
  legends: [
    { label: 'Ocorrências', color: '#00ADD2' },
    { label: 'Taxa', Icon: EditIcon }
  ],
  indicators: [
    { text: 'Aumento', criticality: 'none', variant: 'up' },
    { text: 'Estável', criticality: 'none', variant: 'center' },
    { text: 'Redução', criticality: 'none', variant: 'down' }
  ],
  dataDateRange: 'Em relação aos últimos 5 anos'
}

const DefaultCauseDetail: React.FC<DefaultCauseDetailPropTypes> = ({
  detail: cause,
  problemId,
  problemName
}) => {
  const apiClient = getAPIClient()
  const indicators = cause.indicators.map((indicator: any) => ({
    name:
      indicator.causeIndicator.name.charAt(0).toUpperCase() +
      indicator.causeIndicator.name.slice(1)
  }))
  const [selectedTab, setSelectedTab] = useState(0)
  const [indicatorData, setIndicatorData] = useState({} as any)
  const [causeIndicator, setCauseIndicator] = useState({} as any)
  const [polarityAndTrend, setPolarityAndTrend] = useState({} as any)
  const [btn1Loading, setBtn1Loading] = useState(false)
  const router = useRouter()
  const { setModalState } = useModal()
  const handleActionClick = async (modalProps: CausesActionModalPropsTypes) => {
    setBtn1Loading(true)

    const cause_ids = [cause.id]

    const respectiveProblemsMap = await getProblemsAssociatedForMultipleCauses(
      apiClient,
      cause_ids
    )

    const StackedCauseData = Array.from(
      respectiveProblemsMap,
      ([id, value]) => [
        {
          causeId: id,
          name: value[0].causeName,
          causePrioritized: Boolean(
            value.filter((problem: any) => problem.prioritized).length
          )
        },
        value
      ]
    )
    setBtn1Loading(false)

    setModalState({
      ...modalProps,
      contentProps: {
        cause: cause,
        associatedProblems: StackedCauseData,
        type: modalProps.actionType
      }
    })
  }
/* eslint-disable */
  useEffect(() => {
    if (cause.indicators[selectedTab]) {
      setIndicatorData({
        ...cause.indicators[selectedTab].causeIndicatorData
      })

      setCauseIndicator({
        ...cause.indicators[selectedTab].causeIndicator
      })

      DEFAULT_CAUSE_DETAIL_ACTUAL_SITUATION_FIELDS[1].label =
        cause.indicators[selectedTab].causeIndicator.measurement_unit
    }
  }, [selectedTab])
  /* eslint-enable */
  useEffect(() => {
    setPolarityAndTrend({
      polarity: cause.indicators[selectedTab]?.causeIndicator.polarity,
      trendValue: cause.indicators[selectedTab]?.causeIndicatorData?.kpi.trend
    })
  }, [selectedTab, cause.indicators])

  return (
    <>
      <LanguageProvider>
        <Header />
        <MainContainer>
        {problemId && problemName ? (
          <S.GobackWrapper>
            <S.NavWrapper>
              <LeftArrow
                height={24}
                width={24}
                color={theme.colors.base.lightPure}
                onClick={() =>
                  router.push(`/diagnostico/causas-associadas/${problemId}`)
                }
              />
            </S.NavWrapper>
            <S.GoBackText>
              <FormattedMessage id='causes.associated.detail.link'/>:{' '}
              <S.LinkText
                onClick={() =>
                  router.push(`/diagnostico/causas-associadas/${problemId}`)
                }
              >
                {problemName}
              </S.LinkText>
            </S.GoBackText>
          </S.GobackWrapper>
        ) : null}
        <S.SectionWrapper>
          <S.NameAndActionWrapper>
            <S.NameWrapper>
              <S.ProblemName>{cause.name}</S.ProblemName>
            </S.NameWrapper>
            <S.BtnWrapper>
              {cause.prioritized ? (
                <S.IconWrapper>
                  <FlagFilledIcon
                    fill={theme.colors.base.lightPure}
                    height={26}
                    width={26}
                  />
                </S.IconWrapper>
              ) : (
                <S.IconWrapper>
                  <FlagIcon
                    fill={theme.colors.base.lightPure}
                    height={26}
                    width={26}
                  />
                </S.IconWrapper>
              )}
              <ButtonV2
                loading={btn1Loading}
                text={
                  cause.prioritized ? <FormattedMessage id='button.diagnosis.deprioritize.cause'/> : <FormattedMessage id='button.diagnosis.prioritize.cause'/>
                }
                LeadingIcon={cause.prioritized ? FlagIcon : FlagFilledIcon}
                onClick={() =>
                  cause.prioritized
                    ? handleActionClick(
                        CAUSES_ACTION_MODAL_PROPS[CAUSES_ACTION.DEPRIORITIZE]
                      )
                    : handleActionClick(
                        CAUSES_ACTION_MODAL_PROPS[CAUSES_ACTION.PRIORITIZE]
                      )
                }
              />
            </S.BtnWrapper>
          </S.NameAndActionWrapper>
          <S.CauseInfoWrapper>
            <S.Author>
              <Book2Icon />
              <S.CauseType>
                {CAUSE_TYPE_LABELS[CAUSE_TYPE_ACCESSOR.DEFAULT]}
              </S.CauseType>
            </S.Author>
            {/* <S.CauseInfoItemWrapper>
              <S.CauseInfoItemKey>Autor:</S.CauseInfoItemKey>
              <S.CauseInfoItemValue>{cause.authorName}</S.CauseInfoItemValue>
            </S.CauseInfoItemWrapper> */}
            {/* <S.CauseInfoItemWrapper>
              <S.CauseInfoItemKey>Última atualização:</S.CauseInfoItemKey>
              <S.CauseInfoItemValue>{cause.last_updated}</S.CauseInfoItemValue>
            </S.CauseInfoItemWrapper> */}
          </S.CauseInfoWrapper>
          <S.DescriptionWrapper>
            <S.DescLabel><FormattedMessage id='causes.associated.detail.Justification'/></S.DescLabel>
            <S.Description>{cause.justification}</S.Description>
          </S.DescriptionWrapper>
        </S.SectionWrapper>
        {Array.isArray(indicators) && indicators.length !== 0 ? (
          <S.SectionWrapper>
            <S.SectionTitle><FormattedMessage id='causes.associated.detail.indicators'/></S.SectionTitle>
            <S.TabsWrapper>
              <ControlledTabs
                tabs={indicators}
                selected={selectedTab}
                onTabClick={setSelectedTab}
                linkText={true}
              />
            </S.TabsWrapper>
            {!_.isEmpty(indicatorData) ? (
              <>
                <S.CurrentSituationDetailsWrapper>
                  <S.CurrentSituationTitle>
                    <FormattedMessage id='problem.detail.current.situation'/>
                  </S.CurrentSituationTitle>
                  <S.CSCardWrapper>
                    {DEFAULT_CAUSE_DETAIL_ACTUAL_SITUATION_FIELDS.map(
                      ({ dataKey, ...fieldProps }, idx) => (
                        <DetailCardV1
                          key={idx}
                          {...fieldProps}
                          period={getLastYearRangeInPortuguese(
                            indicatorData?.updatedAt || 'NA'
                          )}
                          count={indicatorData[dataKey]}
                        />
                      )
                    )}
                  </S.CSCardWrapper>
                </S.CurrentSituationDetailsWrapper>
                {Array.isArray(indicatorData.kpi?.trendData) &&
                  indicatorData.kpi?.trendData.length !== 0 && (
                    <S.UnpaddedSectionWrapper>
                      <S.KeyVariableVisualizationWrapper>
                        <StackedBarChart
                          static_data={static_data}
                          measurementUnit={causeIndicator.measurement_unit}
                          polarityAndTrend={polarityAndTrend}
                          data={{
                            trend:
                              typeof indicatorData.kpi?.trend === 'number'
                                ? Math.sign(indicatorData.kpi?.trend) === -1
                                  ? `${formatNumberToLatinAmerican(
                                      indicatorData.kpi?.trend
                                    )}`
                                  : Math.sign(indicatorData.kpi?.trend) === 1
                                  ? `+${formatNumberToLatinAmerican(
                                      indicatorData.kpi?.trend
                                    )}`
                                  : 0
                                : '-',
                            data: indicatorData.kpi?.trendData || [],
                            updatedAt: indicatorData?.updatedAt || '',
                            keys: ['totalCityIncidents']
                          }}
                        />
                      </S.KeyVariableVisualizationWrapper>
                    </S.UnpaddedSectionWrapper>
                  )}
                {Array.isArray(indicatorData?.dataCharacteristics) &&
                  indicatorData.dataCharacteristics.length !== 0 && (
                    <S.CharacteristicsSectionWrapper>
                      <S.PieChartsTitle>
                      {<FormattedMessage id='problem.detail.key.features'/>}
                      </S.PieChartsTitle>
                      {indicatorData.dataCharacteristics.map(
                        (field: any, idx: number) => (
                          <ProblemCharacteristicsChart
                            title={field.name}
                            key={idx}
                            data={field.data || undefined}
                            icon={field.iconName || ''}
                            updatedAt={indicatorData?.updatedAt || 'NA'}
                          />
                        )
                      )}
                    </S.CharacteristicsSectionWrapper>
                  )}
              </>
            ) : (
              <Disclaimer
                data={{ line1: 'text.indicator.1' }}
                mtOnly={true}
              />
            )}
          </S.SectionWrapper>
        ) : (
          <S.DisclaimerWrapper>
            <Disclaimer
              data={{ line1: 'causes.no.data' }}
              mtOnly={true}
            />
          </S.DisclaimerWrapper>
        )}

        <Footer />
      </MainContainer>
</LanguageProvider>
    </>
  )
}

export default DefaultCauseDetail
