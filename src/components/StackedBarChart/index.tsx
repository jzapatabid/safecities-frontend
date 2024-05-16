// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useRef, useState } from 'react'

import * as d3 from 'd3'
import {
  formatProblemTrendMapData,
  getLast5YearsQuarters,
  getLast5YearsQuartersFromGivenStartDate
} from 'utils'

import * as S from './styles'

import dataVizStyles from './datavizStyles.module.css'

import ButtonV2 from 'components/ButtonV2'
import { getCriticalityDetail } from 'components/DetailCardV2'
import DownloadIcon from 'components/icons/DownloadIcon'
import TrendIndicator from 'components/TrendIndicator'
import { FormattedMessage } from 'react-intl'

type StackedBarChartProps = {
  data: any
  static_data: any
  measurementUnit: any
  polarityAndTrend: any
  problemId?: number | string
}

const StackedBarChart = ({
  data,
  static_data,
  measurementUnit,
  polarityAndTrend = {},
  problemId
}: StackedBarChartProps) => {
  /* eslint-disable */
  let slope, criticality_info
  if (data.trend === 0 || data.trend) {
    if (data.trend === '-') {
      slope = 'unavailable'
    } else {
      slope =
        typeof data.trend === 'number'
          ? 'neutral'
          : data.trend.slice(0, 1) === '-'
          ? 'positive'
          : 'negative'
    }

    criticality_info = getCriticalityDetail(slope)
    /* eslint-enable */
  }

  const containerRef = useRef<HTMLDivElement | null>(null)
  /* eslint-disable */
  useEffect(() => {
    let mapdata
    const keys = data.keys

    const colors = {
      'Santa Catarina': '#00ADD2',
      Florianópolis: '#000000',
      totalCityIncidents: '#00ADD2'
    }

    if (data.updatedAt) {
      mapdata = formatProblemTrendMapData(
        getLast5YearsQuartersFromGivenStartDate(data.updatedAt),
        data.data
      )
    } else {
      mapdata = formatProblemTrendMapData(getLast5YearsQuarters(), data.data)
    }

    const groupKey = 'year'
    const stackKey = 'quarter'
    drawDataViz(mapdata, keys, colors, groupKey, stackKey)

    const handleResize = () => {
      d3.select('#rootDS').remove()
      drawDataViz(mapdata, keys, colors, groupKey, stackKey)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      d3.select('#rootDS').remove()
      window.removeEventListener('resize', handleResize)
    }
  }, [data])
  /* eslint-enable */
  const [slope2, setSlop2] = useState('')
  const drawDataViz = (
    data: any,
    keys: string[],
    colors: any,
    groupKey: string,
    stackKey: string
  ) => {
    const width = containerRef.current?.getBoundingClientRect().width
    const height = 565
    const margin = {
      top: 80,
      right: 60,
      bottom: 80,
      left: 60
    }

    const definedBarData = data.filter((d: any) => d.totalCityIncidents !== 0)

    const allBarDataZero = definedBarData.length === 0

    const definedLineData = data.filter(
      (d: any) =>
        d.rateCityIncidents !== undefined && d.rateCityIncidents !== null
    )

    const allLineDataZero =
      definedLineData.filter((item: any) => item.rateCityIncidents === 0)
        .length === definedLineData.length

    const dataByYear = d3.group(data, (d: any) => d[groupKey])
    const dataByQuarter = d3.group(data, (d: any) => d[stackKey])

    const stackGenerator = d3.stack().keys(keys)
    const layers = stackGenerator(data)

    const svg = d3
      .select('#dataViz')
      .append('svg')
      .attr('id', 'rootDS')
      .attr('height', height)
      .attr('width', width)

    const outerGroupXScale = d3
      .scaleBand()
      .domain(dataByYear.keys())
      .range([margin.left, width - margin.right])
      .padding(0.05)
    const outerGroupXAxis = (g: any) => {
      g.attr('transform', `translate(0, ${height - margin.bottom / 2 - 16})`)
        .attr('class', 'x-axis')
        .call(d3.axisBottom(outerGroupXScale))
        .call((g: any) => g.selectAll('.domain').remove())
        .call((g: any) => {
          g.selectAll('.tick>line').remove()
        })
        .call((g: any) => {
          g.selectAll('.tick>text').attr('class', dataVizStyles.tick_text)
        })
        .call((g: any) => g.select('.domain').attr('d', 'M180,0H820'))
    }

    const innerGroupXScale = d3
      .scaleBand()
      .domain(dataByQuarter.keys())
      .range([0, outerGroupXScale.bandwidth()])
      .padding(0.25)
      .paddingInner(0.25)
      .paddingOuter(0.5)
    const innerGroupXAxis = (g: any) => {
      g.attr('transform', `translate(0, ${height - margin.bottom})`)
        .attr('class', 'x-axis')
        .call(d3.axisBottom(innerGroupXScale))
        .attr('font-size', '12px')
        .call((g: any) => g.selectAll('.domain').remove())
        .call((g: any) => {
          g.selectAll('.tick>line').remove()
        })
        .call((g: any) => {
          g.selectAll('.tick>text').attr('class', dataVizStyles.tick_text)
        })
    }

    const extent = [
      0.9 * d3.min(layers, (layer) => d3.min(layer, (d) => d[1])),
      1.1 * d3.max(layers, (layer) => d3.max(layer, (d) => d[1]))
    ]
    const [yMin] = extent
    const yScale = d3
      .scaleLinear()
      .domain(extent)
      .range([height - margin.bottom, margin.top])

    const yAxisLeft = (g: any) => {
      g.attr('transform', `translate(${margin.left}, 0)`)
        .attr('class', dataVizStyles.y_axis)
        .call(d3.axisLeft(yScale))
        .call((g: any) => g.selectAll('.domain').remove())
        .call((g: any) => {
          g.selectAll('.tick>line').remove()
        })
        .call((g: any) => {
          g.selectAll('.tick>text')
            .attr('class', dataVizStyles.tick_text)
            .attr(
              'transform',
              allBarDataZero
                ? `translate(10, ${height / 2 - margin.bottom})`
                : 'translate(10, 0)'
            )
        })
    }

    const yAxisLabel = (g: any) => {
      g.append('text')
        .attr('transform', `rotate(-90, -45, ${height / 1.66})`)
        .attr('class', dataVizStyles.y_axis_label)
        .attr('x', -45)
        .attr('y', height / 1.66)
        .text('Número de ocurrencias')
    }

    const yAxisLabelLinePlot = (g: any) => {
      g.append('text')
        .attr('transform', `rotate(90, 45, ${height / 2.6})`)
        .attr('class', `${dataVizStyles.y_axis_label} line_y_axis`)
        .attr('x', 10)
        .attr('y', height / 2.6)
        .text(measurementUnit ? measurementUnit : 'Taxa por 100.000 habitantes')
    }

    const lineYScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.rateCityIncidents)])
      .range([height - margin.bottom, margin.top])

    const lineYAxis = (g: any) => {
      g.attr('transform', `translate(${width - margin.right}, 0)`)
        .attr('class', `y_axis_line`)
        .call(d3.axisRight(lineYScale))
        .call((g: any) => g.selectAll('.domain').remove())
        .call((g: any) => {
          g.selectAll('.tick>line').remove()
        })
        .call((g: any) => {
          g.selectAll('.tick>text')
            .attr('class', dataVizStyles.tick_text)
            .attr(
              'transform',
              allLineDataZero
                ? `translate(0, ${height / 2 - margin.bottom})`
                : ''
            )
        })
    }

    const combinedData = data.map((d: any) => ({
      [groupKey]: d[groupKey],
      [stackKey]: d[stackKey],
      values: [
        { key: keys[0], value: d[keys[0]] },
        { key: keys[1], value: d[keys[1]] }
      ],
      rateCityIncidents: d.rateCityIncidents
    }))

    const tooltip = d3
      .select('#dataViz')
      .append('div')
      .attr('class', dataVizStyles.tooltip)
      .style('opacity', 0)

    const stateG = svg
      .selectAll('.state')
      .data(dataByYear)
      .join('g')
      .attr('class', 'state')
      .attr('fill', (d) => colors[d[0]])
      .attr('transform', (d) => `translate(${outerGroupXScale(d[0])}, 0)`)

    stateG.append('g').attr('class', 'stateAxis').call(innerGroupXAxis)

    const yearG = stateG
      .selectAll('.yearG')
      .data((d) => {
        const filteredByState = data.filter((i: any) => i[groupKey] === d[0])
        const groupedByQuarter = d3.group(
          filteredByState,
          (a: any) => a[stackKey]
        )
        return groupedByQuarter
      })
      .join('g')
      .attr('class', 'yearG')
      .attr('transform', (d) => {
        return `translate(${innerGroupXScale(d[0])}, 0)`
      })

    yearG
      .selectAll('.layers')
      .data((d) => {
        return stackGenerator(d[1])
      })
      .join('rect')
      .attr('class', 'layers')
      .attr('y', (d) => yScale(d[0][1]))
      .attr('fill', (d) => colors[d.key])
      .attr('width', () => innerGroupXScale.bandwidth())
      .attr('height', (d) => {
        const lower = d[0][0]
        const upper = d[0][1]
        const firstBarAdjustment = lower === 0 ? yMin : 0
        return yScale(lower + firstBarAdjustment) - yScale(upper)
      })
      .on('mousemove', (event, d) => {
        tooltip.style('opacity', 1)
        const tooltipText =
          d.key === keys[0] ? `${d[0].data[keys[0]]}` : `${d[0].data[keys[1]]}`
        tooltip
          .html(tooltipText)
          .style('left', event.offsetX + 20 + 'px')
          .style('top', event.offsetY - 20 + 'px')
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0)
      })

    const line = d3
      .line()
      .defined((d) => d.rateCityIncidents !== undefined)
      .x(
        (d) =>
          outerGroupXScale(d[groupKey]) +
          innerGroupXScale(d[stackKey]) +
          innerGroupXScale.bandwidth() / 2
      )
      .y((d) =>
        allLineDataZero
          ? height - margin.bottom
          : lineYScale(d.rateCityIncidents)
      )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const linePath = svg
      .append('path')
      .datum(
        combinedData.filter((item: any) => item.rateCityIncidents !== undefined)
      )
      .attr('class', 'line-path')
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('stroke', 'white')
      .attr('d', line)

    svg
      .selectAll('.circle')
      .data(combinedData)
      .enter()
      .append('circle')
      .attr('class', 'circle')
      .attr(
        'cx',
        (d) =>
          outerGroupXScale(d[groupKey]) +
          innerGroupXScale(d[stackKey]) +
          innerGroupXScale.bandwidth() / 2
      )
      .attr('cy', (d: any) =>
        allLineDataZero
          ? height - margin.bottom
          : lineYScale(d.rateCityIncidents)
      )
      .attr('r', (d) =>
        d.rateCityIncidents !== undefined && d.rateCityIncidents !== null
          ? 5
          : 0
      )
      .attr('fill', 'white')
      .on('mousemove', (event, d) => {
        tooltip.style('opacity', 1)
        tooltip
          .html(d.rateCityIncidents)
          .style('left', event.offsetX + 20 + 'px')
          .style('top', event.offsetY - 20 + 'px')
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0)
      })

    svg.append('g').call(outerGroupXAxis)
    svg.append('g').call(yAxisLeft).call(yAxisLabel)
    svg.append('g').call(lineYAxis).call(yAxisLabelLinePlot)

    svg.node()
  }

  function polarityCheck(
    polaritive: 'positive' | 'negative',
    polaritivevalue: any
  ) {
    if (polaritive === 'positive' && polaritivevalue > 0) {
      static_data.indicators[0].criticality = 'low'
      setSlop2('positive')
    } else if (
      polaritive === 'positive' &&
      (polaritivevalue === null || polaritivevalue === 0)
    ) {
      static_data.indicators[1].criticality = 'none'
    } else if (polaritive === 'positive' && polaritivevalue < 0) {
      static_data.indicators[2].criticality = 'high'
      setSlop2('negative')
    } else if (polaritive === 'negative' && polaritivevalue > 0) {
      static_data.indicators[0].criticality = 'high'
      setSlop2('negative')
    } else if (
      polaritive === 'negative' &&
      (polaritivevalue === null || polaritivevalue === 0)
    ) {
      static_data.indicators[1].criticality = 'none'
    } else if (polaritive === 'negative' && polaritivevalue < 0) {
      static_data.indicators[2].criticality = 'low'
      setSlop2('positive')
    }
  }

  /* eslint-disable */
  useEffect(() => {
    polarityCheck(polarityAndTrend.polarity, polarityAndTrend.trendValue)
  }, [polarityAndTrend.polarity, polarityAndTrend.trendValue])
  /* eslint-enable */
  return (
    <S.Wrapper>
      <S.L1Wrapper>
        <S.VisualizationTitle>{static_data.title}</S.VisualizationTitle>
        <ButtonV2
          disabled={
            !Array.isArray(data.data) || data.data.length === 0 || !problemId
          }
          loading={false}
          text={<FormattedMessage id='button.problem.detail.chart.download'/>}
          variant="outline"
          LeadingIcon={DownloadIcon}
          onClick={() =>
            window.open(
              `${process.env.NEXT_PUBLIC_API_URL}/problems/${problemId}/trend/csv`,
              '_blank'
            )
          }
        />
      </S.L1Wrapper>
      {static_data.count && static_data.countDesc && (
        <S.L2Wrapper>
          <S.PercentAndInfoWrapper>
            <S.Percentage type={slope2}>{`${data.trend}${
              data.trend !== '-' ? '%' : ''
            }`}</S.Percentage>
            <S.Info>{static_data.countDesc}</S.Info>
          </S.PercentAndInfoWrapper>
          <S.TrendWrapper>
            {static_data.indicators.map((data, idx) => (
              <TrendIndicator
                key={idx}
                {...{
                  ...data
                }}
              />
            ))}
          </S.TrendWrapper>
        </S.L2Wrapper>
      )}
      <S.L3Wrapper ref={containerRef} id="dataViz"></S.L3Wrapper>
      <S.L4Wrapper>
        {static_data.legends.map((legend: any, idx: number) => (
          <S.LegendWrapper key={idx}>
            {legend.color ? (
              <S.SquareIcon color={legend.color} />
            ) : (
              <S.TaxaIcon />
            )}
            <S.LegendText>{legend.label}</S.LegendText>
          </S.LegendWrapper>
        ))}
      </S.L4Wrapper>
      <S.Footer>{static_data.footer}</S.Footer>
      {static_data.dataDateRange && (
        <S.DateRangeInfo>{static_data.dataDateRange}</S.DateRangeInfo>
      )}
    </S.Wrapper>
  )
}

export default StackedBarChart
