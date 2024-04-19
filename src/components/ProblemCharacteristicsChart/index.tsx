import { useEffect, useState } from 'react'

import { getLastYearRangeInPortuguese } from 'utils'

import * as S from './styles'

import ButtonV2 from 'components/ButtonV2'
import ControlledTabs from 'components/ControlledTabs'
import DonutChart from 'components/DonutChart'
import DonutChartLegends from 'components/DonutChartLegends'
import Dropdown from 'components/Dropdown'
import DownloadIcon from 'components/icons/DownloadIcon'
import LocationIcon from 'components/icons/LocationIcon'
import ModalityIcon from 'components/icons/ModalityIcon'
import MomentsIcon from 'components/icons/MomentsIcon'
import PeopleIcon from 'components/icons/PeopleIcon'
import InfoShelf from 'components/InfoShelf'
import { FormattedMessage } from 'react-intl'

const ICONS = {
  people: PeopleIcon,
  moments: MomentsIcon,
  location: LocationIcon,
  modality: ModalityIcon
}

const ProblemCharacteristicsChart = ({
  data,
  title,
  icon,
  updatedAt
}: {
  data: any
  title: string
  icon: string
  updatedAt?: string
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const Icon = ICONS[icon] || PeopleIcon
  const [dropdownOptions, setDropdownOptions] = useState(
    data && data.length !== 0
      ? data?.map((obj: any, idx: number) => ({
          text: obj.name,
          selected: idx === 0 ? true : false
        }))
      : []
  )

  const [dropdownData, setDropdownData] = useState(
    data && data.length !== 0 ? data[0].data : []
  )
  const [open, setOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedOption, setSelectedOption] = useState(
    data && data.length !== 0
      ? data[0].data.findIndex((obj: any) => Object.values(obj)[0] !== null)
      : 0
  )
  const [chartData, setChartData] = useState({})

  const handleSelectDDOption = (option: any) => {
    setDropdownOptions((state: any) =>
      state.map((initialOption: any) => ({
        ...initialOption,
        selected: option.text === initialOption.text
      }))
    )
    setSelectedOption(0)
    setOpen(false)
  }

  const handleSelectOption = (id: number) => () => {
    setSelectedOption(id)
  }

  useEffect(() => {
    if (data && data.length !== 0) {
      setDropdownOptions(
        data?.map((obj: any, idx: number) => ({
          text: obj.name,
          selected: idx === 0 ? true : false
        }))
      )
      setSelectedOption(
        data[0].data.findIndex((obj: any) => Object.values(obj)[0] !== null) ||
          0
      )
    } else {
      setDropdownOptions([])
      setDropdownData([])
      setOpen(false)
      setChartData({})
      setSelectedOption(0)
    }
  }, [data])

  useEffect(() => {
    if (data) {
      const selectedDDOption = dropdownOptions.filter(
        (option: any) => option.selected
      )[0]?.text
      setDropdownData(
        data?.filter((obj: any) => obj.name === selectedDDOption)[0]?.data
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownOptions])

  useEffect(() => {
    if (dropdownData?.length) {
      setChartData(dropdownData[selectedOption] || {})
    }
  }, [dropdownData, selectedOption])

  return (
    <S.Wrapper>
      <S.Section1Wrapper>
        <S.TitleAndIcon>
          <S.IconWrapper>
            <Icon />
          </S.IconWrapper>
          <S.Title>{title}</S.Title>
        </S.TitleAndIcon>
        <S.DropdownWrapper>
          <Dropdown
            singleSelect
            open={open}
            setOpen={setOpen}
            options={dropdownOptions}
            onOptionClick={handleSelectDDOption}
            selectedText={
              dropdownOptions.filter((option: any) => option.selected)[0]?.text
            }
          />
        </S.DropdownWrapper>
      </S.Section1Wrapper>
      <S.Section2Wrapper>
        <ControlledTabs
          tabs={[{ name: <FormattedMessage id='problem.detail.chart.header.see.charts'/> }, { name: <FormattedMessage id='problem.detail.chart.header.see.tables'/> }]}
          selected={selectedTab}
          onTabClick={setSelectedTab}
        />
      </S.Section2Wrapper>
      <S.Section3Wrapper>
        <S.BtnsGroup>
          {dropdownData?.length
            ? Object.keys(dropdownData[0])[0] !== 'N/A' &&
              dropdownData.map((option: any, idx: number) => (
                <ButtonV2
                  loading={false}
                  key={idx}
                  text={Object.keys(option)[0]}
                  variant="outline"
                  selected={idx === selectedOption}
                  onClick={handleSelectOption(idx)}
                  disabled={!Object.values(option)[0]}
                />
              ))
            : null}
        </S.BtnsGroup>
      </S.Section3Wrapper>
      <S.Section4Wrapper>
        {selectedTab === 0 ? (
          <>
            <S.DataVizWrapper>
              <DonutChart data={Object.values(chartData)[0] || []} />
            </S.DataVizWrapper>
            <S.LegendsWrapper>
              <DonutChartLegends data={Object.values(chartData)[0] || []} />
            </S.LegendsWrapper>
          </>
        ) : (
          <InfoShelf data={Object.values(chartData)[0] || []} />
        )}
      </S.Section4Wrapper>
      <S.Section5Wrapper>
        <ButtonV2
          loading={false}
          text={<FormattedMessage id='button.problem.detail.chart.download'/>}
          variant="outline"
          LeadingIcon={DownloadIcon}
          disabled
        />
      </S.Section5Wrapper>
      <S.Footer><FormattedMessage id='problem.detail.chart.footer'/> {`${getLastYearRangeInPortuguese(updatedAt).replace(
        '-',
        updatedAt === 'NA' ? '' : 'a'
      )}`}</S.Footer>
    </S.Wrapper>
  )
}

export default ProblemCharacteristicsChart
